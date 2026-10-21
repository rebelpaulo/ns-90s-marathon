import { useState } from 'react'
import { motion } from 'motion/react'
import { CONTACT, EVENT } from '../content.js'
import Pixel from './Pixel.jsx'

// Créditos finais: "THANK YOU FOR PLAYING" + contacto + logo New Sheet.
export default function Credits({ team }) {
  const [copied, setCopied] = useState('Copiar email')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied('Copiado ✓')
    } catch {
      const r = document.createRange()
      r.selectNodeContents(document.getElementById('mail'))
      const s = window.getSelection()
      s.removeAllRanges()
      s.addRange(r)
      setCopied('Selecionado')
    }
  }
  const credits = [
    ['FORMATO', "The 90's Marathon"],
    ['DATA', EVENT.date],
    ['LOCAL', EVENT.venue],
    ['DESENHADO POR', 'Revenge of the 90s'],
    ['PRODUÇÃO', 'New Sheet – Brand Activation'],
  ]
  return (
    <footer className="credits band-pad gutter" id="credits">
      <div className="wrap credits-inner">
        <motion.h2
          className="thanks"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        >
          OBRIGADA!
          <small>THANK YOU FOR PLAYING</small>
        </motion.h2>

        <dl className="roll">
          {credits.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <dt>{k}</dt>
              <dd>{v}</dd>
            </motion.div>
          ))}
        </dl>

        <div className="player2">
          <p className="p2-k">PLAYER 2 · PRESS START</p>
          <p className="p2-name">{CONTACT.name}</p>
          <p className="p2-role">{CONTACT.role}</p>
          <div className="p2-mail">
            <code id="mail">{CONTACT.email}</code>
            <button type="button" onClick={copy}>{copied}</button>
          </div>
        </div>

        <div className="ns">
          <motion.img
            src="/logo.png"
            alt="New Sheet"
            width="110"
            height="110"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          />
          <p>Uma produção <b>New Sheet – Brand Activation</b> × Revenge of the 90s</p>
        </div>

        <a href="#start" className="continue">
          <Pixel name="heart" size={4} /> CONTINUE? <Pixel name="run0" size={3} bandana={team.c} />
        </a>
      </div>
    </footer>
  )
}
