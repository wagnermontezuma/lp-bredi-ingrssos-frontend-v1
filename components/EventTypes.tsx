import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Card = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

const CARDS: Card[] = [
  {
    id: "shows",
    title: "Shows e Festas",
    desc: "Vibe de festival, energia máxima para o seu público.",
    image: "https://picsum.photos/seed/shows/1280/800",
  },
  {
    id: "esportes",
    title: "Esportes",
    desc: "Clima de estádio: competição, torcida e emoção ao vivo.",
    image: "https://picsum.photos/seed/esportes/1280/800",
  },
  {
    id: "congressos",
    title: "Congressos e Palestras",
    desc: "Conteúdo de alto nível em ambientes modernos e imersivos.",
    image: "https://picsum.photos/seed/congresso/1280/800",
  },
  {
    id: "cursos",
    title: "Cursos e Workshops",
    desc: "Aprendizado prático com foco na experiência do participante.",
    image: "https://picsum.photos/seed/cursos/1280/800",
  },
  {
    id: "corporativos",
    title: "Eventos Corporativos",
    desc: "Networking e negócios com organização impecável.",
    image: "https://picsum.photos/seed/corp/1280/800",
  },
  {
    id: "sociais",
    title: "Eventos Sociais",
    desc: "Celebrações marcantes para momentos inesquecíveis.",
    image: "https://picsum.photos/seed/social/1280/800",
  },
];


const EventTypes: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [xMax, setXMax] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const measure = () => {
      const track = trackRef.current;
      const pin = pinRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !pin || !wrapper) return;

      const maxX = Math.max(0, track.scrollWidth - pin.clientWidth);
      setXMax(maxX);

      const wrapperH = maxX + pin.clientHeight;
      wrapper.style.height = `${wrapperH}px`;
    };

    const rafMeasure = () => requestAnimationFrame(measure);
    rafMeasure();
    window.addEventListener("resize", rafMeasure);
    window.addEventListener("load", rafMeasure);
    return () => {
      window.removeEventListener("resize", rafMeasure);
      window.removeEventListener("load", rafMeasure);
    };
  }, [prefersReducedMotion]);

  // FIX: The 'disabled' property does not exist on UseScrollOptions and was causing a TypeScript error.
  // The component already handles prefers-reduced-motion by rendering a static version,
  // so this property is not needed to disable the scroll effect.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -xMax]);
  const x = useSpring(rawX, { damping: 40, stiffness: 200, mass: 0.6 });
  
  if (prefersReducedMotion) {
    return (
      <section id="event-types" className="bg-bredi-primary text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-5xl uppercase">
            PARA TODOS OS TIPOS DE EVENTO
          </h2>
          <p className="mt-4 text-center text-base/7 text-white/70 md:text-lg">
            Da balada ao festival, do corporativo ao casamento. Temos a solução ideal para você.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <div key={card.id} className="relative h-80 overflow-hidden rounded-2xl ring-1 ring-white/10 group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                  style={{ backgroundImage: `url(${card.image})` }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <p className="mt-1 text-white/80">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="event-types" aria-label="Para Todos os Tipos de Evento" className="relative bg-bredi-primary text-white">
      <div ref={wrapperRef} className="relative">
        <div
          ref={pinRef}
          className="sticky top-0 h-screen overflow-hidden [overscroll-behavior:contain] select-none"
        >
          <div className="absolute top-0 left-0 right-0 z-20 mx-auto max-w-6xl px-6 pt-16 pb-6 md:pt-24">
            <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-5xl uppercase">
              PARA TODOS OS TIPOS DE EVENTO
            </h2>
            <p className="mt-3 text-center text-base/7 text-white/70 md:text-lg">
              Da balada ao festival, do corporativo ao casamento. Temos a solução ideal para você.
            </p>
          </div>

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full items-center will-change-transform"
          >
            {CARDS.map((card, i) => {
              const cardCount = CARDS.length;
              const start = Math.max(0, i / cardCount - 1 / (cardCount * 2));
              const end = Math.min(1, (i + 1) / cardCount + 1 / (cardCount * 2));
              const mid = (start + end) / 2;

              const scale = useTransform(scrollYProgress, [start, mid, end], [0.95, 1, 0.95]);
              const opacity = useTransform(scrollYProgress, [start, mid, end], [0.6, 1, 0.6]);

              return (
                <motion.article
                  key={card.id}
                  style={{ scale, opacity }}
                  className="relative mx-6 h-[70vh] w-[88vw] md:w-[68vw] shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
                  aria-label={card.title}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-black/20" />
                  <div className="relative z-10 flex h-full items-end p-8 md:p-12">
                    <div className="max-w-md">
                      <h3 className="text-2xl font-bold md:text-3xl">{card.title}</h3>
                      <p className="mt-3 text-white/80 md:text-lg">{card.desc}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default EventTypes;