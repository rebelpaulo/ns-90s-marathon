/* The 90's Marathon — versão "filme": uma só viagem em vídeo, texto por cima.
   Motor: scroll-world (scroll-world.js), com "beats" de texto por cena. */
(function () {
  var M = '#ff2e88', T = '#00e2cf', Y = '#ffd23f', P = '#b18cff';
  var EMAIL = 'matildefalcao@newsheet.pt';

  function sec(n, o) {
    var id = String(n).padStart(2, '0');
    o.still = '/media/still-' + id + '.webp';
    o.clip = '/media/clip-' + id + '.mp4';
    return o;
  }

  var sections = [
    sec(1, {
      label: 'Início', accent: Y, scroll: 2.2,
      beats: [
        { eyebrow: 'Revenge of the 90s apresenta', title: "THE 90'S MARATHON",
          body: 'O team building mais caótico e divertido, desenhado pela equipa da Revenge of the 90s!',
          tags: ['11 de dezembro de 2026', 'MYRIAD by SANA Hotel', 'Tema: Anos 90'] },
        { eyebrow: 'Insert tape', title: 'Que comece esta viagem no tempo!',
          body: 'Esta maratona reúne os mais icónicos jogos, músicas, séries e filmes que marcaram quem cresceu e viveu nesta década.' }
      ]
    }),
    sec(2, {
      label: 'Como funciona', accent: T, scroll: 3.2,
      beats: [
        { eyebrow: 'Como funciona? · 1', title: '12 equipas × 15 pessoas', body: '180 participantes divididos em 12 equipas de 15 pessoas cada.' },
        { eyebrow: 'Como funciona? · 2', title: 'Uma bandana por equipa', body: 'Cada equipa terá uma bandana de cor identificativa, entrando no espírito dos anos 90 desde o primeiro momento!' },
        { eyebrow: 'Como funciona? · 3', title: '6 estações em simultâneo', body: 'Jogam 2 equipas por estação, em 6 estações simultâneas.' },
        { eyebrow: 'Como funciona? · 4', title: 'Rondas de 10–12 min', body: 'Após cada ronda, as equipas rodam de acordo com a ordem do jogo.' },
        { eyebrow: 'Como funciona? · 5', title: 'O vencedor dos vencedores', body: 'No final das 6 estações, as 6 equipas com mais pontos confrontam-se num desafio final, por forma a encontrar o vencedor dos vencedores.' }
      ]
    }),
    sec(3, {
      label: 'Pontuação', accent: M, scroll: 1.6,
      beats: [
        { eyebrow: 'Sistema de pontuação', title: '10 pontos · 5 pontos',
          html: '<div class="score"><div><b style="color:#ff2e88">10</b><span>Equipa vencedora da estação</span></div><div><b style="color:#00e2cf">5</b><span>Equipa perdedora da estação</span></div></div>',
          body: 'Este sistema mantém a competição equilibrada e motiva todas as equipas a continuarem a jogar.' }
      ]
    }),
    sec(4, {
      label: 'Quiz 90’s', accent: M, scroll: 2.2,
      beats: [
        { eyebrow: 'Estação 1 · Lado A', title: "Quiz 90's", body: 'Será que sabe tudo sobre os anos 90?' },
        { eyebrow: 'Dinâmica', title: '2 buzzers, 2 equipas', body: 'Quiz com 2 buzzers, onde as equipas se enfrentam em perguntas de cultura pop, jogos, TV, música e curiosidades dos anos 90.' },
        { eyebrow: 'Pontuação', title: 'Quem acerta mais, ganha', body: '2 equipas por ronda: a que acertar mais perguntas ganha.' }
      ]
    }),
    sec(5, {
      label: 'Canta Connosco?!', accent: T, scroll: 2.6,
      beats: [
        { eyebrow: 'Estação 2 · Lado A', title: 'Canta Connosco?!', body: 'Música!' },
        { eyebrow: 'Música', title: 'Headphones postos', body: 'Cada jogador nomeado pela sua equipa ouve com headphones uma música icónica dos 90s (ex: Britney, Nirvana, Aqua).' },
        { eyebrow: 'Dinâmica', title: 'A música pára…', body: 'Passados alguns segundos, a música pára e o jogador tem de continuar a cantar a próxima frase.' },
        { eyebrow: 'Pontuação', title: 'Letra certa = pontos', body: 'Os pontos são ganhos por cada letra acertada. Quem acertar mais ganha.' }
      ]
    }),
    sec(6, {
      label: 'Pedra, Papel ou Macaca', accent: Y, scroll: 2.6,
      beats: [
        { eyebrow: 'Estação 3 · Lado B', title: 'Pedra, Papel ou Macaca', body: 'Versão remix entre o jogo da macaca e o pedra, papel ou tesoura.' },
        { eyebrow: 'Preparação', title: 'Salta, salta, salta', body: 'Os jogadores saltam de quadrado em quadrado (desenhados no chão). As duas equipas começam em simultâneo até se encontrarem frente a frente.' },
        { eyebrow: 'Confronto', title: 'Pedra, papel ou tesoura!', body: 'Quem ganhar continua a saltar em direção à equipa contrária; quem perder corre para o fim da fila, enquanto outro elemento da equipa começa a saltar.' },
        { eyebrow: 'Objetivo', title: 'Chegar ao outro lado', body: 'Chegar ao lado da equipa adversária: a primeira equipa a conseguir, ganha.' }
      ]
    }),
    sec(7, {
      label: 'Tazos & Cia', accent: P, scroll: 2.2,
      beats: [
        { eyebrow: 'Estação 4 · Lado B', title: 'Tazos & Cia', body: 'Atira o Tazo: jogo estilo “tiro ao alvo”, atirar tazos (ou discos coloridos) contra uma pirâmide de “red cups” americanos.' },
        { eyebrow: 'Dinâmica', title: '10 copos para derrubar', body: 'Cada equipa tem de derrubar 10 copos. Quer acerte, quer falhe, o jogador passa a vez ao colega seguinte.' },
        { eyebrow: 'Pontuação', title: 'Primeiro a limpar a mesa', body: 'Ganha a equipa que derrubar os 10 copos primeiro.' }
      ]
    }),
    sec(8, {
      label: 'Mímica 90’s', accent: M, scroll: 2.6,
      beats: [
        { eyebrow: 'Estação 5 · Lado C', title: "Mímica 90's", body: 'Cartões de vários temas, sobre filmes, séries e jogos: Power Rangers, Friends, Dragon Ball, Titanic, etc.' },
        { eyebrow: 'Dinâmica', title: 'Só gestos, sem som', body: 'Um elemento faz mímica enquanto o primeiro da fila tenta adivinhar; se adivinhar, passa a ser quem faz mímica. Tem 3 tentativas; caso contrário, vai para o fim da fila.' },
        { eyebrow: 'Dinâmica', title: '10 cartões por equipa', body: 'Cada equipa tem 10 cartões e só são permitidas expressões e gestos, sem som.' },
        { eyebrow: 'Pontuação', title: 'Acabou o baralho?', body: 'O jogo termina quando uma das equipas terminar os seus cartões.' }
      ]
    }),
    sec(9, {
      label: 'Gritómetro dos 90', accent: T, scroll: 2.2,
      beats: [
        { eyebrow: 'Estação 6 · Lado C', title: 'Gritómetro dos 90', body: 'Cada jogador recebe um cartão com uma palavra dentro da temática dos 90’s. Cada palavra existe em dois cartões.' },
        { eyebrow: 'Dinâmica', title: 'Ao som do apito', body: 'Os jogadores têm de gritar a sua palavra de forma a encontrar o seu par.' },
        { eyebrow: 'Objetivo', title: 'Todos os pares', body: 'A primeira equipa a encontrar todos os pares vence.' }
      ]
    }),
    sec(10, {
      label: 'Rebenta a Bolha', accent: Y, scroll: 2.4,
      beats: [
        { eyebrow: 'Desafio final', title: 'Rebenta a Bolha', body: 'Os finalistas: das 6 equipas com mais pontos, cada uma elege 2 elementos para jogar.' },
        { eyebrow: 'A dinâmica', title: '12 arcos, 12 jogadores', body: 'Cada jogador ocupa um arco. Ao som de música e à voz de comando do coordenador: “Todos a saltar para a direita”, “dentro, fora, esquerda”.' },
        { eyebrow: 'Pontuação', title: 'O último em jogo ganha', body: 'Seguir as ordens sem enganos: cada vez que um elemento se engana, sai. Ganha a equipa que ficar em jogo por último.' }
      ]
    }),
    sec(11, {
      label: 'Obrigada!', accent: M, scroll: 1.6,
      beats: [
        { eyebrow: '⏏ Eject · fim da fita', title: 'Obrigada!',
          html: '<div class="contact" id="fim"><p class="contact__name">Matilde Falcão</p><p class="contact__role">Junior Account Manager</p>' +
                '<p class="contact__mail"><a href="mailto:' + EMAIL + '" id="email">' + EMAIL + '</a><button type="button" class="copy" id="copy">Copiar</button></p>' +
                '<span class="sr-only" role="status" aria-live="polite" id="copy-status"></span></div>',
          tags: ['New Sheet – Brand Activation × Revenge of the 90s'] }
      ]
    })
  ];

  mountScrollWorld(document.getElementById('world'), {
    sections: sections,
    connectors: [],          // cada clip já termina na imagem da cena seguinte: sem conectores
    crossfade: 0.03,         // troca de clip invisível (o último frame = o 1.º frame seguinte)
    nav: false,
    atmosphere: false,
    hint: 'scroll para dar play'
  });

  // ---------- HUD de camcorder ----------
  var tc = document.getElementById('hud-tc'), mode = document.getElementById('hud-mode');
  var last = window.scrollY, idle, ticking = false;
  function fmt(s) { var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = Math.floor(s % 60);
    return h + ':' + String(m).padStart(2, '0') + ':' + String(x).padStart(2, '0'); }
  function hud() {
    ticking = false;
    var max = Math.max(1, document.documentElement.scrollHeight - innerHeight), y = window.scrollY, p = Math.min(1, y / max);
    tc.textContent = 'SP ' + fmt(p * 7200);
    var end = p > 0.995 ? '⏏ EJECT' : null;
    mode.textContent = end || (y > last ? '▶▶ FF' : y < last ? '◀◀ REW' : '▶ PLAY');
    clearTimeout(idle); idle = setTimeout(function () { mode.textContent = end || '▶ PLAY'; }, 220);
    last = y;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(hud); } }, { passive: true });
  hud();

  // ---------- copiar email ----------
  document.addEventListener('click', function (e) {
    if (!e.target || e.target.id !== 'copy') return;
    var btn = e.target, status = document.getElementById('copy-status');
    var done = function (ok) {
      btn.textContent = ok ? 'Copiado ✓' : 'Seleciona e copia';
      status.textContent = ok ? 'Email copiado' : '';
      setTimeout(function () { btn.textContent = 'Copiar'; status.textContent = ''; }, 2200);
    };
    var fallback = function () {
      var el = document.getElementById('email'), r = document.createRange();
      r.selectNodeContents(el); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      var ok = false; try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      done(ok);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(EMAIL).then(function () { done(true); }, fallback);
    else fallback();
  });
})();
