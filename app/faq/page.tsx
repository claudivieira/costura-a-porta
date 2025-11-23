import Link from "next/link";
import { BsArrowLeftCircleFill } from "react-icons/bs";

export default async function FAQ() {
  return (
    <main className="container mx-auto px-6 py-16 lg:px-8 max-w-4xl">
        <Link href="/" className="flex items-center gap-1">
            <BsArrowLeftCircleFill /> Voltar
        </Link>
        <section className="m-4">
            <h1 className="font-bold">FAQ - Perguntas Frequentes</h1>
            
        <div className="m-8 text-base">
            <div className="my-4">
                <ul>
                    <li className="mb-2">
                        <p><strong>1. Quanto tempo pode demorar a minha encomenda?</strong></p>
                        <p>O prazo médio de produção é de 3 a 20 dias úteis, dependendo do tipo de produto, volume de encomendas e disponibilidade de materiais. Assim que o pedido estiver pronto, será contactado/a.</p>
                    </li>
                    <li className="mb-2">
                        <p><strong>2. Posso devolver ou trocar um artigo personalizado?</strong></p>
                        <p>
                            Não. Os produtos personalizados ou feitos por medida não podem ser devolvidos ou trocados, de acordo com o artigo 17.º da Lei n.º 24/2014. Se houver um defeito ou erro de fabrico, deve contactar-nos até 14 dias após a entrega para avaliarmos a situação.
                        </p>
                    </li>
                    <li className="mb-2">
                        <p><strong>3. Como posso pagar a minha encomenda?</strong></p>
                        <p>
                            Aceitamos pagamentos via MB Way, transferência bancária e outros métodos que possam ser adicionados futuramente. As instruções são fornecidas no momento da encomenda.
                        </p>
                    </li>
                    <li className="mb-2">
                        <p><strong>4. Onde entregam as encomendas?</strong></p>
                        <p>
                            Fazemos entregas em todo o território nacional através de transportadora ou CTT. Nas zonas da Maia, Matosinhos, Valongo, Gondomar, Porto ou Vila Nova de Gaia, é possível agendar recolha e entrega em mãos, conforme disponibilidade.
                        </p>
                    </li>
                    <li className="mb-2">
                        <p><strong>5. Como são tratados os meus dados pessoais?</strong></p>
                        <p>
                            Os seus dados são tratados de forma confidencial, em conformidade com o RGPD, e utilizados apenas para gestão da sua encomenda e comunicação direta. Pode consultar todos os detalhes na nossa <a href="/privacy-policy" className="underline cursor-pointer">Política de Privacidade</a>.
                        </p>
                    </li>
                    <li className="mb-2">
                        <p><strong>6. Utilizam cookies?</strong></p>
                        <p>
                            Sim. Usamos cookies essenciais para o funcionamento da loja e cookies analíticos apenas mediante consentimento, conforme descrito na nossa <a href="/cookies-policy" className="underline cursor-pointer">Política de Cookies</a>.
                        </p>
                    </li>
                    <li>
                        <p><strong>7. Tenho dúvidas ou quero reportar um problema. O que devo fazer?</strong></p>
                        <p>
                            Pode contactar-nos através do e-mail <a href="mailto:geral@costuraaporta.pt" className="underline cursor-pointer">geral@costuraaporta.pt</a>.
                            Responderemos o mais rapidamente possível.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        </section>
    </main>
  );
}