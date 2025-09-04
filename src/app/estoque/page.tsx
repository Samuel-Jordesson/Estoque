'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Package, 
  TrendingUp, 
  Users, 
  MoreHorizontal,
  Eye
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AddProductModal from '../components/AddProductModal';
import QuantityModal from '../components/QuantityModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Dados mockados dos produtos
const mockProducts = [
  { id: 1, name: 'Notebook Dell Inspiron', quantity: 15, addedBy: 'João Barbosa', category: 'Eletrônicos', price: 2500.00, lastUpdated: '2024-01-15' },
  { id: 2, name: 'Mouse Logitech MX3', quantity: 8, addedBy: 'Maria Silva', category: 'Periféricos', price: 299.90, lastUpdated: '2024-01-14' },
  { id: 3, name: 'Teclado Mecânico RGB', quantity: 12, addedBy: 'Pedro Santos', category: 'Periféricos', price: 450.00, lastUpdated: '2024-01-13' },
  { id: 4, name: 'Monitor 24" Samsung', quantity: 5, addedBy: 'Ana Costa', category: 'Monitores', price: 899.99, lastUpdated: '2024-01-12' },
  { id: 5, name: 'Webcam HD 1080p', quantity: 20, addedBy: 'Carlos Lima', category: 'Acessórios', price: 199.90, lastUpdated: '2024-01-11' },
  { id: 6, name: 'Headset Gamer', quantity: 3, addedBy: 'João Barbosa', category: 'Acessórios', price: 599.90, lastUpdated: '2024-01-10' },
];

export default function EstoquePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(mockProducts);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'add' as 'add' | 'remove',
    productId: null as number | null,
    productName: '',
    currentQuantity: 0,
  });

  const handleAddQuantity = (id: number, productName: string, currentQuantity: number) => {
    setModalState({
      isOpen: true,
      type: 'add',
      productId: id,
      productName,
      currentQuantity,
    });
  };

  const handleRemoveQuantity = (id: number, productName: string, currentQuantity: number) => {
    setModalState({
      isOpen: true,
      type: 'remove',
      productId: id,
      productName,
      currentQuantity,
    });
  };

  const handleModalConfirm = (quantity: number) => {
    if (modalState.productId) {
      setProducts(products.map(product => {
        if (product.id === modalState.productId) {
          const newQuantity = modalState.type === 'add' 
            ? product.quantity + quantity
            : Math.max(0, product.quantity - quantity);
          
          return { ...product, quantity: newQuantity };
        }
        return product;
      }));
    }
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: 'add',
      productId: null,
      productName: '',
      currentQuantity: 0,
    });
  };

  const handleAddProduct = (newProduct: { name: string; quantity: number; addedBy: string }) => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { 
      ...newProduct, 
      id: newId,
      category: 'Novo',
      price: 0.00,
      lastUpdated: new Date().toISOString().split('T')[0]
    }]);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.addedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-xl font-semibold text-slate-800">Estoque</h1>
                <p className="text-sm text-slate-500">Gerenciamento de produtos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Package className="w-4 h-4 mr-2" />
                Exportar
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
                  Gerenciamento de Estoque
                </h1>
                <p className="text-slate-600">Controle total dos seus produtos e inventário</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Relatórios
                </Button>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <Card className="mb-6 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Buscar produtos, categorias ou responsáveis..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Filter Button */}
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>

                {/* Add Button */}
                <Button 
                  onClick={() => setAddModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Produto
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Produtos em Estoque</CardTitle>
                  <CardDescription>{filteredProducts.length} produtos encontrados</CardDescription>
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
                        Quantidade
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Preço
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Responsável
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                              <Package className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{product.name}</div>
                              <div className="text-xs text-slate-500">ID: {product.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.quantity > 10 
                                ? 'bg-green-100 text-green-700' 
                                : product.quantity > 5 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {product.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                          R$ {product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center mr-2">
                              <Users className="w-3 h-3 text-slate-600" />
                            </div>
                            <span className="text-sm text-slate-600">{product.addedBy}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center space-x-2">
                            {/* Add Button */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAddQuantity(product.id, product.name, product.quantity)}
                              className="text-green-600 border-green-200 hover:bg-green-50"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>

                            {/* Remove Button */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveQuantity(product.id, product.name, product.quantity)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              disabled={product.quantity === 0}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </Button>

                            {/* More Actions */}
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-slate-500 mb-4">
                  {searchTerm ? 'Tente ajustar os termos de busca.' : 'Comece adicionando um produto ao estoque.'}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setAddModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Primeiro Produto
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Summary Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total de Produtos</p>
                    <p className="text-2xl font-bold text-slate-800">{products.length}</p>
                    <p className="text-xs text-slate-500 mt-1">Produtos cadastrados</p>
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
                    <p className="text-sm font-medium text-slate-600 mb-1">Total em Estoque</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {products.reduce((sum, product) => sum + product.quantity, 0)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Unidades disponíveis</p>
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
                    <p className="text-sm font-medium text-slate-600 mb-1">Valor Total</p>
                    <p className="text-2xl font-bold text-slate-800">
                      R$ {products.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Valor do inventário</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onConfirm={handleAddProduct}
      />

      {/* Quantity Modal */}
      <QuantityModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleModalConfirm}
        type={modalState.type}
        currentQuantity={modalState.currentQuantity}
        productName={modalState.productName}
      />
    </div>
  );
}
