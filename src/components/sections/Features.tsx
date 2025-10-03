"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { ChartBarIcon, ChatBubbleLeftRightIcon, PaintBrushIcon, QrCodeIcon } from "@/components/icons/FeatureIcons";

function FerramentasSectionEnhancer({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sec.classList.add("is-in");
            if (reduced) {
              sec.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
                el.style.opacity = "1";
                el.style.transform = "none";
              });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(sec);

    if (reduced) {
      return () => io.disconnect();
    }

    let raf = 0;
    const items = Array.from(sec.querySelectorAll<HTMLElement>("[data-reveal]"));

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const raw = 1 - Math.min(Math.max((rect.bottom - 120) / (vh + rect.height), 0), 1);
        const progress = Math.min(Math.max(raw, 0), 1);

        sec.style.setProperty("--p", String(progress));

        items.forEach((el, index) => {
          const delay = index * 0.08;
          const local = Math.min(Math.max((progress - delay) / (1 - delay), 0), 1);
          const translateY = (1 - local) * 24;
          const opacity = local;
          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${translateY}px)`;
        });

        const bgX = (progress * 80).toFixed(1);
        const bgY = (progress * -40).toFixed(1);
        sec.style.setProperty("--bgx", `${bgX}px`);
        sec.style.setProperty("--bgy", `${bgY}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (event: MouseEvent) => {
      const bounds = sec.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      sec.style.setProperty("--mx", (x * 5).toFixed(2));
      sec.style.setProperty("--my", (y * 5).toFixed(2));
    };

    sec.addEventListener("pointermove", onMove);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      sec.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ferramentas"
      className="relative overflow-hidden bg-white"
    >
      {children}
    </section>
  );
}

const features = [
  {
    icon: <QrCodeIcon />,
    title: "Check-in rápido com QR Code",
    description: "Agilize a entrada do seu evento com nosso leitor de QR Code integrado.",
  },
  {
    icon: <ChartBarIcon />,
    title: "Relatórios detalhados",
    description: "Acompanhe as vendas, o público e outras métricas importantes em tempo real.",
  },
  {
    icon: <ChatBubbleLeftRightIcon />,
    title: "Suporte humano e ágil",
    description: "Nossa equipe está pronta para te ajudar a qualquer momento.",
  },
  {
    icon: <PaintBrushIcon />,
    title: "Página do evento personalizável",
    description: "Crie uma página com a identidade visual da sua marca para vender seus ingressos.",
  },
];

const Features = () => {
  return (
    <FerramentasSectionEnhancer>
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 lg:py-24">
        <h2 className="ft-heading text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
          FERRAMENTAS QUE IMPULSIONAM SEU EVENTO
        </h2>
        <p className="mt-2 text-center text-slate-600 sm:text-lg">
          Recursos extras que fazem da nossa plataforma a escolha certa.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="feature-item flex items-start gap-4" data-reveal>
              <span className="feature-icon">{feature.icon}</span>
              <div>
                <h3 className="feature-title font-semibold text-xl md:text-2xl">{feature.title}</h3>
                <p className="feature-desc mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FerramentasSectionEnhancer>
  );
};

export default Features;
