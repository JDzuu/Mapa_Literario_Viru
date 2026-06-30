import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ZONAS, SUBZONAS, VISTA_PROVINCIA } from '../../data/zonas';

// MapLibre espera [lng, lat]; los datos están en [lat, lng]
const aLngLat = ([lat, lng]) => [lng, lat];

export default function MapaViru({
  nivelMapa,
  objetivoVuelo,
  onSeleccionMarcador,
  volverProvincia,
  cambiarNivelMapa,
  entrarSubmapa,
  interaccionBloqueada,
}) {
  const contenedorRef = useRef(null);
  const mapaRef = useRef(null);
  const markersRef = useRef([]);

  // Ref para que los marcadores llamen siempre a la versión más reciente del callback
  const onSeleccionRef = useRef(onSeleccionMarcador);
  useEffect(() => {
    onSeleccionRef.current = onSeleccionMarcador;
  }, [onSeleccionMarcador]);

  // Inicialización del mapa
  useEffect(() => {
    if (!contenedorRef.current || mapaRef.current) return;

    const map = new maplibregl.Map({
      container: contenedorRef.current,
      style: {
        version: 8,
        sources: {
          esri: {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 17,
            attribution: 'Esri',
          },
        },
        layers: [{ id: 'esri-layer', type: 'raster', source: 'esri' }],
      },
      center: aLngLat(VISTA_PROVINCIA.coord),
      zoom: VISTA_PROVINCIA.zoom,
      maxZoom: 18,
      minZoom: 11,
      // Límite geográfico de la provincia de Virú
      maxBounds: [
        [-79.30, -8.90],
        [-78.30, -8.00],
      ],
      pitch: 0,
      bearing: 0,
      antialias: true,
    });

    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

    // Evita pantalla negra al montar en móviles
    map.on('load', () => map.resize());

    const ro = new ResizeObserver(() => map.resize());
    ro.observe(contenedorRef.current);

    mapaRef.current = map;

    return () => {
      ro.disconnect();
      map.remove();
      mapaRef.current = null;
    };
  }, []);

  // Ajuste de zoom mínimo según el nivel
  useEffect(() => {
    const map = mapaRef.current;
    if (!map) return;
    if (nivelMapa === 'provincia' || nivelMapa === 'viru') {
      map.setMinZoom(11);
    }
  }, [nivelMapa]);

  // Cambio de nivel por zoom del usuario
  useEffect(() => {
    const map = mapaRef.current;
    if (!map) return;

    const handleZoom = () => {
      const zoom = map.getZoom();
      if (nivelMapa === 'viru' && zoom < 14.2) cambiarNivelMapa('provincia');
      if (nivelMapa === 'provincia' && zoom > 15.2) cambiarNivelMapa('viru');
    };

    map.on('zoomend', handleZoom);
    return () => map.off('zoomend', handleZoom);
  }, [nivelMapa, volverProvincia]);

  // Marcadores: se recrean al cambiar de nivel
  useEffect(() => {
    const map = mapaRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const entradas =
      nivelMapa === 'provincia'
        ? Object.entries(ZONAS)
        : ZONAS[nivelMapa].subzonas.map((id) => [id, SUBZONAS[id]]);

    entradas.forEach(([id, zona]) => {
      const el = document.createElement('button');
      el.className = `
        marcador
        ${zona.tipo === 'submapa'
          ? 'marcador--submapa'
          : nivelMapa === 'provincia'
            ? 'marcador--zona'
            : 'marcador--subzona'}
      `;
      el.innerHTML = `
        <span class="marcador-punto"></span>
        <span class="marcador-etiqueta">${zona.nombre ?? id}</span>
      `;
      el.addEventListener('click', () => onSeleccionRef.current(id, null));

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(aLngLat(zona.coord))
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [nivelMapa]);

  // Vuelo suave al seleccionar una zona
  useEffect(() => {
    const map = mapaRef.current;
    if (!map || !objetivoVuelo) return;

    map.flyTo({
      center: aLngLat(objetivoVuelo.coord),
      zoom: objetivoVuelo.zoom,
      speed: 1.2,
      curve: 1.5,
      essential: true,
    });
  }, [objetivoVuelo]);

  return (
    <div
      ref={contenedorRef}
      className="mapa-viru"
      style={{ pointerEvents: interaccionBloqueada ? 'none' : 'auto' }}
      aria-hidden={interaccionBloqueada}
    />
  );
}
