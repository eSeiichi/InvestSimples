import { useMemo, useState } from "react";
import CampoNumero from "./CampoNumero";
import CampoSelect from "./CampoSelect";
import Resultado from "./Resultado";
import type { OperacaoPorcentagem } from "../../utils/calculadora";
import {
  calcularPorcentagem,
  ehValido,
  formatarNumero,
  formatarPorcentagem,
  paraNumero,
} from "../../utils/calculadora";
import styles from "./Calc.module.css";

type Config = {
  rotulo: string;
  rotuloA: string;
  rotuloB: string;
  sufixoA?: string;
  sufixoB?: string;
  /** o resultado é uma porcentagem ou um número? */
  resultadoEmPorcentagem: boolean;
  destaque: string;
  explicacao: (a: number, b: number, resultado: number) => string;
};

const OPERACOES: Record<OperacaoPorcentagem, Config> = {
  porcentagemDe: {
    rotulo: "Quanto é X% de Y",
    rotuloA: "Porcentagem (X)",
    rotuloB: "Valor (Y)",
    sufixoA: "%",
    resultadoEmPorcentagem: false,
    destaque: "Resultado",
    explicacao: (a, b, r) =>
      `${formatarNumero(a)}% de ${formatarNumero(b)} é ${formatarNumero(r)}.`,
  },
  qualPorcentagem: {
    rotulo: "X é quantos % de Y",
    rotuloA: "Valor (X)",
    rotuloB: "Total (Y)",
    resultadoEmPorcentagem: true,
    destaque: "X representa",
    explicacao: (a, b, r) =>
      `${formatarNumero(a)} representa ${formatarNumero(r)}% de ${formatarNumero(b)}.`,
  },
  variacao: {
    rotulo: "Variação de A para B",
    rotuloA: "Valor inicial (A)",
    rotuloB: "Valor final (B)",
    resultadoEmPorcentagem: true,
    destaque: "Variação",
    explicacao: (a, b, r) =>
      r >= 0
        ? `De ${formatarNumero(a)} para ${formatarNumero(b)} houve alta de ${formatarNumero(r)}%.`
        : `De ${formatarNumero(a)} para ${formatarNumero(b)} houve queda de ${formatarNumero(Math.abs(r))}%.`,
  },
  acrescimo: {
    rotulo: "Aumentar A em B%",
    rotuloA: "Valor (A)",
    rotuloB: "Aumento (B)",
    sufixoB: "%",
    resultadoEmPorcentagem: false,
    destaque: "Valor com acréscimo",
    explicacao: (a, b, r) =>
      `${formatarNumero(a)} com ${formatarNumero(b)}% de acréscimo vira ${formatarNumero(r)}.`,
  },
  desconto: {
    rotulo: "Diminuir A em B%",
    rotuloA: "Valor (A)",
    rotuloB: "Desconto (B)",
    sufixoB: "%",
    resultadoEmPorcentagem: false,
    destaque: "Valor com desconto",
    explicacao: (a, b, r) =>
      `${formatarNumero(a)} com ${formatarNumero(b)}% de desconto vira ${formatarNumero(r)}.`,
  },
};

function Porcentagem() {
  const [operacao, setOperacao] = useState<OperacaoPorcentagem>("porcentagemDe");
  const [a, setA] = useState("10");
  const [b, setB] = useState("250");

  const config = OPERACOES[operacao];

  const resultado = useMemo(() => {
    const valorA = paraNumero(a);
    const valorB = paraNumero(b);

    if (!ehValido(valorA, valorB)) {
      return null;
    }

    const calculado = calcularPorcentagem(operacao, valorA, valorB);
    return Number.isFinite(calculado) ? calculado : null;
  }, [operacao, a, b]);

  const valorA = paraNumero(a);
  const valorB = paraNumero(b);

  return (
    <div className={styles.calculadora}>
      <div className={styles.formulario}>
        <h2 className={styles.formularioTitulo}>Porcentagem</h2>
        <p className={styles.formularioTexto}>
          As cinco contas de porcentagem que mais aparecem no dia a dia: descontos,
          rendimentos, variação de preço e comparação entre valores.
        </p>

        <CampoSelect
          id="pct-operacao"
          rotulo="O que você quer calcular"
          valor={operacao}
          onChange={(valor) => setOperacao(valor as OperacaoPorcentagem)}
          opcoes={Object.entries(OPERACOES).map(([chave, item]) => ({
            valor: chave,
            rotulo: item.rotulo,
          }))}
        />

        <div className={styles.linha}>
          <CampoNumero
            id="pct-a"
            rotulo={config.rotuloA}
            sufixo={config.sufixoA}
            valor={a}
            onChange={setA}
          />
          <CampoNumero
            id="pct-b"
            rotulo={config.rotuloB}
            sufixo={config.sufixoB}
            valor={b}
            onChange={setB}
          />
        </div>
      </div>

      <Resultado
        pronto={resultado !== null}
        destaqueRotulo={config.destaque}
        destaqueValor={
          resultado === null
            ? "—"
            : config.resultadoEmPorcentagem
              ? formatarPorcentagem(resultado)
              : formatarNumero(resultado)
        }
        destaqueTom={
          operacao === "variacao" && resultado !== null
            ? resultado >= 0
              ? "positivo"
              : "negativo"
            : undefined
        }
      >
        {resultado !== null && (
          <p className={styles.explicacao}>
            {config.explicacao(valorA, valorB, resultado)}
          </p>
        )}
      </Resultado>
    </div>
  );
}

export default Porcentagem;
