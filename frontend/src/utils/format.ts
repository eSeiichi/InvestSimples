import type { AulaResponse } from "../types/Aula";

/** Deixa o nível com a primeira letra maiúscula ("iniciante" -> "Iniciante") */
export function formatNivel(nivel?: string | null): string {
  if (!nivel) {
    return "Todos os níveis";
  }
  return nivel.charAt(0).toUpperCase() + nivel.slice(1).toLowerCase();
}

/** Remove acentos e deixa em minúsculo ("Avançado" -> "avancado") */
export function nivelSlug(nivel?: string | null): string {
  if (!nivel) {
    return "";
  }
  return nivel
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();
}

/** "5 aulas" / "1 aula" */
export function formatTotalAulas(total?: number | null): string {
  const quantidade = total ?? 0;
  return quantidade === 1 ? "1 aula" : `${quantidade} aulas`;
}

/** 95 -> "1h 35min" | 42 -> "42min" */
export function formatDuracao(minutos?: number | null): string {
  if (!minutos || minutos <= 0) {
    return "--";
  }

  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;

  if (horas === 0) {
    return `${resto}min`;
  }
  if (resto === 0) {
    return `${horas}h`;
  }
  return `${horas}h ${resto}min`;
}

/** Soma a duração de todas as aulas do curso */
export function duracaoTotal(aulas: AulaResponse[]): number {
  return aulas.reduce((total, aula) => total + (aula.duracao_minutos ?? 0), 0);
}

/** Ordena as aulas pelo campo "ordem" sem alterar o array original */
export function ordenarAulas(aulas: AulaResponse[]): AulaResponse[] {
  return [...aulas].sort((a, b) => a.ordem - b.ordem);
}
