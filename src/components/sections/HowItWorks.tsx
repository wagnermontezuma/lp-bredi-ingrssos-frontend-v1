"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const steps = [
  {
    number: "1",
    title: "Cadastre seu evento",
    description: "Em minutos, você insere todas as informações do seu evento em nossa plataforma intuitiva.",
  },
  {
    number: "2",
    title: "Defina ingressos e preços",
    description: "Crie lotes, tipos de ingressos e defina os valores de acordo com sua estratégia de vendas.",
  },
  {
    number: "3",
    title: "Compartilhe e venda",
    description: "Divulgue o link de vendas exclusivo do seu evento e comece a vender online imediatamente.",
  },
  {
    number: "4",
    title: "Check-in e Pagamentos",
    description: "Faça o check-in com nosso leitor de QR Code no dia do evento e receba seus pagamentos com segurança.",
  },
];

interface StepProps {
  step: (typeof steps)[number];
  index: number;
}

const Step = ({ step, index }: StepProps) => {
  const comesFromRight = index % 2 === 0;

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: comesFromRight ? 200 : -200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <motion.div
        className={cn(
          "flex w-full max-w-5xl flex-col items-center gap-8 px-6 md:gap-16",
          comesFromRight ? "md:flex-row" : "md:flex-row-reverse"
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={contentVariants}
      >
        <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-yellow-400 p-1 shadow-[0_0_15px_rgba(56,189,248,0.5),0_0_30px_rgba(250,204,21,0.4)] md:h-48 md:w-48">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-bredi-primary">
            <span className="bg-gradient-to-br from-cyan-400 to-yellow-400 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
              {step.number}
            </span>
          </div>
        </div>

        <div className={`text-center ${comesFromRight ? "md:text-left" : "md:text-right"}`}>
          <h3 className="mb-4 text-3xl font-bold md:text-4xl">{step.title}</h3>
          <p className="mx-auto max-w-md text-lg text-gray-300 md:mx-0">{step.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="overflow-hidden bg-bredi-primary text-white">
      <div className="container mx-auto px-6 pb-10 pt-20 text-center">
        <h2 className="text-3xl font-bold uppercase md:text-4xl">Como funciona</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">Vender ingressos nunca foi tão simples. Siga os 4 passos:</p>
      </div>

      <div className="flex flex-col">
        {steps.map((step, index) => (
          <Step key={step.number} step={step} index={index} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
