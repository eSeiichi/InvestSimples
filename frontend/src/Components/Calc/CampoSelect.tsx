import styles from "./Calc.module.css";

type Opcao = {
  valor: string;
  rotulo: string;
};

type CampoSelectProps = {
  id: string;
  rotulo: string;
  valor: string;
  opcoes: Opcao[];
  onChange: (valor: string) => void;
  dica?: string;
};

/** Select com a mesma aparência dos campos de texto. */
function CampoSelect({
  id,
  rotulo,
  valor,
  opcoes,
  onChange,
  dica,
}: CampoSelectProps) {
  return (
    <div className={styles.campo}>
      <label className={styles.rotulo} htmlFor={id}>
        {rotulo}
      </label>

      <select
        id={id}
        className={styles.select}
        value={valor}
        onChange={(evento) => onChange(evento.target.value)}
      >
        {opcoes.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.rotulo}
          </option>
        ))}
      </select>

      {dica && <span className={styles.dica}>{dica}</span>}
    </div>
  );
}

export default CampoSelect;
