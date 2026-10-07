import { useState } from "react";
import type { ComponentType } from "react";
import {
  FaChartLine,
  FaCoins,
  FaFileInvoiceDollar,
  FaPercent,
  FaPiggyBank,
  FaUniversity,
} from "react-icons/fa";
import JurosSimples from "../../Components/Calc/JurosSimples";
import JurosCompostos from "../../Components/Calc/JurosCompostos";
import ImpostoRenda from "../../Components/Calc/ImpostoRenda";
import Cdi from "../../Components/Calc/Cdi";
import Ipca from "../../Components/Calc/Ipca";
import Porcentagem from "../../Components/Calc/Porcentagem";
import styles from "./Calc.module.css";

type Aba = {
  id: string;
  rotulo: string;
  icone: ComponentType;
  componente: ComponentType;
};

const ABAS: Aba[] = [
  {
    id: "juros-simples",
    rotulo: "Juros simples",
    icone: FaCoins,
    componente: JurosSimples,
  },
  {
    id: "juros-compostos",
    rotulo: "Juros compostos",
    icone: FaPiggyBank,
    componente: JurosCompostos,
  },
  {
    id: "imposto-renda",
    rotulo: "Imposto de renda",
    icone: FaFileInvoiceDollar,
    componente: ImpostoRenda,
  },
  {
    id: "cdi",
    rotulo: "CDI",
    icone: FaUniversity,
    componente: Cdi,
  },
  {
    id: "ipca",
    rotulo: "IPCA",
    icone: FaChartLine,
    componente: Ipca,
  },
  {
    id: "porcentagem",
    rotulo: "Porcentagem",
    icone: FaPercent,
    componente: Porcentagem,
  },
];

function Calc() {
  const [abaAtiva, setAbaAtiva] = useState(ABAS[0].id);

  const aba = ABAS.find((item) => item.id === abaAtiva) ?? ABAS[0];
  const Calculadora = aba.componente;

  return (
    <div className={styles.pagina}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroTag}>Ferramentas</span>
          <h1 className={styles.heroTitulo}>Calculadora financeira</h1>
          <p className={styles.heroTexto}>
            Simule rendimentos, descubra o valor do imposto de renda e compare seu
            investimento com a inflação. Os resultados aparecem enquanto você digita.
          </p>
        </div>
      </section>

      <section className={styles.conteudo}>
        <div className={styles.abas} role="tablist" aria-label="Calculadoras">
          {ABAS.map((item) => {
            const Icone = item.icone;
            const ativa = item.id === aba.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={ativa}
                className={`${styles.aba} ${ativa ? styles.abaAtiva : ""}`}
                onClick={() => setAbaAtiva(item.id)}
              >
                <Icone aria-hidden="true" />
                {item.rotulo}
              </button>
            );
          })}
        </div>

        <div className={styles.painel} role="tabpanel">
          <Calculadora />
        </div>

        <p className={styles.rodape}>
          As simulações são estimativas com fins educacionais: consideram taxas
          constantes durante todo o período e não incluem taxas de corretagem,
          custódia ou eventuais mudanças na legislação.
        </p>
      </section>
    </div>
  );
}

export default Calc;
