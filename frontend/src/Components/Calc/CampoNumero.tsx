import styles from "./Calc.module.css";

type CampoNumeroProps = {
  id: string;
  rotulo: string;
  valor: string;
  onChange: (valor: string) => void;
  /** texto à esquerda do campo, ex.: "R$" */
  prefixo?: string;
  /** texto à direita do campo, ex.: "%" ou "meses" */
  sufixo?: string;
  placeholder?: string;
  dica?: string;
};

/** Campo numérico com prefixo/sufixo, usado por todas as calculadoras. */
function CampoNumero({
  id,
  rotulo,
  valor,
  onChange,
  prefixo,
  sufixo,
  placeholder,
  dica,
}: CampoNumeroProps) {
  return (
    <div className={styles.campo}>
      <label className={styles.rotulo} htmlFor={id}>
        {rotulo}
      </label>

      <div className={styles.entrada}>
        {prefixo && (
          <span className={`${styles.afixo} ${styles.prefixo}`}>{prefixo}</span>
        )}

        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={valor}
          placeholder={placeholder}
          onChange={(evento) => onChange(evento.target.value)}
        />

        {sufixo && (
          <span className={`${styles.afixo} ${styles.sufixo}`}>{sufixo}</span>
        )}
      </div>

      {dica && <span className={styles.dica}>{dica}</span>}
    </div>
  );
}

export default CampoNumero;
