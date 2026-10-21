import SmoothScroll from "@/components/SmoothScroll";
import Hud from "@/components/Hud";
import Hero from "@/components/Hero";
import Ficha from "@/components/Ficha";
import ComoFunciona from "@/components/ComoFunciona";
import Pontuacao from "@/components/Pontuacao";
import Estacoes from "@/components/Estacoes";
import DesafioFinal from "@/components/DesafioFinal";
import Fecho from "@/components/Fecho";

export default function Page() {
  return (
    <>
      <a className="skip" href="#ficha">
        Saltar para o conteúdo
      </a>
      <SmoothScroll />
      <Hud />
      <div className="crt" aria-hidden="true" />
      <Hero />
      <main>
        <Ficha />
        <ComoFunciona />
        <Pontuacao />
        <Estacoes />
        <DesafioFinal />
      </main>
      <Fecho />
    </>
  );
}
