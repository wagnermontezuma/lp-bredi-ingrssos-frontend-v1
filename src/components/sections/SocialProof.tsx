const testimonials = [
  {
    quote: "A Bredi Ingressos nos ajudou a vender mais de 3 mil ingressos em tempo recorde. O suporte foi incrível!",
    author: "Produtor de Eventos",
    avatar: "https://picsum.photos/100/100?random=3",
  },
  {
    quote:
      "Conseguimos organizar toda a entrada do nosso congresso sem filas, só com QR Code no celular. Foi um sucesso!",
    author: "Organização Acadêmica",
    avatar: "https://picsum.photos/100/100?random=4",
  },
];

const metrics = [
  { value: "+10 mil", label: "ingressos vendidos" },
  { value: "+200", label: "produtores atendidos" },
  { value: "+50", label: "cidades alcançadas" },
];

const SocialProof = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold uppercase text-bredi-primary md:text-4xl">Aprovado por quem usa</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-bredi-secondary">
            Resultados reais de produtores que confiam em nossa plataforma.
          </p>
        </div>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="rounded-xl bg-gray-100 p-8 shadow-sm">
              <p className="mb-6 text-lg italic text-bredi-secondary">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.author} loading="lazy" className="mr-4 h-12 w-12 rounded-full" />
                <div>
                  <p className="font-bold text-bredi-primary">{testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-xl bg-bredi-primary px-6 py-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-b-2 border-bredi-accent/50 pb-4 last:border-0 md:border-b-0 md:border-r-2 md:pb-0 md:last:border-0"
              >
                <p className="text-4xl font-extrabold text-bredi-accent md:text-5xl">{metric.value}</p>
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
