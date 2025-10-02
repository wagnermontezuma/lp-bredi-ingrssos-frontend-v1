import React from 'react';

const testimonials = [
    {
        quote: "A Bredi Ingressos nos ajudou a vender mais de 3 mil ingressos em tempo recorde. O suporte foi incrível!",
        author: "Produtor de Eventos",
        avatar: "https://picsum.photos/100/100?random=3"
    },
    {
        quote: "Conseguimos organizar toda a entrada do nosso congresso sem filas, só com QR Code no celular. Foi um sucesso!",
        author: "Organização Acadêmica",
        avatar: "https://picsum.photos/100/100?random=4"
    }
];

const metrics = [
    { value: "+10 mil", label: "ingressos vendidos" },
    { value: "+200", label: "produtores atendidos" },
    { value: "+50", label: "cidades alcançadas" }
];

const SocialProof: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-bredi-primary uppercase">Aprovado por quem usa</h2>
                    <p className="text-lg text-bredi-secondary mt-4 max-w-2xl mx-auto">Resultados reais de produtores que confiam em nossa plataforma.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-100 p-8 rounded-xl shadow-sm">
                            <p className="text-lg text-bredi-secondary italic mb-6">"{testimonial.quote}"</p>
                            <div className="flex items-center">
                                <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4"/>
                                <div>
                                    <p className="font-bold text-bredi-primary">{testimonial.author}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-16 bg-bredi-primary text-white py-12 px-6 rounded-xl shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {metrics.map((metric, index) => (
                            <div key={index} className="border-b-2 md:border-b-0 md:border-r-2 border-bredi-accent/50 last:border-0 pb-4 md:pb-0">
                                <p className="text-4xl md:text-5xl font-extrabold text-bredi-accent">{metric.value}</p>
                                <p className="text-lg opacity-90">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;