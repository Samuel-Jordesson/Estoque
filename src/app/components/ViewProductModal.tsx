'use client';

import { Eye, Package, Tag, Hash, DollarSign, Calendar, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
  createdAt: string;
  lastUpdated: string;
}

interface ViewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Produto | null;
}

export default function ViewProductModal({ isOpen, onClose, product }: ViewProductModalProps) {
  if (!product) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (quantidade: number, quantidadeMinima: number) => {
    if (quantidade === 0) return 'text-red-600 bg-red-50';
    if (quantidade <= quantidadeMinima) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusText = (quantidade: number, quantidadeMinima: number) => {
    if (quantidade === 0) return 'Sem Estoque';
    if (quantidade <= quantidadeMinima) return 'Estoque Baixo';
    return 'Em Estoque';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle>Detalhes do Produto</DialogTitle>
              <DialogDescription>
                Informações completas sobre o produto
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-slate-400" />
                  <div>
                    <h3 className="font-semibold text-lg">{product.nome}</h3>
                    {product.descricao && (
                      <p className="text-slate-600 text-sm">{product.descricao}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Tag className="w-5 h-5 text-slate-400" />
                  <div>
                    <span className="text-sm text-slate-500">Categoria:</span>
                    <span className="ml-2 font-medium">{product.categoria.nome}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações de Estoque */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Hash className="w-4 h-4 mr-2" />
                Informações de Estoque
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-slate-500">Quantidade Atual:</span>
                  <p className="font-semibold text-lg">{product.quantidade}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-500">Estoque Mínimo:</span>
                  <p className="font-semibold text-lg">{product.quantidadeMinima}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-slate-500">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.quantidade, product.quantidadeMinima)}`}>
                    {getStatusText(product.quantidade, product.quantidadeMinima)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Financeiras */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Informações Financeiras
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Valor Unitário:</span>
                  <span className="font-semibold">R$ {product.preco.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Valor Total em Estoque:</span>
                  <span className="font-semibold">R$ {(product.quantidade * product.preco).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações de Data */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Informações de Data
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Criado em:</span>
                  <span className="font-medium">{formatDate(product.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Última atualização:</span>
                  <span className="font-medium">{formatDate(product.lastUpdated)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
