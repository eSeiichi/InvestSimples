import { useMemo, useState } from "react";
import CampoNumero from "./CampoNumero";
import Resultado from "./Resultado";
import type { ItemResultado } from "./Resultado";
import {
  correcaoIPCA,
  ehValido,
  formatarMoeda,
  formatarPorcentagem,
  paraNumero,
} from "../../utils/calculadora";
import styles from "./Calc.module.css";

function Ipca() {
  const [valor, setValor] = useState("10000");
  const [ipca, setIpca] = useState("4,5");
  const [nominal, setNominal] = useState("10");
  const [meses, setMeses] = useState("24");

  const resultado = useMemo(() => {
    const valorAplicado = paraNumero(valor);
    const taxaIpca = paraNumero(ipca);
    const taxaNominal = paraNumero(nominal);
    const prazo = paraNumero(meses);

    if (!ehValido(valorAplicado, taxaIpca, taxaNominal, prazo) || prazo <= 0) {
      return null;
    }

    return correcaoIPCA(valorAplicado, taxaIpca, taxaNominal, prazo);
  }, [valor, ipca, nominal, meses]);

  const itens: ItemResultado[] = resultado
    ? [
        {
          rotulo: "Inflação no período",
          valor: formatarPorcentagem(resultado.inflacaoPeriodo),
        },
        {
          rotulo: "Só para empatar com a inflação",
          valor: formatarMoeda(resultado.valorCorrigido),
        },
        {
          rotulo: "Montante do investimento",
          valor: formatarMoeda(resultado.montanteNominal),
        },
        {
          rotulo: "Ganho nominal",
          valor: formatarMoeda(resultado.ganhoNominal),
          tom: "positivo",
        },
        {
          rotulo: "Ganho real (acima da inflação)",
          valor: formatarMoeda(resultado.ganhoRealValor),
          tom: resultado.ganhoRealValor >= 0 ? "positivo" : "negativo",
        },
      ]
    : [];

  return (
    <div className={styles.calculadora}>
      <div className={styles.formulario}>
        <h2 className={styles.formularioTitulo}>IPCA e ganho real</h2>
        <p className={styles.formularioTexto}>
          Render 10% com a inflação em 4,5% não é ganhar 10%. Aqui você vê quanto
          sobra depois de descontar a inflação — o que realmente aumentou o seu
          poder de compra.
        </p>

        <CampoNumero
          id="ipca-valor"
          rotulo="Valor investido"
          prefixo="R$"
          valor={valor}
          onChange={setValor}
          placeholder="10.000,00"
        />

        <div className={styles.linha}>
          <CampoNumero
            id="ipca-taxa"
            rotulo="IPCA estimado"
            sufixo="% a.a."
            valor={ipca}
            onChange={setIpca}
            placeholder="4,5"
            dica="Inflação anual esperada"
          />
          <CampoNumero
            id="ipca-nominal"
            rotulo="Rendimento do investimento"
            sufixo="% a.a."
            valor={nominal}
            onChange={setNominal}
            placeholder="10"
            dica="Taxa nominal, antes da inflação"
          />
        </div>

        <CampoNumero
          id="ipca-meses"
          rotulo="Prazo"
          sufixo="meses"
          valor={meses}
          onChange={setMeses}
          placeholder="24"
        />
      </div>

      <Resultado
        pronto={resultado !== null}
        destaqueRotulo="Ganho real no período"
        destaqueValor={
          resultado ? formatarPorcentagem(resultado.ganhoRealPercentual) : "—"
        }
        destaqueTom={
          resultado && resultado.ganhoRealPercentual >= 0 ? "positivo" : "negativo"
        }
        itens={itens}
      />
    </div>
  );
}

export default Ipca;
