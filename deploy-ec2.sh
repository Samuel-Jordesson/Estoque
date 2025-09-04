#!/bin/bash

echo "🚀 Deploy do Sistema de Estoque na AWS EC2"
echo "=========================================="

# Atualizar sistema
echo "📦 Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar Docker
echo "🐳 Instalando Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Instalar Docker Compose
echo "🔧 Instalando Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Instalar Git
echo "📥 Instalando Git..."
sudo apt install git -y

# Clonar repositório
echo "📂 Clonando repositório..."
git clone https://github.com/SEU_USUARIO/sistema-estoque.git
cd sistema-estoque

# Criar arquivo .env
echo "⚙️ Configurando variáveis de ambiente..."
cat > .env << EOF
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="sua-chave-secreta-$(date +%s)"
NEXTAUTH_URL="http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
JWT_SECRET="sua-jwt-secret-key-$(date +%s)"
EOF

# Executar deploy
echo "🚀 Executando deploy..."
sudo docker-compose up -d --build

# Verificar status
echo "✅ Verificando status..."
sudo docker ps

echo ""
echo "🎉 Deploy concluído!"
echo "🌐 Acesse: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo ""
echo "📋 Comandos úteis:"
echo "  sudo docker-compose logs -f    # Ver logs"
echo "  sudo docker-compose restart    # Reiniciar"
echo "  sudo docker-compose down       # Parar"
