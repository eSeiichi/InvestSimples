import { useMemo, useState } from "react";
import { FaEdit, FaPlus, FaRedo, FaSearch } from "react-icons/fa";
import CourseCard from "../../components/Course/CourseCard/CourseCard";
import CursoForm from "../../components/Course/CourseForm/CourseForm";
import { useAuth } from "../../Contexts/AuthContext";
import { useCursos } from "../../hooks/useCursos";
import { useEditorCursos } from "../../hooks/useEditorCursos";
import { formatNivel, nivelSlug } from "../../utils/format";
import styles from "./Cursos.module.css";

function Cursos() {
  const usuario = useAuth();
  const isAdmin = usuario.usuario?.role === "admin";

  const { cursos, loading, error, recarregar } = useCursos();
  const editor = useEditorCursos(recarregar);

  const [busca, setBusca] = useState("");
  const [nivelSelecionado, setNivelSelecionado] = useState("todos");

  // níveis disponíveis a partir dos cursos retornados pela API
  const niveis = useMemo(() => {
    const unicos = new Map<string, string>();
    cursos.forEach((curso) => {
      const slug = nivelSlug(curso.nivel);
      if (slug && !unicos.has(slug)) {
        unicos.set(slug, curso.nivel);
      }
    });
    return Array.from(unicos.entries());
  }, [cursos]);

  const cursosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return cursos.filter((curso) => {
      const combinaNivel =
        nivelSelecionado === "todos" ||
        nivelSlug(curso.nivel) === nivelSelecionado;

      const combinaBusca =
        termo === "" ||
        curso.titulo.toLowerCase().includes(termo) ||
        (curso.descricao ?? "").toLowerCase().includes(termo);

      return combinaNivel && combinaBusca;
    });
  }, [cursos, busca, nivelSelecionado]);

  function limparFiltros() {
    setBusca("");
    setNivelSelecionado("todos");
  }

  const mostrarFiltros = !loading && !error && niveis.length > 0;

  return (
    <div className={styles.pagina}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroTag}>Aprenda a investir</span>
          <h1 className={styles.heroTitulo}>Cursos InvestSimples</h1>
          <p className={styles.heroTexto}>
            Trilhas em vídeo, do básico ao avançado, para você entender o
            mercado financeiro e começar a investir com segurança.
          </p>

          <div className={styles.buscaWrapper}>
            <FaSearch className={styles.buscaIcone} aria-hidden="true" />
            <input
              className={styles.busca}
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Qual curso está procurando?"
              aria-label="Buscar cursos"
            />
          </div>
        </div>
      </section>

      <section className={styles.conteudo}>
        {(mostrarFiltros || isAdmin) && (
          <div className={styles.barraFiltros}>
            <div className={styles.filtros}>
              {mostrarFiltros && (
                <>
                  <button
                    type="button"
                    className={`${styles.filtro} ${
                      nivelSelecionado === "todos" ? styles.filtroAtivo : ""
                    }`}
                    onClick={() => setNivelSelecionado("todos")}
                  >
                    Todos
                  </button>

                  {niveis.map(([slug, label]) => (
                    <button
                      key={slug}
                      type="button"
                      className={`${styles.filtro} ${
                        nivelSelecionado === slug ? styles.filtroAtivo : ""
                      }`}
                      onClick={() => setNivelSelecionado(slug)}
                    >
                      {formatNivel(label)}
                    </button>
                  ))}
                </>
              )}
            </div>

            {isAdmin && (
              <button
                type="button"
                className={styles.botaoNovoCurso}
                onClick={editor.abrirNovoCurso}
              >
                <FaPlus aria-hidden="true" /> Adicionar curso
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className={styles.grid}>
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div className={styles.skeleton} key={item}>
                <div className={styles.skeletonCapa} />
                <div className={styles.skeletonLinha} />
                <div
                  className={`${styles.skeletonLinha} ${styles.skeletonCurta}`}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className={styles.aviso}>
            <p>{error}</p>
            <button type="button" className={styles.botao} onClick={recarregar}>
              <FaRedo aria-hidden="true" /> Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && cursosFiltrados.length > 0 && (
          <>
            <p className={styles.resultado}>
              {cursosFiltrados.length}{" "}
              {cursosFiltrados.length === 1
                ? "curso encontrado"
                : "cursos encontrados"}
            </p>

            <div className={styles.grid}>
              {cursosFiltrados.map((curso) => (
                <div key={curso.id} className={styles.cardWrapper}>
                  <CourseCard
                    id={curso.id}
                    titulo={curso.titulo}
                    descricao={curso.descricao}
                    nivel={curso.nivel}
                    capa_url={curso.capa_url}
                    total_aulas={curso.total_aulas}
                  />
                  {isAdmin && (
                    <button
                      type="button"
                      className={styles.botaoEditar}
                      onClick={() => editor.abrirEdicao(curso)}
                    >
                      <FaEdit aria-hidden="true" /> Editar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && !error && cursosFiltrados.length === 0 && (
          <div className={styles.aviso}>
            <p>
              {cursos.length === 0
                ? "Ainda não há cursos publicados."
                : "Nenhum curso encontrado para esse filtro."}
            </p>

            {cursos.length > 0 && (
              <button type="button" className={styles.botao} onClick={limparFiltros}>
                Limpar filtros
              </button>
            )}
          </div>
        )}
      </section>

      {editor.modalAberto && (
        <CursoForm
          curso={editor.cursoEditando}
          salvando={editor.salvando}
          erro={editor.erroFormulario}
          onSubmit={editor.salvarCurso}
          onClose={editor.fecharModal}
        />
      )}
    </div>
  );
}

export default Cursos;