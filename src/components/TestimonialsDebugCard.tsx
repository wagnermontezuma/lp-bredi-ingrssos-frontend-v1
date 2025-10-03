"use client";

import * as React from "react";

// Ajuste aqui os seletores que a sua sessão usa para os cards:
const SELECTORS = [
  ".card-depoimento", // ex. usado nos patches anteriores
  ".testi-left",
  ".testi-right",
  "[data-testimonial]",
  "figure[data-reveal]", // genérico se você usa data-reveal
  "section#aprovado-por-quem-usa figure"
];

type InspectResult = {
  index: number;
  selector: string;
  found: number;
  reasons: string[];
  rect?: DOMRect;
};

export default function TestimonialsDebugCard() {
  const [results, setResults] = React.useState<InspectResult[]>([]);
  const [forceVisible, setForceVisible] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  // monta/desmonta observadores sem tocar na sessão
  React.useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const sec = document.querySelector<HTMLElement>("#aprovado-por-quem-usa");
    if (!sec) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setInView(e.isIntersecting));
      },
      { threshold: 0.35 }
    );
    io.observe(sec);

    const run = () => {
      const list: InspectResult[] = [];
      for (const selector of SELECTORS) {
        const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
        let reasons: string[] = [];
        els.forEach((el, i) => {
          const cs = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          // motivos comuns de “sumir”
          if (cs.display === "none") reasons.push(`display:none (${selector} [${i}])`);
          if (cs.visibility === "hidden") reasons.push(`visibility:hidden (${selector} [${i}])`);
          if (parseFloat(cs.opacity) < 0.05) reasons.push(`opacity≈0 (${selector} [${i}])`);
          if (cs.clipPath && cs.clipPath !== "none") {
            // se clip-path cobre 100% horizontalmente, é suspeito
            reasons.push(`clip-path:${cs.clipPath}`);
          }
          if (/matrix.*\(.*\)/.test(cs.transform)) {
            // apenas informativo
            reasons.push(`transform ativo (${selector} [${i}])`);
          }
          if (rect.width < 8 || rect.height < 8)
            reasons.push(`dimensões pequenas: ${Math.round(rect.width)}x${Math.round(rect.height)} (${selector} [${i}])`);
          // checa sobreposição por z-index através do ponto central do elemento
          const cx = Math.round(rect.left + rect.width / 2);
          const cy = Math.round(rect.top + rect.height / 2);
          if (rect.width > 0 && rect.height > 0) {
            const topEl = document.elementFromPoint(cx, cy);
            if (topEl && !el.contains(topEl) && topEl !== el) {
              reasons.push(`possível sobreposição por ${describeEl(topEl)}`);
            }
          }
          list.push({ index: i, selector, found: els.length, reasons, rect });
        });
        if (els.length === 0) list.push({ index: -1, selector, found: 0, reasons: ["Nenhum elemento encontrado"] });
      }
      setResults(list);
    };

    run();
    const mo = new MutationObserver(run);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true });

    window.addEventListener("resize", run, { passive: true });
    window.addEventListener("scroll", run, { passive: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", run);
      window.removeEventListener("scroll", run);
    };
  }, []);

  // força visualização sem alterar a sessão (apenas styling inline temporário)
  React.useEffect(() => {
    SELECTORS.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (forceVisible) {
          el.dataset._debugForced = "1";
          el.style.setProperty("opacity", "1", "important");
          el.style.setProperty("transform", "none", "important");
          el.style.setProperty("clip-path", "none", "important");
          el.style.setProperty("visibility", "visible", "important");
        } else if (el.dataset._debugForced) {
          // limpa só o que foi setado por nós
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
          el.style.removeProperty("clip-path");
          el.style.removeProperty("visibility");
          delete el.dataset._debugForced;
        }
      });
    });
  }, [forceVisible]);

  return (
    <div
      className="
        fixed bottom-4 right-4 z-[1000] w-[340px] max-h-[70vh] overflow-auto
        rounded-xl bg-white/95 shadow-xl ring-1 ring-black/10 backdrop-blur
        text-sm"
      style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system" }}
    >
      <div className="flex items-center justify-between p-3 border-b border-slate-200">
        <div className="font-semibold">Debug: Testimonials</div>
        <span
          className={`text-xs px-2 py-0.5 rounded ${inView ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
        >
          {inView ? "em viewport" : "fora da viewport"}
        </span>
      </div>

      <div className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-slate-600">prefers-reduced-motion:</div>
          <div className="text-slate-900 font-medium">{String(reduced)}</div>
        </div>

        <button
          onClick={() => setForceVisible((v) => !v)}
          className="w-full rounded-md bg-yellow-400 px-3 py-2 text-slate-900 font-semibold shadow hover:bg-yellow-300"
        >
          {forceVisible ? "Desativar força visível" : "Forçar visível (teste)"}
        </button>

        <div className="text-xs text-slate-500">Seletores verificados:</div>
        <ul className="space-y-2">
          {results.map((r, i) => (
            <li key={i} className="rounded border border-slate-200 p-2">
              <div className="font-mono text-[11px] break-all text-slate-700">{r.selector}</div>
              <div className="mt-1 text-slate-700">
                encontrados: <strong>{r.found}</strong>
              </div>
              {!!r.reasons.length && (
                <ul className="mt-1 list-disc pl-4 text-slate-600">
                  {r.reasons.map((msg, k) => (
                    <li key={k}>{msg}</li>
                  ))}
                </ul>
              )}
              {r.rect && (
                <div className="mt-1 text-slate-600">
                  rect: {Math.round(r.rect.x)}x{Math.round(r.rect.y)} — {Math.round(r.rect.width)}×{Math.round(r.rect.height)}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function describeEl(el: Element) {
  const t = el.tagName.toLowerCase();
  const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
  const cls = (el as HTMLElement).className?.toString().split(" ").slice(0, 2).join(".");
  return `${t}${id}${cls ? "." + cls : ""}`;
}
