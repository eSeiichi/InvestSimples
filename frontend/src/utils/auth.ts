import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
}

export function getTokenData(): TokenPayload | null {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null
  }
  try{
    return jwtDecode<TokenPayload>(token);
  }catch{
    return null
  }
}
