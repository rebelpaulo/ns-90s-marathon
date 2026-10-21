import { useState, useCallback } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { TEAMS, LEVELS } from './content.js'
import Title from './components/Title.jsx'
import Select from './components/Select.jsx'
import Manual from './components/Manual.jsx'
import World from './components/World.jsx'
import Boss from './components/Boss.jsx'
import Credits from './components/Credits.jsx'
import Pixel from './components/Pixel.jsx'

function pad(n, l) {
  return String(n).padStart(l, '0')
}

export default function App() {
  const [team, setTeam] = useState(TEAMS[0])
  const [hud, setHud] = useState({ level: 0, score: 0, time: 720 })
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })

  // cleared = estações já passadas; cada uma vale 10 (a melhor pontuação possível do jogador)
  const onLevel = useCallback((idx, cleared, hold) => {
    setHud({ level: idx, score: cleared * 10, time: Math.round(720 * (1 - hold)) })
  }, [])

  return (
    <>
      <a className="skip" href="#credits">Saltar para o contacto</a>
      <div className="hud" aria-hidden="true">
        <div className="hud-cell">
          <span>1UP</span>
          <b><Pixel name="run0" size={2} bandana={team.c} /> {team.name.toUpperCase()}</b>
        </div>
        <div className="hud-cell"><span>SCORE</span><b>{pad(hud.score, 6)}</b></div>
        <div className="hud-cell"><span>WORLD</span><b>{LEVELS[hud.level].world}</b></div>
        <div className="hud-cell"><span>TIME</span><b>{pad(Math.floor(hud.time / 60), 2)}:{pad(hud.time % 60, 2)}</b></div>
      </div>
      <motion.div className="progress" style={{ scaleX: bar }} aria-hidden="true" />
      <main>
        <Title team={team} />
        <Select team={team} setTeam={setTeam} />
        <Manual />
        <World team={team} onLevel={onLevel} />
        <Boss />
      </main>
      <Credits team={team} />
    </>
  )
}
