"use client";

import { useRef } from "react";
import { estacoes } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import StationAnim from "./StationAnim";
import s from "./Estacoes.module.css";

const LADOS: Record<string, string> = { A: "Lado A", B: "Lado B", C: "Lado C" };

function stationTimeline(svg: SVGSVGElement, tl: gsap.core.Timeline) {
  const q = gsap.utils.selector(svg);
  switch (svg.dataset.anim) {
    case "quiz":
      tl.fromTo(q(`.${s.buzzer}`), { scaleY: 1 }, { scaleY: 0.45, transformOrigin: "50% 100%", duration: 0.12, yoyo: true, repeat: 5, stagger: 0.18 }, 0)
        .from(q(`.${s.q}`), { y: 20, opacity: 0, scale: 0.4, transformOrigin: "50% 50%", stagger: 0.2, duration: 0.4, ease: "back.out(3)" }, 0.1);
      break;
    case "canta": {
      const bars = q(`.${s.bar}`);
      tl.fromTo(
        bars,
        { scaleY: 0.05, transformOrigin: "50% 100%" },
        { scaleY: () => 0.3 + Math.random() * 0.7, duration: 0.25, stagger: { each: 0.02, repeat: 3, yoyo: true }, ease: "sine.inOut" },
        0
      )
        .to(bars, { scaleY: 0.04, duration: 0.25, stagger: 0.01 }, ">")
        .from(q(`.${s.stop}`), { opacity: 0, y: 8, duration: 0.3 }, ">-0.1");
      break;
    }
    case "macaca":
      tl.fromTo(q(`.${s.tokA}`), { x: 19, y: 64 }, { x: 89, keyframes: { y: [64, 44, 64, 44, 64, 44, 64] }, duration: 1, ease: "none" }, 0)
        .fromTo(q(`.${s.tokB}`), { x: 181, y: 64 }, { x: 111, keyframes: { y: [64, 44, 64, 44, 64, 44, 64] }, duration: 1, ease: "none" }, 0)
        .from(q(`.${s.hand}`), { opacity: 0, scale: 0.2, transformOrigin: "50% 50%", stagger: 0.12, duration: 0.3, ease: "back.out(3)" }, ">");
      break;
    case "tazos": {
      const cups = q(`.${s.cup}`);
      tl.fromTo(q(`.${s.disc}`), { x: 0, y: 0, rotate: 0 }, { x: 120, y: -30, rotate: 540, transformOrigin: "50% 50%", duration: 0.5, ease: "power1.in" }, 0).to(
        gsap.utils.shuffle([...cups]),
        { y: 40, rotate: () => gsap.utils.random(-70, 70), opacity: 0.15, transformOrigin: "50% 100%", stagger: 0.07, duration: 0.35, ease: "power2.in" },
        ">-0.1"
      );
      break;
    }
    case "mimica":
      tl.from(q(`.${s.card}`), { y: 50, opacity: 0, stagger: 0.15, duration: 0.4, ease: "back.out(2)" }, 0)
        .to(q(`.${s.card}`), { scaleX: -1, transformOrigin: "50% 50%", stagger: 0.15, duration: 0.25, yoyo: true, repeat: 1 }, ">")
        .from(q(`.${s.shh}`), { opacity: 0, duration: 0.3 }, ">-0.2");
      break;
    case "grito":
      tl.from(q(`.${s.pairL}`), { x: () => gsap.utils.random(-40, 20), y: () => gsap.utils.random(-30, 30), rotate: () => gsap.utils.random(-30, 30), duration: 0.8, stagger: 0.08, ease: "power2.out" }, 0)
        .from(q(`.${s.pairR}`), { x: () => gsap.utils.random(-20, 60), y: () => gsap.utils.random(-30, 30), rotate: () => gsap.utils.random(-30, 30), duration: 0.8, stagger: 0.08, ease: "power2.out" }, 0)
        .from(q(`.${s.pairLine}`), { opacity: 0, scaleX: 0, transformOrigin: "50% 50%", stagger: 0.08, duration: 0.25 }, ">-0.1");
      break;
  }
}

export default function Estacoes() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(`.${s.station}`).forEach((art) => {
          const reels = art.querySelectorAll(`.${s.reel}`);
          // cassete: bobines rodam com o scroll, capa entra
          gsap.timeline({
            scrollTrigger: { trigger: art, start: "top bottom", end: "bottom top", scrub: true },
          })
            .fromTo(reels, { rotate: 0 }, { rotate: 900, ease: "none" }, 0)
            .fromTo(art.querySelector(`.${s.cover}`), { scale: 1.18 }, { scale: 1, ease: "none" }, 0);

          gsap.from(art.querySelectorAll(`.${s.block}`), {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: art.querySelector(`.${s.text}`), start: "top 80%", toggleActions: "play none none reverse" },
          });

          const svg = art.querySelector<SVGSVGElement>("svg[data-anim]");
          if (svg) {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: svg, start: "top 85%", end: "bottom 35%", scrub: 0.6 },
            });
            stationTimeline(svg, tl);
          }
        });

        gsap.utils.toArray<HTMLElement>(`.${s.side}`).forEach((side) => {
          gsap.from(side, {
            xPercent: -12,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: side, start: "top 85%", toggleActions: "play none none reverse" },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className={`section ${s.estacoes}`} id="estacoes" aria-labelledby="est-h">
      <div className="wrap">
        <p className="eyebrow">6 cassetes · 6 estações</p>
        <h2 id="est-h" className="h-display rgb">
          As estações
        </h2>
      </div>

      {estacoes.map((e, i) => (
        <div key={e.n}>
          {(i === 0 || estacoes[i - 1].lado !== e.lado) && (
            <div className={`wrap ${s.sideWrap}`}>
              <p className={s.side}>
                <span>▶</span> {LADOS[e.lado]}
              </p>
            </div>
          )}
          <article className={`wrap ${s.station} ${e.n % 2 === 0 ? s.alt : ""}`} style={{ ["--c" as string]: e.cor }} aria-labelledby={`est-${e.n}`}>
            <div className={s.visual}>
              <div className={s.cassette}>
                <div className={s.spine}>
                  <span>LADO {e.lado}</span>
                  <span>Nº 0{e.n}</span>
                </div>
                <div className={s.coverWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={s.cover} src={e.still} alt="" width={760} height={1344} loading="lazy" decoding="async" />
                </div>
                <div className={s.window} aria-hidden="true">
                  <span className={s.reel} />
                  <span className={s.tapeBand} />
                  <span className={s.reel} />
                </div>
              </div>
              <div className={s.animWrap}>
                <StationAnim n={e.n} />
              </div>
            </div>

            <div className={s.text}>
              <p className={s.kicker}>Estação {e.n}</p>
              <h3 id={`est-${e.n}`} className={s.name}>
                {e.nome}
              </h3>
              {e.tagline && <p className={s.tagline}>{e.tagline}</p>}
              <div className={s.blocks}>
                {e.blocos.map((b) => (
                  <div key={b.titulo} className={s.block}>
                    <h4>{b.titulo}</h4>
                    {b.texto.map((t, k) => (
                      <p key={k}>{t}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      ))}
    </section>
  );
}
