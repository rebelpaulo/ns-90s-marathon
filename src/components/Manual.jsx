import { memo } from 'react'
import { motion } from 'motion/react'
import { MANUAL, SCORE } from '../content.js'
import Pixel from './Pixel.jsx'

// Manual de instruções da cartridge: as regras e o sistema de pontos como "power-ups".
function Manual() {
  return (
    <section className="manual band-pad gutter" id="manual" aria-labelledby="manual-h">
      <div className="wrap">
        <p className="kicker dark">MANUAL DE INSTRUÇÕES · PÁG. 2–3</p>
        <h2 id="manual-h" className="h2 dark">Como se joga</h2>
        <div className="manual-pages">
          {MANUAL.map((m, i) => (
            <motion.article
              key={m.k}
              className="page"
              initial={{ opacity: 0, rotate: i % 2 ? 3 : -3, y: 30 }}
              whileInView={{ opacity: 1, rotate: i % 2 ? 1 : -1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.08 }}
            >
              <p className="page-k">{m.k}</p>
              <p className="page-v">{m.v}</p>
              <p>{m.d}</p>
            </motion.article>
          ))}
        </div>

        <div className="powerups" aria-labelledby="pts-h">
          <h3 id="pts-h" className="h3 dark">Pontuação</h3>
          <div className="pu-row">
            {[
              { n: SCORE.win, t: 'Equipa vencedora da estação', coins: 2 },
              { n: SCORE.lose, t: 'Equipa perdedora da estação', coins: 1 },
            ].map((p) => (
              <motion.div key={p.n} className="pu" whileHover={{ y: -6 }}>
                <div className="pu-coins" aria-hidden="true">
                  {Array.from({ length: p.coins }).map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    >
                      <Pixel name="coin" size={6} />
                    </motion.span>
                  ))}
                </div>
                <p className="pu-n">+{p.n}</p>
                <p className="pu-t">{p.t}</p>
              </motion.div>
            ))}
          </div>
          <p className="pu-note">{SCORE.note}</p>
        </div>
      </div>
    </section>
  )
}

export default memo(Manual)
