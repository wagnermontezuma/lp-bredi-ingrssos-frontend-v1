import React, { useState } from 'react';
import type { LeadFormData } from '../types';

const FinalCTA: React.FC = () => {
    const [formData, setFormData] = useState<LeadFormData>({
        name: '',
        email: '',
        phone: '',
        eventType: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Here you would typically send the data to a backend/CRM
        setSubmitted(true);
    };

    return (
        <section id="contact" className="py-20 bg-bredi-primary text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-4">Chegou a hora de vender seus ingressos com mais eficiência.</h2>
                        <p className="text-xl opacity-80">Preencha o formulário e nossa equipe entrará em contato para criar a solução perfeita para o seu evento.</p>
                    </div>
                    <div>
                        {submitted ? (
                            <div className="bg-white text-bredi-primary p-10 rounded-xl text-center shadow-2xl">
                                 <h3 className="text-2xl font-bold mb-4">Obrigado!</h3>
                                 <p className="text-bredi-secondary">Recebemos suas informações. Em breve, um de nossos especialistas entrará em contato.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white text-bredi-secondary p-8 rounded-xl shadow-2xl space-y-4">
                                <h3 className="text-2xl font-bold text-bredi-primary text-center mb-4">Quero vender com a Bredi Ingressos</h3>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium">Nome</label>
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bredi-accent focus:border-bredi-accent"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bredi-accent focus:border-bredi-accent"/>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium">Telefone</label>
                                    <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bredi-accent focus:border-bredi-accent"/>
                                </div>
                                <div>
                                    <label htmlFor="eventType" className="block text-sm font-medium">Tipo de evento</label>
                                     <input type="text" name="eventType" id="eventType" required value={formData.eventType} onChange={handleChange} placeholder="Ex: Show, Festa, Congresso" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-bredi-accent focus:border-bredi-accent"/>
                                </div>
                                <button type="submit" className="w-full bg-bredi-accent text-bredi-primary font-bold py-3 px-6 rounded-lg hover:bg-bredi-primary hover:text-bredi-accent border-2 border-transparent hover:border-bredi-accent transition-colors text-lg">
                                    Enviar
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;