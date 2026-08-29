/**
 * Dados fictícios usados apenas no modo demonstração (ver src/mocks/demo.ts).
 * Nada aqui vai para o banco: é só para conferir o layout com vários cursos.
 */
import type { Curso, ListCurso } from "../types/Curso";
import type { AulaResponse } from "../types/Aula";

/** Gera uma capa em SVG (data URI) para não depender de imagens externas. */
function capa(rotulo: string, corA: string, corB: string): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${corA}"/>
      <stop offset="100%" stop-color="${corB}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#g)"/>
  <circle cx="545" cy="70" r="120" fill="#ffffff" opacity="0.07"/>
  <circle cx="80" cy="320" r="90" fill="#ffffff" opacity="0.05"/>
  <g fill="#ffffff" opacity="0.9">
    <rect x="60" y="228" width="34" height="52" rx="6"/>
    <rect x="106" y="200" width="34" height="80" rx="6"/>
    <rect x="152" y="164" width="34" height="116" rx="6"/>
    <rect x="198" y="124" width="34" height="156" rx="6"/>
  </g>
  <path d="M64 150 L120 120 L176 88 L232 52" stroke="#ffffff" stroke-width="6"
        stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.55"/>
  <text x="60" y="330" fill="#ffffff" opacity="0.85"
        font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="600"
        letter-spacing="3">${rotulo.toUpperCase()}</text>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const VIDEO_EXEMPLO = "https://youtu.be/4nFYQ1JUGAI?si=UGlfRXwObv1MUZNk";

type AulaDemo = {
  titulo: string;
  descricao: string;
  minutos: number;
  comVideo?: boolean;
};

type CursoDemo = {
  id: string;
  titulo: string;
  descricao: string;
  nivel: string;
  capa_url: string | null;
  aulas: AulaDemo[];
};

