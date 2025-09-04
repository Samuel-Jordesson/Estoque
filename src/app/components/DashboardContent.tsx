'use client';

import { useState } from 'react';
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  AlertTriangle,
  Clock,
  Plus,
  Minus,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Dados mockados para o gráfico
const chartData = [
  { name: 'Jan', saida: 400, entrada: 240 },
  { name: 'Fev', saida: 300, entrada: 139 },
  { name: 'Mar', saida: 200, entrada: 980 },
  { name: 'Abr', saida: 278, entrada: 390 },
  { name: 'Mai', saida: 189, entrada: 480 },
  { name: 'Jun', saida: 239, entrada: 380 },
  { name: 'Jul', saida: 349, entrada: 430 },
];

const metrics = [
  {
    title: 'Total em Estoque',
    value: '1,652',
    change: '+12%',
    changeType: 'positive',
    icon: Package,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    title: 'Saídas do Mês',
    value: '324',
    change: '-5%',
    changeType: 'negative',
    icon: TrendingDown,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600'
  },
  {
    title: 'Entradas do Mês',
    value: '456',
    change: '+8%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  },
  {
    title: 'Movimentações',
    value: '780',
    change: '+15%',
    changeType: 'positive',
    icon: Activity,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
];

export default function DashboardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Visão Geral
            </h1>
            <p className="text-slate-600">Acompanhe o desempenho do seu estoque em tempo real</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              Última atualização: agora
            </Button>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-slate-800 mb-2">{metric.value}</p>
                    <div className={`flex items-center text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.changeType === 'positive' ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      <span>{metric.change}</span>
                      <span className="ml-1 text-slate-500">vs mês anterior</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Decorative gradient */}
                <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${metric.color} opacity-5 rounded-full`}></div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráfico */}
      <Card className="mb-8 border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Movimentação de Estoque</CardTitle>
              <CardDescription>Entradas e saídas dos últimos meses</CardDescription>
            </div>
            <div className="flex space-x-2 bg-slate-100 p-1 rounded-lg">
              <Button
                variant={selectedPeriod === '7d' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('7d')}
                className="text-xs"
              >
                7 dias
              </Button>
              <Button
                variant={selectedPeriod === '30d' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('30d')}
                className="text-xs"
              >
                30 dias
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>

          {/* Gráfico de Barras */}
          <div className="relative">
            {/* Eixo Y */}
            <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-slate-500">
              <span>1000</span>
              <span>800</span>
              <span>600</span>
              <span>400</span>
              <span>200</span>
              <span>0</span>
            </div>

            {/* Gráfico */}
            <div className="ml-16">
              <div className="flex items-end justify-between h-64 space-x-3">
                {chartData.map((data, index) => {
                  const maxValue = Math.max(...chartData.map(d => d.saida + d.entrada));
                  const saidaHeight = (data.saida / maxValue) * 100;
                  const entradaHeight = (data.entrada / maxValue) * 100;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group">
                      {/* Barra */}
                      <div className="w-full max-w-12 relative">
                        <div
                          className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg shadow-md group-hover:shadow-lg transition-all duration-300"
                          style={{ height: `${entradaHeight}%` }}
                        ></div>
                        <div
                          className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-b-lg shadow-md group-hover:shadow-lg transition-all duration-300"
                          style={{ height: `${saidaHeight}%` }}
                        ></div>
                      </div>
                      
                      {/* Label */}
                      <span className="text-xs text-slate-600 mt-3 font-medium">{data.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legenda */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-400 rounded shadow-sm"></div>
                <span className="text-sm text-slate-700 font-medium">Entrada</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-400 rounded shadow-sm"></div>
                <span className="text-sm text-slate-700 font-medium">Saída</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Atividade Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Atividade Recente</CardTitle>
                <CardDescription>Últimas movimentações do sistema</CardDescription>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Produto adicionado', item: 'Notebook Dell', time: '2 min atrás', type: 'add', icon: Plus },
                { action: 'Produto removido', item: 'Mouse Logitech', time: '5 min atrás', type: 'remove', icon: Minus },
                { action: 'Estoque atualizado', item: 'Teclado Mecânico', time: '10 min atrás', type: 'update', icon: RotateCcw },
              ].map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activity.type === 'add' ? 'bg-green-100 text-green-600' : 
                      activity.type === 'remove' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.item} • {activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Produtos em Baixa</CardTitle>
                <CardDescription>Itens que precisam de atenção</CardDescription>
              </div>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">3 itens</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Mouse Wireless', stock: 3, min: 5, critical: false },
                { name: 'Teclado USB', stock: 2, min: 4, critical: false },
                { name: 'Monitor 24"', stock: 1, min: 3, critical: true },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      product.critical ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-500">Estoque: {product.stock} (mín: {product.min})</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.critical 
                      ? 'bg-red-100 text-red-700 border border-red-200' 
                      : 'bg-orange-100 text-orange-700 border border-orange-200'
                  }`}>
                    {product.critical ? 'Crítico' : 'Baixo'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
