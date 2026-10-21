"use client";

import { useRef } from "react";
import { estacoes } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { createScrubber } from "@/lib/scrub";
import StationAnim from "./StationAnim";
import s from "./Estacoes.module.css";

const ZAP_IN = 0.05; // fração inicial da cena com estática de "mudar de canal"

function stationTimeline(svg: SVGSVGElement, tl: gsap.core.Timeline) {
  const q = gsap.utils.selector(svg);
  switch (svg.dataset.anim) {
    case "quiz":
      tl.fromTo(q(`.${s.buzzer}`), { scaleY: 1 }, { scaleY: 0.45, transformOrigin: "50% 100%", duration: 0.12, yoyo: true, repeat: 5, stagger: 0.18 }, 0).from(
        q(`.${s.q}`),
        { y: 20, opacity: 0, scale: 0.4, transformOrigin: "50% 50%", stagger: 0.2, duration: 0.4, ease: "back.out(3)" },
        0.1
      );
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
        const disposers: Array<() => void> = [];

        gsap.utils.toArray<HTMLElement>(`.${s.scene}`).forEach((scene) => {
          const video = scene.querySelector<HTMLVideoElement>("video")!;
          const zap = scene.querySelector<HTMLElement>(`.${s.zap}`)!;
          const bar = scene.querySelector<HTMLElement>(`.${s.sceneBarFill}`)!;
          const scrub = createScrubber(video, video.dataset.src!, () => video.classList.add(s.ready));
          disposers.push(scrub.dispose);

          // carregar o clip quando a cena está a ~2 ecrãs de distância
          ScrollTrigger.create({ trigger: scene, start: "top 300%", once: true, onEnter: scrub.load });

          // a câmara entra no diorama ao longo de toda a cena, enquanto as regras passam por cima
          ScrollTrigger.create({
            trigger: scene,
            start: "top top",
            end: "bottom bottom",
            onUpdate(self) {
              const p = self.progress;
              scrub.seek(Math.max(0, (p - ZAP_IN) / (1 - ZAP_IN)));
              bar.style.transform = `scaleX(${p})`;
            },
          });

          // estática ao entrar (mudar de canal)
          gsap.fromTo(
            zap,
            { opacity: 1 },
            { opacity: 0, ease: "power1.in", scrollTrigger: { trigger: scene, start: "top 40%", end: "top -10%", scrub: true } }
          );

          // cartões: entram e saem com o scroll
          scene.querySelectorAll<HTMLElement>(`.${s.panel}`).forEach((panel) => {
            gsap.fromTo(
              panel,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: panel, start: "top 92%", end: "top 62%", scrub: 0.4 } }
            );
          });

          const svg = scene.querySelector<SVGSVGElement>("svg[data-anim]");
          if (svg) {
            const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 85%", end: "bottom 30%", scrub: 0.6 } });
            stationTimeline(svg, tl);
          }

          const reels = scene.querySelectorAll(`.${s.reel}`);
          if (reels.length) {
            gsap.fromTo(reels, { rotate: 0 }, { rotate: 1080, ease: "none", scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: true } });
          }
        });

        return () => disposers.forEach((d) => d());
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className={s.estacoes} id="estacoes" aria-labelledby="est-h">
      <div className={`wrap ${s.head}`}>
        <p className="eyebrow">6 cassetes · 6 estações</p>
        <h2 id="est-h" className="h-display rgb">
          As estações
        </h2>
        <p className="lead">Faz scroll: em cada canal entras na estação enquanto lês como se joga.</p>
      </div>

      {estacoes.map((e) => (
        <article
          key={e.n}
          id={`estacao-${e.n}`}
          className={`${s.scene} ${e.n % 2 === 0 ? s.alt : ""}`}
          style={{ ["--c" as string]: e.cor }}
          aria-labelledby={`est-${e.n}`}
        >
          {/* fundo: vídeo do diorama em scrub, preso ao ecrã */}
          <div className={s.sticky} aria-hidden="true">
            <div className={s.backdrop} style={{ backgroundImage: `url(/media/clip-${e.n}.webp)` }} />
            <video
              className={s.video}
              data-src={`/media/clip-${e.n}.mp4`}
              poster={`/media/clip-${e.n}.webp`}
              muted
              playsInline
              preload="none"
              tabIndex={-1}
            />
            <div className={s.scrim} />
            <div className={s.zap} />
            <div className={s.osd}>
              <span className={s.osdCh}>CH {String(e.n).padStart(2, "0")}</span>
              <span className={s.osdSide}>LADO {e.lado}</span>
            </div>
            <div className={s.sceneBar}>
              <span className={s.sceneBarFill} />
            </div>
          </div>

          {/* frente: a informação passa por cima do vídeo */}
          <div className={s.steps}>
            <div className={`${s.step} ${s.stepIntro}`}>
              <div className={`${s.panel} ${s.intro}`}>
                <div className={s.spine}>
                  <span>LADO {e.lado}</span>
                  <span className={s.reels} aria-hidden="true">
                    <span className={s.reel} />
                    <span className={s.reel} />
                  </span>
                  <span>Nº 0{e.n}</span>
                </div>
                <p className={s.kicker}>Estação {e.n}</p>
                <h3 id={`est-${e.n}`} className={s.name}>
                  {e.nome}
                </h3>
                {e.tagline && <p className={s.tagline}>{e.tagline}</p>}
              </div>
            </div>

            {e.blocos.map((b, i) => (
              <div key={b.titulo} className={s.step}>
                <div className={`${s.panel} ${s.block}`}>
                  <h4>{b.titulo}</h4>
                  {b.texto.map((t, k) => (
                    <p key={k}>{t}</p>
                  ))}
                  {i === 0 && (
                    <div className={s.animWrap}>
                      <StationAnim n={e.n} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
