import { useMemo, useState } from "react";
import CampoNumero from "./CampoNumero";
import CampoSelect from "./CampoSelect";
import Resultado from "./Resultado";
import type { ItemResultado } from "./Resultado";
import type { Periodicidade } from "../../utils/calculadora";
import {
  ehValido,
  formatarMoeda,
  formatarPorcentagem,
  jurosSimples,
  paraNumero,
} from "../../utils/calculadora";
import styles from "./Calc.module.css";

function JurosSimples() {
  const [capital, setCapital] = useState("1000");
  const [taxa, setTaxa] = useState("1");
  const [periodicidade, setPeriodicidade] = useState<Periodicidade>("mensal");
  const [prazo, setPrazo] = useState("12");
  const [unidadePrazo, setUnidadePrazo] = useState<"meses" | "anos">("meses");

  const resultado = useMemo(() => {
    const valorCapital = paraNumero(capital);
    const valorTaxa = paraNumero(taxa);
    const valorPrazo = paraNumero(prazo);

    if (!ehValido(valorCapital, valorTaxa, valorPrazo) || valorPrazo <= 0) {
      return null;
    }

    const meses = unidadePrazo === "anos" ? valorPrazo * 12 : valorPrazo;

    return jurosSimples(valorCapital, valorTaxa, periodicidade, meses);
  }, [capital, taxa, periodicidade, prazo, unidadePrazo]);

  const itens: ItemResultado[] = resultado
    ? [
        { rotulo: "Valor investido", valor: formatarMoeda(paraNumero(capital)) },
        {
          rotulo: "Juros no período",
          valor: formatarMoeda(resultado.juros),
          tom: "positivo",
        },
        {
          rotulo: "Taxa equivalente",
          valor: `${formatarPorcentagem(resultado.taxaMensal * 100)} ao mês`,
        },
        {
          rotulo: "Período",
          valor: `${resultado.meses} ${resultado.meses === 1 ? "mês" : "meses"}`,
        },
      ]
    : [];

  return (
    <div className={styles.calculadora}>
      <div className={styles.formulario}>
        <h2 className={styles.formularioTitulo}>Juros simples</h2>
        <p className={styles.formularioTexto}>
          Os juros incidem sempre sobre o valor inicial. É o regime usado em
          parcelamentos e multas — não é como um investimento rende.
        </p>

        <CampoNumero
          id="js-capital"
          rotulo="Valor inicial"
          prefixo="R$"
          valor={capital}
          onChange={setCapital}
          placeholder="1.000,00"
        />

        <div className={styles.linha}>
          <CampoNumero
            id="js-taxa"
            rotulo="Taxa de juros"
            sufixo="%"
            valor={taxa}
            onChange={setTaxa}
            placeholder="1"
          />
          <CampoSelect
            id="js-periodicidade"
            rotulo="Período da taxa"
            valor={periodicidade}
            onChange={(valor) => setPeriodicidade(valor as Periodicidade)}
            opcoes={[
              { valor: "mensal", rotulo: "ao mês" },
              { valor: "anual", rotulo: "ao ano" },
            ]}
          />
        </div>

        <div className={styles.linha}>
          <CampoNumero
            id="js-prazo"
            rotulo="Prazo"
            valor={prazo}
            onChange={setPrazo}
            placeholder="12"
          />
          <CampoSelect
            id="js-unidade"
            rotulo="Unidade do prazo"
            valor={unidadePrazo}
            onChange={(valor) => setUnidadePrazo(valor as "meses" | "anos")}
            opcoes={[
              { valor: "meses", rotulo: "meses" },
              { valor: "anos", rotulo: "anos" },
            ]}
          />
        </div>
      </div>

      <Resultado
        pronto={resultado !== null}
        destaqueRotulo="Montante final"
        destaqueValor={resultado ? formatarMoeda(resultado.montante) : "—"}
        itens={itens}
      />
    </div>
  );
}

export default JurosSimples;
