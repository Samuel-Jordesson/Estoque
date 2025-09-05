'use client';

import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Package, Tag, Hash, DollarSign, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

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

interface ExportProductsPdfProps {
  products: Produto[];
  onClose: () => void;
}

export default function ExportProductsPdf({ products, onClose }: ExportProductsPdfProps) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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

  const calculateTotals = () => {
    const totalProducts = products.length;
    const totalQuantity = products.reduce((sum, product) => sum + product.quantidade, 0);
    const totalValue = products.reduce((sum, product) => sum + (product.quantidade * product.preco), 0);
    const lowStock = products.filter(p => p.quantidade <= p.quantidadeMinima && p.quantidade > 0).length;
    const outOfStock = products.filter(p => p.quantidade === 0).length;

    return {
      totalProducts,
      totalQuantity,
      totalValue,
      lowStock,
      outOfStock
    };
  };

  const generatePDF = async () => {
    if (!products.length || !pdfRef.current) return;

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

  const totals = calculateTotals();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Relatório de Produtos em Estoque</h2>
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
            <p className="text-slate-600">Relatório Completo de Produtos</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          {/* Resumo Executivo */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Resumo Executivo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-500 mb-1">Total de Produtos</p>
                <p className="text-2xl font-bold text-blue-600">{totals.totalProducts}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-500 mb-1">Quantidade Total</p>
                <p className="text-2xl font-bold text-green-600">{totals.totalQuantity}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-500 mb-1">Valor Total</p>
                <p className="text-2xl font-bold text-purple-600">R$ {totals.totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-sm text-slate-500 mb-1">Estoque Baixo</p>
                <p className="text-2xl font-bold text-orange-600">{totals.lowStock}</p>
              </div>
            </div>
          </div>

          {/* Lista de Produtos */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Lista de Produtos ({products.length} itens)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Produto</th>
                    <th className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700">Categoria</th>
                    <th className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">Quantidade</th>
                    <th className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">Valor Unit.</th>
                    <th className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">Valor Total</th>
                    <th className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}>
                      <td className="border border-slate-200 px-4 py-3 text-sm">
                        <div>
                          <p className="font-medium text-slate-800">{product.nome}</p>
                          {product.descricao && (
                            <p className="text-xs text-slate-500">{product.descricao}</p>
                          )}
                        </div>
                      </td>
                      <td className="border border-slate-200 px-4 py-3 text-sm text-slate-600">
                        {product.categoria.nome}
                      </td>
                      <td className="border border-slate-200 px-4 py-3 text-sm text-center">
                        <span className="font-medium">{product.quantidade}</span>
                        <p className="text-xs text-slate-500">mín: {product.quantidadeMinima}</p>
                      </td>
                      <td className="border border-slate-200 px-4 py-3 text-sm text-center font-medium">
                        R$ {product.preco.toFixed(2)}
                      </td>
                      <td className="border border-slate-200 px-4 py-3 text-sm text-center font-medium">
                        R$ {(product.quantidade * product.preco).toFixed(2)}
                      </td>
                      <td className="border border-slate-200 px-4 py-3 text-sm text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.quantidade, product.quantidadeMinima)}`}>
                          {getStatusText(product.quantidade, product.quantidadeMinima)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Análise por Categoria */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Análise por Categoria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from(new Set(products.map(p => p.categoria.nome))).map(categoria => {
                const produtosCategoria = products.filter(p => p.categoria.nome === categoria);
                const totalQuantidade = produtosCategoria.reduce((sum, p) => sum + p.quantidade, 0);
                const totalValor = produtosCategoria.reduce((sum, p) => sum + (p.quantidade * p.preco), 0);
                
                return (
                  <div key={categoria} className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-800 mb-2">{categoria}</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-slate-600">Produtos: <span className="font-medium">{produtosCategoria.length}</span></p>
                      <p className="text-slate-600">Quantidade: <span className="font-medium">{totalQuantidade}</span></p>
                      <p className="text-slate-600">Valor: <span className="font-medium">R$ {totalValor.toFixed(2)}</span></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rodapé */}
          <div className="text-center text-sm text-slate-500 border-t pt-4">
            <p>Relatório gerado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
            <p className="mt-1">Sistema de Estoque - Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
