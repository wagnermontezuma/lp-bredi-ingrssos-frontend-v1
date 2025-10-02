import { ChartBarIcon, ChatBubbleLeftRightIcon, PaintBrushIcon, QrCodeIcon } from "@/components/icons/FeatureIcons";

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
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold uppercase text-bredi-primary md:text-4xl">Ferramentas que impulsionam seu evento</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-bredi-secondary">
            Recursos extras que fazem da nossa plataforma a escolha certa.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start p-6">
              <div className="mr-6 flex-shrink-0 text-bredi-accent">{feature.icon}</div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-bredi-primary">{feature.title}</h3>
                <p className="text-bredi-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
