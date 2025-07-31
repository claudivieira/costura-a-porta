import Image from "next/image";
import RequestService from "./components/RequestServiceBtn";

export default function Home() {
  return (
    <div>
      <header className="flex bg-background justify-between items-center pl-6 pr-6">
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
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start bg-primary">
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
