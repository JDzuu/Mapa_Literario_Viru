import { IconAtras } from '../../icons/iconos';

export default function BotonRegresar({ texto, onClick }) {
  return (
    <button className="boton-regresar-mapa" type="button" onClick={onClick}>
      <IconAtras size={16} aria-hidden="true" />
      {texto}
    </button>
  );
}
