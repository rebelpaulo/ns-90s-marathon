# The 90's Marathon

Proposta de team building anos 90 em scrollytelling. New Sheet – Brand Activation × Revenge of the 90s.
11 de dezembro de 2026 · MYRIAD by SANA Hotel.

Next.js (App Router) + TypeScript + GSAP ScrollTrigger + Lenis. Deploy na Vercel.

## Estrutura

| Cena | Componente | Técnica |
|---|---|---|
| Hero "INSERT TAPE" | `components/Hero.tsx` | Moviescroller: 6 clips Higgsfield (Seedance 2.0 Mini, 9:16) com scrub por scroll e "zapping" CRT entre canais |
| Ficha técnica | `components/Ficha.tsx` | Show-and-play (etiqueta VHS carimbada) |
| Como funciona | `components/ComoFunciona.tsx` | Animated transition: 180 pontos → 12 equipas → 6 estações → rotação → top 6 |
| Pontuação | `components/Pontuacao.tsx` | Graphic sequence (placar 10 / 5) |
| Estações | `components/Estacoes.tsx`, `StationAnim.tsx` | Cassete por estação (LADO A/B/C) + mini-animação SVG |
| Rebenta a Bolha | `components/DesafioFinal.tsx` | Sticky: 12 arcos a rebentar ao ritmo das ordens |
| Fecho | `components/Fecho.tsx` | Contacto + copiar email |

Todo o texto está em `lib/content.ts`.

- Mobile-first (`svh`, sticky CSS, testado a 390px). Lenis só em desktop com rato; em toque o scroll é nativo.
- `prefers-reduced-motion`: versão estática completa (sem vídeo, sem pinning).
- Só se anima `transform`/`opacity`.
- `robots: noindex`: é uma proposta para cliente.

## Media

Os renders originais do Higgsfield não estão no repo. `public/media/` tem as versões otimizadas:

```bash
scripts/process-media.sh <pasta-com-still-1..6.png-e-clip-1..6.mp4>
python3 scripts/make-og.py <still-1.png>   # public/og.jpg
```

Clips: 540×960, H.264 CRF 25, GOP 4 (seeks baratos no telemóvel), sem áudio, carregados como Blob.

## Desenvolvimento

```bash
npm install
npm run dev
```

## TODO / por decidir

- [ ] **Gritómetro dos 90**: o deck original diz "34 pessoas por equipa / 17 palavras", o que não bate com equipas de 15. O site mantém o texto sem números até decidirmos.
- [ ] **Nome / logo do cliente**: ainda não aparece (a confirmar).
- [ ] **Domínio** final.
