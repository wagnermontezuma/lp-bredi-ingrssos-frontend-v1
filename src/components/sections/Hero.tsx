"use client";

import { useEffect, useState } from "react";

import HeroScrollGate from "@/components/HeroScrollGate";

const banners = [
  {
    title: "Venda ingressos online de forma rápida, segura e profissional.",
    subtitle:
      "A Bredi Ingressos é a solução completa para produtores de eventos que querem vender mais, sem complicação e com total segurança.",
    imageUrl: "https://picsum.photos/1920/1080?random=1",
  },
  {
    title: "Receba em sua conta na hora... sem intermediário.",
    subtitle: "Você faz a gestão do seu dinheiro!",
    imageUrl: "https://picsum.photos/1920/1080?random=2",
  },
];

const Hero = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <HeroScrollGate
      childrenTop={
        <div>
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`transition-opacity duration-1000 ${
                index === currentBanner ? "opacity-100" : "hidden opacity-0"
              }`}
            >
              <h1 className="text-4xl font-extrabold uppercase leading-tight drop-shadow-lg md:text-6xl">
                {banner.title}
              </h1>
            </div>
          ))}
        </div>
      }
      childrenBottom={
        <div className="flex flex-col items-center">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`transition-opacity duration-1000 ${
                index === currentBanner ? "opacity-100" : "hidden opacity-0"
              }`}
            >
              <p className="mx-auto max-w-3xl text-lg font-light text-gray-200 drop-shadow-md md:text-2xl">
                {banner.subtitle}
              </p>
            </div>
          ))}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <a
              href="#contact"
              className="w-full transform rounded-lg border-2 border-transparent bg-bredi-accent px-10 py-4 text-lg font-bold text-bredi-primary shadow-lg transition-all hover:scale-105 hover:border-bredi-accent hover:bg-bredi-primary hover:text-bredi-accent sm:w-auto"
            >
              Comece agora
            </a>
            <a
              href="#contact"
              className="w-full transform rounded-lg border-2 border-bredi-accent px-10 py-4 text-lg font-bold text-bredi-accent transition-all hover:scale-105 hover:bg-bredi-accent hover:text-bredi-primary sm:w-auto"
            >
              Fale com nosso time
            </a>
          </div>
        </div>
      }
    />
  );
};

export default Hero;
