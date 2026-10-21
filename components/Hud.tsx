"use client";

import { useEffect, useRef } from "react";
import { evento } from "@/lib/content";
import s from "./Hud.module.css";

const TAPE_SECONDS = 2 * 60 * 60; // cassete T-120 em SP

function fmt(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const ss = Math.floor(sec % 60);
  return `${h}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export default function Hud() {
  const tc = useRef<HTMLSpanElement>(null);
  const mode = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, y / max));
      if (tc.current) tc.current.textContent = `SP ${fmt(p * TAPE_SECONDS)}`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (mode.current) {
        const dir = y > last ? "▶▶ FF" : y < last ? "◀◀ REW" : "▶ PLAY";
        mode.current.textContent = p >= 0.995 ? "⏏ EJECT" : dir;
        clearTimeout(idle);
        idle = setTimeout(() => {
          if (mode.current) mode.current.textContent = p >= 0.995 ? "⏏ EJECT" : "▶ PLAY";
        }, 220);
      }
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(idle);
    };
  }, []);

  return (
    <div className={s.hud} aria-hidden="true">
      <span ref={mode} className={`${s.tl} ${s.txt}`}>
        ▶ PLAY
      </span>
      <span className={`${s.tr} ${s.txt}`}>
        <span className={s.dot} /> REC
      </span>
      <span className={`${s.bl} ${s.txt}`}>{evento.dataHud}</span>
      <span ref={tc} className={`${s.br} ${s.txt}`}>
        SP 0:00:00
      </span>
      <span className={s.tape}>
        <span ref={bar} className={s.tapeFill} />
      </span>
    </div>
  );
}
