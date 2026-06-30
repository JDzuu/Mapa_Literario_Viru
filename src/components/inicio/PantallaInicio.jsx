export default function PantallaInicio({ onEntrar }) {
  return (
    <div className="pantalla-inicio">
      <img
        className="pantalla-inicio__imagen"
        src="/imagenes/inicio.jpg"
        alt="Portada del Mapa Literario de Virú"
      />

      <button className="pantalla-inicio__boton" onClick={onEntrar}>
        Entrar al mapa
      </button>
    </div>
  );
}
