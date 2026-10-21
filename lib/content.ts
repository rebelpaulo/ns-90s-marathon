// Todo o texto do site vive aqui. Fonte: deck "Team Building – The 90's Marathon".
// Não acrescentar conteúdo que não esteja no deck original.

export const evento = {
  apresenta: "Revenge of the 90s apresenta",
  titulo: "THE 90'S MARATHON",
  data: "11 de dezembro de 2026",
  dataHud: "DEZ.11 2026",
  local: "MYRIAD by SANA Hotel",
  tema: "Anos 90",
  lead: "O team building mais caótico e divertido, desenhado pela equipa da Revenge of the 90s!",
  intro:
    "Esta maratona reúne os mais icónicos jogos, músicas, séries e filmes que marcaram quem cresceu e viveu nesta década.",
  mote: "Que comece esta viagem no tempo!",
};

export const comoFunciona = [
  {
    id: "equipas",
    titulo: "12 equipas × 15 pessoas",
    texto: "180 participantes divididos em 12 equipas de 15 pessoas cada.",
  },
  {
    id: "bandanas",
    titulo: "Uma bandana por equipa",
    texto:
      "Cada equipa terá uma bandana de cor identificativa, entrando no espírito dos anos 90 desde o primeiro momento!",
  },
  {
    id: "estacoes",
    titulo: "6 estações em simultâneo",
    texto: "Jogam 2 equipas por estação, em 6 estações simultâneas.",
  },
  {
    id: "rotacao",
    titulo: "Rondas de 10–12 min",
    texto: "Após cada ronda, as equipas rodam de acordo com a ordem do jogo.",
  },
  {
    id: "final",
    titulo: "O vencedor dos vencedores",
    texto:
      "No final das 6 estações, as 6 equipas com mais pontos confrontam-se num desafio final, por forma a encontrar o vencedor dos vencedores.",
  },
] as const;

export const pontuacao = {
  vencedora: { pontos: 10, label: "Equipa vencedora da estação" },
  perdedora: { pontos: 5, label: "Equipa perdedora da estação" },
  nota: "Este sistema mantém a competição equilibrada e motiva todas as equipas a continuarem a jogar.",
};

export type Bloco = { titulo: string; texto: string[] };
export type Estacao = {
  n: number;
  lado: "A" | "B" | "C";
  nome: string;
  tagline?: string;
  blocos: Bloco[];
  still: string;
  cor: string;
};

