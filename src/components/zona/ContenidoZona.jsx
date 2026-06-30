export default function ContenidoZona({ zona }) {
  return (
    <div className="zona-contenido">
      <div className="zona-visual" aria-hidden="true">
        <div
          className="zona-visual-img"
          style={{ backgroundImage: `url("${zona.imagen}")` }}
        />
      </div>

      <div className="zona-texto">
        <h1 className="zona-titulo">{zona.titulo}</h1>
        {zona.texto && <p className="zona-parrafo">{zona.texto}</p>}
      </div>
    </div>
  );
}
