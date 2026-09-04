import type { Metadata } from "next";
import "./globals.css";
import GlobalEnvironment from "@/components/global-env/GlobalEnvironment";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Alura Cloud — Estúdio de Engenharia Digital",
  description:
    "Projetamos e construímos produtos digitais, sistemas e infraestrutura. Websites, plataformas, SaaS, automações e soluções de engenharia sob medida.",
  keywords: [
    "desenvolvimento web",
    "engenharia digital",
    "sistemas web",
    "Next.js",
    "React",
    "SaaS",
    "infraestrutura digital",
    "Alura Cloud",
  ],
  authors: [{ name: "Alura Cloud" }],
  creator: "Alura Cloud",
  metadataBase: new URL("https://aluracloud.com.br"),
  openGraph: {
    title: "Alura Cloud — Estúdio de Engenharia Digital",
    description:
      "Projetamos e construímos produtos digitais, sistemas e infraestrutura.",
    type: "website",
    locale: "pt_BR",
    siteName: "Alura Cloud",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alura Cloud — Estúdio de Engenharia Digital",
    description:
      "Projetamos e construímos produtos digitais, sistemas e infraestrutura.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <GlobalEnvironment />
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
