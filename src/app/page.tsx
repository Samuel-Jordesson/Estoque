'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './components/LoginForm';
import RegisterModal from './components/RegisterModal';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        login(data.usuario, data.token);
        console.log('Login realizado com sucesso!');
        // Redirecionar para o dashboard
        router.push('/dashboard');
      } else {
        setError(data.error || 'Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
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

        {/* Botão para criar nova conta */}
        <div className="mt-4 w-full">
          <button
            onClick={() => setShowRegisterModal(true)}
            className="w-full py-2 px-4 text-sm text-purple-300 hover:text-white border border-purple-400/30 hover:border-purple-300 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Criar Nova Conta
          </button>
        </div>

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

      {/* Modal de Registro */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={() => {
          setShowRegisterModal(false);
          setError('');
        }}
      />
    </div>
  );
}
