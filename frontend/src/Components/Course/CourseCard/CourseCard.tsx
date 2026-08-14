import { Link } from "react-router-dom";
import type {Course} from '../../../types/Curso'
import styles from "./CourseCard.module.css"


function CourseCard({
  id,
  titulo,
  descricao,
  nivel,
  capa_url,
  total_aulas,
}: Course) {
  return (
    <Link to={`/cursos/${id}`}>
      <div>
        {capa_url ? (
          <img src={capa_url} alt={`Capa do curso ${titulo}`} />
        ) : (
          <div>Sem imagem</div>
        )}
      </div>

      <div className={styles.container}>
        <h2>{titulo}</h2>

        {descricao && <p>{descricao}</p>}

        <p>Quantidade de aulas: {total_aulas}</p>

        <p>Nível: {nivel}</p>
      </div>
    </Link>
  );
}

export default CourseCard;
