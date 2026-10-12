import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaRegClock,
  FaRegListAlt,
  FaRedo,
  FaSignal,
  FaPlus,
} from "react-icons/fa";
import { getAula } from "../../api/aulas";
import type { Aula } from "../../types/Aula";
import CourseSidebar from "../../components/Course/CourseSidebar/CourseSidebar";
import AulaForm from "../../components/Course/AulaForm/AulaForm";
import VideoPlayer from "../../Components/VideoPlayer/VideoPlayer";
import {
  formatDuracao,
  formatNivel,
  formatTotalAulas,
  ordenarAulas,
} from "../../utils/format";
import { useAuth } from "../../Contexts/AuthContext";
import { useCurso } from "../../hooks/useCurso";
import { useEditorAulas } from "../../hooks/useEditorAulas";
import styles from "./CoursePlayer.module.css";

function AulaPagina() {
  const { cursoId, aulaId } = useParams<{ cursoId: string; aulaId: string }>();
  const usuario = useAuth();
  const isAdmin = usuario.usuario?.role === "admin";

  // curso (e playlist): só é buscado de novo quando o cursoId muda
  const {
    curso,
    loading: loadingCurso,
    error: erroCurso,
    recarregar: recarregarCurso,
  } = useCurso(cursoId);

  // aula atual: depende também do aulaId
  const [aula, setAula] = useState<Aula | null>(null);
  const [loadingAula, setLoadingAula] = useState(true);
  const [erroAula, setErroAula] = useState<string | null>(null);

  // incrementado para refazer a busca da aula (retry e depois de salvar)
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    if (!cursoId || !aulaId) return;

    let ativo = true;

    async function carregarAula(idCurso: string, idAula: string) {
      setErroAula(null);
      try {
        const dados = await getAula(idCurso, idAula);
        if (ativo) setAula(dados);
      } catch {
        if (ativo) setErroAula("Não foi possível carregar a aula.");
      } finally {
        if (ativo) setLoadingAula(false);
      }
    }

    carregarAula(cursoId, aulaId);
    window.scrollTo({ top: 0 });

    return () => {
      ativo = false;
    };
  }, [cursoId, aulaId, versao]);

  // usado depois de salvar: atualiza a playlist e a aula aberta
  async function recarregarTudo() {
    await recarregarCurso();
    setVersao((valor) => valor + 1);
  }

  const editor = useEditorAulas(cursoId, recarregarTudo);

  function tentarNovamente() {
    setLoadingAula(true);
    recarregarCurso();
    setVersao((valor) => valor + 1);
  }

  const loading = loadingCurso || loadingAula;
  const error = erroCurso ?? erroAula;

  if (!cursoId || !aulaId) {
    return (
      <div className={styles.estado}>
        <p>Curso ou aula não informado.</p>
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

  if (error || !aula) {
    return (
      <div className={styles.estado}>
        <p>{error ?? "Aula não encontrada."}</p>
        <div className={styles.acoes}>
          <button
            type="button"
            className={styles.estadoBotao}
            onClick={tentarNovamente}
          >
            <FaRedo aria-hidden="true" /> Tentar novamente
          </button>
          <Link className={styles.estadoBotao} to={`/cursos/${cursoId}`}>
            Voltar ao curso
          </Link>
        </div>
      </div>
    );
  }

  const aulas = ordenarAulas(curso?.aulas ?? []);
  const posicao = aulas.findIndex((item) => item.id === aula.id);
  const anterior = posicao > 0 ? aulas[posicao - 1] : null;
  const proxima =
    posicao >= 0 && posicao < aulas.length - 1 ? aulas[posicao + 1] : null;

  return (
    <div className={styles.pagina}>
      {/* --- player + playlist --- */}
      <section className={styles.palco}>
        <div className={styles.palcoInner}>
          <div className={styles.trilha}>
            <div className={styles.trilhaAcoes}>
              <Link className={styles.voltar} to={`/cursos/${cursoId}`}>
                <FaArrowLeft aria-hidden="true" /> Voltar ao curso
              </Link>

              {isAdmin && (
                <button
                  type="button"
                  className={styles.botaoNovaAula}
                  onClick={editor.abrirNovaAula}
                >
                  <FaPlus aria-hidden="true" /> Adicionar aula
                </button>
              )}
            </div>

            <p className={styles.migalha}>
              <Link to="/cursos">Cursos</Link> /{" "}
              <Link to={`/cursos/${cursoId}`}>{curso?.titulo ?? "Curso"}</Link>{" "}
              / {aula.titulo}
            </p>
          </div>

          <div className={styles.grade}>
            <div className={styles.principal}>
              <VideoPlayer
                url={aula.url_video}
                controls
                emptyMessage="Esta aula ainda não possui vídeo. O conteúdo está disponível abaixo."
                onEnded={() => console.log("Aula concluída")}
              />

              <div>
                {posicao >= 0 && (
                  <span className={styles.selo}>Aula {posicao + 1}</span>
                )}
                <h1 className={styles.tituloPrincipal}>{aula.titulo}</h1>
                {aula.descricao && (
                  <p className={styles.subtitulo}>{aula.descricao}</p>
                )}
              </div>

              <div className={styles.metas}>
                <span className={styles.meta}>
                  <FaRegListAlt aria-hidden="true" />
                  {posicao >= 0
                    ? `Aula ${posicao + 1} de ${aulas.length}`
                    : formatTotalAulas(aulas.length)}
                </span>
                <span className={styles.meta}>
                  <FaRegClock aria-hidden="true" />
                  {formatDuracao(aula.duracao_minutos)}
                </span>
                {curso && (
                  <span className={styles.meta}>
                    <FaSignal aria-hidden="true" />
                    {formatNivel(curso.nivel)}
                  </span>
                )}
              </div>

              {/* navegação entre aulas */}
              <div className={styles.acoes}>
                {anterior ? (
                  <Link
                    className={styles.botaoSecundario}
                    to={`/cursos/${cursoId}/aulas/${anterior.id}`}
                  >
                    <FaChevronLeft aria-hidden="true" /> Aula anterior
                  </Link>
                ) : (
                  <span
                    className={`${styles.botaoSecundario} ${styles.botaoDesativado}`}
                  >
                    <FaChevronLeft aria-hidden="true" /> Aula anterior
                  </span>
                )}

                {proxima ? (
                  <Link
                    className={styles.botaoPrimario}
                    to={`/cursos/${cursoId}/aulas/${proxima.id}`}
                  >
                    Próxima aula <FaChevronRight aria-hidden="true" />
                  </Link>
                ) : (
                  <Link
                    className={styles.botaoPrimario}
                    to={`/cursos/${cursoId}`}
                  >
                    Concluir curso <FaChevronRight aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>

            <CourseSidebar
              cursoId={cursoId}
              aulas={aulas}
              aulaAtivaId={aula.id}
              titulo={curso?.titulo ?? "Conteúdo do curso"}
              isAdmin={isAdmin}
              onEditarAula={editor.abrirEdicao}
            />
          </div>
        </div>
      </section>

      {/* --- conteúdo detalhado da aula --- */}
      <section className={styles.detalhes}>
        <div className={styles.detalhesGrade}>
          <div>
            <article className={styles.cartao}>
              <h2 className={styles.cartaoTitulo}>Sobre esta aula</h2>
              <p className={styles.texto}>
                {aula.conteudo ??
                  aula.descricao ??
                  "Esta aula ainda não possui uma descrição detalhada."}
              </p>
            </article>
          </div>

          <aside className={styles.cartao}>
            <h2 className={styles.cartaoTitulo}>Nesta aula</h2>
            <ul className={styles.infoLista}>
              <li className={styles.infoItem}>
                <span className={styles.infoRotulo}>
                  <FaRegListAlt aria-hidden="true" /> Posição
                </span>
                <span className={styles.infoValor}>
                  {posicao >= 0 ? `${posicao + 1} / ${aulas.length}` : "--"}
                </span>
              </li>
              <li className={styles.infoItem}>
                <span className={styles.infoRotulo}>
                  <FaRegClock aria-hidden="true" /> Duração
                </span>
                <span className={styles.infoValor}>
                  {formatDuracao(aula.duracao_minutos)}
                </span>
              </li>
              {curso && (
                <li className={styles.infoItem}>
                  <span className={styles.infoRotulo}>
                    <FaSignal aria-hidden="true" /> Nível
                  </span>
                  <span className={styles.infoValor}>
                    {formatNivel(curso.nivel)}
                  </span>
                </li>
              )}
            </ul>

            {proxima && (
              <Link
                className={styles.infoBotao}
                to={`/cursos/${cursoId}/aulas/${proxima.id}`}
              >
                Próxima: {proxima.titulo}
              </Link>
            )}
          </aside>
        </div>
      </section>

      {editor.modalAberto && (
        <AulaForm
          aula={editor.aulaEditando}
          salvando={editor.salvando}
          erro={editor.erroFormulario}
          onSubmit={editor.salvarAula}
          onClose={editor.fecharModal}
        />
      )}
    </div>
  );
}

export default AulaPagina;
