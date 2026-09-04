import { Link } from "react-router-dom";
import { FaPlay, FaRegClock, FaRegPlayCircle } from "react-icons/fa";
import type { AulaResponse } from "../../../types/Aula";
import {
  duracaoTotal,
  formatDuracao,
  formatTotalAulas,
  ordenarAulas,
} from "../../../utils/format";
import styles from "./CourseSidebar.module.css";

type CourseSidebarProps = {
  cursoId: string;
  aulas: AulaResponse[];
  /** id da aula que está sendo assistida (destacada na lista) */
  aulaAtivaId?: string;
  titulo?: string;
};

function CourseSidebar({
  cursoId,
  aulas,
  aulaAtivaId,
  titulo = "Conteúdo do curso",
}: CourseSidebarProps) {
  const lista = ordenarAulas(aulas);
  const total = duracaoTotal(lista);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>{titulo}</h2>
        <p className={styles.resumo}>
          {formatTotalAulas(lista.length)}
          {total > 0 && ` • ${formatDuracao(total)}`}
        </p>
      </div>

      {lista.length === 0 ? (
        <p className={styles.vazio}>Este curso ainda não possui aulas.</p>
      ) : (
        <ol className={styles.lista}>
          {lista.map((aula, indice) => {
            const ativa = aula.id === aulaAtivaId;

            return (
              <li key={aula.id}>
                <Link
                  className={`${styles.item} ${ativa ? styles.itemAtivo : ""}`}
                  to={`/cursos/${cursoId}/aulas/${aula.id}`}
                  aria-current={ativa ? "true" : undefined}
                >
                  <span className={styles.indice}>
                    {ativa ? <FaPlay aria-hidden="true" /> : indice + 1}
                  </span>

                  <span className={styles.info}>
                    <span className={styles.itemTitulo}>{aula.titulo}</span>
                    <span className={styles.itemMeta}>
                      {aula.url_video ? (
                        <>
                          <FaRegPlayCircle aria-hidden="true" /> Vídeo
                        </>
                      ) : (
                        <>
                          <FaRegPlayCircle aria-hidden="true" /> Leitura
                        </>
                      )}
                      {aula.duracao_minutos ? (
                        <>
                          <span className={styles.separador}>•</span>
                          <FaRegClock aria-hidden="true" />
                          {formatDuracao(aula.duracao_minutos)}
                        </>
                      ) : null}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </aside>
  );
}

export default CourseSidebar;
