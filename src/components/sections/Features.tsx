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
      className="
        relative overflow-hidden py-20
        [--bgx:0px] [--bgy:0px] [--p:0]
        bg-white
        before:pointer-events-none before:absolute before:inset-0 before:-z-10
        before:bg-[radial-gradient(800px_300px_at_20%_0%,rgba(250,204,21,0.06),transparent_60%),radial-gradient(700px_280px_at_90%_10%,rgba(250,204,21,0.05),transparent_60%),repeating-linear-gradient(90deg,rgba(0,0,0,0.03)_0,rgba(0,0,0,0.03)_1px,transparent_1px,transparent_120px)]
        before:[background-position:var(--bgx)_var(--bgy),calc(100%-var(--bgx))_calc(10%+var(--bgy)),0_0]
      "
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
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold uppercase text-bredi-primary md:text-4xl">
            Ferramentas que impulsionam seu evento
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-bredi-secondary">
            Recursos extras que fazem da nossa plataforma a escolha certa.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-item flex items-start p-6"
              data-reveal
            >
              <div className="feature-icon mr-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-bredi-accent">
                {feature.icon}
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-bredi-primary">{feature.title}</h3>
                <p className="text-bredi-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FerramentasSectionEnhancer>
  );
};

export default Features;
