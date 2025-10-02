"use client";

import { useEffect, useState } from "react";

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
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-bredi-primary text-white md:min-h-[80vh]">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? "opacity-20" : "opacity-0"}`}
          aria-hidden={index !== currentBanner}
        >
          <img src={banner.imageUrl} alt="Evento" loading="lazy" className="h-full w-full object-cover" />
        </div>
      ))}
      <div className="container relative z-10 mx-auto px-6 text-center">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`transition-opacity duration-1000 ${index === currentBanner ? "opacity-100" : "hidden opacity-0"}`}
          >
            <h1 className="mb-4 text-4xl font-extrabold uppercase leading-tight drop-shadow-lg md:text-6xl">
              {banner.title}
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg font-light text-gray-200 drop-shadow-md md:text-2xl">
              {banner.subtitle}
            </p>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
    </section>
  );
};

export default Hero;
