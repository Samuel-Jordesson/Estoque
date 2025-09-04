import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Buscar dados da empresa
export async function GET() {
  try {
    const empresa = await prisma.empresa.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!empresa) {
      return NextResponse.json(
        { error: 'Dados da empresa não encontrados' },
        { status: 404 }
      )
    }

    return NextResponse.json(empresa)
  } catch (error) {
    console.error('Erro ao buscar dados da empresa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST - Criar/Atualizar dados da empresa
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      nomeEmpresa,
      cnpj,
      cpf,
      email,
      telefone,
      endereco,
      bairro,
      cidade,
      estado,
      cep,
      responsavel
    } = body

    // Verificar se já existe dados da empresa
    const empresaExistente = await prisma.empresa.findFirst()

    let empresa

    if (empresaExistente) {
      // Atualizar dados existentes
      empresa = await prisma.empresa.update({
        where: { id: empresaExistente.id },
        data: {
          nomeEmpresa,
          cnpj,
          cpf,
          email,
          telefone,
          endereco,
          bairro,
          cidade,
          estado,
          cep,
          responsavel,
          updatedAt: new Date()
        }
      })
    } else {
      // Criar novos dados
      empresa = await prisma.empresa.create({
        data: {
          nomeEmpresa,
          cnpj,
          cpf,
          email,
          telefone,
          endereco,
          bairro,
          cidade,
          estado,
          cep,
          responsavel
        }
      })
    }

    return NextResponse.json(empresa)
  } catch (error) {
    console.error('Erro ao salvar dados da empresa:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
