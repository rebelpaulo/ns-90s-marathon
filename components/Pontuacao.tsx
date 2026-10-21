"use client";

import { useRef } from "react";
import { pontuacao } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./Pontuacao.module.css";

const Score = ({ value, label, tone }: { value: number; label: string; tone: "win" | "lose" }) => (
  <div className={`${s.board} ${tone === "win" ? s.win : s.lose}`}>
    <span className={s.ghost} aria-hidden="true">
      {"8".repeat(String(value).length)}
    </span>
    <span className={s.value} data-value={value}>
      {value}
    </span>
    <span className={s.pts}>pontos</span>
    <span className={s.label}>{label}</span>
  </div>
);

export default function Pontuacao() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const values = gsap.utils.toArray<HTMLElement>(`.${s.value}`);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "center 55%", scrub: 0.5 },
        });
        values.forEach((el, i) => {
          const target = Number(el.dataset.value);
          const o = { v: 0 };
          tl.to(
            o,
            {
              v: target,
              ease: "none",
              duration: 1,
              onUpdate: () => {
                el.textContent = String(Math.round(o.v));
              },
            },
            i * 0.15
          );
        });
        tl.from(`.${s.board}`, { y: 40, rotateX: 50, opacity: 0, stagger: 0.15, duration: 0.6 }, 0);
        tl.from(`.${s.note}`, { opacity: 0, y: 20, duration: 0.4 }, 0.7);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className={`section ${s.pontuacao}`} id="pontuacao" aria-labelledby="pont-h">
      <div className="wrap">
        <p className="eyebrow">Placar</p>
        <h2 id="pont-h" className="h-display rgb">
          Sistema de pontuação
        </h2>
        <div className={s.boards}>
          <Score value={pontuacao.vencedora.pontos} label={pontuacao.vencedora.label} tone="win" />
          <Score value={pontuacao.perdedora.pontos} label={pontuacao.perdedora.label} tone="lose" />
        </div>
        <p className={`lead ${s.note}`}>{pontuacao.nota}</p>
      </div>
    </section>
  );
}
