import { useState } from "react";
import type { Aula, AulaData } from "../types/Aula";
import { patchAula, postAula } from "../api/aulas";

export function useEditorAulas(
  cursoId: string | undefined,
  aoSalvar: () => Promise<void> | void,
) {
  const [modalAberto, setModalAberto] = useState(false);
  const [aulaEditando, setAulaEditando] = useState<Aula | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erroFormulario, setErroFormulario] = useState<string | null>(null);

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
    setSalvando(true);
    setErroFormulario(null);
    try {
      if (aulaEditando) {
        await patchAula(cursoId, aulaEditando.id, data);
      } else {
        await postAula(cursoId, data);
      }
      await aoSalvar();
      setModalAberto(false);
      setAulaEditando(null);
    } catch {
      setErroFormulario("Não foi possível salvar a aula.");
    } finally {
      setSalvando(false);
    }
  }

  return {
    modalAberto, aulaEditando, salvando, erroFormulario,
    abrirNovaAula, abrirEdicao, fecharModal, salvarAula,
  };
}