export const estacoes: Estacao[] = [
  {
    n: 1,
    lado: "A",
    nome: "Quiz 90's",
    tagline: "Será que sabe tudo sobre os anos 90?",
    cor: "var(--magenta)",
    still: "/media/still-1.webp",
    blocos: [
      {
        titulo: "Dinâmica",
        texto: [
          "Quiz com 2 buzzers, onde as equipas se enfrentam em perguntas de cultura pop, jogos, TV, música e curiosidades dos anos 90.",
        ],
      },
      { titulo: "Pontuação", texto: ["2 equipas por ronda: a que acertar mais perguntas ganha."] },
    ],
  },
  {
    n: 2,
    lado: "A",
    nome: "Canta Connosco?!",
    tagline: "Música!",
    cor: "var(--teal)",
    still: "/media/still-2.webp",
    blocos: [
      {
        titulo: "Música",
        texto: [
          "Cada jogador nomeado pela sua equipa ouve com headphones uma música icónica dos 90s (ex: Britney, Nirvana, Aqua).",
        ],
      },
      {
        titulo: "Dinâmica",
        texto: ["Passados alguns segundos, a música pára e o jogador tem de continuar a cantar a próxima frase."],
      },
      { titulo: "Pontuação", texto: ["Os pontos são ganhos por cada letra acertada. Quem acertar mais ganha."] },
    ],
  },
  {
    n: 3,
    lado: "B",
    nome: "Pedra, Papel ou Macaca",
    cor: "var(--yellow)",
    still: "/media/still-3.webp",
    blocos: [
      {
        titulo: "Preparação",
        texto: [
          "Versão remix entre o jogo da macaca e o pedra, papel ou tesoura.",
          "Os jogadores saltam de quadrado em quadrado (desenhados no chão). As duas equipas começam em simultâneo até se encontrarem frente a frente.",
        ],
      },
      {
        titulo: "Confronto",
        texto: [
          "No momento em que se encontram, jogam pedra, papel ou tesoura. Quem ganhar continua a saltar em direção à equipa contrária; quem perder corre para o fim da fila, enquanto outro elemento da equipa começa a saltar.",
        ],
      },
      {
        titulo: "Objetivo",
        texto: ["Chegar ao lado da equipa adversária: a primeira equipa a conseguir, ganha."],
      },
    ],
  },
  {
    n: 4,
    lado: "B",
    nome: "Tazos & Cia",
    tagline: "Atira o Tazo",
    cor: "var(--purple-lite)",
    still: "/media/still-4.webp",
    blocos: [
      {
        titulo: "Atira o Tazo",
        texto: [
          "Jogo estilo “tiro ao alvo”: atirar tazos (ou discos coloridos) contra uma pirâmide de “red cups” americanos.",
        ],
      },
      {
        titulo: "Dinâmica",
        texto: ["Cada equipa tem de derrubar 10 copos. Quer acerte, quer falhe, o jogador passa a vez ao colega seguinte."],
      },
      { titulo: "Pontuação", texto: ["Ganha a equipa que derrubar os 10 copos primeiro."] },
    ],
  },
  {
    n: 5,
    lado: "C",
    nome: "Mímica 90's",
    cor: "var(--magenta)",
    still: "/media/still-5.webp",
    blocos: [
      {
        titulo: "Os temas",
        texto: ["Cartões de vários temas, sobre filmes, séries e jogos: Power Rangers, Friends, Dragon Ball, Titanic, etc."],
      },
      {
        titulo: "Dinâmica",
        texto: [
          "Um elemento da equipa faz mímica enquanto o primeiro da fila tenta adivinhar; se adivinhar, passa a ser quem faz mímica. Quem adivinha tem 3 tentativas para acertar; caso contrário, vai para o fim da fila.",
          "Cada equipa tem 10 cartões e só são permitidas expressões e gestos, sem som.",
        ],
      },
      { titulo: "Pontuação", texto: ["O jogo termina quando uma das equipas terminar os seus cartões."] },
    ],
  },
  {
    n: 6,
    lado: "C",
    nome: "Gritómetro dos 90",
    cor: "var(--teal)",
    still: "/media/still-6.webp",
    blocos: [
      {
        titulo: "Preparação",
        texto: ["Cada jogador recebe um cartão com uma palavra dentro da temática dos 90's. Cada palavra existe em dois cartões."],
      },
      {
        titulo: "Dinâmica",
        texto: ["Ao som de um apito, os jogadores têm de gritar a sua palavra de forma a encontrar o seu par."],
      },
      { titulo: "Objetivo", texto: ["A primeira equipa a encontrar todos os pares vence."] },
    ],
  },
];

export const desafioFinal = {
  nome: "Rebenta a Bolha",
  blocos: [
    {
      titulo: "Os finalistas",
      texto: "Das 6 equipas com mais pontos, cada uma elege 2 elementos para jogar.",
    },
    {
      titulo: "A dinâmica",
      texto:
        "Existem 12 arcos no chão e cada jogador ocupa um arco. Ao som de música e à voz de comando do coordenador, os jogadores movimentam-se conforme o que vai sendo pedido: “Todos a saltar para a direita”, “dentro, fora, esquerda”.",
    },
    {
      titulo: "Pontuação",
      texto: "O objetivo é seguir as ordens sem enganos: cada vez que um elemento se engana, sai. Ganha a equipa que ficar em jogo por último.",
    },
  ],
  ordens: ["DIREITA!", "DENTRO!", "FORA!", "ESQUERDA!", "DENTRO!", "DIREITA!", "FORA!", "ESQUERDA!", "DENTRO!", "FORA!", "DIREITA!"],
};

export const contacto = {
  obrigada: "Obrigada!",
  nome: "Matilde Falcão",
  cargo: "Junior Account Manager",
  email: "matildefalcao@newsheet.pt",
  assinatura: "New Sheet – Brand Activation × Revenge of the 90s",
};

// 12 cores de bandana (identificação das equipas no diagrama).
export const bandanas = [
  "#ff2e88",
  "#00e2cf",
  "#ffd23f",
  "#7b3cff",
  "#ff7a1a",
  "#9bff3c",
  "#3cb4ff",
  "#ff4b4b",
  "#ffa3d1",
  "#f3ecff",
  "#7dffc4",
  "#c48bff",
];
