'use client';

import { useState } from 'react';
import { Plus, Minus, Package, Hash } from 'lucide-react';
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

interface QuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  type: 'add' | 'remove';
  currentQuantity: number;
  productName: string;
}

export default function QuantityModal({ isOpen, onClose, onConfirm, type, currentQuantity, productName }: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity(1);
    onClose();
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const isAdd = type === 'add';
  const maxQuantity = isAdd ? undefined : currentQuantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isAdd 
                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                : 'bg-gradient-to-br from-red-500 to-pink-600'
            }`}>
              {isAdd ? <Plus className="w-5 h-5 text-white" /> : <Minus className="w-5 h-5 text-white" />}
            </div>
            <div>
              <DialogTitle>
                {isAdd ? 'Adicionar ao Estoque' : 'Remover do Estoque'}
              </DialogTitle>
              <DialogDescription>
                {isAdd 
                  ? 'Quantas unidades você deseja adicionar?' 
                  : 'Quantas unidades você deseja remover?'
                }
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{productName}</p>
                <p className="text-xs text-slate-500">
                  Estoque atual: <span className="font-medium">{currentQuantity} unidades</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Quantity Input */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Quantidade {isAdd ? 'a Adicionar' : 'a Remover'} *
            </Label>
            <div className="flex items-center justify-center space-x-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                className="h-12 w-12"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 pl-10 text-center font-medium text-lg"
                  min="1"
                  max={maxQuantity}
                />
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                className="h-12 w-12"
                disabled={!isAdd && quantity >= currentQuantity}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {!isAdd && quantity >= currentQuantity && (
              <p className="text-xs text-red-600 text-center">
                Não é possível remover mais unidades do que estão disponíveis
              </p>
            )}
          </div>

          {/* Preview */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Estoque após a operação:</span>
              <span className="font-medium text-slate-900">
                {isAdd ? currentQuantity + quantity : currentQuantity - quantity} unidades
              </span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirm}
              className={isAdd 
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
              }
            >
              {isAdd ? (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </>
              ) : (
                <>
                  <Minus className="w-4 h-4 mr-2" />
                  Remover
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
