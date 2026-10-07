import { useMemo, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import CampoNumero from "./CampoNumero";
import Resultado from "./Resultado";
import type { ItemResultado } from "./Resultado";
import {
  TABELA_IR,
  ehValido,
  formatarMoeda,
  formatarPorcentagem,
  impostoRenda,
  paraNumero,
} from "../../utils/calculadora";
import styles from "./Calc.module.css";

function ImpostoRenda() {
  const [aplicado, setAplicado] = useState("10000");
  const [bruto, setBruto] = useState("11500");
  const [dias, setDias] = useState("365");

  const resultado = useMemo(() => {
    const valorAplicado = paraNumero(aplicado);
    const valorBruto = paraNumero(bruto);
    const valorDias = paraNumero(dias);

    if (!ehValido(valorAplicado, valorBruto, valorDias) || valorDias <= 0) {
      return null;
    }

    return impostoRenda(valorAplicado, valorBruto, valorDias);
  }, [aplicado, bruto, dias]);

  const itens: ItemResultado[] = resultado
    ? [
        {
          rotulo: "Rendimento bruto",
          valor: formatarMoeda(resultado.rendimentoBruto),
          tom: "positivo",
        },
        {
          rotulo: `Alíquota (${resultado.faixa.rotulo.toLowerCase()})`,
          valor: formatarPorcentagem(resultado.aliquota, 1),
        },
        {
          rotulo: "Imposto devido",
          valor: `- ${formatarMoeda(resultado.imposto)}`,
          tom: "negativo",
        },
        {
          rotulo: "Rendimento líquido",
          valor: formatarMoeda(resultado.rendimentoLiquido),
          tom: "positivo",
        },
      ]
    : [];

  return (
    <div className={styles.calculadora}>
      <div className={styles.formulario}>
        <h2 className={styles.formularioTitulo}>Imposto de renda</h2>
        <p className={styles.formularioTexto}>
          IR sobre investimentos de renda fixa (Tesouro Direto, CDB, LC). A
          alíquota cai conforme o dinheiro fica aplicado e incide apenas sobre o
          rendimento, nunca sobre o valor investido.
        </p>

        <CampoNumero
          id="ir-aplicado"
          rotulo="Valor aplicado"
          prefixo="R$"
          valor={aplicado}
          onChange={setAplicado}
          placeholder="10.000,00"
        />

        <CampoNumero
          id="ir-bruto"
          rotulo="Valor bruto no resgate"
          prefixo="R$"
          valor={bruto}
          onChange={setBruto}
          placeholder="11.500,00"
          dica="Quanto o investimento vale hoje, antes dos descontos"
        />

        <CampoNumero
          id="ir-dias"
          rotulo="Tempo aplicado"
          sufixo="dias"
          valor={dias}
          onChange={setDias}
          placeholder="365"
          dica="1 ano = 365 dias • 2 anos = 730 dias"
        />

        <div>
          <p className={styles.rotulo}>Tabela regressiva</p>
          <div
            className={`${styles.tabelaWrapper} ${styles.tabelaClara}`}
            style={{ maxHeight: "none" }}
          >
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th scope="col">Prazo</th>
                  <th scope="col">Alíquota</th>
                </tr>
              </thead>
              <tbody>
                {TABELA_IR.map((faixa) => (
                  <tr
                    key={faixa.rotulo}
                    className={
                      resultado?.faixa.rotulo === faixa.rotulo
                        ? styles.linhaDestacada
                        : ""
                    }
                  >
                    <td>{faixa.rotulo}</td>
                    <td>{formatarPorcentagem(faixa.aliquota, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Resultado
        pronto={resultado !== null}
        destaqueRotulo="Valor líquido no resgate"
        destaqueValor={resultado ? formatarMoeda(resultado.valorLiquido) : "—"}
        itens={itens}
      >
        {resultado?.temIOF && (
          <p className={styles.aviso}>
            <FaExclamationTriangle aria-hidden="true" />
            <span>
              Resgates com menos de 30 dias também pagam IOF, que começa em 96% do
              rendimento no primeiro dia e zera no trigésimo. Esse desconto não está
              incluído no cálculo acima.
            </span>
          </p>
        )}
      </Resultado>
    </div>
  );
}

export default ImpostoRenda;
