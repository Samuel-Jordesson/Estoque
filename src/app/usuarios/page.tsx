'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Package,
  TrendingUp,
  Eye,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Tipo para usuário
type Usuario = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  dataCadastro: string;
  produtosRetirados: number;
  ultimaAtividade: string;
  status: string;
};

// Dados mockados para usuários
const mockUsuarios: Usuario[] = [
  { 
    id: 1, 
    nome: 'João Barbosa', 
    email: 'joao.barbosa@empresa.com', 
    telefone: '(11) 99999-1111', 
    cargo: 'Gerente de Estoque',
    dataCadastro: '2024-01-10',
    produtosRetirados: 15,
    ultimaAtividade: '2024-01-15',
    status: 'ativo'
  },
  { 
    id: 2, 
    nome: 'Maria Silva', 
    email: 'maria.silva@empresa.com', 
    telefone: '(11) 99999-2222', 
    cargo: 'Analista de Estoque',
    dataCadastro: '2024-01-12',
    produtosRetirados: 8,
    ultimaAtividade: '2024-01-14',
    status: 'ativo'
  },
  { 
    id: 3, 
    nome: 'Pedro Santos', 
    email: 'pedro.santos@empresa.com', 
    telefone: '(11) 99999-3333', 
    cargo: 'Assistente de Estoque',
    dataCadastro: '2024-01-08',
    produtosRetirados: 22,
    ultimaAtividade: '2024-01-13',
    status: 'ativo'
  },
  { 
    id: 4, 
    nome: 'Ana Costa', 
    email: 'ana.costa@empresa.com', 
    telefone: '(11) 99999-4444', 
    cargo: 'Supervisora',
    dataCadastro: '2024-01-05',
    produtosRetirados: 12,
    ultimaAtividade: '2024-01-12',
    status: 'ativo'
  },
  { 
    id: 5, 
    nome: 'Carlos Lima', 
    email: 'carlos.lima@empresa.com', 
    telefone: '(11) 99999-5555', 
    cargo: 'Operador',
    dataCadastro: '2024-01-15',
    produtosRetirados: 5,
    ultimaAtividade: '2024-01-11',
    status: 'inativo'
  }
];

