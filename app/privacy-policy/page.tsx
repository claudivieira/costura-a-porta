import Link from "next/link";
import { BsArrowLeftCircleFill } from "react-icons/bs";

export default async function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-6 py-16 lg:px-8 max-w-4xl">
        <Link href="/" className="flex items-center gap-1">
            <BsArrowLeftCircleFill /> Voltar
        </Link>
        <section className="m-4">
        <h1 className="font-bold">Política de Privacidade</h1>
            
        <div className="m-8 text-base">
            <p className="my-4 underline">
                <strong>
                    Por favor, leia o texto que se segue, para compreender e ter conhecimento da forma como as informações que disponibilizar serão tratadas pela profissional Cláudia Vieira. A profissional em apreço reserva-se ao direito de alterar a presente Política de Privacidade, pelo que se aconselha a leitura regular deste documento.
                </strong>
            </p>

            <p className="mb-2">
                Esta política de Cookies é parte integrante da Política de Privacidade do website da profissional melhor identificada.
                O acesso e navegação na presente página ou o uso dos seus serviços, implica a aceitação dos termos e condições contidos na política de privacidade.
            </p>
            <ol className="list-decimal">
                <li className="mb-2">
                    Os cookies são pequenos arquivos transferidos para o disco rígido do seu computador através do navegador da Web e que permite aos sites ou provedores de serviços reconhecer o seu browser, capturem e memorizem determinadas informações com a finalidade de melhorar a experiência.
                </li>
                <li className="mb-2">
                    A utilização dos cookies visa o aumento da eficiência, permitindo aos proprietários dos sites informação útil para a melhoria e aperfeiçoamento dos serviços prestados e do site.
                </li>
                <li className="mb-2">
                    Utilizar a tecnologia de cookies para contar as visitas às páginas, permite a análise da utilização dos sites de forma mais precisa.
                </li>
                <li className="mb-2">
                    Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar completamente a funcionalidade e os recursos que eles adicionam a esta página.
                </li>
                <li className="mb-2">
                    É recomendável que deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados para fornecer um serviço que está ou vai usar.
                </li>
                <li className="mb-2">
                    Se desativar os cookies, poderá não conseguir aceder a algumas das funcionalidades disponibilizadas pelo site.
                </li>
                <li className="mb-2">
                    A presente página oferece facilidades de comércio eletrónico ou pagamento e alguns cookies são essenciais para garantir que o seu pedido seja lembrado entre páginas, para que possamos processá-lo adequadamente.
                </li>
                <li className="mb-2">
                    Em casos especiais, usamos cookies fornecidos por terceiros confiáveis. Este site usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis da Web, para nos ajudar a entender como o cliente usa o site e como podemos melhorar a sua experiência. Esses cookies podem rastrear itens, como por exemplo, quanto tempo gasta na presente página e nas páginas visitadas, para que possamos continuar a produzir conteúdo de qualidade.
                </li>
                <li>
                    Para mais informações sobre cookies do Google Analytics, consulte a página oficial do Google Analytics.
                </li>
            </ol>
                
            <p className="my-4">
                <em>Consulte também as <a href="/terms-of-service" className="underline cursor-pointer">Condições Gerais de Venda</a> ou a <a href="/privacy-policy" className="underline cursor-pointer">Política de Privacidade</a></em>.
            </p>
        </div>
        </section>
    </main>
  );
}
