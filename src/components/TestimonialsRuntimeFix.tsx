"use client";

import { useEffect } from "react";

/**
 * Hotfix temporário:
 * - Não modifica a sessão original.
 * - Só observa #aprovado-por-quem-usa e força a entrada dos <figure> (ou [data-testimonial])
 *   com transição left/right quando a sessão entra na viewport.
 */
export default function TestimonialsRuntimeFix() {
  useEffect(() => {
    const sec = document.querySelector<HTMLElement>("#aprovado-por-quem-usa");
    if (!sec) return;

    // Seleção robusta: prioriza data-attrs; fallback para <figure> dentro da sessão
    const pickCards = () =>
      Array.from(
        sec.querySelectorAll<HTMLElement>(
          "[data-testimonial], .card-depoimento, .testi-left, .testi-right, figure"
        )
      ).filter((el) => el.tagName.toLowerCase() === "figure" || el.hasAttribute("data-testimonial"));

    const cards = pickCards();

    // estado inicial seguro (não assume classes da sua animação original)
    cards.forEach((el, i) => {
      el.style.willChange = "transform, opacity, clip-path";
      el.style.opacity = "0";
      el.style.transform = `translateX(${i % 2 === 0 ? "-60px" : "60px"})`;
      el.style.clipPath = "inset(0 100% 0 0 round 16px)";
      el.style.transition =
        "transform .6s cubic-bezier(.22,1,.36,1) .15s, opacity .4s ease-out .15s, clip-path .6s cubic-bezier(.22,1,.36,1) .15s";
      // evita ficar atrás do painel escuro, sem tocar no CSS global
      el.style.position ||= "relative";
      el.style.zIndex ||= "1";
    });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onEnter = () => {
      // anima os dois primeiros cards (ou todos, se houver mais)
      pickCards().forEach((el, i) => {
        // atraso levemente diferente esquerda/direita
        const delay = i % 2 === 0 ? 150 : 280;
        if (reduced) {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.clipPath = "inset(0 0% 0 0 round 16px)";
        } else {
          // usa raf para aplicar atraso respeitando CSS transition
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
            el.style.clipPath = "inset(0 0% 0 0 round 16px)";
          }, delay);
        }
      });
    };

    // dispara ao entrar em viewport (rootMargin ajuda em casos “quase na dobra”)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            onEnter();
            io.disconnect();
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return null;
}
