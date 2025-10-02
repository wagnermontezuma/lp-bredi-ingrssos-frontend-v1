import React from 'react';
import { TicketIcon } from './icons/TicketIcon';

const Header: React.FC = () => {
    return (
        <header className="bg-bredi-primary sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="flex items-center space-x-2">
                    <TicketIcon className="h-8 w-8 text-bredi-accent" />
                    <span className="text-2xl font-bold text-white">Bredi Ingressos</span>
                </a>
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#contact" className="text-white hover:text-bredi-accent font-semibold tracking-wider uppercase text-sm transition-colors">Fale com nosso time</a>
                    <a href="#contact" className="bg-bredi-accent text-bredi-primary font-bold py-2 px-6 rounded-lg hover:bg-bredi-primary hover:text-bredi-accent border-2 border-transparent hover:border-bredi-accent transition-all transform hover:scale-105">
                        Comece agora
                    </a>
                </nav>
                <button className="md:hidden text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;