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
  FaPlus,
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
import { useAuth } from "../../Contexts/AuthContext";
import type { Aula, AulaData } from "../../types/Aula";
import { patchAula, postAula } from "../../api/aulas";
import CustomForm from "../../components/form/CustomForm/CustomForm";

function Curso() {
  const usuario = useAuth();
  const { cursoId } = useParams<{ cursoId: string }>();

  const [curso, setCurso] = useState<ListCurso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [aulaEditando, setAulaEditando] = useState<Aula | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erroFormulario, setErroFormulario] = useState<string | null>(null);

  // incrementado pelo botão "tentar novamente" para refazer a requisição
  const [tentativa, setTentativa] = useState(0);

  async function carregarCurso(id: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurso(id);
      setCurso(data);
    } catch {
      setError("Não foio possível carregar os cursos.")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCurso(cursoId);
  }, [cursoId, tentativa])

  function tentarNovamente() {
    carregarCurso(cursoId);
    setTentativa((valor) => valor + 1);
  }

  function abrirNovaAula() {
    setAulaEditando(null);
    setErroFormulario(null);
    setModalAberto(true);
  }

  function abrirEdicao(aula: Aula) {
    setAulaEditando(aula);
    setErroFormulario(null);
    setModalAberto(true);
  }

  function fecharModal() {
    if (salvando) return;

    setModalAberto(false);
    setAulaEditando(null);
    setErroFormulario(null);
  }

  async function salvarAula(data: AulaData) {
    if (!cursoId) return;

    setSalvando(true)
    setErroFormulario(null);

    try {
      if (aulaEditando) {
        await patchAula(cursoId, aulaEditando.id, data);
      } else {
        await postAula(cursoId, data)
      }

      await carregarCurso(cursoId);
      fecharModal();
    } catch {
      setErroFormulario("Não é possível salvar o curso");
    } finally {
      setSalvando(false);
    }
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
            <div>
              <Link className={styles.voltar} to="/cursos">
                <FaArrowLeft aria-hidden="true" /> Voltar para cursos
              </Link>
              {usuario.usuario?.role === "admin" && (
                <button
                  type="button"
                  className={styles.botaoNovaAula}
                  onClick={abrirNovaAula}
                >
                  <FaPlus aria-hidden="true" /> Adicionar aula
                </button>
              )
              }
              <p className={styles.migalha}>
                <Link to="/cursos">Cursos</Link> / {curso.titulo}
              </p>
            </div>
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

              <div className={styles.acoesEdicao}>
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
      {/* {modalAberto && (
        
      )} */}
    </div>
  );
}
export default Curso;

type AulaFormProps = {
  aula: Aula | null;
  salvando: boolean;
  erro: string | null;
  onSubmit: (data: AulaData) => Promise<void>;
  onClose: () => void;
};

function AulaForm({
  aula,
  salvando,
  erro,
  onSubmit,
  onClose
}:AulaFormProps){
  const [titulo, setTitulo] = useState(aula?.titulo ?? "");
  const [descricao, setDescricao] = useState(aula?.descricao ?? "");
  const [conteudo, setConteudo] = useState(aula?.conteudo ?? "");
  const [url_video, setUrl_video] = useState(aula?.url_video ?? "");
  const [duracao_minutos, setDuracao_minutos] = useState(aula?.duracao_minutos ?? 0);
  const [ordem, setOrdem] = useState(aula?.ordem ?? 0);

  async function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    await onSubmit({
      titulo,
      descricao,
      conteudo,
      url_video,
      duracao_minutos,
      ordem
    });
    
  }
{/*
  return(
    <div className={styles.modalOverlay}>
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

          <label htmlFor="nivel">Nível</label>
          <select
            name="nivel"
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
            onChange={(evento) => setCapaUrl(evento.target.value)}
          />

          {erro && <p className={styles.erroFormulario}>{erro}</p>}

          <div className={styles.acoesModal}>
            <button
              type="button"
              className={styles.botaoCancelar}
              onClick={onClose}
              disabled={salvando}
            >
              Cancelar
            </button>

            <button type="submit" className={styles.botao} disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar curso"}
            </button>
          </div> 
        </CustomForm>
      </div>
    </div>
  )
}
  */}

