import { ClockIcon, CreditCardIcon, ScaleIcon, ShieldCheckIcon, SparklesIcon } from "@/components/icons/FeatureIcons";

const benefits = [
  {
    icon: <ClockIcon />,
    title: "Gestão em tempo real",
    description: "Acompanhe suas vendas direto no painel, com dados atualizados instantaneamente.",
  },
  {
    icon: <CreditCardIcon />,
    title: "Pagamentos simplificados",
    description: "Aceite Pix, cartão de crédito e boleto de forma fácil e segura para seus clientes.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Segurança e confiabilidade",
    description: "Ingressos digitais com QR Code exclusivo para evitar fraudes e garantir o acesso.",
  },
  {
    icon: <SparklesIcon />,
    title: "Experiência moderna",
    description: "Praticidade para o organizador e para o público, do início ao fim do evento.",
  },
  {
    icon: <ScaleIcon />,
    title: "Escalável",
    description: "Nossa plataforma se adapta perfeitamente a eventos pequenos, médios ou grandes.",
  },
];

const Benefits = () => {
  return (
    <section className="overflow-hidden bg-bredi-bg py-20">
      <style>{`
        @keyframes scroll {
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-5">
          <div className="text-center lg:col-span-2 lg:text-left">
            <h2 className="cursor-animado text-3xl font-bold uppercase text-bredi-primary md:text-4xl">
              Vantagens que fazem a diferença
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-bredi-secondary lg:mx-0">
              Tudo que você precisa para vender mais e gerenciar seu evento com total controle.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-block transform rounded-lg border-2 border-transparent bg-bredi-accent px-8 py-3 font-bold text-bredi-primary transition-all hover:scale-105 hover:border-bredi-accent hover:bg-bredi-primary hover:text-bredi-accent"
            >
              Comece agora
            </a>
          </div>

          <div className="relative h-96 w-full overflow-hidden lg:col-span-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="absolute top-0 left-0 flex h-full items-center gap-x-8 animate-scroll">
              {[...benefits, ...benefits].map((benefit, index) => (
                <div key={index} className={`w-72 shrink-0 ${index % 2 === 0 ? "mb-16" : "mt-16"}`}>
                  <div className="flex flex-col rounded-2xl bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="mb-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-bredi-accent text-bredi-primary">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-bredi-primary">{benefit.title}</h3>
                    <p className="text-sm text-bredi-secondary">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
