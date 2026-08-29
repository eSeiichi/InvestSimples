import type { ReactNode } from "react";
import { FaCalculator } from "react-icons/fa";
import styles from "./Calc.module.css";

export type ItemResultado = {
  rotulo: string;
  valor: string;
  /** colore o valor de verde (ganho) ou vermelho (custo) */
  tom?: "positivo" | "negativo";
};

type ResultadoProps = {
  /** false enquanto os campos ainda não foram preenchidos */
  pronto: boolean;
  destaqueRotulo: string;
  destaqueValor: string;
  destaqueTom?: "positivo" | "negativo";
  itens?: ItemResultado[];
  mensagemVazia?: string;
  children?: ReactNode;
};

/** Painel escuro à direita das calculadoras. */
function Resultado({
  pronto,
  destaqueRotulo,
  destaqueValor,
  destaqueTom,
  itens = [],
  mensagemVazia = "Preencha os campos ao lado para ver o resultado.",
  children,
}: ResultadoProps) {
  if (!pronto) {
    return (
      <div className={styles.resultado}>
        <div className={styles.resultadoVazio}>
          <FaCalculator aria-hidden="true" />
          <p>{mensagemVazia}</p>
        </div>
      </div>
    );
  }

  const classeDestaque = destaqueTom
    ? `${styles.destaqueValor} ${
        destaqueTom === "positivo" ? styles.destaquePositivo : styles.destaqueNegativo
      }`
    : styles.destaqueValor;

  return (
    <div className={styles.resultado}>
      <div>
        <p className={styles.destaqueRotulo}>{destaqueRotulo}</p>
        <p className={classeDestaque}>{destaqueValor}</p>
      </div>

      {itens.length > 0 && (
        <ul className={styles.itens}>
          {itens.map((item) => (
            <li className={styles.item} key={item.rotulo}>
              <span className={styles.itemRotulo}>{item.rotulo}</span>
              <span
                className={`${styles.itemValor} ${
                  item.tom === "positivo"
                    ? styles.valorPositivo
                    : item.tom === "negativo"
                      ? styles.valorNegativo
                      : ""
                }`}
              >
                {item.valor}
              </span>
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
}

export default Resultado;
