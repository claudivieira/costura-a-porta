import Image from "next/image";
import RequestService from "./components/RequestServiceBtn";
import { BsExclamationCircle, BsCheck2Circle } from "react-icons/bs";


export default function Home() {
  return (
    <div>
      <header>
        <div className="mx-auto px-6 lg:px-8 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                  className="items-left h-16 w-auto"
                  src="/logo_deitado_azul_sem-fundo.png"
                  alt="Costura À Porta logo"
                  width={180}
                  height={18}
                  priority
                />
            </div>
              <RequestService />
          </div>
        </div>
      </header>
      <main className="mx-auto">
        <section className="bg-primary">
          HERO
        </section>
        <section className="bg-white text-primary py-15">
          <ul className="px-6 lg:px-8 lg:flex lg:flex-row lg:items-start">
            <li className="textCard">
              <div className="p-3 bg-gray-200 rounded-full flex-shrink-0">
                <BsExclamationCircle size={25} strokeWidth={0.3} />
              </div>
              <div>
                <h2 className="textCardTitle">O PROBLEMA</h2>
                <p>Com rotinas apertadas, encontrar tempo para ajustes de roupa é difícil devido a deslocações e falta de serviços flexíveis e de qualidade.</p>
              </div>
            
            </li>
            <li className="textCard sm:mt-15 lg:mt-0 lg:ml-10">
              <div className="p-3 bg-gray-200 rounded-full flex-shrink-0">
                <BsCheck2Circle size={25} strokeWidth={0.3} />
              </div>
              <div>
                <h2 className="textCardTitle">A SOLUÇÃO</h2>
                <p>Serviço de costura ao domicílio que recolhe, ajusta e entrega as suas peças com rapidez e atendimento personalizado, tudo gerido por uma plataforma digital intuitiva.</p>
              </div>
            </li>
          </ul>
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
