"use client";

import { useEffect, useRef, useState } from "react";
import { contacto } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import s from "./Fecho.module.css";

export default function Fecho() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(contacto.email);
      ok = true;
    } catch {
      const el = document.getElementById("email");
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
        try {
          ok = document.execCommand("copy");
        } catch {
          ok = false;
        }
      }
    }
    // Sem cópia: o email fica selecionado para o utilizador copiar à mão.
    setCopied(ok);
    if (timer.current) clearTimeout(timer.current);
    if (ok) timer.current = setTimeout(() => setCopied(false), 2200);
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
            <button type="button" className={s.copy} onClick={copy}>
              {copied ? "Copiado ✓" : "Copiar"}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? "Email copiado" : ""}
            </span>
          </div>
        </div>

        <p className={s.sign}>{contacto.assinatura}</p>
      </div>
    </footer>
  );
}
