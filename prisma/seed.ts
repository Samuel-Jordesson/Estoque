import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar empresa primeiro
  const empresa = await prisma.empresa.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nomeEmpresa: 'TechStore Solutions',
      cnpj: '12.345.678/0001-90',
      cpf: '123.456.789-00',
      email: 'contato@techstore.com',
      telefone: '(11) 99999-8888',
      endereco: 'Rua das Tecnologias, 123',
      bairro: 'Centro Tecnológico',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567',
      responsavel: 'João Silva'
    }
  })

  console.log('✅ Empresa criada')

  // Criar categorias para a empresa
  const categorias = await Promise.all([
    prisma.categoria.upsert({
      where: { 
        nome_empresaId: {
          nome: 'Eletrônicos',
          empresaId: empresa.id
        }
      },
      update: {},
      create: {
        nome: 'Eletrônicos',
        descricao: 'Produtos eletrônicos e tecnológicos',
        empresaId: empresa.id
      }
    }),
    prisma.categoria.upsert({
      where: { 
        nome_empresaId: {
          nome: 'Periféricos',
          empresaId: empresa.id
        }
      },
      update: {},
      create: {
        nome: 'Periféricos',
        descricao: 'Periféricos de computador',
        empresaId: empresa.id
      }
    }),
    prisma.categoria.upsert({
      where: { 
        nome_empresaId: {
          nome: 'Monitores',
          empresaId: empresa.id
        }
      },
      update: {},
      create: {
        nome: 'Monitores',
        descricao: 'Monitores e displays',
        empresaId: empresa.id
      }
    }),
    prisma.categoria.upsert({
      where: { 
        nome_empresaId: {
          nome: 'Acessórios',
          empresaId: empresa.id
        }
      },
      update: {},
      create: {
        nome: 'Acessórios',
        descricao: 'Acessórios diversos',
        empresaId: empresa.id
      }
    })
  ])

  console.log('✅ Categorias criadas')

  // Criar usuários para a empresa
  const senhaHash = await bcrypt.hash('123456', 10)
  
  const usuarios = await Promise.all([
    prisma.usuario.upsert({
      where: { email: 'joao.barbosa@empresa.com' },
      update: {},
      create: {
        nome: 'João Barbosa',
        email: 'joao.barbosa@empresa.com',
        telefone: '(11) 99999-1111',
        cargo: 'Gerente de Estoque',
        senha: senhaHash,
        status: 'ativo',
        produtosRetirados: 15,
        ultimaAtividade: new Date('2024-01-15'),
        dataCadastro: new Date('2024-01-10'),
        empresaId: empresa.id
      }
    }),
    prisma.usuario.upsert({
      where: { email: 'maria.silva@empresa.com' },
      update: {},
      create: {
        nome: 'Maria Silva',
        email: 'maria.silva@empresa.com',
        telefone: '(11) 99999-2222',
        cargo: 'Analista de Estoque',
        senha: senhaHash,
        status: 'ativo',
        produtosRetirados: 8,
        ultimaAtividade: new Date('2024-01-14'),
        dataCadastro: new Date('2024-01-12'),
        empresaId: empresa.id
      }
    }),
    prisma.usuario.upsert({
      where: { email: 'pedro.santos@empresa.com' },
      update: {},
      create: {
        nome: 'Pedro Santos',
        email: 'pedro.santos@empresa.com',
        telefone: '(11) 99999-3333',
        cargo: 'Assistente de Estoque',
        senha: senhaHash,
        status: 'ativo',
        produtosRetirados: 22,
        ultimaAtividade: new Date('2024-01-13'),
        dataCadastro: new Date('2024-01-08'),
        empresaId: empresa.id
      }
    })
  ])

  console.log('✅ Usuários criados')

  // Criar produtos para a empresa
  const produtos = await Promise.all([
    prisma.produto.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nome: 'Notebook Dell Inspiron',
        descricao: 'Notebook Dell Inspiron 15 3000',
        categoriaId: categorias[0].id,
        empresaId: empresa.id,
        preco: 2500.00,
        quantidade: 8,
        quantidadeMinima: 2,
        lastUpdated: new Date('2024-01-15')
      }
    }),
    prisma.produto.upsert({
      where: { id: 2 },
      update: {},
      create: {
        nome: 'Mouse Logitech MX3',
        descricao: 'Mouse sem fio Logitech MX Master 3',
        categoriaId: categorias[1].id,
        empresaId: empresa.id,
        preco: 299.90,
        quantidade: 15,
        quantidadeMinima: 5,
        lastUpdated: new Date('2024-01-14')
      }
    }),
    prisma.produto.upsert({
      where: { id: 3 },
      update: {},
      create: {
        nome: 'Teclado Mecânico RGB',
        descricao: 'Teclado mecânico com iluminação RGB',
        categoriaId: categorias[1].id,
        empresaId: empresa.id,
        preco: 450.00,
        quantidade: 12,
        quantidadeMinima: 3,
        lastUpdated: new Date('2024-01-13')
      }
    }),
    prisma.produto.upsert({
      where: { id: 4 },
      update: {},
      create: {
        nome: 'Monitor 24" Samsung',
        descricao: 'Monitor Samsung 24 polegadas Full HD',
        categoriaId: categorias[2].id,
        empresaId: empresa.id,
        preco: 899.99,
        quantidade: 6,
        quantidadeMinima: 2,
        lastUpdated: new Date('2024-01-12')
      }
    }),
    prisma.produto.upsert({
      where: { id: 5 },
      update: {},
      create: {
        nome: 'Webcam HD 1080p',
        descricao: 'Webcam HD 1080p para videoconferências',
        categoriaId: categorias[3].id,
        empresaId: empresa.id,
        preco: 199.90,
        quantidade: 20,
        quantidadeMinima: 5,
        lastUpdated: new Date('2024-01-11')
      }
    })
  ])

  console.log('✅ Produtos criados')

  // Criar algumas movimentações de exemplo
  const movimentacoes = await Promise.all([
    prisma.movimentacao.create({
      data: {
        produtoId: produtos[0].id,
        usuarioId: usuarios[0].id,
        empresaId: empresa.id,
        tipo: 'entrada',
        quantidade: 5,
        preco: 2500.00,
        observacoes: 'Compra de novos notebooks',
        data: new Date('2024-01-15')
      }
    }),
    prisma.movimentacao.create({
      data: {
        produtoId: produtos[1].id,
        usuarioId: usuarios[1].id,
        empresaId: empresa.id,
        tipo: 'saida',
        quantidade: 2,
        preco: 299.90,
        observacoes: 'Venda para cliente',
        data: new Date('2024-01-14')
      }
    }),
    prisma.movimentacao.create({
      data: {
        produtoId: produtos[2].id,
        usuarioId: usuarios[2].id,
        empresaId: empresa.id,
        tipo: 'entrada',
        quantidade: 10,
        preco: 450.00,
        observacoes: 'Estoque de teclados',
        data: new Date('2024-01-13')
      }
    })
  ])

  console.log('✅ Movimentações criadas')
  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })