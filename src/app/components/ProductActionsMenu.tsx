'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
  onPdf: () => void;
}

export default function ProductActionsMenu({ onEdit, onDelete, onView, onPdf }: ProductActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 hover:bg-slate-100"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-50 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1">
          <button
            onClick={() => handleAction(onView)}
            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Visualizar
          </button>
          <button
            onClick={() => handleAction(onPdf)}
            className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            PDF
          </button>
          <button
            onClick={() => handleAction(onEdit)}
            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar
          </button>
          <button
            onClick={() => handleAction(onDelete)}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
