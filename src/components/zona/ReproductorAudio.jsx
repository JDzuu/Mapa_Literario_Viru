import { useEffect, useRef, useState } from 'react';
import { IconPlay, IconPause, IconVolumen, IconSilencio } from '../../icons/iconos';

export default function ReproductorAudio({ src, titulo }) {
  const audioRef = useRef(null);

  const [reproduciendo, setReproduciendo] = useState(false);
  const [tiempoActual,  setTiempoActual]  = useState(0);
  const [duracion,      setDuracion]      = useState(0);
  const [volumen,       setVolumen]       = useState(1);
  const [disponible,    setDisponible]    = useState(true);

  // Resetea estado al cambiar de zona
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    setReproduciendo(false);
    setTiempoActual(0);
    setDuracion(0);
    setDisponible(true);
  }, [src]);

  // Sincroniza el volumen del elemento <audio> con el slider
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volumen;
  }, [volumen]);

  const alCargarMetadatos = (e) => setDuracion(e.currentTarget.duration || 0);
  const alActualizarTiempo = (e) => setTiempoActual(e.currentTarget.currentTime);
  const alTerminar = () => setReproduciendo(false);
  const alFallar  = () => { setDisponible(false); setReproduciendo(false); };

  const reproducir = () => {
    const audio = audioRef.current;
    if (!audio || !disponible) return;
    audio.play()
      .then(() => setReproduciendo(true))
      .catch(() => setDisponible(false));
  };
  const pausar = () => {
    audioRef.current?.pause();
    setReproduciendo(false);
  };
  const alternarPlay = () => (reproduciendo ? pausar() : reproducir());

  const alMoverBarra = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = Number(e.target.value);
    audio.currentTime = t;
    setTiempoActual(t);
  };

  const formatear = (s) => {
    if (!Number.isFinite(s) || s === 0) return '0:00';
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  };

  // Degradado de relleno para los sliders de progreso y volumen
  const pctProgreso = duracion ? (tiempoActual / duracion) * 100 : 0;
  const pctVolumen  = volumen * 100;
  const relleno = (pct) =>
    `linear-gradient(to right, rgba(255,255,255,0.92) ${pct}%, rgba(255,255,255,0.22) ${pct}%)`;

  if (!disponible) return null;

  return (
    <div className="audio-barra" role="region" aria-label={`Reproductor: ${titulo}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={alCargarMetadatos}
        onTimeUpdate={alActualizarTiempo}
        onEnded={alTerminar}
        onError={alFallar}
      />

      <button
        className="audio-barra-btn"
        type="button"
        onClick={alternarPlay}
        disabled={!disponible}
        aria-label={reproduciendo ? 'Pausar narración' : 'Reproducir narración'}
        title={reproduciendo ? 'Pausar' : 'Reproducir'}
      >
        {reproduciendo ? <IconPause size={17} /> : <IconPlay size={17} />}
      </button>

      <input
        className="audio-barra-slider"
        type="range"
        min="0"
        max={duracion || 0}
        step="0.1"
        value={tiempoActual}
        onChange={alMoverBarra}
        style={{ background: relleno(pctProgreso) }}
        aria-label="Avanzar o retroceder el audio"
      />

      <span className="audio-barra-tiempos" aria-live="off" aria-atomic="true">
        {formatear(tiempoActual)}&thinsp;/&thinsp;{formatear(duracion)}
      </span>

      <button
        className="audio-barra-btn"
        type="button"
        onClick={() => setVolumen((v) => (v > 0 ? 0 : 1))}
        aria-label={volumen > 0 ? 'Silenciar' : 'Activar sonido'}
        title={volumen > 0 ? 'Silenciar' : 'Activar sonido'}
      >
        {volumen > 0 ? <IconVolumen size={16} /> : <IconSilencio size={16} />}
      </button>

      <input
        className="audio-barra-slider audio-barra-slider--vol"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volumen}
        onChange={(e) => setVolumen(Number(e.target.value))}
        style={{ background: relleno(pctVolumen) }}
        aria-label="Ajustar volumen"
      />
    </div>
  );
}
