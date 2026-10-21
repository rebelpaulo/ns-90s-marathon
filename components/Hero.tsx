"use client";

import { useRef } from "react";
import { estacoes, evento } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./Hero.module.css";

const CLIPS = estacoes.map((e) => ({
  n: e.n,
  nome: e.nome,
  src: `/media/clip-${e.n}.mp4`,
  poster: `/media/clip-${e.n}.webp`,
}));

const INTRO = 0.07; // fração inicial do hero com o título sobre o 1.º frame
const ZAP = 0.022; // meia-largura da estática entre canais

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current!;
        const videos = Array.from(el.querySelectorAll<HTMLVideoElement>("video"));
        const zap = el.querySelector<HTMLElement>(`.${s.zap}`)!;
        const osd = el.querySelector<HTMLElement>(`.${s.osdName}`)!;
        const osdNum = el.querySelector<HTMLElement>(`.${s.osdNum}`)!;
        const title = el.querySelector<HTMLElement>(`.${s.titleBlock}`)!;
        const hint = el.querySelector<HTMLElement>(`.${s.hint}`)!;
        const desk = window.matchMedia("(min-width: 900px)");
        const urls: string[] = [];
        let cancelled = false;
        let active = -1;

        // ---- carregar clips como Blob (sempre "seekable", sem depender de byte-range)
        const pending = new Map<HTMLVideoElement, number>();
        const seek = (v: HTMLVideoElement, t: number) => {
          if (!v.src || !Number.isFinite(v.duration)) {
            pending.set(v, t);
            return;
          }
          const target = Math.min(v.duration - 0.04, Math.max(0, t * v.duration));
          if (v.seeking) {
            pending.set(v, t);
            return;
          }
          if (Math.abs(v.currentTime - target) > 0.012) v.currentTime = target;
        };
        videos.forEach((v) => {
          v.addEventListener("seeked", () => {
            const t = pending.get(v);
            if (t !== undefined) {
              pending.delete(v);
              seek(v, t);
            }
          });
          v.addEventListener("loadeddata", () => {
            v.classList.add(s.ready);
            const t = pending.get(v);
            if (t !== undefined) {
              pending.delete(v);
              seek(v, t);
            }
          });
        });
        (async () => {
          for (const v of videos) {
            if (cancelled) return;
            try {
              const res = await fetch(v.dataset.src!);
              const blob = await res.blob();
              if (cancelled) return;
              const url = URL.createObjectURL(blob);
              urls.push(url);
              v.src = url;
              v.load();
            } catch {
              /* sem vídeo: fica o poster */
            }
          }
        })();

        // iOS: "acordar" o decoder no primeiro toque
        const prime = () => {
          videos.forEach((v) => {
            if (!v.src) return;
            const p = v.play();
            if (p) p.then(() => v.pause()).catch(() => {});
          });
        };
        window.addEventListener("touchstart", prime, { once: true, passive: true });

        const n = videos.length;
        const setActive = (i: number) => {
          if (i === active) return;
          active = i;
          videos.forEach((v, k) => v.classList.toggle(s.on, k === i));
          osdNum.textContent = `CH ${String(i + 1).padStart(2, "0")}`;
          osd.textContent = CLIPS[i].nome;
        };
        setActive(0);

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          onUpdate(self) {
            const p = self.progress;
            // título + dica
            if (!desk.matches) {
              const tFade = Math.min(1, p / INTRO);
              title.style.opacity = String(1 - tFade);
              title.style.transform = `translate3d(0, ${-tFade * 40}px, 0)`;
            } else {
              title.style.opacity = "1";
              title.style.transform = "none";
            }
            hint.style.opacity = String(1 - Math.min(1, p / (INTRO * 0.5)));

            const q = Math.max(0, (p - INTRO) / (1 - INTRO));
            const seg = Math.min(n - 1, Math.floor(q * n));
            const local = q * n - seg;
            setActive(seg);
            seek(videos[seg], p < INTRO ? 0 : local);

            // estática nas fronteiras entre canais
            let z = 0;
            for (let b = 1; b < n; b++) {
              const d = Math.abs(q - b / n);
              z = Math.max(z, 1 - d / ZAP);
            }
            zap.style.opacity = String(Math.max(0, z));
          },
        });

        return () => {
          cancelled = true;
          st.kill();
          window.removeEventListener("touchstart", prime);
          videos.forEach((v) => {
            v.removeAttribute("src");
            v.load();
          });
          urls.forEach((u) => URL.revokeObjectURL(u));
        };
      });
    },
    { scope: root }
  );

  return (
    <header ref={root} className={s.hero} id="topo">
      <div className={s.stage}>
        <div className={s.tv}>
          <div className={s.screen}>
            {CLIPS.map((c, i) => (
              <video
                key={c.n}
                className={`${s.video} ${i === 0 ? s.on : ""}`}
                data-src={c.src}
                poster={c.poster}
                muted
                playsInline
                preload="none"
                aria-hidden="true"
                tabIndex={-1}
              />
            ))}
            <div className={s.zap} aria-hidden="true" />
            <div className={s.osd} aria-hidden="true">
              <span className={s.osdNum}>CH 01</span>
              <span className={s.osdName}>{CLIPS[0].nome}</span>
            </div>
          </div>
        </div>

        <div className={s.titleBlock}>
          <p className={s.presents}>{evento.apresenta}</p>
          <h1 className={`h-title glitch ${s.h1}`}>
            THE 90&apos;S
            <br />
            MARATHON
          </h1>
          <p className={s.sub}>{evento.lead}</p>
        </div>

        <p className={s.hint} aria-hidden="true">
          ▼ FAZ SCROLL PARA DAR PLAY
        </p>
      </div>

      {/* Versão estática (reduced-motion): os 6 canais em grelha */}
      <ul className={s.grid} aria-label="As 6 estações">
        {CLIPS.map((c) => (
          <li key={c.n}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.poster} alt="" width={360} height={640} loading="lazy" />
            <span>
              CH {String(c.n).padStart(2, "0")} · {c.nome}
            </span>
          </li>
        ))}
      </ul>
    </header>
  );
}