const cursos: CursoDemo[] = [
  {
    id: "demo-primeiros-passos",
    titulo: "Primeiros passos no mundo dos investimentos",
    descricao:
      "Entenda o básico do sistema financeiro, monte sua reserva de emergência e faça a primeira aplicação com segurança.",
    nivel: "iniciante",
    capa_url: capa("Começando", "#0f766e", "#16a34a"),
    aulas: [
      {
        titulo: "Por que investir?",
        descricao: "O custo de deixar o dinheiro parado na conta.",
        minutos: 12,
        comVideo: true,
      },
      {
        titulo: "Organizando o orçamento",
        descricao: "Como sobrar dinheiro no fim do mês.",
        minutos: 18,
        comVideo: true,
      },
      {
        titulo: "Reserva de emergência",
        descricao: "Quanto guardar e onde deixar esse dinheiro.",
        minutos: 15,
      },
      {
        titulo: "Abrindo conta na corretora",
        descricao: "Passo a passo, sem mistério.",
        minutos: 9,
      },
      {
        titulo: "Sua primeira aplicação",
        descricao: "Na prática: comprando um título público.",
        minutos: 21,
        comVideo: true,
      },
    ],
  },
  {
    id: "demo-renda-fixa",
    titulo: "Renda fixa descomplicada",
    descricao:
      "CDB, LCI, LCA, Tesouro Direto e debêntures: o que muda entre eles, como comparar rentabilidade e quando cada um faz sentido.",
    nivel: "iniciante",
    capa_url: capa("Renda fixa", "#1d4ed8", "#0ea5e9"),
    aulas: [
      {
        titulo: "O que é renda fixa",
        descricao: "Emprestar dinheiro e receber juros.",
        minutos: 14,
        comVideo: true,
      },
      {
        titulo: "Tesouro Direto na prática",
        descricao: "Selic, IPCA+ e prefixado.",
        minutos: 26,
        comVideo: true,
      },
      {
        titulo: "CDB, LCI e LCA",
        descricao: "Diferenças, prazos e isenção de IR.",
        minutos: 19,
      },
      {
        titulo: "Marcação a mercado",
        descricao: "Por que o título oscila antes do vencimento.",
        minutos: 23,
      },
      {
        titulo: "Impostos e taxas",
        descricao: "Tabela regressiva e come-cotas.",
        minutos: 17,
      },
      {
        titulo: "Montando uma carteira conservadora",
        descricao: "Juntando tudo o que vimos.",
        minutos: 20,
      },
    ],
  },
  {
    id: "demo-acoes",
    titulo: "Ações: da primeira compra à análise de balanço",
    descricao:
      "Como funciona a bolsa, o que olhar antes de comprar uma ação e como acompanhar os resultados das empresas.",
    nivel: "intermediário",
    capa_url: capa("Ações", "#7c3aed", "#c026d3"),
    aulas: [
      {
        titulo: "Como funciona a B3",
        descricao: "Pregão, liquidação e home broker.",
        minutos: 16,
        comVideo: true,
      },
      {
        titulo: "Lendo um balanço",
        descricao: "DRE, balanço patrimonial e fluxo de caixa.",
        minutos: 34,
      },
      {
        titulo: "Indicadores fundamentalistas",
        descricao: "P/L, ROE, dívida líquida e margens.",
        minutos: 28,
        comVideo: true,
      },
      {
        titulo: "Dividendos e JCP",
        descricao: "Como a empresa devolve dinheiro ao acionista.",
        minutos: 18,
      },
      {
        titulo: "Montando sua carteira",
        descricao: "Diversificação e tamanho de posição.",
        minutos: 22,
      },
      {
        titulo: "Erros comuns do iniciante",
        descricao: "O que evitar nos primeiros meses.",
        minutos: 13,
      },
      {
        titulo: "Acompanhando os resultados",
        descricao: "Rotina trimestral de revisão.",
        minutos: 15,
      },
    ],
  },
  {
    id: "demo-fiis",
    titulo: "Fundos imobiliários do zero",
    descricao:
      "Tijolo, papel e fundo de fundos: como escolher FIIs, ler o relatório gerencial e viver de aluguel sem comprar imóvel.",
    nivel: "intermediário",
    capa_url: capa("FIIs", "#b45309", "#f59e0b"),
    aulas: [
      {
        titulo: "O que é um FII",
        descricao: "Cotas, gestor e patrimônio.",
        minutos: 15,
        comVideo: true,
      },
      {
        titulo: "Tijolo x papel",
        descricao: "Dois jeitos bem diferentes de ganhar dinheiro.",
        minutos: 21,
      },
      {
        titulo: "Lendo o relatório gerencial",
        descricao: "Vacância, inadimplência e P/VP.",
        minutos: 27,
      },
      {
        titulo: "Dividend yield sem cair em armadilha",
        descricao: "Quando o rendimento alto é sinal de risco.",
        minutos: 19,
      },
      {
        titulo: "Montando uma carteira de FIIs",
        descricao: "Quantos fundos e de quais setores.",
        minutos: 24,
      },
    ],
  },
  {
    id: "demo-planejamento",
    titulo: "Planejamento financeiro pessoal",
    descricao:
      "Saia das dívidas, defina objetivos com prazo e transforme o orçamento em um plano que você consegue seguir.",
    nivel: "iniciante",
    capa_url: capa("Planejamento", "#0369a1", "#22d3ee"),
    aulas: [
      {
        titulo: "Diagnóstico: para onde vai seu dinheiro",
        descricao: "Levantando gastos dos últimos 3 meses.",
        minutos: 17,
        comVideo: true,
      },
      {
        titulo: "Saindo das dívidas caras",
        descricao: "Cartão, cheque especial e negociação.",
        minutos: 22,
      },
      {
        titulo: "Objetivos com prazo e valor",
        descricao: "Curto, médio e longo prazo.",
        minutos: 14,
      },
      {
        titulo: "Automatizando os aportes",
        descricao: "Pagar a si mesmo primeiro.",
        minutos: 11,
      },
    ],
  },
  {
    id: "demo-analise-tecnica",
    titulo: "Análise técnica na prática",
    descricao:
      "Suportes, resistências, tendências e volume — o que os gráficos mostram e, principalmente, o que eles não mostram.",
    nivel: "avançado",
    capa_url: capa("Gráficos", "#be123c", "#f43f5e"),
    aulas: [
      {
        titulo: "Candles e leitura de gráfico",
        descricao: "Abertura, fechamento, máxima e mínima.",
        minutos: 20,
        comVideo: true,
      },
      {
        titulo: "Suporte, resistência e tendência",
        descricao: "Os três conceitos que sustentam o resto.",
        minutos: 25,
      },
      {
        titulo: "Médias móveis",
        descricao: "Curta, longa e cruzamentos.",
        minutos: 18,
      },
      {
        titulo: "Volume e força do movimento",
        descricao: "Confirmando (ou não) um rompimento.",
        minutos: 16,
      },
      {
        titulo: "Gerenciamento de risco",
        descricao: "Stop, tamanho de posição e disciplina.",
        minutos: 29,
      },
      {
        titulo: "Limites da análise técnica",
        descricao: "Onde ela costuma falhar.",
        minutos: 14,
      },
    ],
  },
  {
    id: "demo-internacional",
    titulo: "Investindo no exterior",
    descricao:
      "Dolarize parte da carteira: BDRs, ETFs internacionais, conta em corretora lá fora e a declaração no imposto de renda.",
    nivel: "avançado",
    capa_url: capa("Global", "#3730a3", "#6366f1"),
    aulas: [
      {
        titulo: "Por que ter dólar na carteira",
        descricao: "Proteção cambial na prática.",
        minutos: 16,
        comVideo: true,
      },
      {
        titulo: "BDRs: o caminho mais curto",
        descricao: "Comprando empresas de fora pela B3.",
        minutos: 19,
      },
      {
        titulo: "ETFs internacionais",
        descricao: "S&P 500, mercados emergentes e renda fixa global.",
        minutos: 23,
      },
      {
        titulo: "Abrindo conta no exterior",
        descricao: "Documentos, custos e remessa.",
        minutos: 21,
      },
      {
        titulo: "Imposto de renda e câmbio",
        descricao: "O que declarar e quando pagar.",
        minutos: 26,
      },
    ],
  },
  {
    id: "demo-aposentadoria",
    titulo: "Aposentadoria e previdência",
    descricao:
      "Quanto você precisa acumular, como a inflação corrói o plano e o que muda entre PGBL, VGBL e uma carteira própria.",
    nivel: "intermediário",
    capa_url: capa("Longo prazo", "#065f46", "#34d399"),
    aulas: [
      {
        titulo: "Quanto preciso para me aposentar",
        descricao: "Calculando o patrimônio-alvo.",
        minutos: 24,
        comVideo: true,
      },
      {
        titulo: "Juros compostos e tempo",
        descricao: "Por que começar cedo muda tudo.",
        minutos: 15,
      },
      {
        titulo: "PGBL x VGBL",
        descricao: "Qual faz sentido para o seu caso.",
        minutos: 20,
      },
      {
        titulo: "Taxas que comem a previdência",
        descricao: "Carregamento e administração.",
        minutos: 17,
      },
      {
        titulo: "Fase de resgate",
        descricao: "Como sacar sem quebrar o plano.",
        minutos: 22,
      },
    ],
  },
  {
    id: "demo-cripto",
    titulo: "Criptomoedas com pé no chão",
    descricao:
      "O que é blockchain, como funcionam as corretoras, custódia e por que essa classe pede um limite claro na carteira.",
    nivel: "avançado",
    capa_url: null,
    aulas: [
      {
        titulo: "Blockchain sem enrolação",
        descricao: "O que a tecnologia resolve.",
        minutos: 18,
      },
      {
        titulo: "Corretoras e custódia",
        descricao: "Carteira quente, fria e autocustódia.",
        minutos: 22,
      },
      {
        titulo: "Riscos e golpes comuns",
        descricao: "Como não perder tudo.",
        minutos: 20,
      },
      {
        titulo: "Quanto alocar",
        descricao: "Definindo um limite e respeitando ele.",
        minutos: 13,
      },
    ],
  },
  {
    id: "demo-impostos",
    titulo: "Imposto de renda para investidores",
    descricao:
      "Preencha a declaração sem medo: bens e direitos, rendimentos isentos, apuração de ganhos e o famoso DARF.",
    nivel: "intermediário",
    capa_url: null,
    aulas: [
      {
        titulo: "O que a Receita já sabe",
        descricao: "Informes da corretora e do banco.",
        minutos: 12,
      },
      {
        titulo: "Bens e direitos",
        descricao: "Lançando cada tipo de investimento.",
        minutos: 25,
      },
      {
        titulo: "Vendas de ações e DARF",
        descricao: "Isenção de R$ 20 mil e apuração mensal.",
        minutos: 28,
      },
      {
        titulo: "Prejuízo acumulado",
        descricao: "Compensando em meses seguintes.",
        minutos: 16,
      },
      {
        titulo: "Revisão final da declaração",
        descricao: "Checklist antes de enviar.",
        minutos: 14,
      },
    ],
  },
];

