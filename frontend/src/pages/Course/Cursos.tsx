import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaRedo, FaEdit, FaPlus } from "react-icons/fa";
import { getCursos, postCurso, patchCurso } from "../../api/cursos";
import type { Curso, CreateCurso } from "../../types/Curso";
import CourseCard from "../../Components/Course/CourseCard/CourseCard";
import { formatNivel, nivelSlug } from "../../utils/format";
import styles from "./Cursos.module.css";

function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [busca, setBusca] = useState("");
  const [nivelSelecionado, setNivelSelecionado] = useState("todos");

  const [modalAberto, setModalAberto] = useState(false);
  const [cursoEditando, setCursoEditando] = useState<Curso | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erroFormulario, setErroFormulario] = useState<string | null>(null);
  
  const [tentativa, setTentativa] = useState(0);

  //carregando os cursos da API
  async function carregarCursos() {
    setLoading(true);
    setError(null);

    try {
      const data = await getCursos();
      setCursos(data);
    } catch {
      setError("Não foi possível carregar os cursos.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    carregarCursos();
  }, []);

  // Função que tenta carregar os cursos novamente
  function tentarNovamente() {
    carregarCursos();
    setTentativa((valor) => valor + 1)
  }

  // Abre o formulário no modo criação
  function abrirNovoCurso() {
    setCursoEditando(null);
    setErroFormulario(null);
    setModalAberto(true);
  }

  // Abre o formulário preenchido para editar
  function abrirEdicao(curso: Curso) {
    setCursoEditando(curso);
    setErroFormulario(null);
    setModalAberto(true);
  }

  // Fecha o modal de edição/criação de curso
  function fecharModal() {
    if (salvando) return;

    setModalAberto(false);
    setCursoEditando(null);
    setErroFormulario(null);
  }

  // Recebe os dados do formulário e decide entre POST e PATCH
  async function salvarCurso(data: CreateCurso) {
    setSalvando(true);
    setErroFormulario(null);

    try {
      if (cursoEditando) {
        await patchCurso(cursoEditando.id, data);
      } else {
        await postCurso(data);
      }
      await carregarCursos();
      fecharModal();
    } catch {
      setErroFormulario("Não foi possível salvar o curso")
    } finally {
      setSalvando(false);
    }
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
              onChange={(evento) => setBusca(evento.target.value)}
              placeholder="Qual curso está procurando?"
              aria-label="Buscar cursos"
            />
          </div>
        </div>
      </section>

      <section className={styles.conteudo}>
        {/* Botão para o administrador adicionar um curso. */}
        <div className={styles.acoes}>
          <button
            type="button"
            className={styles.botao}
            onClick={abrirNovoCurso}
          >
            <FaPlus aria-hidden="true" /> Adicionar curso
          </button>
        </div>

        {!loading && !error && niveis.length > 0 && (
          <div className={styles.filtros}>
            <button
              type="button"
              className={`${styles.filtro} ${nivelSelecionado === "todos" ? styles.filtroAtivo : ""
                }`}
              onClick={() => setNivelSelecionado("todos")}
            >
              Todos
            </button>

            {niveis.map(([slug, label]) => (
              <button
                key={slug}
                type="button"
                className={`${styles.filtro} ${nivelSelecionado === slug ? styles.filtroAtivo : ""
                  }`}
                onClick={() => setNivelSelecionado(slug)}
              >
                {formatNivel(label)}
              </button>
            ))}
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
            <button
              type="button"
              className={styles.botao}
              onClick={tentarNovamente}
            >
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

                  <button
                    type="button"
                    className={styles.botaoEditar}
                    onClick={() => abrirEdicao(curso)}
                  >
                    <FaEdit aria-hidden="true" > Editar</FaEdit>
                  </button>
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

      {/* Modal de criação/edição. */}
      {modalAberto && (
        <CursoForm
          curso={cursoEditando}
          salvando={salvando}
          erro={erroFormulario}
          onSubmit={salvarCurso}
          onClose={fecharModal}
        />
      )}
    </div>
  );
}

type CursoFormProps = {
  curso: Curso | null;
  salvando: boolean;
  erro: string | null;
  onSubmit: (data: CreateCurso) => Promise<void>;
  onClose: () => void;
};

function CursoForm({
  curso,
  salvando,
  erro,
  onSubmit,
  onClose,
}: CursoFormProps) {
  const [titulo, setTitulo] = useState(curso?.titulo ?? "");
  const [descricao, setDescricao] = useState(curso?.descricao ?? "");
  const [nivel, setNivel] = useState(curso?.nivel ?? "");
  const [capaUrl, setCapaUrl] = useState(curso?.capa_url ?? "");


  async function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    await onSubmit({
      titulo,
      descricao,
      nivel,
      capa_url: capaUrl
    });
  }

  return (
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

        <form onSubmit={handleSubmit} className={styles.formulario}>
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
          <select name="nivel" id="nivel"
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

            <button
              type="submit"
              className={styles.botao}
              disabled={salvando}
            >
              {salvando ? "Salvando..." : "Salvar curso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cursos;
//   return (
//     <div className={styles.pagina}>
//       {/* cabeçalho da página */}
//       <section className={styles.hero}>
//         <div className={styles.heroInner}>
//           <span className={styles.heroTag}>Aprenda a investir</span>
//           <h1 className={styles.heroTitulo}>Cursos InvestSimples</h1>
//           <p className={styles.heroTexto}>
//             Trilhas em vídeo, do básico ao avançado, para você entender o mercado
//             financeiro e começar a investir com segurança.
//           </p>

//           <div className={styles.buscaWrapper}>
//             <FaSearch className={styles.buscaIcone} aria-hidden="true" />
//             <input
//               className={styles.busca}
//               type="search"
//               value={busca}
//               onChange={(evento) => setBusca(evento.target.value)}
//               placeholder="Qual curso está procurando?"
//               aria-label="Buscar cursos"
//             />
//           </div>
//         </div>
//       </section>

//       <section className={styles.conteudo}>
//         {/* filtros por nível */}
//         {!loading && !error && niveis.length > 0 && (
//           <div className={styles.filtros}>
//             <button
//               type="button"
//               className={`${styles.filtro} ${
//                 nivelSelecionado === "todos" ? styles.filtroAtivo : ""
//               }`}
//               onClick={() => setNivelSelecionado("todos")}
//             >
//               Todos
//             </button>

//             {niveis.map(([slug, label]) => (
//               <button
//                 key={slug}
//                 type="button"
//                 className={`${styles.filtro} ${
//                   nivelSelecionado === slug ? styles.filtroAtivo : ""
//                 }`}
//                 onClick={() => setNivelSelecionado(slug)}
//               >
//                 {formatNivel(label)}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* carregando */}
//         {loading && (
//           <div className={styles.grid}>
//             {[0, 1, 2, 3, 4, 5].map((item) => (
//               <div className={styles.skeleton} key={item}>
//                 <div className={styles.skeletonCapa} />
//                 <div className={styles.skeletonLinha} />
//                 <div className={`${styles.skeletonLinha} ${styles.skeletonCurta}`} />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* erro */}
//         {!loading && error && (
//           <div className={styles.aviso}>
//             <p>{error}</p>
//             <button type="button" className={styles.botao} onClick={tentarNovamente}>
//               <FaRedo aria-hidden="true" /> Tentar novamente
//             </button>
//           </div>
//         )}

//         {/* lista */}
//         {!loading && !error && cursosFiltrados.length > 0 && (
//           <>
//             <p className={styles.resultado}>
//               {cursosFiltrados.length}{" "}
//               {cursosFiltrados.length === 1 ? "curso encontrado" : "cursos encontrados"}
//             </p>

//             <div className={styles.grid}>
//               {cursosFiltrados.map((curso) => (
//                 <CourseCard
//                   key={curso.id}
//                   id={curso.id}
//                   titulo={curso.titulo}
//                   descricao={curso.descricao}
//                   nivel={curso.nivel}
//                   capa_url={curso.capa_url}
//                   total_aulas={curso.total_aulas}
//                 />
//               ))}
//             </div>
//           </>
//         )}

//         {/* vazio */}
//         {!loading && !error && cursosFiltrados.length === 0 && (
//           <div className={styles.aviso}>
//             <p>
//               {cursos.length === 0
//                 ? "Ainda não há cursos publicados."
//                 : "Nenhum curso encontrado para esse filtro."}
//             </p>
//             {cursos.length > 0 && (
//               <button
//                 type="button"
//                 className={styles.botao}
//                 onClick={() => {
//                   setBusca("");
//                   setNivelSelecionado("todos");
//                 }}
//               >
//                 Limpar filtros
//               </button>
//             )}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default Cursos;
