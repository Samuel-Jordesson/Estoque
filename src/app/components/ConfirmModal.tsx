'use client';

import { AlertTriangle, Trash2, Edit, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  type: 'delete' | 'edit' | 'view' | 'warning';
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  type,
  confirmText,
  cancelText = 'Cancelar'
}: ConfirmModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'delete':
        return <Trash2 className="w-6 h-6 text-red-600" />;
      case 'edit':
        return <Edit className="w-6 h-6 text-blue-600" />;
      case 'view':
        return <Eye className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-slate-600" />;
    }
  };

  const getButtonStyle = () => {
    switch (type) {
      case 'delete':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'edit':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'view':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
      default:
        return 'bg-slate-600 hover:bg-slate-700 text-white';
    }
  };

  const getDefaultConfirmText = () => {
    switch (type) {
      case 'delete':
        return 'Excluir';
      case 'edit':
        return 'Editar';
      case 'view':
        return 'Visualizar';
      case 'warning':
        return 'Confirmar';
      default:
        return 'Confirmar';
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              type === 'delete' ? 'bg-red-50' :
              type === 'edit' ? 'bg-blue-50' :
              type === 'view' ? 'bg-green-50' :
              type === 'warning' ? 'bg-yellow-50' :
              'bg-slate-50'
            }`}>
              {getIcon()}
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className={`p-4 rounded-lg ${
            type === 'delete' ? 'bg-red-50 border border-red-200' :
            type === 'edit' ? 'bg-blue-50 border border-blue-200' :
            type === 'view' ? 'bg-green-50 border border-green-200' :
            type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-slate-50 border border-slate-200'
          }`}>
            <p className={`text-sm ${
              type === 'delete' ? 'text-red-700' :
              type === 'edit' ? 'text-blue-700' :
              type === 'view' ? 'text-green-700' :
              type === 'warning' ? 'text-yellow-700' :
              'text-slate-700'
            }`}>
              {type === 'delete' && 'Esta ação não pode ser desfeita. O produto será permanentemente removido do sistema.'}
              {type === 'edit' && 'Você está prestes a modificar as informações deste produto.'}
              {type === 'view' && 'Visualizando as informações detalhadas do produto.'}
              {type === 'warning' && 'Por favor, confirme esta ação antes de continuar.'}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button 
            type="button" 
            onClick={handleConfirm}
            className={`flex-1 ${getButtonStyle()}`}
          >
            {confirmText || getDefaultConfirmText()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
