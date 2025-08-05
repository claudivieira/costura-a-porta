import Image from "next/image";
import RequestService from "./components/RequestServiceBtn";
import { BsExclamationCircle, BsCheck2Circle } from "react-icons/bs";
import IconCardComponent from "./components/IconCardComponent";
import Testimonials from "./components/Testimonials";

const benefits = [
  {
    icon:"BsClock",
    title: "Poupa Tempo e Esforço",
    subtitle: "Elimina deslocações desnecessárias"
  },
  {
    icon:"BsAward",
    title: "Ajustes de Alta Qualidade",
    subtitle: "Recebe ajustes rápidos adaptados às suas necessidades"
  },
  {
    icon:"BsPeople",
    title: "Atendimento Personalizado",
    subtitle: "Comunicação direta e com humanos reais"
  },
  {
    icon:"BsShield",
    title: "Segurança e Qualidade",
    subtitle: "Controlo rigoroso de qualidade e sistema de avaliação"
  },
  {
    icon:"BsGift",
    title: "Vantagens Exclusivas",
    subtitle: "Programas de fidelização e serviços complementares"
  },
  {
    icon:"BsLightning",
    title: "Entregas Mínimas em 24 Horas",
    subtitle: "Rapidez garantida para que tenha as suas peças prontas no menor tempo possível"
  },
]

const testimonials = [
  {
    name: "Maria G.",
    testimonial: "Só para dizer que adorei o serviço e gostei muito do cuidado da entrega com os tecidos excedentes 🙏🏻"
  },
  {
    name: "Cátia R.",
    testimonial: "Mega feliz 🥰 As calças ficaram bem já experimentei também eheheh"
  }
]

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
        <section className="py-15">
          <ul className="px-6 lg:px-8 lg:flex lg:flex-row lg:items-start">
            <li className="textCard">
              <div className="p-3 bg-gray-200 rounded-full flex-shrink-0">
                <BsExclamationCircle size={25} strokeWidth={0.3} />
              </div>
              <div>
                <h2 className="textCardTitle">O PROBLEMA</h2>
                <p className="ml-2">Com rotinas apertadas, encontrar tempo para ajustes de roupa é difícil devido a deslocações e falta de serviços flexíveis e de qualidade.</p>
              </div>
            
            </li>
            <li className="textCard sm:mt-15 lg:mt-0 lg:ml-10 hover:bg-gradient-to-br from-white to-secondary-warmer">
              <div className="p-3 bg-gray-200 rounded-full flex-shrink-0">
                <BsCheck2Circle size={25} strokeWidth={0.3} />
              </div>
              <div>
                <h2 className="textCardTitle">A SOLUÇÃO</h2>
                <p className="ml-2">Serviço de costura ao domicílio que recolhe, ajusta e entrega as suas peças com rapidez e atendimento personalizado, tudo gerido por uma plataforma digital intuitiva.</p>
              </div>
            </li>
          </ul>
        </section>
        <section className="py-15 px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold">
            PORQUÊ ESCOLHER-NOS
          </h1>

          <h2 className="text-2xl font-semibold mt-4">
          A melhor experiência em ajustes de roupa
          </h2>

          <h3 className="mt-4 text-xl text-primary-lighter">
          Cada ponto é pensado com carinho para transformar a sua experiência
          </h3>
          <div className="grid lg:grid-cols-3 lg:gap-6">
          {benefits && benefits.map((benefit, index) => {
            return (
              <div 
                key={index}
                className="bg-white mt-8 p-[30px] justify-items-center hover:bg-gradient-to-br from-white to-secondary-warmer"
              >
                <IconCardComponent 
                  iconName={benefit.icon} 
                  title={benefit.title}
                  subtitle={benefit.subtitle}
                />
              </div>
            )
          } )}
          </div>
        </section>
        <section className="py-15 px-6 lg:px-8 text-center bg-gradient-to-br from-white to-secondary-warmer">
          {testimonials && testimonials.map((testimonial, index) => {
            return (
              <div key={index}>
                <Testimonials name={testimonial.name} testimonial={testimonial.testimonial} />
              </div>
            )
          })}
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
