import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Listar produtos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const busca = searchParams.get('busca') || ''
    const categoria = searchParams.get('categoria') || ''

    const produtos = await prisma.produto.findMany({
      where: {
        AND: [
          busca ? {
            OR: [
              { nome: { contains: busca } },
              { descricao: { contains: busca } }
            ]
          } : {},
          categoria && categoria !== 'Todas' ? {
            categoria: {
              nome: categoria
            }
          } : {}
        ]
      },
      include: {
        categoria: true,
        movimentacoes: {
          select: {
            id: true,
            tipo: true,
            quantidade: true,
            data: true,
            usuario: {
              select: {
                nome: true
              }
            }
          },
          orderBy: {
            data: 'desc'
          },
          take: 5
        }
      },
      orderBy: {
        nome: 'asc'
      }
    })

    return NextResponse.json(produtos)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar produto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, descricao, categoriaId, preco, quantidade, quantidadeMinima } = body

    // Verificar se a categoria existe
    const categoria = await prisma.categoria.findUnique({
      where: { id: categoriaId }
    })

    if (!categoria) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 400 }
      )
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        categoriaId,
        preco,
        quantidade,
        quantidadeMinima,
        lastUpdated: new Date()
      },
      include: {
        categoria: true
      }
    })

    return NextResponse.json(produto, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
