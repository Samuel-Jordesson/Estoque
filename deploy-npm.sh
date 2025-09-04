#!/bin/bash

echo "🚀 Deploy do Sistema de Estoque com NPM"
echo "======================================="

# Atualizar sistema
echo "📦 Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
echo "📥 Instalando Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Git
echo "📥 Instalando Git..."
sudo apt install git -y

# Verificar versões
echo "✅ Verificando instalações..."
node --version
npm --version
git --version

# Clonar repositório
echo "📂 Clonando repositório..."
git clone https://github.com/Samuel-Jordesson/Estoque.git
cd Estoque

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Configurar banco de dados
echo "🗄️ Configurando banco de dados..."
npm run db:generate
npm run db:push
npm run db:seed

# Criar arquivo .env
echo "⚙️ Configurando variáveis de ambiente..."
cat > .env << EOF
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="sua-chave-secreta-$(date +%s)"
NEXTAUTH_URL="http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
JWT_SECRET="sua-jwt-secret-key-$(date +%s)"
EOF

# Build da aplicação
echo "🔨 Fazendo build da aplicação..."
npm run build

# Instalar PM2 para gerenciar o processo
echo "⚡ Instalando PM2..."
sudo npm install -g pm2

# Criar script de start
echo "📝 Criando script de start..."
cat > start.sh << 'EOF'
#!/bin/bash
cd /home/ubuntu/Estoque
npm start
EOF

chmod +x start.sh

# Iniciar aplicação com PM2
echo "🚀 Iniciando aplicação..."
pm2 start npm --name "sistema-estoque" -- start

# Salvar configuração do PM2
pm2 save
pm2 startup

echo ""
echo "🎉 Deploy concluído!"
echo "🌐 Acesse: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo ""
echo "📋 Comandos úteis:"
echo "  pm2 status                    # Ver status"
echo "  pm2 logs sistema-estoque      # Ver logs"
echo "  pm2 restart sistema-estoque   # Reiniciar"
echo "  pm2 stop sistema-estoque      # Parar"
echo "  pm2 delete sistema-estoque    # Remover"
echo ""
echo "🔄 Para atualizar o código:"
echo "  cd /home/ubuntu/Estoque"
echo "  git pull"
echo "  npm run build"
echo "  pm2 restart sistema-estoque"