/** Monta as aulas no mesmo formato devolvido pela API. */
function montarAulas(curso: CursoDemo): AulaResponse[] {
  return curso.aulas.map((aula, indice) => ({
    id: `${curso.id}-aula-${indice + 1}`,
    titulo: aula.titulo,
    descricao: aula.descricao,
    conteudo: `${aula.descricao}\n\nConteúdo de demonstração: este texto existe apenas para mostrar como fica o bloco "Sobre esta aula" com um parágrafo mais longo. Aqui entrariam as anotações, os links de apoio e o resumo do que foi visto no vídeo.`,
    url_video: aula.comVideo ? VIDEO_EXEMPLO : undefined,
    duracao_minutos: aula.minutos,
    ordem: indice,
    curso_id: curso.id,
  }));
}

export function listarCursosDemo(): Curso[] {
  return cursos.map((curso) => ({
    id: curso.id,
    titulo: curso.titulo,
    descricao: curso.descricao,
    nivel: curso.nivel,
    capa_url: curso.capa_url ?? undefined,
    total_aulas: curso.aulas.length,
  }));
}

export function obterCursoDemo(id: string): ListCurso | undefined {
  const curso = cursos.find((item) => item.id === id);
  if (!curso) {
    return undefined;
  }

  return {
    id: curso.id,
    titulo: curso.titulo,
    descricao: curso.descricao,
    nivel: curso.nivel,
    capa_url: curso.capa_url,
    aulas: montarAulas(curso),
  };
}

export function obterAulaDemo(
  cursoId: string,
  aulaId: string,
): AulaResponse | undefined {
  const curso = cursos.find((item) => item.id === cursoId);
  if (!curso) {
    return undefined;
  }

  return montarAulas(curso).find((aula) => aula.id === aulaId);
}
