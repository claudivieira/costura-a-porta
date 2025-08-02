import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"]
});

export const metadata: Metadata = {
  title: "Costura À Porta - Arranjos de costura ao domicílio no Porto",
  description: "A Costura à Porta oferece um serviço de costura ao domicílio para moradores do Porto e arredores com rotinas exigentes, garantindo conveniência, rapidez e atendimento personalizado diretamente na casa do cliente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={montserrat.className}
      >
        {children}
      </body>
    </html>
  );
}
