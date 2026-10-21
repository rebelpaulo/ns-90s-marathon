import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, useSpring } from 'motion/react'
import { LEVELS } from '../content.js'
import Pixel from './Pixel.jsx'

const N = LEVELS.length

function LevelCard({ lv, i }) {
  return (
    <article className="level-card" style={{ '--c': lv.c }} aria-labelledby={'lv-' + lv.id}>
      <p className="level-tag">WORLD {lv.world} · RONDA 10–12 MIN</p>
      <h3 id={'lv-' + lv.id} className="level-name">
        <span className="level-num">{i + 1}</span>
        {lv.name}
      </h3>
      <p className="level-hook">{lv.hook}</p>
      <dl className="level-rules">
        {lv.rules.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

// Mundo de 6 níveis. Scroll vertical nativo move a câmara na horizontal (padrão multidirecional,
// sem scroll-jacking: a página tem altura real e o utilizador controla o ritmo).
export default function World({ team, onLevel }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [frame, setFrame] = useState(0)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Câmara com paragens: em cada nível segura 55% do troço e só depois avança para o seguinte.
  const cam = useTransform(scrollYProgress, (p) => {
    const seg = Math.min(p, 0.9999) * N
    const i = Math.floor(seg)
    if (i >= N - 1) return N - 1
    const f = seg - i
    return i + Math.max(0, Math.min(1, (f - 0.55) / 0.45))
  })
  const smooth = useSpring(cam, { stiffness: 140, damping: 28, mass: 0.4 })
  const x = useTransform(smooth, (c) => `${(-c / N) * 100}%`)
  const hills = useTransform(smooth, (c) => `${(-c / (N - 1)) * 25}%`)
  const clouds = useTransform(smooth, (c) => `${(-c / (N - 1)) * 12}%`)
  const jump = useTransform(smooth, (c) => {
    const f = c % 1
    return f > 0.05 && f < 0.95 ? -Math.sin(((f - 0.05) / 0.9) * Math.PI) * 90 : 0
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const seg = Math.min(p, 0.9999) * N
    const i = Math.floor(seg)
    const f = seg - i
    const c = cam.get()
    const idx = Math.round(c)
    setActive(idx)
    // tempo de ronda: 12:00 → 00:00 enquanto a câmara está parada no nível
    const hold = i >= N - 1 ? Math.min(1, f) : Math.min(1, f / 0.55)
    onLevel(idx, Math.floor(c + 0.0001) + (p > 0.995 ? 1 : 0), hold)
    setFrame(Math.floor(p * 160) % 2)
  })

  if (reduce) {
    return (
      <section className="world-static gutter band-pad" id="world" aria-label="As 6 estações">
        <div className="wrap">
          <p className="kicker">WORLD 1 · AS 6 ESTAÇÕES</p>
          <div className="static-levels">
            {LEVELS.map((lv, i) => (
              <div key={lv.id} className="static-level" style={{ background: lv.sky }}>
                <Pixel name={lv.sprite} size={6} />
                <LevelCard lv={lv} i={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="world" id="world" style={{ height: `${N * 110}svh` }} aria-label="As 6 estações">
      <div className="world-sticky">
        <motion.div className="parallax clouds" style={{ x: clouds }} aria-hidden="true" />
        <motion.div className="parallax hills" style={{ x: hills }} aria-hidden="true" />
        <motion.div className="track" style={{ x, width: `${N * 100}vw` }}>
          {LEVELS.map((lv, i) => (
            <div key={lv.id} className="level" style={{ background: `linear-gradient(${lv.sky}, ${lv.sky}00 70%)` }}>
              <div className="level-stage gutter">
                <motion.div
                  className="level-sprite"
                  animate={active === i ? { y: [0, -14, 0], rotate: [0, -4, 0] } : { y: 0, rotate: 0 }}
                  transition={{ duration: 1.4, repeat: active === i ? Infinity : 0, ease: 'easeInOut' }}
                >
                  <div className="qblock" aria-hidden="true">?</div>
                  <Pixel name={lv.sprite} size={10} />
                </motion.div>
                <LevelCard lv={lv} i={i} />
              </div>
              <div className="flag" aria-hidden="true"><span style={{ background: lv.c }} /></div>
            </div>
          ))}
        </motion.div>
        <div className="ground" aria-hidden="true" />
        <motion.div className="runner" style={{ y: jump }} aria-hidden="true">
          <Pixel name={frame ? 'run1' : 'run0'} size={6} bandana={team.c} />
        </motion.div>
        <ol className="level-dots" aria-label="Progresso nas estações">
          {LEVELS.map((lv, i) => (
            <li key={lv.id} className={i <= active ? 'done' : ''} style={{ '--c': lv.c }}>
              <span className="sr">{lv.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
