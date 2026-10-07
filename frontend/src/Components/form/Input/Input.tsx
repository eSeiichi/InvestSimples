import styles from "./Input.module.css";

type InputProps = {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
};

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  required,
  disabled,
  autoComplete,
}: InputProps) {
  return (
    <div className={styles.campo}>
      <label className={styles.rotulo} htmlFor={name}>
        {text}
      </label>
      <input
        className={styles.entrada}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
      />
    </div>
  );
}
export default Input;
