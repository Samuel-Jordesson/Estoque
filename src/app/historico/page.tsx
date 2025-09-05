'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  User,
  Package,
  BarChart3,
  FileText,
  Eye
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Dados mockados para relatórios
const mockMovimentacoes = [
  { id: 1, produto: 'Notebook Dell Inspiron', categoria: 'Eletrônicos', tipo: 'entrada', quantidade: 5, usuario: 'João Barbosa', data: '2024-01-15', preco: 2500.00 },
  { id: 2, produto: 'Mouse Logitech MX3', categoria: 'Periféricos', tipo: 'saida', quantidade: 2, usuario: 'Maria Silva', data: '2024-01-14', preco: 299.90 },
  { id: 3, produto: 'Teclado Mecânico RGB', categoria: 'Periféricos', tipo: 'entrada', quantidade: 10, usuario: 'Pedro Santos', data: '2024-01-13', preco: 450.00 },
  { id: 4, produto: 'Monitor 24" Samsung', categoria: 'Monitores', tipo: 'saida', quantidade: 1, usuario: 'Ana Costa', data: '2024-01-12', preco: 899.99 },
  { id: 5, produto: 'Webcam HD 1080p', categoria: 'Acessórios', tipo: 'entrada', quantidade: 15, usuario: 'Carlos Lima', data: '2024-01-11', preco: 199.90 },
  { id: 6, produto: 'Headset Gamer', categoria: 'Acessórios', tipo: 'saida', quantidade: 3, usuario: 'João Barbosa', data: '2024-01-10', preco: 599.90 },
  { id: 7, produto: 'Notebook Dell Inspiron', categoria: 'Eletrônicos', tipo: 'saida', quantidade: 2, usuario: 'Maria Silva', data: '2024-01-09', preco: 2500.00 },
  { id: 8, produto: 'Mouse Logitech MX3', categoria: 'Periféricos', tipo: 'entrada', quantidade: 8, usuario: 'Pedro Santos', data: '2024-01-08', preco: 299.90 },
];

const categorias = ['Todas', 'Eletrônicos', 'Periféricos', 'Monitores', 'Acessórios'];
const usuarios = ['Todos', 'João Barbosa', 'Maria Silva', 'Pedro Santos', 'Ana Costa', 'Carlos Lima'];
const tipos = ['Todos', 'Entrada', 'Saída'];

// Tipo para movimentação
type Movimentacao = {
  id: number;
  produto: {
    id: number;
    nome: string;
    categoria: {
      id: number;
      nome: string;
    };
  };
  usuario: {
    id: number;
    nome: string;
  };
  tipo: string;
  quantidade: number;
  preco: number;
  observacoes?: string;
  data: string;
};

export default function HistoricoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    busca: '',
    categoria: 'Todas',
    usuario: 'Todos',
    tipo: 'Todos',
    dataInicio: '',
    dataFim: ''
  });

  // Carregar movimentações da API
  useEffect(() => {
    const carregarMovimentacoes = async () => {
      try {
        const response = await fetch('/api/movimentacoes');
        if (response.ok) {
          const data = await response.json();
          setMovimentacoes(data);
        }
      } catch (error) {
        console.error('Erro ao carregar movimentações:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarMovimentacoes();
  }, []);

  // Filtrar movimentações
  const movimentacoesFiltradas = movimentacoes.filter(mov => {
    const matchBusca = mov.produto.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
                      mov.usuario.nome.toLowerCase().includes(filtros.busca.toLowerCase());
    const matchCategoria = filtros.categoria === 'Todas' || mov.produto.categoria.nome === filtros.categoria;
    const matchUsuario = filtros.usuario === 'Todos' || mov.usuario.nome === filtros.usuario;
    const matchTipo = filtros.tipo === 'Todos' || 
                     (filtros.tipo === 'Entrada' && mov.tipo === 'entrada') ||
                     (filtros.tipo === 'Saída' && mov.tipo === 'saida');
    
    return matchBusca && matchCategoria && matchUsuario && matchTipo;
  });

  // Calcular métricas
  const totalEntradas = movimentacoesFiltradas.filter(m => m.tipo === 'entrada').length;
  const totalSaidas = movimentacoesFiltradas.filter(m => m.tipo === 'saida').length;
  const valorTotalEntradas = movimentacoesFiltradas
    .filter(m => m.tipo === 'entrada')
    .reduce((sum, m) => sum + (m.quantidade * m.preco), 0);
  const valorTotalSaidas = movimentacoesFiltradas
    .filter(m => m.tipo === 'saida')
    .reduce((sum, m) => sum + (m.quantidade * m.preco), 0);

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
                <h1 className="text-xl font-semibold text-slate-800">Relatórios</h1>
                <p className="text-sm text-slate-500">Análises e histórico do sistema</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Período
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
                  Relatórios e Análises
                </h1>
                <p className="text-slate-600">Acompanhe movimentações, métricas e histórico completo</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Gráficos
                </Button>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <Card className="mb-6 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtros de Relatório
              </CardTitle>
              <CardDescription>Filtre por categoria, usuário, produto ou período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Busca */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Produto ou usuário..."
                      value={filtros.busca}
                      onChange={(e) => setFiltros({...filtros, busca: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categoria */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoria</label>
                  <select
                    value={filtros.categoria}
                    onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Usuário */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Usuário</label>
                  <select
                    value={filtros.usuario}
                    onChange={(e) => setFiltros({...filtros, usuario: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {usuarios.map(user => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>
                </div>

                {/* Tipo */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo</label>
                  <select
                    value={filtros.tipo}
                    onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {tipos.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Entradas</p>
                    <p className="text-2xl font-bold text-green-600">{totalEntradas}</p>
                    <p className="text-xs text-slate-500 mt-1">Movimentações</p>
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
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Saídas</p>
                    <p className="text-2xl font-bold text-red-600">{totalSaidas}</p>
                    <p className="text-xs text-slate-500 mt-1">Movimentações</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Valor Entradas</p>
                    <p className="text-2xl font-bold text-slate-800">R$ {valorTotalEntradas.toFixed(2)}</p>
                    <p className="text-xs text-slate-500 mt-1">Total em compras</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Valor Saídas</p>
                    <p className="text-2xl font-bold text-slate-800">R$ {valorTotalSaidas.toFixed(2)}</p>
                    <p className="text-xs text-slate-500 mt-1">Total em vendas</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Movimentações */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Histórico de Movimentações</CardTitle>
                  <CardDescription>{movimentacoesFiltradas.length} movimentações encontradas</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Produto
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Quantidade
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Valor Unit.
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {movimentacoesFiltradas.map((mov) => (
                      <tr key={mov.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                              <Package className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{mov.produto.nome}</div>
                              <div className="text-xs text-slate-500">ID: {mov.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {mov.produto.categoria.nome}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            mov.tipo === 'entrada' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {mov.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                          {mov.quantidade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          R$ {mov.preco.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          R$ {(mov.quantidade * mov.preco).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center mr-2">
                              <User className="w-3 h-3 text-slate-600" />
                            </div>
                            <span className="text-sm text-slate-600">{mov.usuario.nome}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {new Date(mov.data).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {movimentacoesFiltradas.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhuma movimentação encontrada</h3>
                  <p className="text-slate-500">
                    Tente ajustar os filtros para encontrar as movimentações desejadas.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
