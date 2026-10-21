"use client";

import { useRef } from "react";
import { bandanas, comoFunciona } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./ComoFunciona.module.css";

type P = { x: number; y: number };

const TEAMS = 12;
const PER = 15;
const GAP = 2.6;
const FINALISTS = [0, 3, 4, 7, 9, 10]; // ilustrativo: as 6 equipas com mais pontos

// gerador determinístico (SSR e cliente iguais)
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

const member = (o: P, m: number): P => ({ x: o.x + (m % 5) * GAP, y: o.y + Math.floor(m / 5) * GAP });

const stationOrigin = (st: number): P => ({ x: 4 + (st % 2) * 48, y: 10 + Math.floor(st / 2) * 34 });
const stationSlot = (st: number, slot: 0 | 1): P => {
  const o = stationOrigin(st);
  return { x: o.x + (slot === 0 ? 4 : 27.6), y: o.y + 10 };
};

const r = rng(90);
const S0: P[] = Array.from({ length: TEAMS * PER }, () => ({ x: 4 + r() * 92, y: 6 + r() * 98 }));
const S1: P[] = [];
const S2: P[] = [];
const S3: P[] = [];
const S4: P[] = [];
for (let t = 0; t < TEAMS; t++) {
  const o1 = { x: 14 + (t % 3) * 31, y: 12 + Math.floor(t / 3) * 25 };
  const st = Math.floor(t / 2);
  const slot = (t % 2) as 0 | 1;
  const o2 = stationSlot(st, slot);
  // rotação: as equipas do lado esquerdo avançam para a estação seguinte
  const o3 = slot === 0 ? stationSlot((st + 1) % 6, 0) : o2;
  const fi = FINALISTS.indexOf(t);
  const o4 =
    fi >= 0
      ? { x: 14 + (fi % 3) * 30, y: 34 + Math.floor(fi / 3) * 22 }
      : o1;
  for (let m = 0; m < PER; m++) {
    S1.push(member(o1, m));
    S2.push(member(o2, m));
    S3.push(member(o3, m));
    S4.push(member(o4, m));
  }
}

const teamOf = (i: number) => Math.floor(i / PER);

export default function ComoFunciona() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const dots = gsap.utils.toArray<SVGCircleElement>(`.${s.dot}`);
        const frames = `.${s.frame}`;
        const crown = `.${s.crown}`;

        gsap.set(dots, { x: (i: number) => S0[i].x, y: (i: number) => S0[i].y, fill: "#f3ecff", opacity: 1 });
        gsap.set(frames, { opacity: 0 });
        gsap.set(crown, { opacity: 0, y: 6 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: `.${s.steps}`,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        tl.to(dots, { x: (i: number) => S1[i].x, y: (i: number) => S1[i].y, stagger: { amount: 0.3, from: "random" } })
          .to(dots, { fill: (i: number) => bandanas[teamOf(i)], stagger: { amount: 0.4, grid: "auto" } })
          .to(dots, { x: (i: number) => S2[i].x, y: (i: number) => S2[i].y })
          .to(frames, { opacity: 1, duration: 0.4 }, "<0.4")
          .to(dots, { x: (i: number) => S3[i].x, y: (i: number) => S3[i].y, ease: "back.inOut(1.4)" })
          .to(frames, { opacity: 0, duration: 0.4 })
          .to(
            dots,
            {
              x: (i: number) => S4[i].x,
              y: (i: number) => S4[i].y,
              opacity: (i: number) => (FINALISTS.includes(teamOf(i)) ? 1 : 0.12),
            },
            "<"
          )
          .to(crown, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className={s.como} id="como-funciona" aria-labelledby="como-h">
      <div className={`wrap ${s.head}`}>
        <p className="eyebrow">Regras do jogo</p>
        <h2 id="como-h" className="h-display rgb">
          Como funciona?
        </h2>
      </div>

      <div className={s.track}>
        <div className={s.sticky}>
          <div className={s.figure}>
            <svg viewBox="0 0 100 112" className={s.svg} role="img" aria-label="Diagrama: 180 participantes em 12 equipas de 15, 2 equipas por estação em 6 estações">
              {Array.from({ length: 6 }, (_, st) => {
                const o = stationOrigin(st);
                return (
                  <g key={st} className={s.frame}>
                    <rect x={o.x} y={o.y} width={44} height={22} rx={2.5} />
                    <text x={o.x + 2} y={o.y + 5.6}>
                      ESTAÇÃO {st + 1}
                    </text>
                    <text x={o.x + 22} y={o.y + 15.6} className={s.vs}>
                      VS
                    </text>
                  </g>
                );
              })}
              <g className={s.crown}>
                <text x={50} y={26} textAnchor="middle">
                  ★ TOP 6 ★
                </text>
              </g>
              {S2.map((p, i) => (
                <circle
                  key={i}
                  className={s.dot}
                  r={1}
                  transform={`translate(${p.x} ${p.y})`}
                  fill={bandanas[teamOf(i)]}
                />
              ))}
            </svg>
          </div>
        </div>

        <ol className={`wrap ${s.steps}`}>
          {comoFunciona.map((step, i) => (
            <li key={step.id} className={s.step}>
              <div className={s.card}>
                <span className={s.num}>0{i + 1}</span>
                <h3 className={s.cardTitle}>{step.titulo}</h3>
                <p>{step.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
