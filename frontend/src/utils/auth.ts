import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
}

export function getTokenData(): TokenPayload | null {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null;
  }
  try {
    const partes = token.split(".");

    if (partes.length !== 3) {
      throw new Error("Token JWT inválido");
    }

    const payloadBase64 = partes[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(
      atob(payloadBase64)
    ) as TokenPayload;

    // O campo exp é obrigatório para esta aplicação.
    if(
      typeof payload.exp !== "number" || 
      Date.now() >= payload.exp * 1000
    ){
      localStorage.removeItem("access_token");
      return null;
    }
    return payload;

  } catch {
    localStorage.removeItem("access_token");
    return null;
  }
}
