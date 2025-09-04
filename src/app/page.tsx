'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './components/LoginForm';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      // Simular uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aqui você pode adicionar a lógica real de autenticação
      if (email === 'demo@estoque.com' && password === 'demo123') {
        // Login bem-sucedido
        console.log('Login realizado com sucesso!');
        // Redirecionar para o dashboard
        router.push('/dashboard');
      } else {
        setError('Email ou senha incorretos');
      }
    } catch {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center w-full max-w-sm">
        {/* Logo/Ícone */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-full mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Sistema de Estoque</h1>
        </div>

        {/* Formulário de login */}
        <LoginForm onLogin={handleLogin} isLoading={isLoading} />

        {/* Mensagem de erro */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg w-full">
            <p className="text-red-300 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Informações adicionais */}
        <div className="mt-6 text-center">
          <p className="text-gray-300 text-xs">
            Sistema de Gerenciamento de Estoque
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Versão 1.0.0
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            © 2024 Sistema de Estoque. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
