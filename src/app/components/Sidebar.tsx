'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  History, 
  Users, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Visão geral do sistema'
  },
  {
    name: 'Estoque',
    href: '/estoque',
    icon: Package,
    description: 'Gerenciar produtos'
  },
  {
    name: 'Relatório',
    href: '/historico',
    icon: History,
    description: 'Relatórios e análises'
  },
  {
    name: 'Usuários',
    href: '/usuarios',
    icon: Users,
    description: 'Gerenciar usuários'
  },
  {
    name: 'Configurações',
    href: '/outros',
    icon: Settings,
    description: 'Configurações do sistema'
  },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 backdrop-blur-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Sistema Estoque</h1>
                <p className="text-xs text-slate-400">v1.0.0</p>
              </div>
            </div>
            
            {/* Botão fechar mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Menu Principal */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center p-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    {/* Indicador ativo */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
                    )}
                    
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' 
                        : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                    }`}>
                      <IconComponent className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`} />
                    </div>
                    
                    <div className="ml-3 flex-1">
                      <p className={`font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {item.name}
                      </p>
                      <p className={`text-xs transition-colors ${
                        isActive ? 'text-blue-200' : 'text-slate-500 group-hover:text-slate-400'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Badge de notificação (exemplo) */}
                    {item.name === 'Estoque' && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer com logout */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">Usuário Admin</p>
                <p className="text-xs text-slate-400">admin@estoque.com</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                console.log('Logout clicked');
              }}
              className="w-full mt-3 flex items-center justify-center p-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-red-500/10 rounded-xl transition-all duration-200 group border border-slate-700/50 hover:border-red-500/30"
            >
              <LogOut className="w-4 h-4 mr-2 group-hover:text-red-400" />
              Sair do Sistema
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
