# The 90's Marathon: versão "filme"

> Branch `film-90s`. Site estático publicado no projeto Vercel `ns-90s-marathon-film`. Não mexe no `main` (Press Start) nem no `cartoon-90s`.

A apresentação inteira é uma só viagem em vídeo cartoon 90s, em ecrã inteiro, com o texto por cima:

Título → Como funciona → Pontuação → 6 estações → Rebenta a Bolha → Obrigada!

- **Motor:** `scroll-world.js` é o `scrub-engine.js` do skill **scroll-world** (oso95). A única alteração são os "beats", vários cartões de texto por cena.
- **Vídeo:** 11 clips Seedance 2.0 Mini 9:16 (Higgsfield). Cada clip começa na imagem da sua cena e acaba na imagem da seguinte, por isso não há cortes.
- **Conteúdo e configuração:** `film.js`, que também tem o HUD de camcorder e o botão de copiar o email.
- **Tema:** `film.css` com o tema cartoon (cartões cel com traço preto) e fontes self-hosted em `fonts/`.
- **Computador (>860px, rato):** 11 clips 16:9 em `media/wide/` (imagens alargadas com outpaint + clips encadeados), em ecrã inteiro com os cartões à esquerda.
- **Telemóvel (≤860px ou toque):** 11 clips 9:16 em `media/` em ecrã inteiro, com os cartões em baixo.

## Media

```bash
scripts/encode.sh <pasta com clip-01..11.mp4 9:16>        # → media/clip-NN.mp4 + still-NN.webp
scripts/encode-wide.sh <pasta com clip-01..11.mp4 16:9>   # → media/wide/clip-NN.mp4 + still-NN.webp
```

## Por decidir

- Gritómetro: o deck diz 34 pessoas e 17 palavras por equipa, mas as equipas têm 15.
- Nome e logo do cliente.
- Domínio.
