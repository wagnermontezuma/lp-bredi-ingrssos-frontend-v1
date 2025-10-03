import Image from "next/image";
import Link from "next/link";

export function SiteLogo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Bredi Ingressos — ir para a home">
      {/* Dimensões reais do PNG (aprox. 798×313) para evitar CLS;
         reduzimos via Tailwind para caber na barra */}
      <Image
        src="/logo.png"
        alt="Bredi Ingressos"
        width={798}
        height={313}
        priority
        className="
          h-8 w-auto md:h-9 lg:h-10
          object-contain
          select-none
          pointer-events-auto
          drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.45)]
        "
        sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 180px"
      />
      <span className="sr-only">Bredi Ingressos</span>
    </Link>
  );
}

const Header = () => {
  return (
    <header className="bg-bredi-primary sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <SiteLogo />
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
