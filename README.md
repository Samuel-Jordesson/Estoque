# Sistema de Estoque

Um sistema completo de gerenciamento de estoque desenvolvido com Next.js, Prisma e SQLite.

## 🚀 Funcionalidades

- **Autenticação**: Login seguro com JWT
- **Múltiplas Contas**: Criação de contas independentes para diferentes empresas
- **Dashboard**: Visão geral do sistema com métricas
- **Gerenciamento de Produtos**: Adicionar, editar e controlar estoque
- **Movimentações**: Entrada e saída de produtos com histórico
- **Usuários**: Gerenciamento de usuários do sistema
- **Relatórios**: Histórico completo de movimentações
- **Configurações**: Dados da empresa e configurações de segurança

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite com Prisma ORM
- **Autenticação**: JWT (JSON Web Tokens)
- **UI**: Tailwind CSS, Radix UI
- **Ícones**: Lucide React

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd estoque
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse o sistema em: http://localhost:3000

## 🔐 Credenciais de Acesso

### Usuário Administrador
- **Email**: joao.barbosa@empresa.com
- **Senha**: 123456

### Outros Usuários Disponíveis
- **Email**: maria.silva@empresa.com | **Senha**: 123456
- **Email**: pedro.santos@empresa.com | **Senha**: 123456

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

- **Empresa**: Dados da empresa
- **Usuario**: Usuários do sistema
- **Categoria**: Categorias de produtos
- **Produto**: Produtos em estoque
- **Movimentacao**: Histórico de entradas e saídas
- **Configuracao**: Configurações do sistema

## 🎯 Como Usar

### 1. Login
- Acesse a página inicial
- Use as credenciais fornecidas
- Clique em "Acessar como Demo" para login rápido

### 2. Dashboard
- Visualize métricas gerais do sistema
- Acompanhe movimentações recentes
- Veja produtos com estoque baixo

### 3. Gerenciar Estoque
- Adicione novos produtos com nome, quantidade, valor e categoria
- Crie novas categorias diretamente no modal de adicionar produto
- O sistema identifica automaticamente o usuário logado como responsável
- Ajuste quantidades (entrada/saída)
- Visualize produtos por categoria
- Monitore estoque mínimo
- **Menu de ações por produto** (3 pontinhos):
  - 👁️ **Visualizar**: Veja detalhes completos do produto
  - 📄 **PDF**: Gere recibo em PDF com design profissional
  - ✏️ **Editar**: Modifique informações do produto
  - 🗑️ **Excluir**: Remova produtos sem movimentações
  - ⚠️ **Modal de confirmação**: Confirmação elegante para ações destrutivas
- **Exportação completa**: Botão "Exportar" gera PDF com todos os produtos em estoque

### 4. Usuários
- Adicione novos usuários
- Edite informações existentes
- Gerencie permissões

### 5. Relatórios
- Visualize histórico completo
- Filtre por categoria, usuário ou tipo
- Acompanhe métricas de movimentação

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção

# Banco de Dados
npm run db:generate  # Gera cliente Prisma
npm run db:push      # Aplica mudanças no schema
npm run db:seed      # Popula banco com dados iniciais
npm run db:studio    # Abre Prisma Studio

# Qualidade de Código
npm run lint         # Executa ESLint
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/                 # Rotas da API
│   │   ├── auth/           # Autenticação
│   │   ├── categorias/     # CRUD categorias
│   │   ├── empresa/        # Dados da empresa
│   │   ├── movimentacoes/  # Movimentações
│   │   ├── produtos/       # CRUD produtos
│   │   └── usuarios/       # CRUD usuários
│   ├── components/         # Componentes reutilizáveis
│   ├── dashboard/          # Página do dashboard
│   ├── estoque/           # Página de estoque
│   ├── historico/         # Página de relatórios
│   ├── usuarios/          # Página de usuários
│   └── outros/            # Página de configurações
├── components/ui/          # Componentes de UI
└── lib/                   # Utilitários e configurações
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT com expiração
- Validação de dados nas APIs
- Proteção contra SQL injection (Prisma)

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras Plataformas
- Configure as variáveis de ambiente
- Execute `npm run build`
- Inicie com `npm run start`

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET="sistema-estoque-jwt-secret-key-2024"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

**Importante**: O sistema usa JWT para autenticação. Certifique-se de definir uma chave secreta segura para produção.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🆘 Suporte

Para suporte ou dúvidas:
- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para facilitar o gerenciamento de estoque**