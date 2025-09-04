# 🏪 Sistema de Estoque

Sistema completo de gerenciamento de estoque desenvolvido com Next.js, Prisma e SQLite.

## 🚀 Funcionalidades

- **Dashboard** - Visão geral com métricas e gráficos
- **Estoque** - Gerenciamento de produtos e movimentações
- **Relatórios** - Análises e relatórios detalhados
- **Usuários** - Gestão de usuários do sistema
- **Configurações** - Dados da empresa e configurações

## 🛠️ Tecnologias

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes
- **Database:** SQLite com Prisma ORM
- **Deploy:** PM2, AWS EC2

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Desenvolvimento Local

```bash
# Clone o repositório
git clone <seu-repositorio>
cd sistema-estoque

# Instale as dependências
npm install

# Configure o banco de dados
npm run db:generate
npm run db:push
npm run db:seed

# Execute o projeto
npm run dev
```

### Deploy em Produção

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Build da aplicação
npm run build

# Iniciar com PM2
pm2 start npm --name "sistema-estoque" -- start

# Acesse em http://localhost:3000
```

## 🗄️ Banco de Dados

O sistema usa SQLite com Prisma ORM. As tabelas incluem:

- **Empresa** - Dados da empresa
- **Usuario** - Usuários do sistema
- **Categoria** - Categorias de produtos
- **Produto** - Produtos do estoque
- **Movimentacao** - Histórico de movimentações

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar em produção
npm run db:generate  # Gerar cliente Prisma
npm run db:push      # Sincronizar schema
npm run db:seed      # Popular banco com dados iniciais
npm run db:studio    # Interface visual do banco
```

## 📱 Interface

- Design moderno e responsivo
- Componentes reutilizáveis com shadcn/ui
- Tema escuro/claro
- Navegação intuitiva

## 🚀 Deploy na AWS

1. Crie uma instância EC2
2. Execute o script de deploy automático

```bash
# Na instância EC2
curl -fsSL https://raw.githubusercontent.com/Samuel-Jordesson/Estoque/master/deploy.sh | bash
```

Ou manualmente:

```bash
# Na instância EC2
git clone https://github.com/Samuel-Jordesson/Estoque.git
cd Estoque
chmod +x deploy.sh
./deploy.sh
```

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvido por

Sistema de Estoque - Versão 1.0