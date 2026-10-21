# The 90's Marathon — Press Start (versão Motion)

Proposta de team building anos 90 como um videojogo 16-bit:
título → player select → manual → mundo de 6 níveis (scroll horizontal) → boss "Rebenta a Bolha" → créditos.

React 18 + Motion (`motion/react`) + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ para deploy estático (Vercel)
```

## Regras de scrollytelling seguidas
- Scroll nativo sempre no controlo (sem scroll-jacking nem snap); o mundo horizontal é uma secção alta com stage sticky.
- Câmara "para" em cada nível (55% do troço) antes de avançar, para dar tempo de leitura.
- Todo o texto está no DOM e legível sem animação; `prefers-reduced-motion` troca o mundo horizontal por uma lista vertical.
- Só se anima transform/opacity; mobile-first com unidades `svh`.

## Estrutura
- `src/content.js` — todo o texto da proposta (editar aqui).
- `src/components/Pixel.jsx` — sprites pixel art a partir de mapas de texto.
- `src/components/World.jsx` — o mundo de 6 estações.
- `src/components/Boss.jsx` — desafio final.

## Por decidir
- Gritómetro: o deck original refere 34 pessoas/17 palavras por equipa, mas as equipas têm 15.
- Nome/logo do cliente no ecrã de título.
