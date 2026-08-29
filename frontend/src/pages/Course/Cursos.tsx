import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaRedo } from "react-icons/fa";
import { getCursos } from "../../api/cursos";
import type { Curso } from "../../types/Curso";
import CourseCard from "../../Components/Course/CourseCard/CourseCard";
import { formatNivel, nivelSlug } from "../../utils/format";
import styles from "./Cursos.module.css";

function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [busca, setBusca] = useState("");
  const [nivelSelecionado, setNivelSelecionado] = useState("todos");

  // incrementado pelo botão "tentar novamente" para refazer a requisição
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregarCursos() {
      try {
        const data = await getCursos();
        if (ativo) {
          setCursos(data);
        }
      } catch {
        if (ativo) {
          setError("Não foi possível carregar os cursos.");
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarCursos();

    return () => {
      ativo = false;
    };
  }, [tentativa]);

  function tentarNovamente() {
    setLoading(true);
    setError(null);
    setTentativa((valor) => valor + 1);
  }

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
        nivelSelecionado === "todos" || nivelSlug(curso.nivel) === nivelSelecionado;

      const combinaBusca =
        termo === "" ||
        curso.titulo.toLowerCase().includes(termo) ||
        (curso.descricao ?? "").toLowerCase().includes(termo);

      return combinaNivel && combinaBusca;
    });
  }, [cursos, busca, nivelSelecionado]);

  return (
    <div className={styles.pagina}>
      {/* cabeçalho da página */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroTag}>Aprenda a investir</span>
          <h1 className={styles.heroTitulo}>Cursos InvestSimples</h1>
          <p className={styles.heroTexto}>
            Trilhas em vídeo, do básico ao avançado, para você entender o mercado
            financeiro e começar a investir com segurança.
          </p>

          <div className={styles.buscaWrapper}>
            <FaSearch className={styles.buscaIcone} aria-hidden="true" />
            <input
              className={styles.busca}
              type="search"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              placeholder="Qual curso está procurando?"
              aria-label="Buscar cursos"
            />
          </div>
        </div>
      </section>

      <section className={styles.conteudo}>
        {/* filtros por nível */}
        {!loading && !error && niveis.length > 0 && (
          <div className={styles.filtros}>
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
          </div>
        )}

        {/* carregando */}
        {loading && (
          <div className={styles.grid}>
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div className={styles.skeleton} key={item}>
                <div className={styles.skeletonCapa} />
                <div className={styles.skeletonLinha} />
                <div className={`${styles.skeletonLinha} ${styles.skeletonCurta}`} />
              </div>
            ))}
          </div>
        )}

        {/* erro */}
        {!loading && error && (
          <div className={styles.aviso}>
            <p>{error}</p>
            <button type="button" className={styles.botao} onClick={tentarNovamente}>
              <FaRedo aria-hidden="true" /> Tentar novamente
            </button>
          </div>
        )}

        {/* lista */}
        {!loading && !error && cursosFiltrados.length > 0 && (
          <>
            <p className={styles.resultado}>
              {cursosFiltrados.length}{" "}
              {cursosFiltrados.length === 1 ? "curso encontrado" : "cursos encontrados"}
            </p>

            <div className={styles.grid}>
              {cursosFiltrados.map((curso) => (
                <CourseCard
                  key={curso.id}
                  id={curso.id}
                  titulo={curso.titulo}
                  descricao={curso.descricao}
                  nivel={curso.nivel}
                  capa_url={curso.capa_url}
                  total_aulas={curso.total_aulas}
                />
              ))}
            </div>
          </>
        )}

        {/* vazio */}
        {!loading && !error && cursosFiltrados.length === 0 && (
          <div className={styles.aviso}>
            <p>
              {cursos.length === 0
                ? "Ainda não há cursos publicados."
                : "Nenhum curso encontrado para esse filtro."}
            </p>
            {cursos.length > 0 && (
              <button
                type="button"
                className={styles.botao}
                onClick={() => {
                  setBusca("");
                  setNivelSelecionado("todos");
                }}
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Cursos;
