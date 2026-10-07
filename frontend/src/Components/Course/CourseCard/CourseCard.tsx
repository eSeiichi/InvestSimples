import { Link } from "react-router-dom";
import { FaPlayCircle, FaRegListAlt, FaArrowRight } from "react-icons/fa";
import type { Curso } from "../../../types/Curso";
import { formatNivel, formatTotalAulas, nivelSlug } from "../../../utils/format";
import styles from "./CourseCard.module.css";

function CourseCard({
  id,
  titulo,
  descricao,
  nivel,
  capa_url,
  total_aulas,
}: Curso) {
  return (
    <Link className={styles.card} to={`/cursos/${id}`}>
      <div className={styles.capa}>
        {capa_url ? (
          <img src={capa_url} alt={`Capa do curso ${titulo}`} loading="lazy" />
        ) : (
          <div className={styles.capaFallback}>
            <FaPlayCircle aria-hidden="true" />
            <span>InvestSimples</span>
          </div>
        )}

        <span className={`${styles.nivel} ${styles[nivelSlug(nivel)] ?? ""}`}>
          {formatNivel(nivel)}
        </span>
      </div>

      <div className={styles.conteudo}>
        <h3 className={styles.titulo}>{titulo}</h3>

        {descricao && <p className={styles.descricao}>{descricao}</p>}

        <div className={styles.rodape}>
          <span className={styles.meta}>
            <FaRegListAlt aria-hidden="true" />
            {formatTotalAulas(total_aulas)}
          </span>

          <span className={styles.cta}>
            Ver curso <FaArrowRight aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
