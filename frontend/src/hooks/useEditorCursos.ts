import { useState } from "react";
import { patchCurso, postCurso } from "../api/cursos";
import type { Curso, CreateCurso } from "../types/Curso";

export function useEditorCursos(aoSalvar: () => Promise<void> | void) {
  const [modalAberto, setModalAberto] = useState(false);
  const [cursoEditando, setCursoEditando] = useState<Curso | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erroFormulario, setErroFormulario] = useState<string | null>(null);

  function abrirNovoCurso() {
    setCursoEditando(null);
    setErroFormulario(null);
    setModalAberto(true);
  }

  function abrirEdicao(curso: Curso) {
    setCursoEditando(curso);
    setErroFormulario(null);
    setModalAberto(true);
  }

  function fecharModal() {
    if (salvando) return;
    setModalAberto(false);
    setCursoEditando(null);
    setErroFormulario(null);
  }

  async function salvarCurso(data: CreateCurso) {
    setSalvando(true);
    setErroFormulario(null);
    try {
      if (cursoEditando) {
        await patchCurso(cursoEditando.id, data);
      } else {
        await postCurso(data);
      }
      await aoSalvar();
      setModalAberto(false);
      setCursoEditando(null);
    } catch {
      setErroFormulario("Não foi possível salvar o curso.");
    } finally {
      setSalvando(false);
    }
  }

  return {
    modalAberto,
    cursoEditando,
    salvando,
    erroFormulario,
    abrirNovoCurso,
    abrirEdicao,
    fecharModal,
    salvarCurso,
  };
}