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
  jurosCompostos,
  paraNumero,
} from "../../utils/calculadora";
import styles from "./Calc.module.css";

function JurosCompostos() {
  const [capital, setCapital] = useState("1000");
  const [aporte, setAporte] = useState("300");
  const [taxa, setTaxa] = useState("0,9");
  const [periodicidade, setPeriodicidade] = useState<Periodicidade>("mensal");
  const [prazo, setPrazo] = useState("10");
  const [unidadePrazo, setUnidadePrazo] = useState<"meses" | "anos">("anos");

  const resultado = useMemo(() => {
    const valorCapital = paraNumero(capital);
    const valorAporte = aporte.trim() === "" ? 0 : paraNumero(aporte);
    const valorTaxa = paraNumero(taxa);
    const valorPrazo = paraNumero(prazo);

    if (
      !ehValido(valorCapital, valorAporte, valorTaxa, valorPrazo) ||
      valorPrazo <= 0
    ) {
      return null;
    }

    const meses = Math.round(
      unidadePrazo === "anos" ? valorPrazo * 12 : valorPrazo,
    );

    // limite de segurança para não travar a tabela com prazos absurdos
    if (meses > 1200) {
      return null;
    }

    return jurosCompostos(
      valorCapital,
      valorAporte,
      valorTaxa,
      periodicidade,
      meses,
    );
  }, [capital, aporte, taxa, periodicidade, prazo, unidadePrazo]);

  const itens: ItemResultado[] = resultado
    ? [
        { rotulo: "Total investido", valor: formatarMoeda(resultado.totalInvestido) },
        {
          rotulo: "Total em juros",
          valor: formatarMoeda(resultado.juros),
          tom: "positivo",
        },
        {
          rotulo: "Juros sobre o investido",
          valor:
            resultado.totalInvestido > 0
              ? formatarPorcentagem(
                  (resultado.juros / resultado.totalInvestido) * 100,
                )
              : "—",
        },
        {
          rotulo: "Taxa equivalente",
          valor: `${formatarPorcentagem(resultado.taxaMensal * 100)} ao mês`,
        },
      ]
    : [];

  // mostra a evolução ano a ano (ou mês a mês em prazos curtos)
  const linhasTabela = useMemo(() => {
    if (!resultado) {
      return [];
    }

    const porAno = resultado.evolucao.length > 24;
    return resultado.evolucao.filter((linha) =>
      porAno
        ? linha.mes % 12 === 0 || linha.mes === resultado.evolucao.length
        : true,
    );
  }, [resultado]);

  return (
    <div className={styles.calculadora}>
      <div className={styles.formulario}>
        <h2 className={styles.formularioTitulo}>Juros compostos</h2>
        <p className={styles.formularioTexto}>
          Aqui os juros rendem juros. É assim que funcionam os investimentos — e
          por isso o tempo pesa mais que o valor do aporte.
        </p>

        <div className={styles.linha}>
          <CampoNumero
            id="jc-capital"
            rotulo="Valor inicial"
            prefixo="R$"
            valor={capital}
            onChange={setCapital}
            placeholder="1.000,00"
          />
          <CampoNumero
            id="jc-aporte"
            rotulo="Aporte mensal"
            prefixo="R$"
            valor={aporte}
            onChange={setAporte}
            placeholder="300,00"
            dica="Deixe zerado se não for aportar"
          />
        </div>

        <div className={styles.linha}>
          <CampoNumero
            id="jc-taxa"
            rotulo="Taxa de juros"
            sufixo="%"
            valor={taxa}
            onChange={setTaxa}
            placeholder="0,9"
          />
          <CampoSelect
            id="jc-periodicidade"
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
            id="jc-prazo"
            rotulo="Prazo"
            valor={prazo}
            onChange={setPrazo}
            placeholder="10"
          />
          <CampoSelect
            id="jc-unidade"
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
      >
        {resultado && linhasTabela.length > 0 && (
          <>
            <p className={styles.subtitulo}>Evolução</p>
            <div className={styles.tabelaWrapper}>
              <table className={styles.tabela}>
                <thead>
                  <tr>
                    <th scope="col">Mês</th>
                    <th scope="col">Investido</th>
                    <th scope="col">Juros</th>
                    <th scope="col">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {linhasTabela.map((linha) => (
                    <tr key={linha.mes}>
                      <td>{linha.mes}</td>
                      <td>{formatarMoeda(linha.investido)}</td>
                      <td>{formatarMoeda(linha.juros)}</td>
                      <td>{formatarMoeda(linha.saldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Resultado>
    </div>
  );
}

export default JurosCompostos;
