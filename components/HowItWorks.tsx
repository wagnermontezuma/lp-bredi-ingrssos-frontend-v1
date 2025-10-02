import React from 'react';
// FIX: Import Variants type from framer-motion to resolve typing issue.
import { motion, Variants } from 'framer-motion';

const steps = [
    {
        number: "1",
        title: "Cadastre seu evento",
        description: "Em minutos, você insere todas as informações do seu evento em nossa plataforma intuitiva."
    },
    {
        number: "2",
        title: "Defina ingressos e preços",
        description: "Crie lotes, tipos de ingressos e defina os valores de acordo com sua estratégia de vendas."
    },
    {
        number: "3",
        title: "Compartilhe e venda",
        description: "Divulgue o link de vendas exclusivo do seu evento e comece a vender online imediatamente."
    },
    {
        number: "4",
        title: "Check-in e Pagamentos",
        description: "Faça o check-in com nosso leitor de QR Code no dia do evento e receba seus pagamentos com segurança."
    }
];

// FIX: Correctly typed the Step component props to resolve a TypeScript error.
// React's `key` prop is special and not part of a component's own props.
// By defining props with an interface and using React.FC, we align with standard practices
// and allow TypeScript to correctly type-check the component.
interface StepProps {
    step: typeof steps[0];
    index: number;
}

const Step: React.FC<StepProps> = ({ step, index }) => {
    // Passo 1 (index 0) e 3 (index 2) vêm da direita
    const comesFromRight = index % 2 === 0;

    // FIX: Explicitly type contentVariants with `Variants` to fix type incompatibility.
    // TypeScript was inferring `ease` as a generic `string`, but framer-motion expects a specific set of easing strings.
    const contentVariants: Variants = {
        hidden: { opacity: 0, x: comesFromRight ? 200 : -200 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <motion.div
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-5xl px-6 ${comesFromRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={contentVariants}
            >
                {/* Neon Number */}
                <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-400 to-yellow-400 p-1 shadow-[0_0_15px_rgba(56,189,248,0.5),0_0_30px_rgba(250,204,21,0.4)]">
                    <div className="w-full h-full rounded-full flex items-center justify-center bg-bredi-primary">
                        <span className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-yellow-400">
                            {step.number}
                        </span>
                    </div>
                </div>
                
                {/* Text Content */}
                <div className={`text-center ${comesFromRight ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-300 max-w-md mx-auto md:mx-0">
                        {step.description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

const HowItWorks: React.FC = () => {
    return (
        <section className="bg-bredi-primary text-white overflow-hidden">
            <div className="container mx-auto px-6 pt-20 pb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold uppercase">Como funciona</h2>
                <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Vender ingressos nunca foi tão simples. Siga os 4 passos:</p>
            </div>
            
            <div className="flex flex-col">
                {steps.map((step, index) => (
                    <Step key={index} step={step} index={index} />
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;