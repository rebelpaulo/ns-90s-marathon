"use client";

import { useRef } from "react";
import { bandanas, desafioFinal } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./DesafioFinal.module.css";

// 6 equipas finalistas × 2 jogadores = 12 arcos (cores ilustrativas)
const FINAL_TEAMS = [0, 1, 2, 3, 6, 10];
const HOOPS = Array.from({ length: 12 }, (_, i) => bandanas[FINAL_TEAMS[Math.floor(i / 2)]]);
const ORDER = [5, 10, 1, 7, 2, 11, 4, 8, 0, 3, 6]; // ordem de eliminação; sobra o arco 9
const WINNER = 9;

export default function DesafioFinal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const hoops = gsap.utils.toArray<HTMLElement>(`.${s.hoop}`);
        const cmd = root.current!.querySelector<HTMLElement>(`.${s.cmd}`)!;
        const count = root.current!.querySelector<HTMLElement>(`.${s.count}`)!;
        let lastIdx = -2;

        const tl = gsap.timeline({
          defaults: { ease: "power2.in" },
          scrollTrigger: {
            trigger: `.${s.track}`,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            onUpdate(self) {
              const idx = Math.min(ORDER.length, Math.floor(self.progress * (ORDER.length + 1.2)));
              if (idx === lastIdx) return;
              lastIdx = idx;
              cmd.textContent = idx >= ORDER.length ? "FIM!" : desafioFinal.ordens[idx % desafioFinal.ordens.length];
              count.textContent = `${12 - Math.min(idx, ORDER.length)} EM JOGO`;
              gsap.fromTo(cmd, { scale: 1.25, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(3)", overwrite: true });
            },
          },
        });

        ORDER.forEach((h, k) => {
          tl.to(hoops[h], { scale: 1.18, duration: 0.25 }, k)
            .to(hoops[h], { scale: 0, opacity: 0, duration: 0.35, ease: "back.in(2)" }, k + 0.3);
        });
        tl.to(hoops[WINNER], { scale: 1.35, duration: 0.5, ease: "back.out(2)" }, ORDER.length + 0.1).from(
          `.${s.win}`,
          { opacity: 0, y: 20, duration: 0.4, ease: "power2.out" },
          "<"
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className={s.final} id="desafio-final" aria-labelledby="final-h">
      <div className={`wrap ${s.head}`}>
        <p className="eyebrow">Desafio final</p>
        <h2 id="final-h" className="h-title glitch">
          {desafioFinal.nome}
        </h2>
        <div className={s.blocks}>
          {desafioFinal.blocos.map((b) => (
            <div key={b.titulo} className={s.block}>
              <h3>{b.titulo}</h3>
              <p>{b.texto}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={s.track}>
        <div className={s.sticky}>
          <p className={s.count} aria-hidden="true">
            12 EM JOGO
          </p>
          <p className={s.cmd} aria-hidden="true">
            {desafioFinal.ordens[0]}
          </p>
          <ul className={s.hoops} aria-label="12 arcos, um por jogador">
            {HOOPS.map((c, i) => (
              <li key={i} className={`${s.hoop} ${i === WINNER ? s.winner : ""}`} style={{ ["--h" as string]: c }}>
                <span className={s.player} />
              </li>
            ))}
          </ul>
          <p className={s.win}>Ganha a equipa que ficar em jogo por último!</p>
        </div>
      </div>
    </section>
  );
}
