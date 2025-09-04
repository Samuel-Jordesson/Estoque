import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// GET - Listar usuários
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const busca = searchParams.get('busca') || ''

    const usuarios = await prisma.usuario.findMany({
      where: {
        AND: [
          busca ? {
            OR: [
              { nome: { contains: busca } },
              { email: { contains: busca } },
              { cargo: { contains: busca } }
            ]
          } : {},
        ]
      },
      include: {
        movimentacoes: {
          select: {
            id: true,
            tipo: true,
            quantidade: true,
            data: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(usuarios)
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar usuário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, email, telefone, cargo, senha } = body

    // Verificar se o email já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    })

    if (usuarioExistente) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10)

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        telefone,
        cargo,
        senha: senhaHash,
        status: 'ativo',
        produtosRetirados: 0,
        ultimaAtividade: new Date(),
        dataCadastro: new Date()
      }
    })

    // Remover senha da resposta
    const { senha: _, ...usuarioSemSenha } = usuario

    return NextResponse.json(usuarioSemSenha, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
