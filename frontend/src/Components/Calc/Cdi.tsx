import { useMemo, useState } from "react";
import CampoNumero from "./CampoNumero";
import Resultado from "./Resultado";
import type { ItemResultado } from "./Resultado";
import {
  ehValido,
  formatarMoeda,
  formatarPorcentagem,
  paraNumero,
  rendimentoCDI,
} from "../../utils/calculadora";
import styles from "./Calc.module.css";

function Cdi() {
  const [valor, setValor] = useState("10000");
  const [cdi, setCdi] = useState("10");
  const [percentual, setPercentual] = useState("110");
  const [meses, setMeses] = useState("24");

  const resultado = useMemo(() => {
    const valorAplicado = paraNumero(valor);
    const taxaCdi = paraNumero(cdi);
    const percentualCdi = paraNumero(percentual);
    const prazo = paraNumero(meses);

    if (
      !ehValido(valorAplicado, taxaCdi, percentualCdi, prazo) ||
      prazo <= 0
    ) {
      return null;
    }

    return rendimentoCDI(valorAplicado, taxaCdi, percentualCdi, prazo);
  }, [valor, cdi, percentual, meses]);

  const itens: ItemResultado[] = resultado
    ? [
        {
          rotulo: "Taxa efetiva",
          valor: `${formatarPorcentagem(resultado.taxaEfetivaAnual)} ao ano`,
        },
        {
          rotulo: "Rendimento bruto",
          valor: formatarMoeda(resultado.rendimentoBruto),
          tom: "positivo",
        },
        {
          rotulo: `IR (${formatarPorcentagem(resultado.aliquota, 1)})`,
          valor: `- ${formatarMoeda(resultado.imposto)}`,
          tom: "negativo",
        },
        {
          rotulo: "Rendimento líquido",
          valor: formatarMoeda(resultado.rendimentoLiquido),
          tom: "positivo",
        },
        {
          rotulo: "Montante bruto",
          valor: formatarMoeda(resultado.montanteBruto),
        },
      ]
    : [];

  return (
    <div className={styles.calculadora}>
      <div className={styles.formulario}>
        <h2 className={styles.formularioTitulo}>CDI</h2>
        <p className={styles.formularioTexto}>
          Boa parte da renda fixa rende um percentual do CDI — "110% do CDI"
          significa 110% da taxa que o CDI render no período. O cálculo já desconta
          o IR da tabela regressiva.
        </p>

        <CampoNumero
          id="cdi-valor"
          rotulo="Valor aplicado"
          prefixo="R$"
          valor={valor}
          onChange={setValor}
          placeholder="10.000,00"
        />

        <div className={styles.linha}>
          <CampoNumero
            id="cdi-taxa"
            rotulo="CDI atual"
            sufixo="% a.a."
            valor={cdi}
            onChange={setCdi}
            placeholder="10"
            dica="Consulte a taxa do dia no site da B3"
          />
          <CampoNumero
            id="cdi-percentual"
            rotulo="Percentual do CDI"
            sufixo="%"
            valor={percentual}
            onChange={setPercentual}
            placeholder="110"
            dica="O que o banco oferece, ex.: 110"
          />
        </div>

        <CampoNumero
          id="cdi-meses"
          rotulo="Prazo"
          sufixo="meses"
          valor={meses}
          onChange={setMeses}
          placeholder="24"
        />
      </div>

      <Resultado
        pronto={resultado !== null}
        destaqueRotulo="Valor líquido no resgate"
        destaqueValor={resultado ? formatarMoeda(resultado.montanteLiquido) : "—"}
        itens={itens}
      />
    </div>
  );
}

export default Cdi;
