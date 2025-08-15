import Image from "next/image";
import RequestService from "./components/RequestServiceBtn";
import { BsExclamationCircle, BsCheck2Circle, BsStars, BsTelephone, BsEnvelope, BsGeoAlt } from "react-icons/bs";
import IconCardComponent from "./components/IconCardComponent";
import Testimonials from "./components/Testimonials";
import { GoogleTagManager } from '@next/third-parties/google';
import * as BsIcons from 'react-icons/bs';

type Benefit = {
  icon: keyof typeof BsIcons;
  title: string;
  subtitle: string;
};

type Work = {
  icon: keyof typeof BsIcons;
  title: string;
  subtitle: string;
  number: string;
  color: string;
};

const benefits: Benefit[] = [
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

const howItWorks: Work[] = [
  {
    number: "01",
    color: "#1A425F",
    icon:"BsChat",
    title: "Contacte-nos",
    subtitle: "Contacte-nos pelo WhatsApp para agendar a recolha ou entrega da peça no atelier."
  },
  {
    number: "02",
    color: "#efd9c6",
    icon:"BsGear",
    title: "Realizamos o Ajuste",
    subtitle: "Realizamos o ajuste com atualizações regulares sobre o estado da peça."
  },
  {
    number: "03",
    color: "#F2C45A",
    icon:"BsBox",
    title: "Entregamos",
    subtitle: "Entregamos a peça ajustada na sua casa ou no atelier, conforme preferir."
  },
]

const testimonials = [
  {
    name: "Maria G.",
    testimonial: "Só para dizer que adorei o serviço e gostei muito do cuidado da entrega com os tecidos excedentes 🙏🏻"
  },
  {
    name: "Cátia R.",
    testimonial: "Mega feliz 🥰 As calças ficaram bem já experimentei também"
  }
]

export default function Home() {
  return (
    <>
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
              <RequestService extraStyles="border-primary text-primary text-sm" placement='header' />
          </div>
        </div>
      </header>
      <main className="mx-auto">
        <section className="relative min-h-screen flex items-center bg-primary overflow-hidden py-15 bg-(image:--gradient-hero)">
          <div className="absolute inset-0">
            <Image
              className="w-full h-full object-cover opacity-20"
              src="/roman-spiridonov-qI9H5nyhrV8-unsplash.jpg"
              alt="Costura"
              width={4000}
              height={2000}
              priority
            />
            <div className="absolute inset-0 opacity-80 bg-gradient-hero"></div>
          </div>
          <div className="relative z-10 container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-wide uppercase">
                Costura À Porta
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-light">
                Costura ao Domicílio no Porto e Arredores
              </h2> 
              <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Ajustes rápidos, personalizados e sem deslocações. Conveniência e qualidade diretamente na sua casa.
              </p>
              <RequestService extraStyles="border-secondary text-primary bg-secondary p-6 px-8 text-lg font-semibold shadow-warm transform transition-transform duration-300 hover:scale-105 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary motion-reduce:transition-none motion-reduce:transform-none" placement="hero" />
            </div>
          </div>
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
            <li className="textCard mt-15 lg:mt-0 lg:ml-15 hover:bg-gradient-to-br from-white to-secondary-warmer">
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
                className="bg-white mt-8 p-8 hover:bg-gradient-to-br from-white to-secondary-warmer grid place-items-center"
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
        <section className="py-15 px-6 lg:px-8 text-center">
          <div className="my-10">
          <h1 className="text-3xl font-bold uppercase">
              Como Funciona
          </h1>

          <h3 className="mt-4 text-xl text-primary-lighter">
            Um processo simples em três passos para ter as suas roupas perfeitas
          </h3>
          </div>
          <div className="grid lg:grid-cols-3 lg:gap-6">
            {howItWorks && howItWorks.map((work, index) => {
              return (
                <div 
                  key={index}
                  className="bg-white mt-8 p-8 relative grid place-items-center"
                >
                  <IconCardComponent 
                    number={work.number}
                    color={work.color}
                    iconName={work.icon} 
                    title={work.title}
                    subtitle={work.subtitle}
                  />
                </div>
              )
            })}
          </div>
        </section>
        <section className="py-15 px-6 lg:px-8 text-center bg-gradient-to-br from-white to-secondary-warmer grid lg:grid-cols-2 lg:gap-6">
          {testimonials && testimonials.map((testimonial, index) => {
            return (
              <div key={index}>
                <Testimonials name={testimonial.name} testimonial={testimonial.testimonial} />
              </div>
            )
          })}
        </section>
      </main>
      <footer className="flex flex-col py-15 pt-20 flex-wrap bg-primary px-6 lg:px-8 text-white">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-gray-200/20 rounded-full">
          <BsStars size={50} strokeWidth={0.3} />
          </div>
          <div className="mt-8">
            <h1 className="text-4xl font-bold">PRONTO PARA TER AS SUAS ROUPAS PERFEITAS SEM SAIR DE CASA?</h1>
            <h2 className="text-xl my-8 text-white/80">Transformar roupa é transformar como se sente. Cada ponto é pensado com carinho.</h2>
            <RequestService extraStyles="border-secondary text-primary bg-secondary p-6 px-16 text-lg font-semibold shadow-warm transform transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary motion-reduce:transition-none motion-reduce:transform-none" placement="footer" />
            <p className="text-white/70 block my-8">Feito à medida de quem veste histórias</p>
          </div>
        </div>
        
        <div className="mt-16 md:flex md:gap-14">
          <div className="md:flex md:flex-col md:1/3">
            <Image
              className="items-left h-12 w-auto md:w-24"
              src="/logo_deitado_branco_sem-fundo.png"
              alt="Costura À Porta logo"
              width={180}
              height={18}
              priority
            />
            <p className="text-white/70 block my-2 text-base">Cada ponto é pensado com carinho para transformar como se sente.</p>
          </div>
          <div className="py-10 md:pt-0 md:flex-nowrap md:flex-1/3">
            <h3 className="uppercase text-xl font-bold mb-5">Contacto</h3>
            <div className="flex gap-3 text-base">
              <BsTelephone size={18} strokeWidth={0.3} className="text-secondary/60" /> 
              <a 
                className="text-md"
                href="https://wa.me/351928253235"
                target="_blank"
                rel="noopener noreferrer">
                  +351 928 253 235
              </a>
            </div>
            <div className="flex gap-3 mt-2">
              <BsEnvelope size={18} strokeWidth={0.3} className="text-secondary/60" /> 
              <a 
                className="text-base"
                href="mailto:geral@costuraaporta.pt"
                target="_blank"
                rel="noopener noreferrer">
                  geral@costuraaporta.pt
              </a>
            </div>
            <div className="flex gap-3 mt-2">
              <BsGeoAlt size={18} strokeWidth={0.3} className="text-secondary/60" /> 
              <p className="text-base">Porto e Arredores</p> 
            </div>
          </div>
          <div className="pb-10 md:flex-nowrap md:flex-1/3">
            <h3 className="uppercase text-xl font-bold mb-5">Serviços</h3>
            <div>
              <ul className="list-disc px-3 marker:text-xs">
                <li className="text-base">Ajustes de vestuário</li>
                <li className="text-base">Transformações</li>
                <li className="text-base">Costura personalizada</li>
                <li className="text-base">Serviço ao domicílio</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
            <hr className="text-white/20 py-3" />
            <p className="text-white/60 text-sm text-center">© 2025 Costura à Porta. Todos os direitos reservados.</p>
          </div>
      </footer>
      <GoogleTagManager gtmId="GTM-5WGVCNFS" />
    </>
  );
}
