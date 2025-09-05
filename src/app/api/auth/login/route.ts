import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, senha } = body

    // Buscar usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if (!senhaValida) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verificar se o usuário está ativo
    if (usuario.status !== 'ativo') {
      return NextResponse.json(
        { error: 'Usuário inativo' },
        { status: 401 }
      )
    }

    // Atualizar última atividade
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { ultimaAtividade: new Date() }
    })

    // Criar token JWT
    const token = jwt.sign(
      { 
        userId: usuario.id, 
        email: usuario.email,
        nome: usuario.nome 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    )

    // Remover senha da resposta
    const { senha: _, ...usuarioSemSenha } = usuario

    return NextResponse.json({
      usuario: usuarioSemSenha,
      token
    })
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
