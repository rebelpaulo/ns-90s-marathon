"use client";

import { useRef } from "react";
import { estacoes, evento } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // TVs a ligar uma a uma (flash de CRT)
        gsap.from(`.${s.tv}`, {
          opacity: 0,
          scaleY: 0.02,
          duration: 0.35,
          stagger: { each: 0.12, from: "random" },
          ease: "power3.out",
          delay: 0.15,
        });
        gsap.from(`.${s.titleBlock} > *`, { y: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out", delay: 0.6 });

        // as TVs passam os clips em loop (só com movimento permitido)
        const loops = gsap.utils.toArray<HTMLVideoElement>(`.${s.loop}`);
        loops.forEach((v) => {
          v.src = v.dataset.src!;
          v.play().catch(() => {});
        });

        // ao sair, a parede de TVs recua
        gsap.to(`.${s.wall}`, {
          scale: 0.86,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () =>
          loops.forEach((v) => {
            v.pause();
            v.removeAttribute("src");
            v.load();
          });
      });
    },
    { scope: root }
  );

  return (
    <header ref={root} className={s.hero} id="topo">
      <nav className={s.wall} aria-label="Canais: as 6 estações">
        {estacoes.map((e) => (
          <a key={e.n} href={`#estacao-${e.n}`} className={s.tv} style={{ ["--c" as string]: e.cor }}>
            <video
              className={s.loop}
              data-src={`/media/loop-${e.n}.mp4`}
              poster={`/media/loop-${e.n}.webp`}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            />
            <span className={s.ch}>CH {String(e.n).padStart(2, "0")}</span>
            <span className={s.chName}>{e.nome}</span>
          </a>
        ))}
      </nav>

      <div className={s.titleBlock}>
        <p className={s.presents}>{evento.apresenta}</p>
        <h1 className={`h-title glitch ${s.h1}`}>
          THE 90&apos;S
          <br />
          MARATHON
        </h1>
        <p className={s.sub}>{evento.lead}</p>
        <p className={s.meta}>
          {evento.data} · {evento.local}
        </p>
      </div>

      <p className={s.hint} aria-hidden="true">
        ▼ FAZ SCROLL PARA DAR PLAY
      </p>
    </header>
  );
}
