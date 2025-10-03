"use client";

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

const testimonials = [
  {
    quote: "A Bredi Ingressos nos ajudou a vender mais de 3 mil ingressos em tempo recorde. O suporte foi incrível!",
    author: "Produtor de Eventos",
    avatar: "https://picsum.photos/100/100?random=3",
  },
  {
    quote:
      "Conseguimos organizar toda a entrada do nosso congresso sem filas, só com QR Code no celular. Foi um sucesso!",
    author: "Organização Acadêmica",
    avatar: "https://picsum.photos/100/100?random=4",
  },
];

const metrics = [
  { value: 10, prefix: "+", suffix: " mil", label: "ingressos vendidos" },
  { value: 200, prefix: "+", suffix: "", label: "produtores atendidos" },
  { value: 50, prefix: "+", suffix: "", label: "cidades alcançadas" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const AnimatedMetricValue = ({
  value,
  prefix,
  suffix,
  duration = 1.2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) => {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(spanRef, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease,
      });

      const unsubscribe = motionValue.on("change", (latest) => {
        setDisplayValue(Math.round(latest));
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [duration, isInView, motionValue, prefersReducedMotion, value]);

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    setDisplayValue(value);
  }, [prefersReducedMotion, value]);

  const formattedValue = useMemo(() => {
    const base = new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 0,
    }).format(displayValue);

    return `${prefix ?? ""}${base}${suffix ?? ""}`;
  }, [displayValue, prefix, suffix]);

  return (
    <span ref={spanRef} aria-live="polite">
      {formattedValue}
    </span>
  );
};

const SocialProof = () => {
  const prefersReducedMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanHover(window.matchMedia("(hover: hover)").matches);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="aprovado-por-quem-usa"
      className="relative overflow-hidden bg-white py-20"
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-10 top-0 h-full bg-gradient-to-b from-bredi-accent/10 via-transparent to-bredi-accent/10 opacity-5"
          style={{ y: parallaxY }}
        />
      )}
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold uppercase text-bredi-primary md:text-4xl">
            APROVADO POR QUEM USA
          </h2>
          {prefersReducedMotion ? (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-bredi-secondary">
              Resultados reais de produtores que confiam em nossa plataforma.
            </p>
          ) : (
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-lg text-bredi-secondary"
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
            >
              Resultados reais de produtores que confiam em nossa plataforma.
            </motion.p>
          )}
        </div>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <motion.figure
              key={testimonial.author}
              className="rounded-xl bg-gray-100 p-8 shadow-sm"
              whileHover=
                {!prefersReducedMotion && canHover
                  ? {
                      rotateX: 1.5,
                      rotateY: -1.5,
                      y: -4,
                      boxShadow: "0px 20px 35px -20px rgba(0,0,0,0.25)",
                      transition: { type: "spring", stiffness: 200, damping: 15 },
                    }
                  : undefined}
              style={{ transformPerspective: 800 }}
            >
              <blockquote className="mb-6 text-lg italic text-bredi-secondary">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  loading="lazy"
                  className="mr-4 h-12 w-12 rounded-full"
                />
                <div>
                  <p className="font-bold text-bredi-primary">{testimonial.author}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-16 rounded-xl bg-bredi-primary px-6 py-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="border-b-2 border-bredi-accent/50 pb-4 last:border-0 md:border-b-0 md:border-r-2 md:pb-0 md:last:border-0"
                style={{
                  borderColor: prefersReducedMotion ? "rgba(255, 214, 0, 0.5)" : "rgba(255, 214, 0, 0)",
                }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { borderColor: "rgba(255, 214, 0, 0.5)" }
                }
                transition={{ duration: 0.8, ease, delay: 0.3 + index * 0.1 }}
              >
                <p className="text-4xl font-extrabold text-bredi-accent md:text-5xl">
                  <AnimatedMetricValue
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    duration={1.1 + index * 0.1}
                  />
                </p>
                <p className="text-lg opacity-90">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
