import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { EVENT } from '../content.js'
import Pixel from './Pixel.jsx'

// Ecrã de título: "PRESS START". O logo da cartridge afasta-se e as estrelas fazem parallax ao sair.
export default function Title({ team }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-40%'])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.82])
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '30%'])

  return (
    <header ref={ref} className="title-screen" id="start">
      <motion.div className="stars" style={{ y: starsY }} aria-hidden="true" />
      <div className="title-inner gutter">
        <motion.p className="publisher" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          © 1996 NEW SHEET · LICENSED BY REVENGE OF THE 90s
        </motion.p>
        <motion.div style={{ y: titleY, scale: titleScale }} className="logo-block">
          <p className="presenter">{EVENT.presenter}</p>
          <h1 className="game-title">
            {['THE', "90'S", 'MARATHON'].map((w, i) => (
              <motion.span
                key={w}
                className={'w w' + i}
                initial={reduce ? false : { y: 60, opacity: 0, rotate: i === 1 ? -8 : 0 }}
                animate={{ y: 0, opacity: 1, rotate: i === 1 ? -4 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 + i * 0.15 }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <p className="subtitle">TEAM BUILDING EDITION</p>
        </motion.div>

        <div className="cartridge-info">
          <div><span>DATA</span><b>{EVENT.date}</b></div>
          <div><span>LOCAL</span><b>{EVENT.venue}</b></div>
          <div><span>TEMA</span><b>{EVENT.theme}</b></div>
        </div>

        <p className="pitch">{EVENT.pitch}</p>

        <a href="#select" className="press-start">
          <Pixel name="run0" size={3} bandana={team.c} /> PRESS START
        </a>
      </div>
    </header>
  )
}
