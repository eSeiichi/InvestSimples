import { useState } from "react";
import type { Aula, AulaData } from "../../../types/Aula";
import CustomForm from "../../form/CustomForm/CustomForm";
import styles from "./CourseForm.module.css"

type AulaFormProps = {
  aula: Aula | null;
  salvando: boolean;
  erro: string | null;
  onSubmit: (data: AulaData) => Promise<void>;
  onClose: () => void;
};

function AulaForm({ aula, salvando, erro, onSubmit, onClose }: AulaFormProps) {
  const [titulo, setTitulo] = useState(aula?.titulo ?? "");
  const [descricao, setDescricao] = useState(aula?.descricao ?? "");
  const [conteudo, setConteudo] = useState(aula?.conteudo ?? "");
  const [url_video, setUrl_video] = useState(aula?.url_video ?? "");
  const [duracao_minutos, setDuracao_minutos] = useState(
    aula?.duracao_minutos ?? 0,
  );
  const [ordem, setOrdem] = useState(aula?.ordem ?? 0);

  async function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    await onSubmit({
    titulo: titulo.trim(),
    descricao: descricao.trim() || null,
    conteudo: conteudo.trim() || null,
    url_video: url_video.trim() || null,
    duracao_minutos: duracao_minutos > 0 ? duracao_minutos : null,
    ordem,
  });
  }

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-aula"
      >
        <h2 id="titulo-modal-aula">
          {aula ? "Editar aula" : "Adicionar aula"}
        </h2>

        <CustomForm onSubmit={handleSubmit}>
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            required
          />

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            rows={4}
          />

          <label htmlFor="conteudo">Conteúdo</label>
          <textarea
            name="conteudo"
            id="conteudo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />

          <label htmlFor="url_video">URL do vídeo</label>
          <input
            id="url_video"
            type="url"
            value={url_video}
            onChange={(evento) => setUrl_video(evento.target.value)}
          />

          <label htmlFor="duracao_minutos">Duracao do video (minutos) </label>
          <input
            id="duracao_minutos"
            type="number"
            value={duracao_minutos}
            onChange={(evento) =>
              setDuracao_minutos(Number(evento.target.value))
            }
          />

          <label htmlFor="ordem">Ordem do vídeo </label>
          <input
            id="ordem"
            type="number"
            value={ordem}
            onChange={(evento) => setOrdem(Number(evento.target.value))}
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

            <button type="submit" className={styles.botaoSalvar} disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar curso"}
            </button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}
export default AulaForm