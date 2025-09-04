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
- **Deploy:** Docker, AWS EC2

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Docker (para deploy)

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

### Deploy com Docker

```bash
# Build e execute
docker-compose up -d --build

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
2. Clone o repositório na instância
3. Execute o deploy com Docker

```bash
# Na instância EC2
git clone <seu-repositorio>
cd sistema-estoque
docker-compose up -d --build
```

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvido por

Sistema de Estoque - Versão 1.0