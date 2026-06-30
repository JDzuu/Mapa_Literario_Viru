import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ContenidoZona from './ContenidoZona';
import ReproductorAudio from './ReproductorAudio';
import { IconAtras } from '../../icons/iconos';

// Respeta la preferencia de reducción de movimiento del sistema
const REDUCE_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function PaginaZona({ zona, origen, onCerrar, onSolicitarCerrar, cerrarRef }) {
  const raizRef = useRef(null);
  const scrollRef = useRef(null);
  const cerrandoRef = useRef(false);

  // transform-origin dinámico desde el punto del clic del marcador
  const estiloOrigen = origen
    ? { '--origen-x': `${origen.x}%`, '--origen-y': `${origen.y}%` }
    : undefined;

  const { contextSafe } = useGSAP(
    () => {
      const el = raizRef.current;
      if (!el) return;

      const mapa = document.querySelector('.mapa-viru');

      // Estado inicial antes de la animación de entrada
      gsap.set(el, {
        transformOrigin: origen ? `${origen.x}% ${origen.y}%` : '50% 50%',
        opacity: 0,
        scale: 1.02,
        filter: 'blur(2px) brightness(0.9)',
      });

      const D = REDUCE_MOTION ? 0.1 : 0.8;

      // Timeline de entrada: mapa se atenúa, página emerge
      const tl = gsap.timeline({
        onStart: () => {
          el.style.willChange = 'transform, opacity, filter';
          if (mapa) mapa.style.willChange = 'opacity';
        },
        onComplete: () => {
          el.style.willChange = 'auto';
          gsap.set(el, { clearProps: 'transform,filter' });
          if (mapa) mapa.style.willChange = 'auto';
        },
      });

      if (mapa) {
        tl.fromTo(mapa, { opacity: 1 }, { opacity: 0.35, duration: D, ease: 'sine.inOut' }, 0);
      }

      tl.to(el, { opacity: 1, duration: 0.4, ease: 'sine.inOut' }, 0);
      tl.to(el, { scale: 1, filter: 'blur(0px) brightness(1)', duration: 1, ease: 'power2.out' }, 0.2);
    },
    { scope: raizRef, dependencies: [zona?.nombre] },
  );

  // Reinicia el scroll al cambiar de zona
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [zona]);

  // Animación de salida
  const cerrar = contextSafe(() => {
    if (cerrandoRef.current) return;
    cerrandoRef.current = true;

    const el = raizRef.current;
    if (!el) { onCerrar(); return; }

    const mapa = document.querySelector('.mapa-viru');
    const D = REDUCE_MOTION ? 0.01 : 0.75;

    // Timeline de salida: mapa vuelve a brillo pleno, página se disuelve
    const tl = gsap.timeline({ onComplete: onCerrar });

    if (mapa) {
      mapa.style.willChange = 'opacity';
      tl.to(mapa, {
        opacity: 1,
        duration: D,
        ease: 'sine.inOut',
        onComplete: () => { mapa.style.willChange = 'auto'; },
      }, 0);
    }

    tl.to(el, {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(3px) brightness(0.9)',
      duration: D,
      ease: 'sine.inOut',
      onStart: () => { el.style.willChange = 'transform, opacity, filter'; },
    }, 0);
  });

  // Expone el cierre animado al padre (para el botón atrás del celular)
  useEffect(() => {
    if (cerrarRef) cerrarRef.current = cerrar;
    return () => { if (cerrarRef) cerrarRef.current = null; };
  }, [cerrarRef, cerrar]);

  return (
    <div ref={raizRef} className="pagina-zona" style={estiloOrigen}>
      <ReproductorAudio src={zona.audio} titulo={zona.nombre} />

      <div className="zona-barra">
        <button className="zona-volver" onClick={onSolicitarCerrar}>
          <IconAtras size={16} />
          Regresar al mapa
        </button>

        <span className="zona-barra-nombre">{zona.nombre}</span>
      </div>

      <div className="pagina-zona-scroll" ref={scrollRef}>
        <ContenidoZona zona={zona} />
      </div>
    </div>
  );
}
