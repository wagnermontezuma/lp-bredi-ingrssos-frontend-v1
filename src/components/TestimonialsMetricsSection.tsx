"use client";

import type { PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "A Bredi conseguiu manter nossa taxa de conversão alta com uma jornada super fluida. O suporte é ágil e realmente entende as dores de quem opera eventos.",
    name: "Mariana Costa",
    role: "Head de Operações, Festival Horizonte",
  },
  {
    quote:
      "Os relatórios em tempo real nos dão confiança para testar novas campanhas sem medo. É uma parceria que escuta, adapta e entrega valor todos os dias.",
    name: "Ricardo Santos",
    role: "Diretor Comercial, Arena Norte",
  },
  {
    quote:
      "Integramos com nosso CRM em poucas horas. A flexibilidade da plataforma elimina gargalos e a experiência do comprador é impecável.",
    name: "Ana Luiza Martins",
    role: "CMO, Circuito Urbano",
  },
];

const METRICS = [
  {
    label: "Ingressos processados",
    value: 2.8,
    suffix: "M",
  },
  {
    label: "Satisfação dos organizadores",
    value: 98,
    suffix: "%",
  },
  {
    label: "Eventos com zero indisponibilidade",
    value: 92,
    suffix: "%",
  },
];

const TestimonialsMetricsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotionPreference = useReducedMotion();
  const shouldReduceMotion: boolean = reduceMotionPreference ?? false;
  const isInView = useInView(sectionRef, { margin: "-20% 0px", once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundShift = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120]);
  const stripeShift = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -80]);

  const headingWords = useMemo(() => ["Aprovado", "por", "quem", "usa"], []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-metrics-title"
      className="relative overflow-hidden bg-bredi-bg py-20 sm:py-24"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.18),_transparent_55%)]"
        style={{ y: backgroundShift }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{ y: stripeShift }}
      >
        <div className="absolute -left-[30%] top-20 h-[140%] w-[160%] -rotate-6 bg-[linear-gradient(120deg,rgba(37,99,235,0.12)_0%,rgba(37,99,235,0)_45%,rgba(37,99,235,0.22)_75%,rgba(37,99,235,0)_100%)] blur-3xl" />
        <div className="absolute -right-[35%] top-0 h-[130%] w-[150%] rotate-3 bg-[linear-gradient(110deg,rgba(59,130,246,0.25)_0%,rgba(29,78,216,0)_45%,rgba(29,78,216,0.15)_72%,rgba(59,130,246,0)_100%)]" />
      </motion.div>

      <div className="container relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:items-start lg:gap-20">
        <div className="flex-1 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-bredi-accent">
            confiança comprovada
          </span>

          <motion.h2
            id="testimonials-metrics-title"
            className="text-4xl font-semibold uppercase leading-tight text-bredi-primary sm:text-5xl"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate={shouldReduceMotion ? "visible" : isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.08,
                },
              },
            }}
          >
            {headingWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="mr-2 inline-block"
                custom={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : "0.4em",
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                      delay: shouldReduceMotion ? 0 : index * 0.1,
                    },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <p className="max-w-xl text-base leading-relaxed text-bredi-secondary">
            Quem já vende milhares de ingressos com a Bredi aprova a experiência. Processos
            confiáveis, suporte que resolve e métricas que orientam decisões em tempo real.
          </p>
        </div>

        <TestimonialsGrid shouldReduceMotion={shouldReduceMotion} />
      </div>
    </section>
  );
};

type TestimonialsGridProps = {
  shouldReduceMotion: boolean;
};

const TestimonialsGrid = ({ shouldReduceMotion }: TestimonialsGridProps) => {
  return (
    <div className="flex flex-1 flex-col gap-10 lg:flex-row lg:gap-12">
      <div className="flex-1 space-y-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            index={index}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>

      <MetricsPanel shouldReduceMotion={shouldReduceMotion} />
    </div>
  );
};

type Testimonial = (typeof TESTIMONIALS)[number];

type TestimonialCardProps = {
  testimonial: Testimonial;
  index: number;
  shouldReduceMotion: boolean;
};

const TestimonialCard = ({ testimonial, index, shouldReduceMotion }: TestimonialCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-15% 0px" });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTilt({ rotateX, rotateY });
  };

  const handlePointerLeave = () => {
    if (shouldReduceMotion) {
      return;
    }

    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const revealVariants = {
    hidden: {
      opacity: 0,
      clipPath: "inset(0 50% 0 50%)",
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.9, 0.3, 1.1],
        delay: shouldReduceMotion ? 0 : index * 0.12,
      },
    },
  };

  return (
    <motion.article
      ref={cardRef}
      className="group relative rounded-3xl border border-white/10 bg-white/10 p-[1px] backdrop-blur"
      initial="hidden"
      animate={shouldReduceMotion ? "visible" : isCardInView ? "visible" : "hidden"}
    >
      <div
        className="relative h-full rounded-[calc(1.5rem-1px)] bg-white/80 p-6 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl"
        style={{
          transform: shouldReduceMotion
            ? undefined
            : `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          className="space-y-4"
          variants={revealVariants}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base leading-relaxed text-slate-700">
            “{testimonial.quote}”
          </p>

          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bredi-primary">
              {testimonial.name}
            </p>
            <p className="text-sm text-slate-500">{testimonial.role}</p>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
};

type MetricsPanelProps = {
  shouldReduceMotion: boolean;
};

const MetricsPanel = ({ shouldReduceMotion }: MetricsPanelProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelInView = useInView(panelRef, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={panelRef}
      className="relative flex min-w-[260px] flex-1 flex-col justify-between rounded-3xl border border-white/10 bg-slate-950/85 p-8 text-white shadow-[0_40px_100px_rgba(15,23,42,0.45)]"
      initial="hidden"
      animate={shouldReduceMotion ? "visible" : panelInView ? "visible" : "hidden"}
      variants={{
        hidden: {
          opacity: 0,
          y: shouldReduceMotion ? 0 : 32,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      }}
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bredi-accent">
          indicadores em tempo real
        </p>
        <h3 className="text-2xl font-semibold text-white">Decisões guiadas por dados</h3>
        <p className="text-sm text-slate-300">
          Dashboards avançados com atualização instantânea e alertas proativos que mantêm sua operação em ritmo máximo.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {METRICS.map((metric) => (
          <MetricItem
            key={metric.label}
            metric={metric}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
    </motion.div>
  );
};

type Metric = (typeof METRICS)[number];

type MetricItemProps = {
  metric: Metric;
  shouldReduceMotion: boolean;
};

const MetricItem = ({ metric, shouldReduceMotion }: MetricItemProps) => {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(`${metric.value}${metric.suffix ?? ""}`);
      return;
    }

    const controls = animate(motionValue, metric.value, {
      duration: 2,
      ease: "easeOut",
      delay: 0.2,
      onUpdate: (latest) => {
        const formatted = metric.suffix === "M"
          ? latest.toFixed(1)
          : Math.round(latest).toString();
        setDisplayValue(`${formatted}${metric.suffix ?? ""}`);
      },
    });

    return () => {
      controls.stop();
    };
  }, [metric.suffix, metric.value, motionValue, shouldReduceMotion]);

  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-3xl font-semibold text-white">{displayValue}</p>
      <p className="text-sm text-slate-300">{metric.label}</p>
    </div>
  );
};

export default TestimonialsMetricsSection;
