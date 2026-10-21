// Todo o conteúdo da proposta (fonte: deck "Team Building – The 90's Marathon").
export const EVENT = {
  title: "THE 90'S MARATHON",
  presenter: 'Revenge of the 90s apresenta',
  date: '11 DEZ 2026',
  venue: 'MYRIAD by SANA Hotel',
  theme: 'Anos 90',
  pitch:
    'O team building mais caótico e divertido, desenhado pela equipa da Revenge of the 90s. Os jogos, as músicas, as séries e os filmes mais icónicos de quem cresceu e viveu nesta década, numa só maratona.',
}

export const TEAMS = [
  { name: 'Magenta', c: '#ff3e9a' },
  { name: 'Turquesa', c: '#16d3c4' },
  { name: 'Amarelo', c: '#ffd31a' },
  { name: 'Roxo', c: '#8a4dff' },
  { name: 'Laranja', c: '#ff7a1a' },
  { name: 'Verde', c: '#3fd13f' },
  { name: 'Azul', c: '#3a7bff' },
  { name: 'Vermelho', c: '#e8262f' },
  { name: 'Lilás', c: '#c890ff' },
  { name: 'Branco', c: '#f4f4f4' },
  { name: 'Menta', c: '#7ff0c0' },
  { name: 'Rosa', c: '#ffb0d6' },
]

export const MANUAL = [
  { k: 'JOGADORES', v: '12 equipas × 15 pessoas', d: 'Cada equipa recebe uma bandana de cor identificativa. O espírito anos 90 começa no primeiro minuto.' },
  { k: 'MODO', v: '2 equipas por estação', d: 'Seis estações a jogar em simultâneo, sempre duas equipas frente a frente.' },
  { k: 'RONDAS', v: '10–12 min', d: 'No fim de cada ronda, as equipas rodam para a estação seguinte, de acordo com a ordem do jogo.' },
  { k: 'FINAL', v: 'Top 6 → Boss', d: 'Depois das 6 estações, as 6 equipas com mais pontos enfrentam-se no desafio final para encontrar o vencedor dos vencedores.' },
]

export const SCORE = { win: 10, lose: 5, note: 'Perder uma estação não tira ninguém da corrida. O sistema mantém a competição equilibrada e motiva todas as equipas a continuarem a jogar.' }

export const LEVELS = [
  {
    id: 'quiz', world: '1-1', name: "Quiz 90's", sprite: 'buzzer', sky: '#5c94fc', c: '#ff3e9a',
    hook: 'Será que sabe tudo sobre os anos 90?',
    rules: [
      ['Dinâmica', 'Quiz com 2 buzzers. As equipas enfrentam-se em perguntas de cultura pop, jogos, TV, música e curiosidades da década.'],
      ['Vence', 'A equipa que acertar mais perguntas.'],
    ],
  },
  {
    id: 'canta', world: '1-2', name: 'Canta Connosco?!', sprite: 'cassette', sky: '#ff9ec7', c: '#ffd31a',
    hook: 'A música pára. Tu não.',
    rules: [
      ['Dinâmica', 'O jogador nomeado pela equipa ouve, com headphones, uma música icónica dos 90s (Britney, Nirvana, Aqua…). Passados alguns segundos a música pára e tem de continuar a cantar a frase seguinte.'],
      ['Vence', 'Pontos por cada letra acertada. Ganha quem acertar mais.'],
    ],
  },
  {
    id: 'macaca', world: '1-3', name: 'Pedra, Papel ou Macaca', sprite: 'hand', sky: '#7fe0d0', c: '#16d3c4',
    hook: 'O remix da macaca com o pedra, papel ou tesoura.',
    rules: [
      ['Preparação', 'Quadrados desenhados no chão. As duas equipas saltam em simultâneo, de quadrado em quadrado, até ficarem frente a frente.'],
      ['Confronto', 'Jogam pedra, papel ou tesoura. Quem ganha continua a saltar em direção à equipa contrária; quem perde corre para o fim da fila e sai o colega seguinte.'],
      ['Vence', 'A primeira equipa a chegar ao lado adversário.'],
    ],
  },
  {
    id: 'tazos', world: '1-4', name: 'Tazos & Cia', sprite: 'cup', sky: '#ffb347', c: '#e8262f',
    hook: 'Atira o tazo.',
    rules: [
      ['Dinâmica', 'Tiro ao alvo: atirar tazos (ou discos coloridos) contra uma pirâmide de red cups americanos. Acerte ou falhe, o jogador passa a vez ao colega seguinte.'],
      ['Vence', 'A primeira equipa a derrubar os 10 copos.'],
    ],
  },
  {
    id: 'mimica', world: '1-5', name: "Mímica 90's", sprite: 'card', sky: '#b49cff', c: '#8a4dff',
    hook: 'Power Rangers, Friends, Dragon Ball, Titanic… só com gestos.',
    rules: [
      ['Temas', 'Cartões de filmes, séries e jogos da década. Cada equipa tem 10 cartões.'],
      ['Dinâmica', 'Um elemento faz mímica e o primeiro da fila tenta adivinhar, com 3 tentativas. Se acertar, passa a ser ele a fazer mímica; se falhar, vai para o fim da fila. Só gestos, sem som.'],
      ['Vence', 'A primeira equipa a terminar os seus cartões.'],
    ],
  },
  {
    id: 'grito', world: '1-6', name: 'Gritómetro dos 90', sprite: 'mega', sky: '#8fd14f', c: '#3fd13f',
    hook: 'Grita a tua palavra. Encontra o teu par.',
    rules: [
      ['Preparação', 'Cada jogador recebe um cartão com uma palavra da temática anos 90. Cada palavra existe em dois cartões.'],
      ['Dinâmica', 'Ao som do apito, todos gritam a sua palavra até encontrarem quem tem a mesma.'],
      ['Vence', 'A primeira equipa a formar todos os pares.'],
    ],
  },
]

export const BOSS = {
  name: 'Rebenta a Bolha',
  steps: [
    { k: 'OS FINALISTAS', t: 'Cada uma das 6 equipas com mais pontos elege 2 jogadores. São 12 jogadores para 12 arcos no chão.' },
    { k: 'A DINÂMICA', t: 'Ao som da música, o coordenador dá as ordens: “Todos a saltar para a direita”, “dentro”, “fora”, “esquerda”.' },
    { k: 'ELIMINAÇÃO', t: 'Quem se engana sai. Os arcos vão ficando vazios.' },
    { k: 'VENCEDOR', t: 'Ganha a equipa que ficar em jogo por último.' },
  ],
  commands: ['DENTRO!', 'DIREITA!', 'FORA!', 'ESQUERDA!', 'DENTRO!', 'FORA!', 'DIREITA!'],
}

export const CONTACT = { name: 'Matilde Falcão', role: 'Junior Account Manager', email: 'matildefalcao@newsheet.pt' }
