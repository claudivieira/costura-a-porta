import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConsentBanner from "./components/ConsentBanner"


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

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-5WGVCNFS';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        {/* Consent Mode v2 defaults: negar analytics/ads até o utilizador decidir */}
        <Script id="cm-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              ad_storage: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted'
            });
          `}
        </Script>
      </head>
      <body
        className={montserrat.className}
      >
        {children}
        <GoogleTagManager gtmId={GTM_ID} />
        <ConsentBanner />
        <SpeedInsights />
      </body>
    </html>
  );
}
