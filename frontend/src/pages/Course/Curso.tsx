import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaPlay,
  FaRegClock,
  FaRegListAlt,
  FaRedo,
  FaSignal,
} from "react-icons/fa";
import { getCurso } from "../../api/cursos";
import type { ListCurso } from "../../types/Curso";
import CourseSidebar from "../../Components/Course/CourseSidebar/CourseSidebar";
import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer";
import {
  duracaoTotal,
  formatDuracao,
  formatNivel,
  formatTotalAulas,
  ordenarAulas,
} from "../../utils/format";
import styles from "./CoursePlayer.module.css";

function Curso() {
  const { cursoId } = useParams<{ cursoId: string }>();

  const [curso, setCurso] = useState<ListCurso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // incrementado pelo botão "tentar novamente" para refazer a requisição
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    if (!cursoId) {
      return;
    }

    let ativo = true;

    async function carregarCurso(id: string) {
      try {
        const data = await getCurso(id);
        if (ativo) {
          setCurso(data);
        }
      } catch {
        if (ativo) {
          setError("Não foi possível carregar o curso.");
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarCurso(cursoId);

    return () => {
      ativo = false;
    };
  }, [cursoId, tentativa]);

  function tentarNovamente() {
    setLoading(true);
    setError(null);
    setTentativa((valor) => valor + 1);
  }

  if (!cursoId) {
    return (
      <div className={styles.estado}>
        <p>Curso não informado.</p>
        <Link className={styles.estadoBotao} to="/cursos">
          Ver todos os cursos
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.pagina}>
        <section className={styles.palco}>
          <div className={styles.palcoInner}>
            <div className={styles.grade}>
              <div className={styles.carregandoPlayer} />
              <div className={styles.carregandoLista} />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !curso) {
    return (
      <div className={styles.estado}>
        <p>{error ?? "Curso não encontrado."}</p>
        <div className={styles.acoes}>
          <button type="button" className={styles.estadoBotao} onClick={tentarNovamente}>
            <FaRedo aria-hidden="true" /> Tentar novamente
          </button>
          <Link className={styles.estadoBotao} to="/cursos">
            Ver todos os cursos
          </Link>
        </div>
      </div>
    );
  }

  const aulas = ordenarAulas(curso.aulas ?? []);
  // a primeira aula com vídeo é usada como apresentação do curso
  const aulaIntro = aulas.find((aula) => aula.url_video) ?? aulas[0];
  const primeiraAula = aulas[0];
  const total = duracaoTotal(aulas);

  return (
    <div className={styles.pagina}>
      {/* --- apresentação: vídeo + playlist --- */}
      <section className={styles.palco}>
        <div className={styles.palcoInner}>
          <div className={styles.trilha}>
            <Link className={styles.voltar} to="/cursos">
              <FaArrowLeft aria-hidden="true" /> Voltar para cursos
            </Link>
            <p className={styles.migalha}>
              <Link to="/cursos">Cursos</Link> / {curso.titulo}
            </p>
          </div>

          <div className={styles.grade}>
            <div className={styles.principal}>
              {aulaIntro?.url_video ? (
                <VideoPlayer url={aulaIntro.url_video} controls />
              ) : curso.capa_url ? (
                <img
                  className={styles.capaDestaque}
                  src={curso.capa_url}
                  alt={`Capa do curso ${curso.titulo}`}
                />
              ) : (
                <VideoPlayer emptyMessage="Este curso ainda não possui vídeo de apresentação." />
              )}

              <div>
                <span className={styles.selo}>
                  <FaPlay aria-hidden="true" /> Apresentação do curso
                </span>
                <h1 className={styles.tituloPrincipal}>{curso.titulo}</h1>
                {curso.descricao && (
                  <p className={styles.subtitulo}>{curso.descricao}</p>
                )}
              </div>

              <div className={styles.metas}>
                <span className={styles.meta}>
                  <FaRegListAlt aria-hidden="true" />
                  {formatTotalAulas(aulas.length)}
                </span>
                <span className={styles.meta}>
                  <FaRegClock aria-hidden="true" />
                  {total > 0 ? formatDuracao(total) : "Duração livre"}
                </span>
                <span className={styles.meta}>
                  <FaSignal aria-hidden="true" />
                  {formatNivel(curso.nivel)}
                </span>
              </div>

              <div className={styles.acoes}>
                {primeiraAula ? (
                  <Link
                    className={styles.botaoPrimario}
                    to={`/cursos/${curso.id}/aulas/${primeiraAula.id}`}
                  >
                    <FaPlay aria-hidden="true" /> Começar o curso
                  </Link>
                ) : (
                  <span className={`${styles.botaoPrimario} ${styles.botaoDesativado}`}>
                    <FaPlay aria-hidden="true" /> Em breve
                  </span>
                )}

                <a className={styles.botaoSecundario} href="#sobre-o-curso">
                  Saiba mais
                </a>
              </div>
            </div>

            <CourseSidebar cursoId={curso.id} aulas={aulas} />
          </div>
        </div>
      </section>

      {/* --- descrição detalhada --- */}
      <section className={styles.detalhes} id="sobre-o-curso">
        <div className={styles.detalhesGrade}>
          <div>
            <article className={styles.cartao}>
              <h2 className={styles.cartaoTitulo}>Sobre o curso</h2>
              <p className={styles.texto}>
                {curso.descricao ??
                  "Este curso ainda não possui uma descrição detalhada."}
              </p>
            </article>

            {aulas.length > 0 && (
              <article className={styles.cartao}>
                <h2 className={styles.cartaoTitulo}>O que você vai aprender</h2>
                <ul className={styles.aprendizados}>
                  {aulas.map((aula) => (
                    <li key={aula.id}>
                      <FaCheckCircle aria-hidden="true" />
                      <span>{aula.titulo}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )}
          </div>

          <aside className={styles.cartao}>
            <h2 className={styles.cartaoTitulo}>Informações</h2>
            <ul className={styles.infoLista}>
              <li className={styles.infoItem}>
                <span className={styles.infoRotulo}>
                  <FaSignal aria-hidden="true" /> Nível
                </span>
                <span className={styles.infoValor}>{formatNivel(curso.nivel)}</span>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoRotulo}>
                  <FaRegListAlt aria-hidden="true" /> Aulas
                </span>
                <span className={styles.infoValor}>{aulas.length}</span>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoRotulo}>
                  <FaRegClock aria-hidden="true" /> Duração
                </span>
                <span className={styles.infoValor}>
                  {total > 0 ? formatDuracao(total) : "--"}
                </span>
              </li>
            </ul>

            {primeiraAula && (
              <Link
                className={styles.infoBotao}
                to={`/cursos/${curso.id}/aulas/${primeiraAula.id}`}
              >
                <FaPlay aria-hidden="true" /> Assistir primeira aula
              </Link>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Curso;
