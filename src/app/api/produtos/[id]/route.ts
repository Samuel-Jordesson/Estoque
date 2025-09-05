import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Buscar produto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID do produto inválido' },
        { status: 400 }
      );
    }

    const produto = await prisma.produto.findUnique({
      where: { id: productId },
      include: {
        categoria: true,
      },
    });

    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar produto
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID do produto inválido' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { nome, categoriaId, preco, quantidadeMinima } = body;

    // Validar dados obrigatórios
    if (!nome || !categoriaId || preco === undefined || !quantidadeMinima) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    // Verificar se a categoria existe
    const categoria = await prisma.categoria.findUnique({
      where: { id: categoriaId },
    });

    if (!categoria) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se o produto existe
    const produtoExistente = await prisma.produto.findUnique({
      where: { id: productId },
    });

    if (!produtoExistente) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Atualizar produto
    const produtoAtualizado = await prisma.produto.update({
      where: { id: productId },
      data: {
        nome,
        categoriaId,
        preco: parseFloat(preco),
        quantidadeMinima: parseInt(quantidadeMinima),
        lastUpdated: new Date(),
      },
      include: {
        categoria: true,
      },
    });

    return NextResponse.json(produtoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir produto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = parseInt(params.id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID do produto inválido' },
        { status: 400 }
      );
    }

    // Verificar se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id: productId },
    });

    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se há movimentações associadas ao produto
    const movimentacoes = await prisma.movimentacao.findMany({
      where: { produtoId: productId },
    });

    if (movimentacoes.length > 0) {
      return NextResponse.json(
        { error: 'Não é possível excluir produto com movimentações associadas' },
        { status: 400 }
      );
    }

    // Excluir produto
    await prisma.produto.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
