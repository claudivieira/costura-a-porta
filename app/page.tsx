import Image from "next/image";
import RequestService from "./components/RequestServiceBtn";
import { BsExclamationCircle, BsCheck2Circle } from "react-icons/bs";


export default function Home() {
  return (
    <>
      <header className="flex bg-primary justify-between items-center pl-6 pr-6">
        <Image
            className="items-left"
            src="/logo_deitado_azul_com-fundo.jpg"
            alt="Costura À Porta logo"
            width={180}
            height={18}
            priority
          />
          <RequestService />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start bg-background">
        <section>
          HERO
        </section>
        <section className="bg-primary text-background">
          <div>
            <ul className="flex items-center justify-between">
              <li className="m-[20px] pl-[20px] border-l-4 border-l-indigo-500 shadow-2xs">
                <div className="flex items-center">
                  <BsExclamationCircle />
                  <h2 className="ml-2 text-lg font-bold">O PROBLEMA</h2>
                </div>
                <p>Com rotinas apertadas, encontrar tempo para ajustes de roupa é difícil devido a deslocações e falta de serviços flexíveis e de qualidade.</p>
              </li>
              <li className="m-[20px] pl-[20px] border-l-4 border-l-indigo-500 shadow-2xs ">
                <div className="flex items-center">
                  <BsCheck2Circle />
                  <h2 className="ml-2 text-lg font-bold">A SOLUÇÃO</h2>
                </div>
                <p>Serviço de costura ao domicílio que recolhe, ajusta e entrega as suas peças com rapidez e atendimento personalizado, tudo gerido por uma plataforma digital intuitiva.</p>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </>
  );
}
