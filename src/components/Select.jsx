import { motion, AnimatePresence } from 'motion/react'
import { TEAMS } from '../content.js'
import Pixel from './Pixel.jsx'

// "Player select": escolher uma das 12 bandanas. A cor escolhida segue o jogador pelo resto do site.
export default function Select({ team, setTeam }) {
  return (
    <section className="select band-pad gutter" id="select" aria-labelledby="select-h">
      <div className="wrap">
        <p className="kicker">PLAYER SELECT</p>
        <h2 id="select-h" className="h2">12 equipas. 15 jogadores cada. Escolhe a tua bandana.</h2>
        <div className="select-grid">
          <div className="portrait" aria-live="polite">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={team.name}
                initial={{ y: 30, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -30, opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="portrait-sprite"
              >
                <Pixel name="run0" size={14} bandana={team.c} label={'Jogador da equipa ' + team.name} />
              </motion.div>
            </AnimatePresence>
            <p className="portrait-name">EQUIPA <b style={{ color: team.c }}>{team.name.toUpperCase()}</b></p>
            <p className="portrait-stats">15 JOGADORES · 1 BANDANA</p>
          </div>
          <div className="swatches" role="radiogroup" aria-label="Cor da equipa">
            {TEAMS.map((t, i) => (
              <motion.button
                key={t.name}
                type="button"
                role="radio"
                aria-checked={t.name === team.name}
                aria-label={t.name}
                className={'swatch' + (t.name === team.name ? ' on' : '')}
                style={{ '--c': t.c }}
                onClick={() => setTeam(t)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.03 }}
              >
                <span className="swatch-num">{String(i + 1).padStart(2, '0')}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
