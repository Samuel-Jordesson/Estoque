'use client';

import { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  User, 
  Lock, 
  Save, 
  Eye, 
  EyeOff,
  Shield,
  AlertCircle,
  CheckCircle,
  Edit
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Dados mockados da empresa
const dadosEmpresaIniciais = {
  nomeEmpresa: 'TechStore Solutions',
  cnpj: '12.345.678/0001-90',
  cpf: '123.456.789-00',
  email: 'contato@techstore.com',
  telefone: '(11) 99999-8888',
  endereco: {
    rua: 'Rua das Tecnologias, 123',
    bairro: 'Centro Tecnológico',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567'
  },
  responsavel: 'João Silva',
  cargo: 'Gerente Geral'
};

export default function OutrosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dadosEmpresa, setDadosEmpresa] = useState(dadosEmpresaIniciais);
  const [dadosEmpresaEdit, setDadosEmpresaEdit] = useState(dadosEmpresaIniciais);
  const [senhas, setSenhas] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });
  const [mostrarSenhas, setMostrarSenhas] = useState({
    atual: false,
    nova: false,
    confirmar: false
  });
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [modalEmpresaAberto, setModalEmpresaAberto] = useState(false);
  const [modalSenhaAberto, setModalSenhaAberto] = useState(false);

  // Funções de manipulação
  const handleAbrirModalEmpresa = () => {
    setDadosEmpresaEdit(dadosEmpresa);
    setModalEmpresaAberto(true);
  };

  const handleSalvarDadosEmpresa = async () => {
    setSalvando(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDadosEmpresa(dadosEmpresaEdit);
      setMensagem({ tipo: 'success', texto: 'Dados da empresa salvos com sucesso!' });
      setModalEmpresaAberto(false);
      setTimeout(() => setMensagem({ tipo: '', texto: '' }), 3000);
    } catch {
      setMensagem({ tipo: 'error', texto: 'Erro ao salvar dados da empresa.' });
    } finally {
      setSalvando(false);
    }
  };

  const handleAbrirModalSenha = () => {
    setSenhas({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
    setModalSenhaAberto(true);
  };

  const handleAlterarSenha = async () => {
    if (senhas.novaSenha !== senhas.confirmarSenha) {
      setMensagem({ tipo: 'error', texto: 'As senhas não coincidem.' });
      return;
    }
    if (senhas.novaSenha.length < 6) {
      setMensagem({ tipo: 'error', texto: 'A nova senha deve ter pelo menos 6 caracteres.' });
      return;
    }

    setSalvando(true);
    try {
      // Simular alteração de senha
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMensagem({ tipo: 'success', texto: 'Senha alterada com sucesso!' });
      setSenhas({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
      setModalSenhaAberto(false);
      setTimeout(() => setMensagem({ tipo: '', texto: '' }), 3000);
    } catch {
      setMensagem({ tipo: 'error', texto: 'Erro ao alterar senha.' });
    } finally {
      setSalvando(false);
    }
  };

  const toggleMostrarSenha = (tipo: keyof typeof mostrarSenhas) => {
    setMostrarSenhas(prev => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
              </Button>
              
              <div className="hidden md:block">
                <h1 className="text-xl font-semibold text-slate-800">Configurações</h1>
                <p className="text-sm text-slate-500">Dados da empresa e configurações do sistema</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Segurança
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                  Configurações do Sistema
                </h1>
                <p className="text-slate-600">Gerencie os dados da empresa e configurações de segurança</p>
              </div>
            </div>
          </div>

          {/* Mensagem de Status */}
          {mensagem.texto && (
            <div className={`mb-6 p-4 rounded-lg flex items-center ${
              mensagem.tipo === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {mensagem.tipo === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              {mensagem.texto}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dados da Empresa */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Building2 className="w-5 h-5 mr-2" />
                      Dados da Empresa
                    </CardTitle>
                    <CardDescription>
                      Informações básicas da sua empresa
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={handleAbrirModalEmpresa}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informações da Empresa */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Nome da Empresa</p>
                      <p className="text-lg font-semibold text-slate-900">{dadosEmpresa.nomeEmpresa}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">CNPJ</p>
                        <p className="text-sm text-slate-900">{dadosEmpresa.cnpj}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600">CPF</p>
                        <p className="text-sm text-slate-900">{dadosEmpresa.cpf}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Email</p>
                      <p className="text-sm text-slate-900">{dadosEmpresa.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Telefone</p>
                      <p className="text-sm text-slate-900">{dadosEmpresa.telefone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Endereço</p>
                      <p className="text-sm text-slate-900">
                        {dadosEmpresa.endereco.rua}, {dadosEmpresa.endereco.bairro}
                      </p>
                      <p className="text-sm text-slate-900">
                        {dadosEmpresa.endereco.cidade} - {dadosEmpresa.endereco.estado} - {dadosEmpresa.endereco.cep}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Responsável</p>
                      <p className="text-sm text-slate-900">{dadosEmpresa.responsavel}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Segurança
                    </CardTitle>
                    <CardDescription>
                      Configurações de segurança da conta
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={handleAbrirModalSenha}
                    variant="outline"
                    size="sm"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Alterar Senha
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informações de Segurança */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Status da Conta</p>
                      <p className="text-lg font-semibold text-green-600">Segura</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Requisitos da Senha:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Mínimo de 6 caracteres</li>
                      <li>• Use uma combinação de letras e números</li>
                      <li>• Evite senhas óbvias ou comuns</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Dicas de Segurança:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Altere sua senha regularmente</li>
                      <li>• Use senhas únicas para cada conta</li>
                      <li>• Ative a autenticação de dois fatores</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Editar Dados da Empresa */}
      <Dialog open={modalEmpresaAberto} onOpenChange={setModalEmpresaAberto}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Editar Dados da Empresa
            </DialogTitle>
            <DialogDescription>
              Atualize as informações da sua empresa
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-nomeEmpresa">Nome da Empresa</Label>
                <Input
                  id="modal-nomeEmpresa"
                  value={dadosEmpresaEdit.nomeEmpresa}
                  onChange={(e) => setDadosEmpresaEdit({...dadosEmpresaEdit, nomeEmpresa: e.target.value})}
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-cnpj">CNPJ</Label>
                <Input
                  id="modal-cnpj"
                  value={dadosEmpresaEdit.cnpj}
                  onChange={(e) => setDadosEmpresaEdit({...dadosEmpresaEdit, cnpj: e.target.value})}
                  placeholder="00.000.000/0000-00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-cpf">CPF</Label>
                <Input
                  id="modal-cpf"
                  value={dadosEmpresaEdit.cpf}
                  onChange={(e) => setDadosEmpresaEdit({...dadosEmpresaEdit, cpf: e.target.value})}
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-telefone">Telefone</Label>
                <Input
                  id="modal-telefone"
                  value={dadosEmpresaEdit.telefone}
                  onChange={(e) => setDadosEmpresaEdit({...dadosEmpresaEdit, telefone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-email">Email</Label>
              <Input
                id="modal-email"
                type="email"
                value={dadosEmpresaEdit.email}
                onChange={(e) => setDadosEmpresaEdit({...dadosEmpresaEdit, email: e.target.value})}
                placeholder="contato@empresa.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-endereco">Endereço Completo</Label>
              <Input
                id="modal-endereco"
                value={dadosEmpresaEdit.endereco.rua}
                onChange={(e) => setDadosEmpresaEdit({
                  ...dadosEmpresaEdit, 
                  endereco: {...dadosEmpresaEdit.endereco, rua: e.target.value}
                })}
                placeholder="Rua, número, complemento"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-bairro">Bairro</Label>
                <Input
                  id="modal-bairro"
                  value={dadosEmpresaEdit.endereco.bairro}
                  onChange={(e) => setDadosEmpresaEdit({
                    ...dadosEmpresaEdit, 
                    endereco: {...dadosEmpresaEdit.endereco, bairro: e.target.value}
                  })}
                  placeholder="Bairro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-cidade">Cidade</Label>
                <Input
                  id="modal-cidade"
                  value={dadosEmpresaEdit.endereco.cidade}
                  onChange={(e) => setDadosEmpresaEdit({
                    ...dadosEmpresaEdit, 
                    endereco: {...dadosEmpresaEdit.endereco, cidade: e.target.value}
                  })}
                  placeholder="Cidade"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-estado">Estado</Label>
                <Input
                  id="modal-estado"
                  value={dadosEmpresaEdit.endereco.estado}
                  onChange={(e) => setDadosEmpresaEdit({
                    ...dadosEmpresaEdit, 
                    endereco: {...dadosEmpresaEdit.endereco, estado: e.target.value}
                  })}
                  placeholder="UF"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-cep">CEP</Label>
                <Input
                  id="modal-cep"
                  value={dadosEmpresaEdit.endereco.cep}
                  onChange={(e) => setDadosEmpresaEdit({
                    ...dadosEmpresaEdit, 
                    endereco: {...dadosEmpresaEdit.endereco, cep: e.target.value}
                  })}
                  placeholder="00000-000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-responsavel">Responsável</Label>
                <Input
                  id="modal-responsavel"
                  value={dadosEmpresaEdit.responsavel}
                  onChange={(e) => setDadosEmpresaEdit({...dadosEmpresaEdit, responsavel: e.target.value})}
                  placeholder="Nome do responsável"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalEmpresaAberto(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSalvarDadosEmpresa}
              disabled={salvando}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {salvando ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Alterar Senha */}
      <Dialog open={modalSenhaAberto} onOpenChange={setModalSenhaAberto}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Alterar Senha
            </DialogTitle>
            <DialogDescription>
              Digite sua senha atual e a nova senha desejada
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="modal-senhaAtual">Senha Atual</Label>
              <div className="relative">
                <Input
                  id="modal-senhaAtual"
                  type={mostrarSenhas.atual ? "text" : "password"}
                  value={senhas.senhaAtual}
                  onChange={(e) => setSenhas({...senhas, senhaAtual: e.target.value})}
                  placeholder="Digite sua senha atual"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => toggleMostrarSenha('atual')}
                >
                  {mostrarSenhas.atual ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-novaSenha">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="modal-novaSenha"
                  type={mostrarSenhas.nova ? "text" : "password"}
                  value={senhas.novaSenha}
                  onChange={(e) => setSenhas({...senhas, novaSenha: e.target.value})}
                  placeholder="Digite sua nova senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => toggleMostrarSenha('nova')}
                >
                  {mostrarSenhas.nova ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-confirmarSenha">Confirmar Nova Senha</Label>
              <div className="relative">
                <Input
                  id="modal-confirmarSenha"
                  type={mostrarSenhas.confirmar ? "text" : "password"}
                  value={senhas.confirmarSenha}
                  onChange={(e) => setSenhas({...senhas, confirmarSenha: e.target.value})}
                  placeholder="Confirme sua nova senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => toggleMostrarSenha('confirmar')}
                >
                  {mostrarSenhas.confirmar ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Requisitos da Senha:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Mínimo de 6 caracteres</li>
                <li>• Use uma combinação de letras e números</li>
                <li>• Evite senhas óbvias ou comuns</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalSenhaAberto(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAlterarSenha}
              disabled={salvando || !senhas.senhaAtual || !senhas.novaSenha || !senhas.confirmarSenha}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Lock className="w-4 h-4 mr-2" />
              {salvando ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
