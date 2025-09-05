'use client';

import { useState, useEffect } from 'react';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  status: string;
  produtosRetirados: number;
  ultimaAtividade: string;
  dataCadastro: string;
  empresaId: number;
  empresa?: {
    id: number;
    nomeEmpresa: string;
    email: string;
  };
}

export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      const storedUsuario = localStorage.getItem('usuario');
      
      if (storedToken && storedUsuario) {
        setToken(storedToken);
        setUsuario(JSON.parse(storedUsuario));
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: Usuario, userToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', userToken);
      localStorage.setItem('usuario', JSON.stringify(userData));
      setToken(userToken);
      setUsuario(userData);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      setToken(null);
      setUsuario(null);
    }
  };

  const isAuthenticated = !!token && !!usuario;

  return {
    usuario,
    token,
    loading,
    isAuthenticated,
    login,
    logout
  };
}
