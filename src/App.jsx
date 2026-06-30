import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavegacionZonas } from './hooks/useNavegacionZonas';
import { obtenerZona } from './data/zonas';
import MapaViru from './components/mapa/MapaViru';
import BotonRegresar from './components/mapa/BotonRegresar';
import MenuZonas from './components/navegacion/MenuZonas';
import PaginaZona from './components/zona/PaginaZona';
import PantallaInicio from './components/inicio/PantallaInicio';

export default function App() {
  const nav = useNavegacionZonas();
  const [entrado, setEntrado] = useState(false);

  const zonaData = nav.zonaAbierta ? obtenerZona(nav.zonaAbierta) : null;
  const hayPaginaAbierta = Boolean(nav.zonaAbierta);
  const enSubmapa = nav.nivelMapa !== 'provincia';

  // Referencia al cierre animado de PaginaZona, para que el botón atrás del celular lo dispare
  const cerrarPaginaRef = useRef(null);

  // Empuja entrada al historial al abrir una zona → botón atrás del celular vuelve al mapa
  useEffect(() => {
    if (hayPaginaAbierta) {
      window.history.pushState({ paginaZona: true }, '');
    }
  }, [hayPaginaAbierta]);

  // Intercepta el gesto/botón atrás del navegador
  useEffect(() => {
    const alPresionarAtras = () => {
      if (cerrarPaginaRef.current) cerrarPaginaRef.current();
    };
    window.addEventListener('popstate', alPresionarAtras);
    return () => window.removeEventListener('popstate', alPresionarAtras);
  }, []);

  // Cierre desde la UI: siempre pasa por history.back() para unificar el camino de animación
  const solicitarCerrar = useCallback(() => {
    if (window.history.state && window.history.state.paginaZona) {
      window.history.back();
    } else if (cerrarPaginaRef.current) {
      cerrarPaginaRef.current();
    }
  }, []);

  if (!entrado) {
    return <PantallaInicio onEntrar={() => setEntrado(true)} />;
  }

  return (
    <div className="app">
      <MapaViru
        nivelMapa={nav.nivelMapa}
        objetivoVuelo={nav.objetivoVuelo}
        onSeleccionMarcador={nav.seleccionarMarcador}
        cambiarNivelMapa={nav.cambiarNivelMapa}
        volverProvincia={nav.volverProvincia}
        entrarSubmapa={nav.entrarSubmapa}
        interaccionBloqueada={hayPaginaAbierta}
      />

      {!hayPaginaAbierta && (
        <header className="app-titulo">
          <h1>Mapa Literario de Virú</h1>
          <p>
            {enSubmapa
              ? 'Pueblo de Virú · elige una zona para ver su historia'
              : 'Explora las leyendas de la provincia de Virú'}
          </p>
        </header>
      )}

      {enSubmapa && !hayPaginaAbierta && (
        <BotonRegresar texto="Ir al mapa inicial" onClick={nav.volverProvincia} />
      )}

      <MenuZonas onAbrirZona={nav.abrirZonaDirecta} oculto={hayPaginaAbierta} />

      {/* La key reinicia la animación GSAP y el scroll al cambiar de zona */}
      {zonaData && (
        <PaginaZona
          key={nav.zonaAbierta}
          zona={zonaData}
          origen={nav.origenZoom}
          onCerrar={nav.cerrarZona}
          onSolicitarCerrar={solicitarCerrar}
          cerrarRef={cerrarPaginaRef}
        />
      )}
    </div>
  );
}
