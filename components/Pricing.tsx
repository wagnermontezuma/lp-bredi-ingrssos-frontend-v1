import React from 'react';
import { CheckCircleIcon } from './icons/FeatureIcons';

const pricingFeatures = [
    "Transparência total para você",
    "Setup único de configuração do evento",
    "Comissão apenas sobre os ingressos vendidos",
    "Sem mensalidade fixa, sem burocracia. Você só paga se vender."
];

const Pricing: React.FC = () => {
    return (
        <section className="py-20 bg-bredi-bg">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                    <span className="font-bold text-bredi-accent uppercase tracking-wider">PLANOS E MODELO DE NEGÓCIO</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-bredi-primary uppercase mt-2 mb-6">Um modelo justo e transparente</h2>
                    <p className="text-lg text-bredi-secondary mb-8">Nosso compromisso é com o seu sucesso. Por isso, criamos um modelo de negócio simples, sem taxas escondidas e sem mensalidades. Você só paga uma pequena comissão sobre os ingressos que vender. Simples assim.</p>
                    <ul className="space-y-4">
                        {pricingFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <CheckCircleIcon />
                                <span className="ml-3 text-bredi-secondary">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:w-1/2 w-full">
                    <div className="bg-white p-10 rounded-xl shadow-2xl text-center border">
                        <h3 className="text-2xl font-bold text-bredi-primary mb-4">Pronto para começar?</h3>
                        <p className="text-bredi-secondary mb-8">Receba uma proposta personalizada para as necessidades do seu evento.</p>
                        <a href="#contact" className="w-full inline-block bg-bredi-accent text-bredi-primary font-bold py-4 px-10 rounded-lg text-lg hover:bg-bredi-primary hover:text-bredi-accent border-2 border-transparent hover:border-bredi-accent transition-all transform hover:scale-105 shadow-lg">
                           Solicite uma proposta
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;