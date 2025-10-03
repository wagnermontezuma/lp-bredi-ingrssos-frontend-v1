"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { QrCode, BarChart3, LayoutTemplate, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type Feature = {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  preview: ReactNode;
};

type FeatureInteractivePanelProps = {
  className?: string;
};

export default function FeatureInteractivePanel({ className }: FeatureInteractivePanelProps) {
  const [active, setActive] = useState<string | null>(null);

  const features = useMemo<Feature[]>(
    () => [
      {
        id: "qr",
        title: "Check-in rápido com QR Code",
        desc: "Agilize a entrada do seu evento com nosso leitor de QR Code integrado.",
        icon: QrCode,
        preview: (
          <Image
            src="/images/previews/qr-checkin.jpg"
            alt="Check-in com QR Code em evento"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
            priority={false}
          />
        ),
      },
      {
        id: "reports",
        title: "Relatórios detalhados",
        desc: "Acompanhe vendas, público e métricas importantes em tempo real.",
        icon: BarChart3,
        preview: (
          <Image
            src="/images/previews/reports-dashboard.jpg"
            alt="Dashboard de relatórios"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        ),
      },
      {
        id: "support",
        title: "Suporte humano e ágil",
        desc: "Nossa equipe está pronta para te ajudar a qualquer momento.",
        icon: Sparkles,
        preview: (
          <Image
            src="/images/previews/support-team.jpg"
            alt="Atendimento humano"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        ),
      },
      {
        id: "pages",
        title: "Página do evento personalizável",
        desc: "Crie páginas com a identidade visual da sua marca para vender ingressos.",
        icon: LayoutTemplate,
        preview: (
          <Image
            src="/images/previews/custom-page.jpg"
            alt="Página personalizada do evento"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        ),
      },
    ],
    []
  );

  const handleActivate = useCallback((id: string | null) => {
    setActive(id);
  }, []);

  const handleToggle = useCallback(
    (id: string) => {
      setActive((current) => (current === id ? null : id));
    },
    []
  );

  const activeFeature = features.find((feature) => feature.id === active) ?? null;

  return (
    <div
      className={cn(
        "relative mx-auto max-w-7xl px-6 md:px-10",
        className
      )}
      role="region"
      aria-label="Ferramentas que impulsionam seu evento"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(520px,560px)_1fr] lg:gap-6">
        <FeatureList
          features={features.slice(0, 2)}
          active={active}
          onActivate={handleActivate}
          onToggle={handleToggle}
          side="left"
          className="order-2 space-y-8 lg:order-1 lg:space-y-10"
        />

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-900 text-slate-100 shadow-2xl ring-1 ring-black/10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_0,rgba(250,204,21,.18),transparent_60%)]" />

            {!activeFeature ? (
              <div className="absolute inset-0 grid place-items-center">
                <Image
                  src="/logo-bredi.svg"
                  alt="Bredi Ingressos"
                  width={180}
                  height={48}
                  className="opacity-90"
                />
              </div>
            ) : (
              <div className="absolute inset-0">
                {activeFeature.preview}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20" />
              </div>
            )}
          </div>
        </div>

        <FeatureList
          features={features.slice(2)}
          active={active}
          onActivate={handleActivate}
          onToggle={handleToggle}
          side="right"
          className="order-3 space-y-8 lg:space-y-10"
        />
      </div>
    </div>
  );
}

type FeatureListProps = {
  features: Feature[];
  active: string | null;
  onActivate: (id: string | null) => void;
  onToggle: (id: string) => void;
  side: "left" | "right";
  className?: string;
};

function FeatureList({ features, active, onActivate, onToggle, side, className }: FeatureListProps) {
  return (
    <ul className={className}>
      {features.map((feature) => (
        <FeatureItem
          key={feature.id}
          data={feature}
          active={active === feature.id}
          onActivate={onActivate}
          onToggle={onToggle}
          side={side}
        />
      ))}
    </ul>
  );
}

type FeatureItemProps = {
  data: Feature;
  active: boolean;
  onActivate: (id: string | null) => void;
  onToggle: (id: string) => void;
  side: "left" | "right";
};

function FeatureItem({ data, active, onActivate, onToggle, side }: FeatureItemProps) {
  const Icon = data.icon;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(data.id);
    }
  };

  return (
    <li data-reveal>
      <button
        type="button"
        className={cn(
          "feature-item group flex w-full items-start gap-4 rounded-xl p-2 text-left transition-colors",
          active ? "bg-yellow-50/60" : "hover:bg-yellow-50/40 focus-visible:bg-yellow-50/50"
        )}
        onMouseEnter={() => onActivate(data.id)}
        onFocus={() => onActivate(data.id)}
        onMouseLeave={() => onActivate(null)}
        onBlur={() => onActivate(null)}
        onClick={() => onToggle(data.id)}
        onKeyDown={handleKeyDown}
        aria-pressed={active}
      >
        <span
          className={cn(
            "feature-icon inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            "bg-yellow-400/20 text-yellow-600 ring-1 ring-yellow-400/50 shadow-sm",
            "transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-focus-visible:-translate-y-0.5 group-focus-visible:scale-[1.03]"
          )}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <div className={cn("max-w-[28rem]", side === "left" ? "text-left" : "text-left")}>
          <h3 className="feature-title text-xl font-semibold text-slate-900 md:text-2xl">{data.title}</h3>
          <p className="feature-desc mt-1 text-slate-600">{data.desc}</p>
        </div>
      </button>
    </li>
  );
}
