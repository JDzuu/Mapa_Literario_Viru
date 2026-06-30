import { useState } from 'react';
import { ZONAS_CON_PAGINA, obtenerZona } from '../../data/zonas';

export default function MenuZonas({ onAbrirZona, oculto }) {
  const [abierto, setAbierto] = useState(false);

  if (oculto) return null;

  const irAZona = (id) => {
    onAbrirZona(id);
    setAbierto(false);
  };

  const renderGrupo = (titulo, ids) => (
    <div className="menu-grupo">
      <h3 className="menu-grupo-titulo">{titulo}</h3>
      <div className="menu-tarjetas">
        {ids.map((id) => {
          const zona = obtenerZona(id);
          return (
            <article className="menu-tarjeta" key={id}>
              <h4 className="menu-tarjeta-nombre">{zona.nombre}</h4>
              <p className="menu-tarjeta-leyenda">{zona.leyenda}</p>
              <button
                className="menu-tarjeta-boton"
                type="button"
                onClick={() => irAZona(id)}
              >
                Ir a la zona →
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={`menu-zonas ${abierto ? 'menu-zonas--abierto' : ''}`}>
      <button
        className="menu-zonas-boton"
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
      >
        Explorar Zonas
        <span className="menu-zonas-flecha" aria-hidden="true">{abierto ? '▲' : '▼'}</span>
      </button>

      {abierto && (
        <div className="menu-zonas-panel" role="menu" aria-label="Lista de zonas">
          <p className="menu-zonas-ayuda">
            Elige una zona para ir directamente a su historia.
          </p>
          {renderGrupo('Provincia de Virú', ZONAS_CON_PAGINA.provincia)}
          {renderGrupo('Pueblo de Virú', ZONAS_CON_PAGINA.viru)}
        </div>
      )}
    </div>
  );
}
