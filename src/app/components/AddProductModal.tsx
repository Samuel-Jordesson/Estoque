'use client';

import { useState } from 'react';
import { Plus, Package, User, Hash, Tag } from 'lucide-react';
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
import AddCategoryModal from './AddCategoryModal';

interface Categoria {
  id: number;
  nome: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: { name: string; quantity: number; price: number; categoriaId: number }) => void;
  categorias?: Categoria[];
  onAddCategory?: (category: { name: string; description: string }) => void;
}

export default function AddProductModal({ isOpen, onClose, onConfirm, categorias = [], onAddCategory }: AddProductModalProps) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [categoriaId, setCategoriaId] = useState(1);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim() && quantity > 0 && price >= 0 && categoriaId) {
      onConfirm({
        name: productName.trim(),
        quantity,
        price,
        categoriaId,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setProductName('');
    setQuantity(1);
    setPrice(0);
    setCategoriaId(1);
    setShowAddCategory(false);
    onClose();
  };

  const handleAddCategory = (category: { name: string; description: string }) => {
    if (onAddCategory) {
      onAddCategory(category);
    }
    setShowAddCategory(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
              <DialogDescription>
                Preencha as informações do produto para adicioná-lo ao estoque
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do Produto */}
          <div className="space-y-2">
            <Label htmlFor="productName" className="text-sm font-medium">
              Nome do Produto *
            </Label>
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="pl-10"
                placeholder="Digite o nome do produto"
                required
              />
            </div>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="categoria" className="text-sm font-medium">
                Categoria *
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddCategory(true)}
                className="text-xs h-7 px-2"
              >
                <Plus className="w-3 h-3 mr-1" />
                Nova
              </Button>
            </div>
            <select
              id="categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>


          {/* Quantidade */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantidade Inicial *
            </Label>
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </Button>
              
              <div className="relative flex-1">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="pl-10 text-center font-medium"
                  min="1"
                  required
                />
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Valor Unitário (R$) *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">R$</span>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="pl-10"
                placeholder="0,00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Produto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      
      {/* Modal para adicionar categoria */}
      <AddCategoryModal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onConfirm={handleAddCategory}
      />
    </Dialog>
  );
}
