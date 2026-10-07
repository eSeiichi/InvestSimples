import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { getTokenData, type TokenPayload } from "../utils/auth";

interface AuthContextData {
  usuario: TokenPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<TokenPayload | null>(
    getTokenData()
  );

  function login(token: string) {
    localStorage.setItem("access_token", token);

    const dados = getTokenData();

    setUsuario(dados);
  }

  function logout() {
    localStorage.removeItem("access_token");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return contexto;
}