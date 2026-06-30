import { useCallback, useState } from 'react';
import { ZONAS, SUBZONAS, VISTA_PROVINCIA, obtenerZona } from '../data/zonas';

export function useNavegacionZonas() {
  const [nivelMapa, setNivelMapa] = useState('provincia');
  const [zonaAbierta, setZonaAbierta] = useState(null);
  const [objetivoVuelo, setObjetivoVuelo] = useState(null);
  const [origenZoom, setOrigenZoom] = useState(null);

  const volarA = useCallback((coord, zoom) => {
    setObjetivoVuelo({ coord, zoom });
  }, []);

  const abrirZona = useCallback(
    (id, origen = null) => {
      const zona = obtenerZona(id);
      if (!zona) return;
      setOrigenZoom(origen);
      volarA(zona.coord, zona.zoom);
      setZonaAbierta(id);
    },
    [volarA],
  );

  const entrarSubmapa = useCallback(
    (id) => {
      const zona = ZONAS[id];
      if (!zona || zona.tipo !== 'submapa') return;
      setZonaAbierta(null);
      setNivelMapa(id);
      volarA(zona.coord, zona.zoom);
    },
    [volarA],
  );

  const volverProvincia = useCallback(() => {
    setZonaAbierta(null);
    setNivelMapa('provincia');
    volarA(VISTA_PROVINCIA.coord, VISTA_PROVINCIA.zoom);
  }, [volarA]);

  const cambiarNivelMapa = useCallback((nivel) => {
    setZonaAbierta(null);
    setNivelMapa(nivel);
  }, []);

  const seleccionarMarcador = useCallback(
    (id, origen = null) => {
      const zona = obtenerZona(id);
      if (!zona) return;
      if (zona.tipo === 'submapa') {
        entrarSubmapa(id);
      } else {
        abrirZona(id, origen);
      }
    },
    [abrirZona, entrarSubmapa],
  );

  // Navega directo a una zona desde el menú, ajustando el nivel del mapa
  const abrirZonaDirecta = useCallback(
    (id) => {
      const esSubzona = Boolean(SUBZONAS[id]);
      setNivelMapa(esSubzona ? SUBZONAS[id].padre : 'provincia');
      abrirZona(id);
    },
    [abrirZona],
  );

  const cerrarZona = useCallback(() => {
    setZonaAbierta(null);
    if (nivelMapa === 'provincia') {
      volarA(VISTA_PROVINCIA.coord, VISTA_PROVINCIA.zoom);
    } else {
      const contenedor = ZONAS[nivelMapa];
      volarA(contenedor.coord, contenedor.zoom);
    }
  }, [nivelMapa, volarA]);

  return {
    nivelMapa,
    zonaAbierta,
    objetivoVuelo,
    origenZoom,
    seleccionarMarcador,
    entrarSubmapa,
    cambiarNivelMapa,
    volverProvincia,
    abrirZonaDirecta,
    cerrarZona,
  };
}
