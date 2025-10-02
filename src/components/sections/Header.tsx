import { TicketIcon } from "@/components/icons/TicketIcon";

const Header = () => {
  return (
    <header className="bg-bredi-primary sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center space-x-2">
          <TicketIcon className="h-8 w-8 text-bredi-accent" />
          <span className="text-2xl font-bold text-white">Bredi Ingressos</span>
        </a>
        <nav className="hidden items-center space-x-6 md:flex">
          <a
            href="#contact"
            className="text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:text-bredi-accent"
          >
            Fale com nosso time
          </a>
          <a
            href="#contact"
            className="transform rounded-lg border-2 border-transparent bg-bredi-accent px-6 py-2 text-sm font-bold uppercase text-bredi-primary transition-all hover:scale-105 hover:border-bredi-accent hover:bg-bredi-primary hover:text-bredi-accent"
          >
            Comece agora
          </a>
        </nav>
        <button type="button" className="text-white md:hidden" aria-label="Abrir menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
