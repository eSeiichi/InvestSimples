import { Link } from 'react-router-dom'
import type {UUIDTypes} from 'uuid'

type CourseCardProps ={
    id: UUIDTypes,
    titulo: string,
    descricao: string,
    nivel: string,
    capaUrl: string
}

function CourseCard({id,titulo,descricao,nivel,capaUrl}:CourseCardProps){
    return(
        <Link to={`/cursos/${id}`}>  
            <div>
                <img src={capaUrl} alt="capa" />
            </div>
            <div>
                <h2>{titulo}</h2>
                <p>{descricao}</p>
                <p>{nivel}</p>
            </div>
        </Link>
    )
}
export default CourseCard