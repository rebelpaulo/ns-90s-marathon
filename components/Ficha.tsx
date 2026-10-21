"use client";

import { useRef } from "react";
import { evento } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./Ficha.module.css";

export default function Ficha() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 70%", toggleActions: "play none none reverse" },
        });
        tl.from(`.${s.label}`, { y: 60, rotate: -6, opacity: 0, duration: 0.6, ease: "back.out(1.6)" })
          .from(`.${s.row}`, { x: -24, opacity: 0, stagger: 0.1, duration: 0.35, ease: "power2.out" }, "-=0.2")
          .from(`.${s.stamp}`, { scale: 1.6, rotate: 18, opacity: 0, duration: 0.35, ease: "power4.in" }, "-=0.05")
          .from(`.${s.copy} > *`, { y: 24, opacity: 0, stagger: 0.12, duration: 0.5, ease: "power2.out" }, "-=0.3");
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className={`section memphis ${s.ficha}`} id="ficha" aria-labelledby="ficha-h">
      <div className={`wrap ${s.grid}`}>
        <div className={s.label}>
          <div className={s.labelTop}>
            <span>VHS · SP · T-120</span>
            <span>LADO A</span>
          </div>
          <h2 id="ficha-h" className={s.labelTitle}>
            Team Building
          </h2>
          <dl className={s.rows}>
            <div className={s.row}>
              <dt>Data</dt>
              <dd>{evento.data}</dd>
            </div>
            <div className={s.row}>
              <dt>Local</dt>
              <dd>{evento.local}</dd>
            </div>
            <div className={s.row}>
              <dt>Tema</dt>
              <dd>{evento.tema}</dd>
            </div>
          </dl>
          <span className={s.stamp} aria-hidden="true">
            90&apos;s
          </span>
        </div>

        <div className={s.copy}>
          <p className="eyebrow">The 90&apos;s Marathon</p>
          <p className="h-display rgb">{evento.lead}</p>
          <p className="lead">{evento.intro}</p>
          <p className={s.mote}>{evento.mote}</p>
        </div>
      </div>
    </section>
  );
}
