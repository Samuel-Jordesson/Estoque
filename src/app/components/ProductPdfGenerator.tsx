'use client';

import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Package, Tag, Hash, DollarSign, Calendar, User } from 'lucide-react';

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

interface ProductPdfGeneratorProps {
  product: Produto | null;
  onClose: () => void;
}

export default function ProductPdfGenerator({ product, onClose }: ProductPdfGeneratorProps) {
  const pdfRef = useRef<HTMLDivElement>(null);

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

  const generatePDF = async () => {
    if (!product || !pdfRef.current) return;

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Abrir PDF em nova aba para impressão
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
      
      // Limpar URL após um tempo
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 1000);
      
      onClose();
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Recibo do Produto</h2>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Imprimir PDF
            </button>
          </div>
        </div>

        <div ref={pdfRef} className="bg-white p-8">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Sistema de Estoque</h1>
            <p className="text-slate-600">Recibo de Produto</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          {/* Informações Básicas */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Informações do Produto
            </h3>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Nome do Produto</p>
                  <p className="font-semibold text-lg">{product.nome}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Categoria</p>
                  <p className="font-semibold">{product.categoria.nome}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Estoque */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <Hash className="w-5 h-5 mr-2" />
              Informações de Estoque
            </h3>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Quantidade Atual</p>
                  <p className="font-semibold text-lg">{product.quantidade}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Estoque Mínimo</p>
                  <p className="font-semibold text-lg">{product.quantidadeMinima}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-500 mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.quantidade, product.quantidadeMinima)}`}>
                    {getStatusText(product.quantidade, product.quantidadeMinima)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Financeiras */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Informações Financeiras
            </h3>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Valor Unitário</p>
                  <p className="font-semibold text-lg">R$ {product.preco.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Valor Total em Estoque</p>
                  <p className="font-semibold text-lg">R$ {(product.quantidade * product.preco).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Data */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Informações de Data
            </h3>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Criado em</p>
                  <p className="font-semibold">{formatDate(product.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Última atualização</p>
                  <p className="font-semibold">{formatDate(product.lastUpdated)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="text-center text-sm text-slate-500 border-t pt-4">
            <p>Recibo gerado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
            <p className="mt-1">Sistema de Estoque - Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
