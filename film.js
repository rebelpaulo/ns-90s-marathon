/* The 90's Marathon — versão "filme": uma só viagem em vídeo, texto por cima.
   Motor: scroll-world (scroll-world.js), com "beats" de texto por cena.
   Cada atividade tem cartões de pitch + "Ver mais" (ecrã inteiro com tudo). */
(function () {
  var M = '#ff2e88', T = '#00e2cf', Y = '#ffd23f', P = '#b18cff';
  var EMAIL = 'matildefalcao@newsheet.pt';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function id2(n) { return String(n).padStart(2, '0'); }
  function media(n) {
    return {
      still: '/media/wide/still-' + id2(n) + '.webp', clip: '/media/wide/clip-' + id2(n) + '.mp4',
      stillMobile: '/media/still-' + id2(n) + '.webp', clipMobile: '/media/clip-' + id2(n) + '.mp4'
    };
  }
  function list(items) { return '<ul class="pts">' + items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'; }
  function more(key) { return '<button type="button" class="more" data-more="' + key + '">Ver mais <span aria-hidden="true">▸</span></button>'; }

  /* ---------------- conteúdo detalhado (cartões + "Ver mais") ---------------- */
  var NA_PRATICA = ['2 equipas por estação', 'Rondas de 10–12 min', 'Vencedora: 10 pontos · Perdedora: 5 pontos'];

  var ACT = {
    quiz: {
      scene: 4, n: 1, lado: 'A', nome: "Quiz 90's", tagline: 'Será que sabe tudo sobre os anos 90?',
      pitch: 'O aquecimento perfeito: duas equipas frente a frente, dedo no buzzer e perguntas de cultura pop, jogos, TV, música e curiosidades dos anos 90.',
      porque: 'Junta toda a gente à volta de memórias partilhadas. Quem viveu os 90 é a enciclopédia da equipa; quem não viveu aprende a ler o grupo e a decidir depressa. Decisão rápida, comunicação e gargalhadas logo na primeira ronda.',
      skills: ['Memória coletiva', 'Rapidez', 'Comunicação'],
      dinamica: ['Quiz com 2 buzzers, onde as equipas se enfrentam em perguntas de cultura pop, jogos, TV, música e curiosidades dos anos 90.'],
      pontuacao: '2 equipas por ronda: a que acertar mais perguntas ganha.',
      material: ['2 buzzers', 'Perguntas temáticas dos anos 90']
    },
    canta: {
      scene: 5, n: 2, lado: 'A', nome: 'Canta Connosco?!', tagline: 'Música!',
      pitch: 'Headphones postos, um êxito dos 90 a tocar… e de repente, silêncio. Quem consegue continuar a letra?',
      porque: 'Desbloqueia a timidez com a arma mais infalível: músicas que toda a gente sabe de cor. A equipa inteira canta, torce e sopra a letra. É energia pura e dá os momentos mais partilháveis do dia.',
      skills: ['Desinibição', 'Energia', 'Apoio à equipa'],
      dinamica: [
        'Cada jogador nomeado pela sua equipa ouve com headphones uma música icónica dos 90s (ex: Britney, Nirvana, Aqua).',
        'Passados alguns segundos, a música pára e o jogador tem de continuar a cantar a próxima frase.'
      ],
      pontuacao: 'Os pontos são ganhos por cada letra acertada. Quem acertar mais ganha.',
      material: ['Headphones', 'Playlist de êxitos dos anos 90']
    },
    macaca: {
      scene: 6, n: 3, lado: 'B', nome: 'Pedra, Papel ou Macaca', tagline: 'O recreio está de volta.',
      pitch: 'Versão remix entre o jogo da macaca e o pedra, papel ou tesoura: salta, encontra o adversário, joga… e corre!',
      porque: 'Movimento, estratégia e sorte na medida certa. Todos jogam, todos correm e ninguém fica de fora; a rotação constante obriga a equipa a estar atenta e a puxar uns pelos outros até ao último salto.',
      skills: ['Movimento', 'Reação', 'Inclusão'],
      dinamica: [
        'Os jogadores saltam de quadrado em quadrado (desenhados no chão). As duas equipas começam em simultâneo até se encontrarem frente a frente.',
        'No momento em que se encontram, jogam pedra, papel ou tesoura. Quem ganhar continua a saltar em direção à equipa contrária; quem perder corre para o fim da fila, enquanto outro elemento da equipa começa a saltar.'
      ],
      pontuacao: 'Objetivo: chegar ao lado da equipa adversária. A primeira equipa a conseguir, ganha.',
      material: ['Quadrados desenhados no chão']
    },
    tazos: {
      scene: 7, n: 4, lado: 'B', nome: 'Tazos & Cia', tagline: 'Atira o Tazo!',
      pitch: 'Tiro ao alvo à anos 90: tazos (ou discos coloridos) contra uma pirâmide de “red cups” americanos.',
      porque: 'Simples de explicar, viciante de jogar. A vez passa sempre ao colega, acerte ou falhe, por isso a vitória depende da equipa inteira e não do melhor atirador. Ritmo, foco e uma ponta de nostalgia em cada lançamento.',
      skills: ['Precisão', 'Ritmo de equipa', 'Competição saudável'],
      dinamica: [
        'Jogo estilo “tiro ao alvo”: atirar tazos (ou discos coloridos) contra uma pirâmide de “red cups” americanos.',
        'Cada equipa tem de derrubar 10 copos. Quer acerte, quer falhe, o jogador passa a vez ao colega seguinte.'
      ],
      pontuacao: 'Ganha a equipa que derrubar os 10 copos primeiro.',
      material: ['Tazos ou discos coloridos', 'Pirâmide de 10 red cups por equipa']
    },
    mimica: {
      scene: 8, n: 5, lado: 'C', nome: "Mímica 90's", tagline: 'Só gestos. Zero palavras.',
      pitch: 'Power Rangers, Friends, Dragon Ball, Titanic… os ícones dos 90 contados só com expressões e gestos, sem som.',
      porque: 'Comunicação não-verbal no seu melhor: obriga a observar, a interpretar e a confiar em quem está ao lado. O papel de quem faz mímica roda constantemente, por isso toda a gente passa pelo “palco”.',
      skills: ['Comunicação não-verbal', 'Criatividade', 'Escuta'],
      dinamica: [
        'Cartões de vários temas, sobre filmes, séries e jogos: Power Rangers, Friends, Dragon Ball, Titanic, etc.',
        '1 elemento da equipa faz mímica enquanto o primeiro da fila tenta adivinhar; se adivinhar, passa a ser quem faz mímica. Quem adivinha tem 3 tentativas para acertar; caso contrário, vai para o fim da fila.',
        'Cada equipa tem 10 cartões e só são permitidas expressões e gestos, sem som.'
      ],
      pontuacao: 'O jogo termina quando uma das equipas terminar os seus cartões.',
      material: ['10 cartões por equipa']
    },
    grito: {
      scene: 9, n: 6, lado: 'C', nome: 'Gritómetro dos 90', tagline: 'Grita até encontrares o teu par.',
      pitch: 'Cada jogador recebe uma palavra dos anos 90; cada palavra existe em dois cartões. Ao apito, é gritar até encontrar o par!',
      porque: 'O caos mais organizado da maratona: liberta energia, quebra barreiras e obriga cada um a ouvir no meio do ruído. Uma estação curta, intensa e impossível de jogar sem rir.',
      skills: ['Escuta ativa', 'Energia', 'Coordenação'],
      dinamica: [
        'Cada jogador recebe um cartão com uma palavra dentro da temática dos 90’s. Cada palavra existe em dois cartões.',
        'Ao som de um apito, os jogadores têm de gritar a sua palavra de forma a encontrar o seu par.'
      ],
      pontuacao: 'A primeira equipa a encontrar todos os pares vence.',
      material: ['Cartões com palavras dos anos 90 (em pares)', 'Apito']
    },
    bolha: {
      scene: 10, nome: 'Rebenta a Bolha', tagline: 'Desafio final · o vencedor dos vencedores',
      pitch: 'A grande final: das 6 equipas com mais pontos, cada uma elege 2 elementos. São 12 jogadores, 12 arcos e ordens ao ritmo da música.',
      porque: 'Fecha a maratona com a sala inteira a torcer. A eliminação progressiva cria suspense até ao último salto e coroa o vencedor dos vencedores à frente de todos.',
      skills: ['Atenção', 'Reflexos', 'Momento de palco'],
      dinamica: [
        'Os finalistas: das 6 equipas com mais pontos, escolhem-se 2 elementos eleitos por equipa para jogar.',
        'Existem 12 arcos no chão e cada jogador ocupa um arco. Ao som de música e à voz de comando do coordenador, os jogadores movimentam-se conforme o que vai sendo pedido: “Todos a saltar para a direita”, “dentro, fora, esquerda”.'
      ],
      pontuacao: 'O objetivo é seguir as ordens sem enganos: cada vez que um elemento se engana, sai. Ganha a equipa que ficar em jogo por último.',
      material: ['12 arcos', 'Música', 'Coordenador com voz de comando'],
      pratica: ['12 finalistas (2 por equipa)', '6 equipas na final', 'Vence a última equipa em jogo']
    },
    formato: {
      scene: 2, nome: 'Como funciona', tagline: 'Uma maratona de 6 estações e uma grande final.',
      pitch: '180 participantes, 12 equipas de 15 pessoas, cada uma com a sua bandana de cor.',
      porque: 'O formato garante que toda a gente joga o tempo todo: 6 estações em simultâneo, rotação a cada ronda e um sistema de pontos que mantém todas as equipas na corrida até ao fim.',
      skills: ['180 pessoas', '12 equipas', '6 estações'],
      dinamica: [
        '12 equipas com 15 pessoas cada.',
        'Cada equipa terá uma bandana de cor identificativa, entrando no espírito dos anos 90 desde o primeiro momento!',
        'Jogam 2 equipas por estação, em 6 estações simultâneas.',
        'Após cada ronda (10–12 min), as equipas rodam de acordo com a ordem do jogo.',
        'No final das 6 estações, as 6 equipas com mais pontos confrontam-se num desafio final, por forma a encontrar o vencedor dos vencedores.'
      ],
      pontuacao: 'Equipa vencedora da estação: 10 pontos · Equipa perdedora: 5 pontos. Este sistema mantém a competição equilibrada e motiva todas as equipas a continuarem a jogar.',
      material: ['12 bandanas de cor', '6 estações montadas em simultâneo'],
      pratica: ['Rondas de 10–12 min', 'Rotação pela ordem do jogo', 'Final com as 6 melhores equipas']
    }
  };

  /* beats de uma atividade: 1) pitch e porque funciona  2) como se joga */
  function actBeats(key, ladoLabel) {
    var a = ACT[key];
    return [
      { eyebrow: ladoLabel, title: a.nome,
        html: '<p class="tagline">' + esc(a.tagline) + '</p><p class="sw-copy__body">' + esc(a.pitch) + '</p>' +
              '<p class="why"><b>Porque funciona</b> ' + esc(a.porque) + '</p>' +
              '<ul class="sw-copy__tags">' + a.skills.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' + more(key) },
      { eyebrow: a.nome + ' · como se joga', title: 'Como se joga',
        html: list(a.dinamica.slice(-2)) + '<p class="score-line"><b>Pontuação</b> ' + esc(a.pontuacao) + '</p>' +
              '<p class="kit"><b>Material</b> ' + esc(a.material.join(' · ')) + '</p>' + more(key) }
    ];
  }

  function sec(n, o) { var m = media(n); for (var k in m) o[k] = m[k]; return o; }

  var sections = [
    sec(1, { label: 'Início', accent: Y, scroll: 2.2,
      beats: [
        { eyebrow: 'Revenge of the 90s apresenta', title: "THE 90'S MARATHON",
          body: 'O team building mais caótico e divertido, desenhado pela equipa da Revenge of the 90s!',
          tags: ['11 de dezembro de 2026', 'MYRIAD by SANA Hotel', 'Tema: Anos 90'] },
        { eyebrow: 'Insert tape', title: 'Que comece esta viagem no tempo!',
          body: 'Esta maratona reúne os mais icónicos jogos, músicas, séries e filmes que marcaram quem cresceu e viveu nesta década: 6 estações, 12 equipas e uma grande final para encontrar o vencedor dos vencedores.' }
      ] }),
    sec(2, { label: 'Como funciona', accent: T, scroll: 2.6,
      beats: [
        { eyebrow: 'Como funciona? · o formato', title: '12 equipas × 15 pessoas',
          html: list(['180 participantes divididos em 12 equipas de 15 pessoas.',
                      'Cada equipa tem uma bandana de cor identificativa, entrando no espírito dos anos 90 desde o primeiro momento!']) + more('formato') },
        { eyebrow: 'Como funciona? · as rondas', title: '6 estações em simultâneo',
          html: list(['Jogam 2 equipas por estação, em 6 estações simultâneas.',
                      'Após cada ronda (10–12 min), as equipas rodam de acordo com a ordem do jogo.']) + more('formato') },
        { eyebrow: 'Como funciona? · a final', title: 'O vencedor dos vencedores',
          html: '<p class="sw-copy__body">No final das 6 estações, as 6 equipas com mais pontos confrontam-se num desafio final, por forma a encontrar o vencedor dos vencedores.</p>' + more('formato') }
      ] }),
    sec(3, { label: 'Pontuação', accent: M, scroll: 1.6,
      beats: [
        { eyebrow: 'Sistema de pontuação', title: 'Todas as equipas pontuam',
          html: '<div class="score"><div><b style="color:#ff2e88">10</b><span>Equipa vencedora da estação</span></div><div><b style="color:#00e2cf">5</b><span>Equipa perdedora da estação</span></div></div>' +
                '<p class="sw-copy__body">Este sistema mantém a competição equilibrada e motiva todas as equipas a continuarem a jogar.</p>' }
      ] }),
    sec(4, { label: 'Quiz 90’s', accent: M, scroll: 2.2, beats: actBeats('quiz', 'Estação 1 · Lado A') }),
    sec(5, { label: 'Canta Connosco?!', accent: T, scroll: 2.2, beats: actBeats('canta', 'Estação 2 · Lado A') }),
    sec(6, { label: 'Pedra, Papel ou Macaca', accent: Y, scroll: 2.2, beats: actBeats('macaca', 'Estação 3 · Lado B') }),
    sec(7, { label: 'Tazos & Cia', accent: P, scroll: 2.2, beats: actBeats('tazos', 'Estação 4 · Lado B') }),
    sec(8, { label: 'Mímica 90’s', accent: M, scroll: 2.2, beats: actBeats('mimica', 'Estação 5 · Lado C') }),
    sec(9, { label: 'Gritómetro dos 90', accent: T, scroll: 2.2, beats: actBeats('grito', 'Estação 6 · Lado C') }),
    sec(10, { label: 'Rebenta a Bolha', accent: Y, scroll: 2.2, beats: actBeats('bolha', 'Desafio final') }),
    sec(11, { label: 'Obrigada!', accent: M, scroll: 1.6,
      beats: [
        { eyebrow: '⏏ Eject · fim da fita', title: 'Obrigada!',
          html: '<div class="contact" id="fim"><p class="contact__name">Matilde Falcão</p><p class="contact__role">Junior Account Manager</p>' +
                '<p class="contact__mail"><a href="mailto:' + EMAIL + '" id="email">' + EMAIL + '</a><button type="button" class="copy" id="copy">Copiar</button></p>' +
                '<span class="sr-only" role="status" aria-live="polite" id="copy-status"></span></div>',
          tags: ['New Sheet – Brand Activation × Revenge of the 90s'] }
      ] })
  ];

  mountScrollWorld(document.getElementById('world'), {
    sections: sections,
    connectors: [],          // cada clip já termina na imagem da cena seguinte: sem conectores
    crossfade: 0.03,
    nav: false,
    atmosphere: false,
    hint: 'scroll para dar play'
  });

  /* ---------------- "Ver mais": a atividade em ecrã inteiro ---------------- */
  var dlg = document.getElementById('detail'), body = document.getElementById('detail-body'), lastFocus = null;
  var wide = function () { return window.matchMedia('(min-width: 861px)').matches; };

  function openDetail(key) {
    var a = ACT[key]; if (!a) return;
    var m = media(a.scene), acc = sections[a.scene - 1].accent;
    var pratica = a.pratica || NA_PRATICA;
    body.style.setProperty('--acc', acc);
    body.innerHTML =
      '<div class="d-media">' +
        '<video class="d-video" muted loop playsinline autoplay preload="metadata" poster="' + (wide() ? m.still : m.stillMobile) + '" src="' + (wide() ? m.clip : m.clipMobile) + '"></video>' +
      '</div>' +
      '<div class="d-text">' +
        '<p class="d-eyebrow">' + (a.n ? 'Estação ' + a.n + ' · Lado ' + a.lado : esc(a.tagline)) + '</p>' +
        '<h2 class="d-title" id="detail-title">' + esc(a.nome) + '</h2>' +
        (a.n ? '<p class="d-tagline">' + esc(a.tagline) + '</p>' : '') +
        '<p class="d-lead">' + esc(a.pitch) + '</p>' +
        '<section><h3>Porque funciona</h3><p>' + esc(a.porque) + '</p><ul class="sw-copy__tags">' + a.skills.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></section>' +
        '<section><h3>' + (a.n || a.scene === 10 ? 'Dinâmica' : 'O formato') + '</h3>' + a.dinamica.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</section>' +
        '<section><h3>' + (key === 'macaca' || key === 'grito' ? 'Objetivo' : 'Pontuação') + '</h3><p>' + esc(a.pontuacao) + '</p></section>' +
        '<section class="d-grid"><div><h3>Material</h3>' + list(a.material) + '</div><div><h3>Na prática</h3>' + list(pratica) + '</div></section>' +
        '<section><h3>Imagens</h3><div class="d-gallery">' +
          '<img src="' + m.still + '" alt="Ilustração da atividade ' + esc(a.nome) + ' em formato panorâmico" loading="lazy">' +
          '<img src="' + m.stillMobile + '" alt="Ilustração da atividade ' + esc(a.nome) + ' em formato vertical" loading="lazy">' +
        '</div></section>' +
      '</div>';
    lastFocus = document.activeElement;
    document.documentElement.classList.add('detail-open');
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    var v = body.querySelector('video');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); }
    else { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    dlg.querySelector('.d-close').focus();
  }
  function closeDetail() {
    var v = body.querySelector('video'); if (v) { v.pause(); v.removeAttribute('src'); v.load(); }
    if (dlg.open) { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
    document.documentElement.classList.remove('detail-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  dlg.addEventListener('close', function () { document.documentElement.classList.remove('detail-open'); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.closest('.d-close')) closeDetail(); });
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); closeDetail(); });

  /* ---------------- cliques: "Ver mais" e copiar email ---------------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-more], #copy') : null;
    if (!t) return;
    if (t.hasAttribute('data-more')) { openDetail(t.getAttribute('data-more')); return; }
    var btn = t, status = document.getElementById('copy-status');
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

  /* ---------------- HUD de camcorder ---------------- */
  var tc = document.getElementById('hud-tc'), mode = document.getElementById('hud-mode');
  var last = window.scrollY, idle, ticking = false;
  function fmt(s) { var h = Math.floor(s / 3600), mm = Math.floor(s % 3600 / 60), x = Math.floor(s % 60);
    return h + ':' + String(mm).padStart(2, '0') + ':' + String(x).padStart(2, '0'); }
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
})();
