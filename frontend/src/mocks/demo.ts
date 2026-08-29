/**
 * Modo demonstração.
 *
 * Serve apenas para visualizar o layout com vários cursos sem gravar nada no
 * banco. Ative abrindo /cursos?demo=1 e desative com /cursos?demo=0.
 *
 * Para remover tudo depois: apague a pasta src/mocks, o <DemoBanner /> do
 * MainLayout e os blocos "modo demonstração" de src/api/cursos.ts e
 * src/api/aulas.ts.
 */

const CHAVE = "investsimples:demo";

export function demoAtivo(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const valor = new URLSearchParams(window.location.search).get("demo");

  if (valor === "1") {
    sessionStorage.setItem(CHAVE, "1");
  }
  if (valor === "0") {
    sessionStorage.removeItem(CHAVE);
  }

  return sessionStorage.getItem(CHAVE) === "1";
}