export default function UsuariosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicao, setModalEdicao] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    senha: ''
  });

  // Carregar usuários da API
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const response = await fetch('/api/usuarios');
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        }
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarUsuarios();
  }, []);

  // Filtrar usuários
  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busca.toLowerCase()) ||
    usuario.cargo.toLowerCase().includes(busca.toLowerCase())
  );

  // Funções de manipulação
  const handleAdicionarUsuario = async () => {
    if (novoUsuario.nome && novoUsuario.email && novoUsuario.telefone && novoUsuario.cargo && novoUsuario.senha) {
      try {
        const response = await fetch('/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: novoUsuario.nome,
            email: novoUsuario.email,
            telefone: novoUsuario.telefone,
            cargo: novoUsuario.cargo,
            senha: novoUsuario.senha
          }),
        });

        if (response.ok) {
          // Recarregar usuários
          const usuariosResponse = await fetch('/api/usuarios');
          if (usuariosResponse.ok) {
            const data = await usuariosResponse.json();
            setUsuarios(data);
          }
          setNovoUsuario({ nome: '', email: '', telefone: '', cargo: '', senha: '' });
          setModalAberto(false);
        }
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
      }
    }
  };

  const handleEditarUsuario = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setNovoUsuario({
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      cargo: usuario.cargo,
      senha: ''
    });
    setModalEdicao(true);
  };

  const handleSalvarEdicao = async () => {
    if (usuarioSelecionado && novoUsuario.nome && novoUsuario.email && novoUsuario.telefone && novoUsuario.cargo) {
      try {
        const response = await fetch(`/api/usuarios/${usuarioSelecionado.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: novoUsuario.nome,
            email: novoUsuario.email,
            telefone: novoUsuario.telefone,
            cargo: novoUsuario.cargo
          }),
        });

        if (response.ok) {
          // Recarregar usuários
          const usuariosResponse = await fetch('/api/usuarios');
          if (usuariosResponse.ok) {
            const data = await usuariosResponse.json();
            setUsuarios(data);
          }
          setModalEdicao(false);
          setUsuarioSelecionado(null);
          setNovoUsuario({ nome: '', email: '', telefone: '', cargo: '', senha: '' });
        }
      } catch (error) {
        console.error('Erro ao editar usuário:', error);
      }
    }
  };

  const handleExcluirUsuario = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        const response = await fetch(`/api/usuarios/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Recarregar usuários
          const usuariosResponse = await fetch('/api/usuarios');
          if (usuariosResponse.ok) {
            const data = await usuariosResponse.json();
            setUsuarios(data);
          }
        }
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  // Calcular métricas
  const totalUsuarios = usuarios.length;
  const usuariosAtivos = usuarios.filter(u => u.status === 'ativo').length;
  const totalProdutosRetirados = usuarios.reduce((sum, u) => sum + u.produtosRetirados, 0);

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
                <h1 className="text-xl font-semibold text-slate-800">Usuários</h1>
                <p className="text-sm text-slate-500">Gerenciamento de usuários do sistema</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                onClick={() => setModalAberto(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Usuário
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
                  Gerenciamento de Usuários
                </h1>
                <p className="text-slate-600">Gerencie usuários, permissões e atividades do sistema</p>
              </div>
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total de Usuários</p>
                    <p className="text-2xl font-bold text-blue-600">{totalUsuarios}</p>
                    <p className="text-xs text-slate-500 mt-1">Cadastrados no sistema</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Usuários Ativos</p>
                    <p className="text-2xl font-bold text-green-600">{usuariosAtivos}</p>
                    <p className="text-xs text-slate-500 mt-1">Em atividade</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Produtos Retirados</p>
                    <p className="text-2xl font-bold text-purple-600">{totalProdutosRetirados}</p>
                    <p className="text-xs text-slate-500 mt-1">Total de movimentações</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Barra de Pesquisa */}
          <Card className="mb-6 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Buscar por nome, email ou cargo..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Usuários */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Usuários</CardTitle>
                  <CardDescription>{usuariosFiltrados.length} usuários encontrados</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Contato
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Cargo
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Produtos Retirados
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Última Atividade
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {usuariosFiltrados.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white text-sm font-medium">
                                {usuario.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{usuario.nome}</div>
                              <div className="text-xs text-slate-500">ID: {usuario.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-slate-600">
                              <Mail className="w-3 h-3 mr-2" />
                              {usuario.email}
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                              <Phone className="w-3 h-3 mr-2" />
                              {usuario.telefone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {usuario.cargo}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Package className="w-4 h-4 text-slate-400 mr-2" />
                            <span className="text-sm font-medium text-slate-900">{usuario.produtosRetirados}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            usuario.status === 'ativo' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {usuario.status === 'ativo' ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-slate-600">
                            <Calendar className="w-3 h-3 mr-2" />
                            {new Date(usuario.ultimaAtividade).toLocaleDateString('pt-BR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditarUsuario(usuario)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleExcluirUsuario(usuario.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {usuariosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum usuário encontrado</h3>
                  <p className="text-slate-500">
                    Tente ajustar os filtros de busca ou adicione um novo usuário.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Adicionar Usuário */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Novo Usuário
            </DialogTitle>
            <DialogDescription>
              Adicione um novo usuário ao sistema de estoque
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                placeholder="Digite o nome completo"
                value={novoUsuario.nome}
                onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@empresa.com"
                value={novoUsuario.email}
                onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                placeholder="(11) 99999-9999"
                value={novoUsuario.telefone}
                onChange={(e) => setNovoUsuario({...novoUsuario, telefone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                id="cargo"
                placeholder="Ex: Gerente de Estoque"
                value={novoUsuario.cargo}
                onChange={(e) => setNovoUsuario({...novoUsuario, cargo: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite uma senha"
                value={novoUsuario.senha}
                onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdicionarUsuario} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Adicionar Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Usuário */}
      <Dialog open={modalEdicao} onOpenChange={setModalEdicao}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              Editar Usuário
            </DialogTitle>
            <DialogDescription>
              Edite as informações do usuário selecionado
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-nome">Nome Completo</Label>
              <Input
                id="edit-nome"
                placeholder="Digite o nome completo"
                value={novoUsuario.nome}
                onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="usuario@empresa.com"
                value={novoUsuario.email}
                onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-telefone">Telefone</Label>
              <Input
                id="edit-telefone"
                placeholder="(11) 99999-9999"
                value={novoUsuario.telefone}
                onChange={(e) => setNovoUsuario({...novoUsuario, telefone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-cargo">Cargo</Label>
              <Input
                id="edit-cargo"
                placeholder="Ex: Gerente de Estoque"
                value={novoUsuario.cargo}
                onChange={(e) => setNovoUsuario({...novoUsuario, cargo: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalEdicao(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSalvarEdicao} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
