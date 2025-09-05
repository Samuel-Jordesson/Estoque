'use client';

import { useState } from 'react';
import { UserPlus, Building, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSuccess }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    empresaNome: '',
    empresaEmail: '',
    adminNome: '',
    adminEmail: '',
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.empresaNome.trim()) {
      setError('Nome da empresa é obrigatório');
      return false;
    }
    if (!formData.empresaEmail.trim()) {
      setError('Email da empresa é obrigatório');
      return false;
    }
    if (!formData.adminNome.trim()) {
      setError('Nome do administrador é obrigatório');
      return false;
    }
    if (!formData.adminEmail.trim()) {
      setError('Email do administrador é obrigatório');
      return false;
    }
    if (formData.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setError('Senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empresa: {
            nome: formData.empresaNome,
            email: formData.empresaEmail
          },
          admin: {
            nome: formData.adminNome,
            email: formData.adminEmail,
            senha: formData.senha
          }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
        handleClose();
        alert('Conta criada com sucesso! Você pode fazer login agora.');
      } else {
        setError(data.error || 'Erro ao criar conta');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      empresaNome: '',
      empresaEmail: '',
      adminNome: '',
      adminEmail: '',
      senha: '',
      confirmarSenha: ''
    });
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle>Criar Nova Conta</DialogTitle>
              <DialogDescription>
                Crie uma nova conta empresarial independente
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações da Empresa */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-slate-700 flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Informações da Empresa
            </h4>
            
            <div className="space-y-3">
              <Label htmlFor="empresaNome" className="text-sm font-medium">
                Nome da Empresa *
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="empresaNome"
                  name="empresaNome"
                  value={formData.empresaNome}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Digite o nome da empresa"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="empresaEmail" className="text-sm font-medium">
                Email da Empresa *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="empresaEmail"
                  name="empresaEmail"
                  type="email"
                  value={formData.empresaEmail}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="empresa@exemplo.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Informações do Administrador */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-slate-700 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Administrador
            </h4>
            
            <div className="space-y-3">
              <Label htmlFor="adminNome" className="text-sm font-medium">
                Nome Completo *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="adminNome"
                  name="adminNome"
                  value={formData.adminNome}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="adminEmail" className="text-sm font-medium">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="senha" className="text-sm font-medium">
                Senha *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmarSenha" className="text-sm font-medium">
                Confirmar Senha *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmarSenha}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  placeholder="Confirme sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <DialogFooter className="gap-2 mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {loading ? 'Criando...' : 'Criar Conta'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
