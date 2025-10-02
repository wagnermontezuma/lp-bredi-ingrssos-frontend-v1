import { CheckCircleIcon } from "@/components/icons/FeatureIcons";

const pricingFeatures = [
  "Transparência total para você",
  "Setup único de configuração do evento",
  "Comissão apenas sobre os ingressos vendidos",
  "Sem mensalidade fixa, sem burocracia. Você só paga se vender.",
];

const Pricing = () => {
  return (
    <section className="bg-bredi-bg py-20">
      <div className="container mx-auto flex flex-col items-center gap-12 px-6 lg:flex-row">
        <div className="lg:w-1/2">
          <span className="font-bold uppercase tracking-wider text-bredi-accent">PLANOS E MODELO DE NEGÓCIO</span>
          <h2 className="mt-2 mb-6 text-3xl font-bold uppercase text-bredi-primary md:text-4xl">
            Um modelo justo e transparente
          </h2>
          <p className="mb-8 text-lg text-bredi-secondary">
            Nosso compromisso é com o seu sucesso. Por isso, criamos um modelo de negócio simples, sem taxas escondidas e sem
            mensalidades. Você só paga uma pequena comissão sobre os ingressos que vender. Simples assim.
          </p>
          <ul className="space-y-4">
            {pricingFeatures.map((feature) => (
              <li key={feature} className="flex items-center">
                <CheckCircleIcon />
                <span className="ml-3 text-bredi-secondary">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="rounded-xl border bg-white p-10 text-center shadow-2xl">
            <h3 className="mb-4 text-2xl font-bold text-bredi-primary">Pronto para começar?</h3>
            <p className="mb-8 text-bredi-secondary">
              Receba uma proposta personalizada para as necessidades do seu evento.
            </p>
            <a
              href="#contact"
              className="inline-block w-full transform rounded-lg border-2 border-transparent bg-bredi-accent px-10 py-4 text-lg font-bold text-bredi-primary shadow-lg transition-all hover:scale-105 hover:border-bredi-accent hover:bg-bredi-primary hover:text-bredi-accent"
            >
              Solicite uma proposta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
