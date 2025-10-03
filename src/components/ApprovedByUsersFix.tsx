"use client";

import { useEffect } from "react";

/**
 * Hotfix de runtime para a sessão #aprovado-por-quem-usa.
 * - Corrige o heading colado (divide em palavras com spans e mantém espaços).
 * - Garante a animação dos 2 cards (E/D) e alinhamento ao centro.
 * - Não altera outras seções nem adiciona libs.
 */
export default function ApprovedByUsersFix() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>("#aprovado-por-quem-usa");
    if (!section) return;

    // ===== 1) TÍTULO: separar por palavras (sem perder espaços) =====
    const h2 = section.querySelector<HTMLHeadingElement>("h2");
    if (h2 && !h2.dataset._fixed) {
      const text = h2.textContent?.trim() ?? "";
      // Se o texto veio colado (ex.: "APROVADOPORQUEMUSA"), recria com espaços corretos
      const normalized = /\s/.test(text) ? text : "APROVADO POR QUEM USA";

      // Monta spans por palavra preservando espaços
      const frag = document.createDocumentFragment();
      normalized.split(" ").forEach((word, i, arr) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.className = "abq-word";
        span.style.display = "inline-block";
        span.style.transform = "translateY(0.6em)";
        span.style.opacity = "0";
        span.style.willChange = "transform,opacity";
        span.style.transition = `transform .5s cubic-bezier(.22,1,.36,1) ${i * 50}ms, opacity .4s ease-out ${i * 50}ms`;
        frag.appendChild(span);
        if (i < arr.length - 1) frag.appendChild(document.createTextNode(" "));
      });
      h2.replaceChildren(frag);
      h2.dataset._fixed = "1";

      // dispara o stagger quando a sessão entra
      const ioTitle = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              h2.querySelectorAll<HTMLElement>(".abq-word").forEach((w) => {
                w.style.transform = "translateY(0)";
                w.style.opacity = "1";
              });
              ioTitle.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      ioTitle.observe(section);
    }

    // ===== 2) CARDS: entrar E/D e ficar centralizados =====
    const pickCards = () =>
      Array.from(section.querySelectorAll<HTMLElement>("figure"))
        // só os dois primeiros dentro da grade de depoimentos
        .slice(0, 2);

    const cards = pickCards();
    if (cards.length) {
      cards.forEach((el, i) => {
        // estado inicial
        el.style.opacity = "0";
        el.style.transform = `translateX(${i === 0 ? "-60px" : "60px"})`;
        el.style.clipPath = "inset(0 100% 0 0 round 16px)";
        el.style.willChange = "transform,opacity,clip-path";
        el.style.transition =
          `transform .6s cubic-bezier(.22,1,.36,1) ${i === 0 ? 150 : 280}ms,` +
          `opacity .45s ease-out ${i === 0 ? 150 : 280}ms,` +
          `clip-path .6s cubic-bezier(.22,1,.36,1) ${i === 0 ? 150 : 280}ms`;
        // garante empilhamento acima do painel escuro
        el.style.position ||= "relative";
        el.style.zIndex ||= "1";

        // **alinhamento ao centro** no desktop, sem mexer na grid existente:
        el.classList.add("md:justify-self-end"); // card 0 aponta ao centro
        if (i === 1) {
          el.classList.remove("md:justify-self-end");
          el.classList.add("md:justify-self-start"); // card 1 aponta ao centro
        }
        el.classList.add("max-w-xl"); // largura contida (igual seu padrão)
      });

      const reduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const onEnter = () => {
        cards.forEach((el) => {
          if (reduced) {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.clipPath = "inset(0 0% 0 0 round 16px)";
          } else {
            requestAnimationFrame(() => {
              el.style.opacity = "1";
              el.style.transform = "translateX(0)";
              el.style.clipPath = "inset(0 0% 0 0 round 16px)";
            });
          }
        });
      };

      const ioCards = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              onEnter();
              ioCards.disconnect();
            }
          });
        },
        { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
      );
      ioCards.observe(section);
    }

    // ===== 3) MÉTRICAS: deixa como está; apenas garante contagem se alguém pausou =====
    // (se você já tem contador, não faz nada aqui)
  }, []);

  return null;
}
