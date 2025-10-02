import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bredi Ingressos | Venda Ingressos Online",
  description:
    "A solução completa para produtores de eventos que querem vender mais, sem complicação e com total segurança.",
  openGraph: {
    title: "Bredi Ingressos | Venda Ingressos Online",
    description:
      "A solução completa para produtores de eventos que querem vender mais, sem complicação e com total segurança.",
    type: "website",
    images: [
      {
        url: "https://picsum.photos/1200/630?grayscale&blur=2",
        width: 1200,
        height: 630,
        alt: "Evento com iluminação dramática",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bredi Ingressos | Venda Ingressos Online",
    description:
      "A solução completa para produtores de eventos que querem vender mais, sem complicação e com total segurança.",
    images: ["https://picsum.photos/1200/630?grayscale&blur=2"],
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={cn("font-sans min-h-screen bg-bredi-bg text-bredi-neutral antialiased", montserrat.variable)}>
        {children}
      </body>
    </html>
  );
}
