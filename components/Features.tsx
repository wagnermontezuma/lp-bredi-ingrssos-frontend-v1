import React from 'react';
import { QrCodeIcon, ChartBarIcon, ChatBubbleLeftRightIcon, PaintBrushIcon } from './icons/FeatureIcons';

const features = [
    {
        icon: <QrCodeIcon />,
        title: "Check-in rápido com QR Code",
        description: "Agilize a entrada do seu evento com nosso leitor de QR Code integrado."
    },
    {
        icon: <ChartBarIcon />,
        title: "Relatórios detalhados",
        description: "Acompanhe as vendas, o público e outras métricas importantes em tempo real."
    },
    {
        icon: <ChatBubbleLeftRightIcon />,
        title: "Suporte humano e ágil",
        description: "Nossa equipe está pronta para te ajudar a qualquer momento."
    },
    {
        icon: <PaintBrushIcon />,
        title: "Página do evento personalizável",
        description: "Crie uma página com a identidade visual da sua marca para vender seus ingressos."
    }
];

const Features: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-bredi-primary uppercase">Ferramentas que impulsionam seu evento</h2>
                    <p className="text-lg text-bredi-secondary mt-4 max-w-2xl mx-auto">Recursos extras que fazem da nossa plataforma a escolha certa.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start p-6">
                           <div className="flex-shrink-0 mr-6 text-bredi-accent">
                               {feature.icon}
                           </div>
                            <div>
                                <h3 className="text-xl font-bold text-bredi-primary mb-2">{feature.title}</h3>
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