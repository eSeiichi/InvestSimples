import styles from "./SubmitButton.module.css";

type SubmitButtonProps = {
  text: string;
  disabled?: boolean;
};

function SubmitButton({ text, disabled }: SubmitButtonProps) {
  return (
    <button className={styles.btn} type="submit" disabled={disabled}>
      {text}
    </button>
  );
}
export default SubmitButton;
