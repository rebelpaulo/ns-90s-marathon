import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react'
import { BOSS, TEAMS } from '../content.js'
import Pixel from './Pixel.jsx'

const ORDER = [3, 8, 0, 11, 5, 6, 1, 9, 2, 10, 4] // fica o arco 7

// Boss final: sticky, os arcos esvaziam com o progresso do scroll. O texto está sempre no DOM.
export default function Boss() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [out, setOut] = useState(reduce ? 11 : 0)
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const e = Math.max(0, Math.min(11, Math.round(((p - 0.25) / 0.6) * 11)))
    setOut(e)
    setStep(p < 0.15 ? 0 : p < 0.3 ? 1 : e < 11 ? 2 : 3)
  })

  const cmd = out >= 11 ? 'K.O.!' : BOSS.commands[out % BOSS.commands.length]
  const left = 12 - out

  return (
    <section ref={ref} className="boss" id="boss" style={{ height: reduce ? 'auto' : '360svh' }} aria-labelledby="boss-h">
      <div className={reduce ? 'boss-sticky static' : 'boss-sticky'}>
        <div className="boss-grid gutter wrap">
          <div className="boss-copy">
            <p className="kicker warn">⚠ WARNING · BOSS FINAL</p>
            <h2 id="boss-h" className="h2">{BOSS.name}</h2>
            <ol className="boss-steps">
              {BOSS.steps.map((s, i) => (
                <li key={s.k} className={i === step ? 'on' : ''}>
                  <b>{s.k}</b>
                  <span>{s.t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="arena" role="img" aria-label={`${left} de 12 jogadores em jogo`}>
            <div className="hp">
              <span>EM JOGO</span>
              <div className="hp-bar"><motion.i animate={{ width: `${(left / 12) * 100}%` }} /></div>
              <b>{left}/12</b>
            </div>
            <div className="hoops">
              {Array.from({ length: 12 }).map((_, i) => {
                const isOut = ORDER.indexOf(i) > -1 && ORDER.indexOf(i) < out
                const team = TEAMS[Math.floor(i / 2)]
                const a = (i / 12) * Math.PI * 2 - Math.PI / 2
                return (
                  <div key={i} className="hoop" style={{ left: `${50 + 40 * Math.cos(a)}%`, top: `${50 + 40 * Math.sin(a)}%` }}>
                    <AnimatePresence>
                      {!isOut && (
                        <motion.div
                          initial={{ y: 0, opacity: 1 }}
                          exit={{ y: -60, opacity: 0, rotate: 180 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Pixel name="run0" size={3} bandana={team.c} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={cmd + out}
                className={'cmd' + (out >= 11 ? ' ko' : '')}
                initial={{ scale: 1.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                {cmd}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
