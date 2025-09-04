import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Listar categorias
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      include: {
        _count: {
          select: {
            produtos: true
          }
        }
      },
      orderBy: {
        nome: 'asc'
      }
    })

    return NextResponse.json(categorias)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar categoria
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, descricao } = body

    // Verificar se a categoria já existe
    const categoriaExistente = await prisma.categoria.findUnique({
      where: { nome }
    })

    if (categoriaExistente) {
      return NextResponse.json(
        { error: 'Categoria já existe' },
        { status: 400 }
      )
    }

    const categoria = await prisma.categoria.create({
      data: {
        nome,
        descricao
      }
    })

    return NextResponse.json(categoria, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar categoria:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
