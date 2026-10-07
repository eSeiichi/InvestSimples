/**
 * Funções de cálculo da calculadora financeira.
 * Tudo aqui é função pura: recebe números, devolve números — sem React,
 * para ficar fácil de conferir e de testar.
 */

// ── formatação e leitura de valores ─────────────────────────

const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarMoeda(valor: number): string {
  if (!Number.isFinite(valor)) {
    return "—";
  }
  return formatadorMoeda.format(valor);
}

export function formatarNumero(valor: number, casas = 2): string {
  if (!Number.isFinite(valor)) {
    return "—";
  }
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

export function formatarPorcentagem(valor: number, casas = 2): string {
  if (!Number.isFinite(valor)) {
    return "—";
  }
  return `${formatarNumero(valor, casas)}%`;
}

/**
 * Lê o que o usuário digitou aceitando os dois formatos comuns:
 * "1.234,56" (brasileiro) e "1234.56" (ponto decimal).
 * Devolve NaN quando o campo está vazio ou inválido.
 */
export function paraNumero(valor: string): number {
  const limpo = valor.replace(/[R$\s]/g, "").trim();

  if (limpo === "") {
    return NaN;
  }

  const temVirgula = limpo.includes(",");
  const temPonto = limpo.includes(".");

  let normalizado = limpo;
  if (temVirgula && temPonto) {
    // "1.234,56" → ponto é separador de milhar
    normalizado = limpo.replace(/\./g, "").replace(",", ".");
  } else if (temVirgula) {
    normalizado = limpo.replace(",", ".");
  }

  const numero = Number(normalizado);
  return Number.isFinite(numero) ? numero : NaN;
}

export function ehValido(...valores: number[]): boolean {
  return valores.every((valor) => Number.isFinite(valor));
}

// ── conversão de taxas ──────────────────────────────────────

export type Periodicidade = "mensal" | "anual";

/** Converte uma taxa anual em mensal de forma composta (equivalente). */
export function anualParaMensalComposta(taxaAnual: number): number {
  return Math.pow(1 + taxaAnual, 1 / 12) - 1;
}

/** Converte uma taxa mensal em anual de forma composta (equivalente). */
export function mensalParaAnualComposta(taxaMensal: number): number {
  return Math.pow(1 + taxaMensal, 12) - 1;
}

// ── juros simples ───────────────────────────────────────────

export type ResultadoJurosSimples = {
  montante: number;
  juros: number;
  meses: number;
  taxaMensal: number;
};

/**
 * J = C × i × n (juros sempre sobre o capital inicial).
 * Na taxa anual a conversão é proporcional (12% a.a. = 1% a.m.),
 * que é a regra do regime simples.
 */
export function jurosSimples(
  capital: number,
  taxaPercentual: number,
  periodicidade: Periodicidade,
  meses: number,
): ResultadoJurosSimples {
  const taxaMensal =
    periodicidade === "mensal" ? taxaPercentual / 100 : taxaPercentual / 100 / 12;

  const juros = capital * taxaMensal * meses;

  return {
    montante: capital + juros,
    juros,
    meses,
    taxaMensal,
  };
}

// ── juros compostos ─────────────────────────────────────────

export type LinhaEvolucao = {
  mes: number;
  investido: number;
  juros: number;
  saldo: number;
};

export type ResultadoJurosCompostos = {
  montante: number;
  totalInvestido: number;
  juros: number;
  taxaMensal: number;
  evolucao: LinhaEvolucao[];
};

/**
 * Capital inicial + aportes mensais, com juros sobre juros.
 * O aporte é considerado no fim de cada mês.
 */
export function jurosCompostos(
  capital: number,
  aporteMensal: number,
  taxaPercentual: number,
  periodicidade: Periodicidade,
  meses: number,
): ResultadoJurosCompostos {
  const taxaMensal =
    periodicidade === "mensal"
      ? taxaPercentual / 100
      : anualParaMensalComposta(taxaPercentual / 100);

  const evolucao: LinhaEvolucao[] = [];

  let saldo = capital;
  let investido = capital;

  for (let mes = 1; mes <= meses; mes++) {
    saldo = saldo * (1 + taxaMensal) + aporteMensal;
    investido += aporteMensal;

    evolucao.push({
      mes,
      investido,
      juros: saldo - investido,
      saldo,
    });
  }

  return {
    montante: saldo,
    totalInvestido: investido,
    juros: saldo - investido,
    taxaMensal,
    evolucao,
  };
}

// ── imposto de renda (renda fixa) ───────────────────────────

export type FaixaIR = {
  ate: number | null; // dias; null = acima da última faixa
  aliquota: number; // em %
  rotulo: string;
};

/** Tabela regressiva do IR sobre renda fixa. */
export const TABELA_IR: FaixaIR[] = [
  { ate: 180, aliquota: 22.5, rotulo: "Até 180 dias" },
  { ate: 360, aliquota: 20, rotulo: "De 181 a 360 dias" },
  { ate: 720, aliquota: 17.5, rotulo: "De 361 a 720 dias" },
  { ate: null, aliquota: 15, rotulo: "Acima de 720 dias" },
];

export function aliquotaIR(dias: number): FaixaIR {
  return (
    TABELA_IR.find((faixa) => faixa.ate !== null && dias <= faixa.ate) ??
    TABELA_IR[TABELA_IR.length - 1]
  );
}

export type ResultadoIR = {
  rendimentoBruto: number;
  aliquota: number;
  faixa: FaixaIR;
  imposto: number;
  valorLiquido: number;
  rendimentoLiquido: number;
  temIOF: boolean;
};

export function impostoRenda(
  valorAplicado: number,
  valorBruto: number,
  dias: number,
): ResultadoIR {
  const rendimentoBruto = Math.max(valorBruto - valorAplicado, 0);
  const faixa = aliquotaIR(dias);
  const imposto = rendimentoBruto * (faixa.aliquota / 100);

  return {
    rendimentoBruto,
    aliquota: faixa.aliquota,
    faixa,
    imposto,
    valorLiquido: valorBruto - imposto,
    rendimentoLiquido: rendimentoBruto - imposto,
    // resgates com menos de 30 dias ainda pagam IOF regressivo
    temIOF: dias < 30,
  };
}

// ── CDI ─────────────────────────────────────────────────────

export type ResultadoCDI = {
  taxaEfetivaAnual: number; // em %
  montanteBruto: number;
  rendimentoBruto: number;
  imposto: number;
  montanteLiquido: number;
  rendimentoLiquido: number;
  aliquota: number;
  dias: number;
};

/**
 * Investimento que rende um percentual do CDI (ex.: 110% do CDI),
 * já descontando o IR da tabela regressiva.
 */
export function rendimentoCDI(
  valor: number,
  cdiAnual: number,
  percentualDoCDI: number,
  meses: number,
): ResultadoCDI {
  const taxaEfetiva = (cdiAnual / 100) * (percentualDoCDI / 100);
  const anos = meses / 12;

  const montanteBruto = valor * Math.pow(1 + taxaEfetiva, anos);
  const rendimentoBruto = montanteBruto - valor;

  const dias = Math.round(meses * 30);
  const faixa = aliquotaIR(dias);
  const imposto = rendimentoBruto * (faixa.aliquota / 100);

  return {
    taxaEfetivaAnual: taxaEfetiva * 100,
    montanteBruto,
    rendimentoBruto,
    imposto,
    montanteLiquido: montanteBruto - imposto,
    rendimentoLiquido: rendimentoBruto - imposto,
    aliquota: faixa.aliquota,
    dias,
  };
}

// ── IPCA ────────────────────────────────────────────────────

export type ResultadoIPCA = {
  valorCorrigido: number; // quanto seria preciso ter para manter o poder de compra
  perdaPoderCompra: number;
  inflacaoPeriodo: number; // em %
  montanteNominal: number;
  ganhoNominal: number;
  ganhoRealPercentual: number; // em %
  ganhoRealValor: number;
};

/**
 * Compara o rendimento nominal de um investimento com a inflação do período.
 * O ganho real usa a fórmula de Fisher: (1 + nominal) / (1 + inflação) - 1.
 */
export function correcaoIPCA(
  valor: number,
  ipcaAnual: number,
  taxaNominalAnual: number,
  meses: number,
): ResultadoIPCA {
  const anos = meses / 12;

  const fatorInflacao = Math.pow(1 + ipcaAnual / 100, anos);
  const fatorNominal = Math.pow(1 + taxaNominalAnual / 100, anos);

  const valorCorrigido = valor * fatorInflacao;
  const montanteNominal = valor * fatorNominal;

  const ganhoReal = fatorNominal / fatorInflacao - 1;

  return {
    valorCorrigido,
    perdaPoderCompra: valorCorrigido - valor,
    inflacaoPeriodo: (fatorInflacao - 1) * 100,
    montanteNominal,
    ganhoNominal: montanteNominal - valor,
    ganhoRealPercentual: ganhoReal * 100,
    ganhoRealValor: montanteNominal - valorCorrigido,
  };
}

// ── porcentagem ─────────────────────────────────────────────

export type OperacaoPorcentagem =
  | "porcentagemDe"
  | "qualPorcentagem"
  | "variacao"
  | "acrescimo"
  | "desconto";

export function calcularPorcentagem(
  operacao: OperacaoPorcentagem,
  a: number,
  b: number,
): number {
  switch (operacao) {
    // quanto é A% de B
    case "porcentagemDe":
      return (a / 100) * b;
    // A é quantos % de B
    case "qualPorcentagem":
      return b === 0 ? NaN : (a / b) * 100;
    // variação percentual de A para B
    case "variacao":
      return a === 0 ? NaN : ((b - a) / a) * 100;
    // aumentar A em B%
    case "acrescimo":
      return a * (1 + b / 100);
    // diminuir A em B%
    case "desconto":
      return a * (1 - b / 100);
  }
}
