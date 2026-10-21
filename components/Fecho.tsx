"use client";

import { useRef, useState } from "react";
import { contacto } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./Fecho.module.css";

export default function Fecho() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contacto.email);
    } catch {
      const r = document.createRange();
      const el = document.getElementById("email");
      if (el) {
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
        document.execCommand("copy");
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top 65%", toggleActions: "play none none reverse" } })
          .from(`.${s.eject}`, { y: -30, opacity: 0, duration: 0.4 })
          .from(`.${s.thanks}`, { scale: 0.6, opacity: 0, duration: 0.6, ease: "back.out(2)" }, "-=0.1")
          .from(`.${s.card}`, { y: 40, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.25")
          .from(`.${s.sign}`, { opacity: 0, duration: 0.5 }, "-=0.2");
      });
    },
    { scope: root }
  );

  return (
    <footer ref={root} className={`section memphis ${s.fecho}`} id="contacto" aria-labelledby="fecho-h">
      <div className={`wrap ${s.inner}`}>
        <p className={s.eject} aria-hidden="true">
          ⏏ EJECT · FIM DA FITA
        </p>
        <h2 id="fecho-h" className={`h-title ${s.thanks}`}>
          {contacto.obrigada}
        </h2>

        <div className={s.card}>
          <p className={s.name}>{contacto.nome}</p>
          <p className={s.role}>{contacto.cargo}</p>
          <div className={s.mailRow}>
            <a id="email" className={s.mail} href={`mailto:${contacto.email}`}>
              {contacto.email}
            </a>
            <button type="button" className={s.copy} onClick={copy} aria-live="polite">
              {copied ? "Copiado ✓" : "Copiar"}
            </button>
          </div>
        </div>

        <p className={s.sign}>{contacto.assinatura}</p>
      </div>
    </footer>
  );
}
