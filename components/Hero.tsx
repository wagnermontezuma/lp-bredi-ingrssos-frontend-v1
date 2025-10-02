import React, { useState, useEffect } from 'react';

const banners = [
    {
        title: "Venda ingressos online de forma rápida, segura e profissional.",
        subtitle: "A Bredi Ingressos é a solução completa para produtores de eventos que querem vender mais, sem complicação e com total segurança.",
        imageUrl: "https://picsum.photos/1920/1080?random=1"
    },
    {
        title: "Receba em sua conta na hora... sem intermediário.",
        subtitle: "Você faz a gestão do seu dinheiro!",
        imageUrl: "https://picsum.photos/1920/1080?random=2"
    }
];

const Hero: React.FC = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative bg-bredi-primary text-white min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
            {banners.map((banner, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-20' : 'opacity-0'}`}>
                    <img src={banner.imageUrl} alt="Evento" className="w-full h-full object-cover"/>
                </div>
            ))}
            <div className="relative z-10 container mx-auto px-6 text-center">
                 {banners.map((banner, index) => (
                     <div key={index} className={`transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0 hidden'}`}>
                        <h1 className="text-4xl md:text-6xl font-extrabold uppercase leading-tight mb-4 drop-shadow-lg">
                           {banner.title}
                        </h1>
                        <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto font-light drop-shadow-md text-gray-200">
                            {banner.subtitle}
                        </p>
                     </div>
                 ))}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href="#contact" className="w-full sm:w-auto bg-bredi-accent text-bredi-primary font-bold py-4 px-10 rounded-lg text-lg hover:bg-bredi-primary hover:text-bredi-accent border-2 border-transparent hover:border-bredi-accent transition-all transform hover:scale-105 shadow-lg">
                        Comece agora
                    </a>
                    <a href="#contact" className="w-full sm:w-auto bg-transparent border-2 border-bredi-accent text-bredi-accent font-bold py-4 px-10 rounded-lg text-lg hover:bg-bredi-accent hover:text-bredi-primary transition-all transform hover:scale-105">
                        Fale com nosso time
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;