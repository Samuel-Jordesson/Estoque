@echo off
echo 🚀 Fazendo upload do Sistema de Estoque para AWS EC2...

REM Verificar se a chave existe
if not exist "api.pem" (
    echo ❌ Arquivo api.pem não encontrado!
    echo Certifique-se de que o arquivo api.pem está na pasta atual.
    pause
    exit /b 1
)

echo 📦 Fazendo upload dos arquivos...
scp -i api.pem -r . ubuntu@56.124.117.220:/home/ubuntu/sistema-estoque/

if %errorlevel% equ 0 (
    echo ✅ Upload concluído com sucesso!
    echo.
    echo 🔧 Agora conecte na instância e execute:
    echo ssh -i api.pem ubuntu@56.124.117.220
    echo cd /home/ubuntu/sistema-estoque
    echo docker-compose up -d --build
    echo.
    echo 🌐 Após o deploy, acesse: http://56.124.117.220
) else (
    echo ❌ Erro no upload. Verifique a conexão e as permissões da chave.
)

pause
