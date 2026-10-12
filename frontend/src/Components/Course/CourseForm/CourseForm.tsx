import { useState } from "react";
import type { Curso, CreateCurso } from "../../../types/Curso";
import CustomForm from "../../form/CustomForm/CustomForm";
import styles from "./CourseForm.module.css";

type CursoFormProps = {
  curso: Curso | null;
  salvando: boolean;
  erro: string | null;
  onSubmit: (data: CreateCurso) => Promise<void>;
  onClose: () => void;
};

function CursoForm({
  curso,
  salvando,
  erro,
  onSubmit,
  onClose,
}: CursoFormProps) {
  const [titulo, setTitulo] = useState(curso?.titulo ?? "");
  const [descricao, setDescricao] = useState(curso?.descricao ?? "");
  const [nivel, setNivel] = useState(curso?.nivel ?? "Iniciante");
  const [capaUrl, setCapaUrl] = useState(curso?.capa_url ?? "");

  async function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    await onSubmit({
      titulo: titulo.trim(),
      descricao: descricao.trim() || null,
      nivel,
      capa_url: capaUrl.trim() || null,
    });
  }

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-curso"
      >
        <h2 id="titulo-modal-curso">
          {curso ? "Editar curso" : "Adicionar curso"}
        </h2>

        <CustomForm onSubmit={handleSubmit}>
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
          />

          <label htmlFor="nivel">Nível</label>
          <select
            id="nivel"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
          >
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>

          <label htmlFor="capaUrl">URL da capa</label>
          <input
            id="capaUrl"
            type="url"
            value={capaUrl}
            onChange={(e) => setCapaUrl(e.target.value)}
          />

          {erro && <p className={styles.erro}>{erro}</p>}

          <div className={styles.acoes}>
            <button
              type="button"
              className={styles.botaoCancelar}
              onClick={onClose}
              disabled={salvando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.botaoSalvar}
              disabled={salvando}
            >
              {salvando ? "Salvando..." : "Salvar curso"}
            </button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}

export default CursoForm;
