'use client';

import { useState, useEffect } from 'react';
import { Edit, Package, Tag, Hash, DollarSign } from 'lucide-react';
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

interface Categoria {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  categoria: {
    id: number;
    nome: string;
  };
  preco: number;
  quantidade: number;
  quantidadeMinima: number;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: { 
    id: number;
    name: string; 
    categoriaId: number; 
    price: number; 
    quantidadeMinima: number;
  }) => void;
  product: Produto | null;
  categorias: Categoria[];
}

export default function EditProductModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  product, 
  categorias = [] 
}: EditProductModalProps) {
  const [productName, setProductName] = useState('');
  const [categoriaId, setCategoriaId] = useState(1);
  const [price, setPrice] = useState(0);
  const [quantidadeMinima, setQuantidadeMinima] = useState(1);

  // Atualizar campos quando o produto mudar
  useEffect(() => {
    if (product) {
      setProductName(product.nome);
      setCategoriaId(product.categoria.id);
      setPrice(product.preco);
      setQuantidadeMinima(product.quantidadeMinima);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim() && price >= 0 && categoriaId && product) {
      onConfirm({
        id: product.id,
        name: productName.trim(),
        categoriaId,
        price,
        quantidadeMinima,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setProductName('');
    setCategoriaId(1);
    setPrice(0);
    setQuantidadeMinima(1);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Edit className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle>Editar Produto</DialogTitle>
              <DialogDescription>
                Atualize as informações do produto
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
            <Label htmlFor="categoria" className="text-sm font-medium">
              Categoria *
            </Label>
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


          {/* Valor e Quantidade Mínima */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Valor Unitário (R$) *
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="pl-10"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantidadeMinima" className="text-sm font-medium">
                Estoque Mínimo *
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="quantidadeMinima"
                  type="number"
                  min="1"
                  value={quantidadeMinima}
                  onChange={(e) => setQuantidadeMinima(parseInt(e.target.value) || 1)}
                  className="pl-10"
                  placeholder="1"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
