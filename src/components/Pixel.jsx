// Pixel art a partir de mapas de texto. Cada caracter é um pixel; '.' é transparente.
const SPRITES = {
  // corredor — B = bandana (cor da equipa)
  run0: [
    '....BBBBB...',
    '...BBBBBBBB.',
    '...SSSSS....',
    '..SSKSSKS...',
    '..SSSSSSS...',
    '...SSMMS....',
    '..JJJJJJJ...',
    '.SJJJJJJJS..',
    '.S.JJJJJ.S..',
    '...DDDDD....',
    '...DD.DD....',
    '..DD...DD...',
    '.WW.....WW..',
  ],
  run1: [
    '....BBBBB...',
    '...BBBBBBBB.',
    '...SSSSS....',
    '..SSKSSKS...',
    '..SSSSSSS...',
    '...SSMMS....',
    '..JJJJJJJ...',
    '..SJJJJJS...',
    '..SJJJJJS...',
    '...DDDDD....',
    '....DDD.....',
    '....DDD.....',
    '...WW.WW....',
  ],
  buzzer: [
    '....RRRR....',
    '..RRRRRRRR..',
    '.RRWWRRRRRR.',
    '.RRWRRRRRRR.',
    'RRRRRRRRRRRR',
    'KKKKKKKKKKKK',
    'GGGGGGGGGGGG',
    'GGGGGGGGGGGG',
  ],
  cassette: [
    'KKKKKKKKKKKKKK',
    'KYYYYYYYYYYYYK',
    'KYWWWWWWWWWWYK',
    'KYWWWWWWWWWWYK',
    'KYYYYYYYYYYYYK',
    'KYYKKKKKKKKYYK',
    'KYYKWKKKKWKYYK',
    'KYYKKKKKKKKYYK',
    'KYYYYYYYYYYYYK',
    'KKKKKKKKKKKKKK',
  ],
  hand: [
    '...W.W.W....',
    '..WSWSWSW...',
    '..WSWSWSW...',
    '..WSWSWSWW..',
    '..WSSSSSSSW.',
    '..WSSSSSSW..',
    '..WSSSSSSW..',
    '...WSSSSW...',
    '....WWWW....',
  ],
  cup: [
    'RRRRRRRRRR',
    'RWWRRRRRRR',
    '.RRRRRRRR.',
    '.RRRRRRRR.',
    '..RRRRRR..',
    '..RRRRRR..',
    '...RRRR...',
  ],
  card: [
    'KKKKKKKKKK',
    'KWWWWWWWWK',
    'KWPPWWPPWK',
    'KWPPWWPPWK',
    'KWWWWWWWWK',
    'KWWPPPPWWK',
    'KWWWWWWWWK',
    'KWWWWWWWWK',
    'KKKKKKKKKK',
  ],
  mega: [
    '.........YY.',
    '.......YYYY.',
    'KK...YYYYYY.',
    'KKKYYYYYYYY.',
    'KKKYYYYYYYY.',
    'KK...YYYYYY.',
    '.......YYYY.',
    '.........YY.',
  ],
  coin: [
    '..YYYY..',
    '.YWWYYY.',
    'YYWYYYKY',
    'YYWYYYKY',
    'YYWYYYKY',
    'YYYYYYKY',
    '.YYYYKY.',
    '..YYYY..',
  ],
  heart: [
    '.RR.RR.',
    'RWRRRRR',
    'RRRRRRR',
    '.RRRRR.',
    '..RRR..',
    '...R...',
  ],
}

const PAL = {
  K: '#111018', W: '#ffffff', S: '#f2b98a', M: '#b5473a', J: '#2c4bd6', D: '#1d1d3a',
  R: '#e8262f', G: '#5a5a6a', Y: '#ffd31a', P: '#8a4dff',
}

export default function Pixel({ name, size = 4, bandana = '#ff3e9a', label, className, style }) {
  const map = SPRITES[name]
  if (!map) return null
  const w = map[0].length, h = map.length
  const rects = []
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x]
      if (ch === '.') continue
      const fill = ch === 'B' ? bandana : PAL[ch]
      rects.push(<rect key={x + '-' + y} x={x} y={y} width="1.02" height="1.02" fill={fill} />)
    }
  })
  return (
    <svg
      className={className}
      style={style}
      width={w * size}
      height={h * size}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {rects}
    </svg>
  )
}
