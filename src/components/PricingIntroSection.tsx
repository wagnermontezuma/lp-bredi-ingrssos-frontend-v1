"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { CheckCircleIcon } from "@/components/icons/FeatureIcons";

const EYEBROW_TEXT = "PLANOS E MODELO DE NEGÓCIO";
const TITLE_TEXT = "Um modelo justo e transparente";
const DESCRIPTION_TEXT =
  "Nosso compromisso é com o seu sucesso. Por isso, criamos um modelo de negócio simples, sem taxas escondidas e sem mensalidades. Você só paga uma pequena comissão sobre os ingressos que vender. Simples assim.";

const FEATURES = [
  "Transparência total para você",
  "Setup único de configuração do evento",
  "Comissão apenas sobre os ingressos vendidos",
  "Sem mensalidade fixa, sem burocracia. Você só paga se vender.",
];

const PricingIntroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-20% 0px",
  });

  const headingWords = useMemo(() => TITLE_TEXT.split(" "), []);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const progressScaleX = useTransform(sectionProgress, [0, 1], [0, 1]);
  const blobY = useTransform(sectionProgress, [0, 1], [0, -80]);
  const blobRotate = useTransform(sectionProgress, [0, 1], [0, 16]);
  const cardShadow = useTransform(cardProgress, (value) => {
    const intensity = 0.18 + value * 0.25;
    return `0 32px 80px rgba(15, 23, 42, ${intensity.toFixed(2)})`;
  });

  const animateState = isInView || shouldReduceMotion ? "visible" : "hidden";

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : "0.4em",
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
        delay: shouldReduceMotion ? 0 : 0.1 + index * 0.12,
      },
    }),
  };

  const headingVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
        delay: shouldReduceMotion ? 0 : 0.4,
      },
    },
  };

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.55,
      },
    },
  };

  const listItemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-bredi-bg py-24 sm:py-28 lg:py-32"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-1 w-full origin-left bg-bredi-accent"
        style={{
          scaleX: shouldReduceMotion ? 1 : progressScaleX,
          opacity: shouldReduceMotion || isInView ? 1 : 0,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-36 top-10 hidden h-72 w-72 rounded-full bg-gradient-to-br from-bredi-accent/60 via-bredi-accent/30 to-transparent blur-3xl md:block"
        style={{
          y: shouldReduceMotion ? 0 : blobY,
          rotate: shouldReduceMotion ? 0 : blobRotate,
        }}
      />

      <div className="container relative z-10 mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="flex flex-col gap-6 lg:pr-8">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-bredi-accent">
            {EYEBROW_TEXT}
          </span>

          <motion.h2
            className="text-4xl font-semibold uppercase leading-tight text-bredi-primary md:text-5xl"
            variants={headingVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate={animateState}
          >
            {headingWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="mr-2 inline-block"
                custom={index}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            className="max-w-xl text-lg text-bredi-secondary"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate={animateState}
            variants={paragraphVariants}
          >
            {DESCRIPTION_TEXT}
          </motion.p>

          <motion.ul
            className="mt-4 space-y-4"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate={animateState}
            variants={listVariants}
          >
            {FEATURES.map((feature) => (
              <motion.li
                key={feature}
                className="flex items-start gap-3 text-bredi-secondary"
                variants={listItemVariants}
              >
                <span className="mt-1">
                  <CheckCircleIcon />
                </span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="lg:pl-8">
          <motion.div
            ref={cardRef}
            className="relative rounded-3xl border border-white/30 bg-white/70 p-8 shadow-2xl backdrop-blur-md transition-colors lg:sticky lg:top-24"
            style={{
              boxShadow: shouldReduceMotion
                ? "0 28px 60px rgba(15, 23, 42, 0.18)"
                : cardShadow,
            }}
          >
            <motion.div
              className="absolute -right-8 -top-8 hidden h-24 w-24 rounded-full bg-bredi-accent/40 blur-2xl sm:block"
              aria-hidden
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <div className="space-y-4 text-center">
              <h3 className="text-2xl font-semibold text-bredi-primary">
                Pronto para começar?
              </h3>
              <p className="text-base text-bredi-secondary">
                Receba uma proposta personalizada para as necessidades do seu
                evento.
              </p>
              <motion.a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-bredi-accent/40 bg-bredi-accent px-8 py-4 text-base font-semibold uppercase tracking-wide text-bredi-primary shadow-sm transition-colors hover:bg-bredi-primary hover:text-bredi-accent"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                Solicite uma proposta
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingIntroSection;
