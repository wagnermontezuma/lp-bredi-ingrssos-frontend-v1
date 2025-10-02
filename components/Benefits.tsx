import React from 'react';
import { ClockIcon, CreditCardIcon, ShieldCheckIcon, SparklesIcon, ScaleIcon } from './icons/FeatureIcons';

const benefits = [
    {
        icon: <ClockIcon />,
        title: "Gestão em tempo real",
        description: "Acompanhe suas vendas direto no painel, com dados atualizados instantaneamente."
    },
    {
        icon: <CreditCardIcon />,
        title: "Pagamentos simplificados",
        description: "Aceite Pix, cartão de crédito e boleto de forma fácil e segura para seus clientes."
    },
    {
        icon: <ShieldCheckIcon />,
        title: "Segurança e confiabilidade",
        description: "Ingressos digitais com QR Code exclusivo para evitar fraudes e garantir o acesso."
    },
    {
        icon: <SparklesIcon />,
        title: "Experiência moderna",
        description: "Praticidade para o organizador e para o público, do início ao fim do evento."
    },
    {
        icon: <ScaleIcon />,
        title: "Escalável",
        description: "Nossa plataforma se adapta perfeitamente a eventos pequenos, médios ou grandes."
    }
];

const Benefits: React.FC = () => {
    return (
        <section className="py-20 bg-bredi-bg overflow-hidden">
             <style>
                {`
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
                `}
            </style>
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-5 gap-16 items-center">
                    {/* Left Side: Text Content */}
                    <div className="lg:col-span-2 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-bredi-primary uppercase cursor-animado">Vantagens que fazem a diferença</h2>
                        <p className="text-lg text-bredi-secondary mt-4 max-w-lg mx-auto lg:mx-0">Tudo que você precisa para vender mais e gerenciar seu evento com total controle.</p>
                        <a href="#contact" className="mt-8 inline-block bg-bredi-accent text-bredi-primary font-bold py-3 px-8 rounded-lg hover:bg-bredi-primary hover:text-bredi-accent border-2 border-transparent hover:border-bredi-accent transition-all transform hover:scale-105">
                            Comece agora
                        </a>
                    </div>

                    {/* Right Side: Infinite Carousel */}
                    <div className="relative h-96 w-full lg:col-span-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                       <div className="absolute top-0 left-0 flex items-center h-full animate-scroll gap-x-8">
                            {[...benefits, ...benefits].map((benefit, index) => (
                                <div key={index} className={`w-72 shrink-0 ${index % 2 === 0 ? 'mb-16' : 'mt-16'}`}>
                                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                                        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-bredi-accent text-bredi-primary mb-4">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-bredi-primary mb-2">{benefit.title}</h3>
                                        <p className="text-bredi-secondary text-sm">{benefit.description}</p>
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