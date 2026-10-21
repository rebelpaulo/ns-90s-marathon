"use client";

import { useRef } from "react";
import { estacoes } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { createScrubber, type Scrubber } from "@/lib/scrub";
import StationAnim from "./StationAnim";
import s from "./Estacoes.module.css";

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

/**
 * Uma única viagem contínua: o clip da estação N começa na imagem da estação N e
 * acaba na imagem da estação N+1, por isso a troca de clip na fronteira é invisível.
 */
export default function Estacoes() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current!;
        const videos = Array.from(el.querySelectorAll<HTMLVideoElement>(`.${s.video}`));
        const groups = gsap.utils.toArray<HTMLElement>(`.${s.group}`);
        const osdCh = el.querySelector<HTMLElement>(`.${s.osdCh}`)!;
        const osdName = el.querySelector<HTMLElement>(`.${s.osdName}`)!;
        const bar = el.querySelector<HTMLElement>(`.${s.sceneBarFill}`)!;
        const scrubbers: Scrubber[] = videos.map((v) => createScrubber(v, v.dataset.src!, () => v.classList.add(s.ready)));
        let active = -1;

        const setActive = (i: number) => {
          if (i === active) return;
          active = i;
          videos.forEach((v, k) => v.classList.toggle(s.on, k === i));
          osdCh.textContent = `CH ${String(i + 1).padStart(2, "0")}`;
          osdName.textContent = estacoes[i].nome;
          // pré-carregar este clip e o seguinte
          scrubbers[i]?.load();
          scrubbers[i + 1]?.load();
        };

        // começar a carregar o 1.º clip quando a secção se aproxima
        ScrollTrigger.create({ trigger: el, start: "top 300%", once: true, onEnter: () => setActive(0) });

        groups.forEach((g, i) => {
          ScrollTrigger.create({
            trigger: g,
            start: "top center",
            end: "bottom center",
            onUpdate(self) {
              setActive(i);
              scrubbers[i].seek(self.progress);
              bar.style.transform = `scaleX(${(i + self.progress) / groups.length})`;
            },
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          });
        });

        el.querySelectorAll<HTMLElement>(`.${s.panel}`).forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: panel, start: "top 92%", end: "top 62%", scrub: 0.4 } }
          );
        });

        el.querySelectorAll<SVGSVGElement>("svg[data-anim]").forEach((svg) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 85%", end: "bottom 30%", scrub: 0.6 } });
          stationTimeline(svg, tl);
        });

        const reels = el.querySelectorAll(`.${s.reel}`);
        if (reels.length) {
          gsap.fromTo(reels, { rotate: 0 }, { rotate: 2160, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        }

        return () => scrubbers.forEach((sc) => sc.dispose());
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
        <p className="lead">Faz scroll: é uma viagem só, de estação em estação, enquanto lês como se joga.</p>
      </div>

      <div className={s.track}>
        {/* fundo: uma viagem contínua, presa ao ecrã */}
        <div className={s.sticky} aria-hidden="true">
          {estacoes.map((e, i) => (
            <video
              key={e.n}
              className={`${s.video} ${i === 0 ? s.on : ""}`}
              data-src={`/media/clip-${e.n}.mp4`}
              poster={`/media/clip-${e.n}.webp`}
              muted
              playsInline
              preload="none"
              tabIndex={-1}
            />
          ))}
          <div className={s.scrim} />
          <div className={s.osd}>
            <span className={s.osdCh}>CH 01</span>
            <span className={s.osdName}>{estacoes[0].nome}</span>
          </div>
          <div className={s.sceneBar}>
            <span className={s.sceneBarFill} />
          </div>
        </div>

        {/* frente: a informação de cada estação passa por cima */}
        <div className={s.steps}>
          {estacoes.map((e) => (
            <article
              key={e.n}
              id={`estacao-${e.n}`}
              className={s.group}
              style={{ ["--c" as string]: e.cor }}
              aria-labelledby={`est-${e.n}`}
            >
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={s.rmStill} src={e.still} alt="" width={760} height={1344} loading="lazy" decoding="async" />
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
