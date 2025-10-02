import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-bredi-primary text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Bredi Ingressos</h3>
                        <p className="text-gray-300">A solução completa para seus eventos.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-bredi-accent transition-colors">Sobre nós</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-bredi-accent transition-colors">Contato</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-bredi-accent transition-colors">Política de Privacidade</a></li>
                        </ul>
                    </div>
                    <div>
                         <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
                         <div className="flex space-x-4">
                            {/* Replace with actual social links */}
                            <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-bredi-accent"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg></a>
                            <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-bredi-accent"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg></a>
                         </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Bredi Ingressos. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;