import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Listar movimentações
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const busca = searchParams.get('busca') || ''
    const categoria = searchParams.get('categoria') || ''
    const usuario = searchParams.get('usuario') || ''
    const tipo = searchParams.get('tipo') || ''

    const movimentacoes = await prisma.movimentacao.findMany({
      where: {
        AND: [
          busca ? {
            OR: [
              { produto: { nome: { contains: busca } } },
              { usuario: { nome: { contains: busca } } }
            ]
          } : {},
          categoria && categoria !== 'Todas' ? {
            produto: {
              categoria: {
                nome: categoria
              }
            }
          } : {},
          usuario && usuario !== 'Todos' ? {
            usuario: {
              nome: usuario
            }
          } : {},
          tipo && tipo !== 'Todos' ? {
            tipo: tipo.toLowerCase()
          } : {}
        ]
      },
      include: {
        produto: {
          include: {
            categoria: true
          }
        },
        usuario: true
      },
      orderBy: {
        data: 'desc'
      }
    })

    return NextResponse.json(movimentacoes)
  } catch (error) {
    console.error('Erro ao buscar movimentações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar movimentação
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { produtoId, usuarioId, tipo, quantidade, preco, observacoes } = body

    // Verificar se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id: produtoId }
    })

    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 400 }
      )
    }

    // Verificar se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId }
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 400 }
      )
    }

    // Atualizar quantidade do produto
    const novaQuantidade = tipo === 'entrada' 
      ? produto.quantidade + quantidade 
      : produto.quantidade - quantidade

    if (novaQuantidade < 0) {
      return NextResponse.json(
        { error: 'Quantidade insuficiente em estoque' },
        { status: 400 }
      )
    }

    // Criar movimentação e atualizar produto em uma transação
    const resultado = await prisma.$transaction(async (tx) => {
      // Criar movimentação
      const movimentacao = await tx.movimentacao.create({
        data: {
          produtoId,
          usuarioId,
          tipo,
          quantidade,
          preco,
          observacoes,
          data: new Date()
        },
        include: {
          produto: {
            include: {
              categoria: true
            }
          },
          usuario: true
        }
      })

      // Atualizar quantidade do produto
      await tx.produto.update({
        where: { id: produtoId },
        data: {
          quantidade: novaQuantidade,
          lastUpdated: new Date()
        }
      })

      // Atualizar contador de produtos retirados do usuário (apenas para saídas)
      if (tipo === 'saida') {
        await tx.usuario.update({
          where: { id: usuarioId },
          data: {
            produtosRetirados: {
              increment: quantidade
            },
            ultimaAtividade: new Date()
          }
        })
      }

      return movimentacao
    })

    return NextResponse.json(resultado, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar movimentação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
