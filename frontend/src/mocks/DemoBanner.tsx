import { FaFlask } from "react-icons/fa";
import { demoAtivo } from "./demo";

/** Faixa de aviso exibida enquanto o modo demonstração está ligado. */
function DemoBanner() {
  if (!demoAtivo()) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        flexWrap: "wrap",

        padding: "8px 16px",

        backgroundColor: "#f59e0b",
        color: "#1f1300",
        fontSize: "0.85rem",
        fontWeight: 600,
        textAlign: "center",
      }}
    >
      <FaFlask aria-hidden="true" />
      Modo demonstração: os cursos exibidos são fictícios e não vêm do banco.
      <a href="?demo=0" style={{ color: "#1f1300", textDecoration: "underline" }}>
        Sair do modo demonstração
      </a>
    </div>
  );
}

export default DemoBanner;
