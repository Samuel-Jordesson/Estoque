import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { empresa, admin } = body;

    // Validar dados obrigatórios
    if (!empresa?.nome || !empresa?.email || !admin?.nome || !admin?.email || !admin?.senha) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se email da empresa já existe
    const empresaExistente = await prisma.empresa.findFirst({
      where: { email: empresa.email }
    });

    if (empresaExistente) {
      return NextResponse.json(
        { error: 'Email da empresa já está em uso' },
        { status: 400 }
      );
    }

    // Verificar se email do admin já existe
    const adminExistente = await prisma.usuario.findUnique({
      where: { email: admin.email }
    });

    if (adminExistente) {
      return NextResponse.json(
        { error: 'Email do administrador já está em uso' },
        { status: 400 }
      );
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(admin.senha, 12);

    // Criar empresa e admin em uma transação
    const resultado = await prisma.$transaction(async (tx) => {
      // Criar empresa
      const novaEmpresa = await tx.empresa.create({
        data: {
          nomeEmpresa: empresa.nome,
          email: empresa.email,
          telefone: empresa.telefone || '',
          endereco: empresa.endereco || '',
          bairro: empresa.bairro || '',
          cidade: empresa.cidade || '',
          estado: empresa.estado || '',
          cep: empresa.cep || '',
          responsavel: admin.nome,
          cnpj: `CNPJ-${Date.now()}`, // CNPJ temporário
        }
      });

      // Criar usuário administrador
      const novoAdmin = await tx.usuario.create({
        data: {
          nome: admin.nome,
          email: admin.email,
          telefone: admin.telefone || '',
          cargo: 'Administrador',
          senha: senhaHash,
          empresaId: novaEmpresa.id,
          status: 'ativo'
        }
      });

      // Criar categorias padrão para a empresa
      const categoriasPadrao = [
        { nome: 'Eletrônicos', descricao: 'Produtos eletrônicos' },
        { nome: 'Informática', descricao: 'Produtos de informática' },
        { nome: 'Acessórios', descricao: 'Acessórios diversos' },
        { nome: 'Periféricos', descricao: 'Periféricos de computador' },
        { nome: 'Outros', descricao: 'Outros produtos' }
      ];

      for (const categoria of categoriasPadrao) {
        await tx.categoria.create({
          data: {
            nome: categoria.nome,
            descricao: categoria.descricao,
            empresaId: novaEmpresa.id
          }
        });
      }

      return { empresa: novaEmpresa, admin: novoAdmin };
    });

    return NextResponse.json({
      message: 'Conta criada com sucesso',
      empresa: {
        id: resultado.empresa.id,
        nome: resultado.empresa.nomeEmpresa,
        email: resultado.empresa.email
      },
      admin: {
        id: resultado.admin.id,
        nome: resultado.admin.nome,
        email: resultado.admin.email
      }
    });

  } catch (error) {
    console.error('Erro ao criar conta:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
