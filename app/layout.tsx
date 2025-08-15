import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from "@vercel/speed-insights/next";


const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Costura À Porta - Arranjos de costura ao domicílio no Porto",
  description: "A Costura à Porta oferece um serviço de costura ao domicílio para moradores do Porto e arredores com rotinas exigentes, garantindo conveniência, rapidez e atendimento personalizado diretamente na casa do cliente.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5WGVCNFS" />
      <body
        className={montserrat.className}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
