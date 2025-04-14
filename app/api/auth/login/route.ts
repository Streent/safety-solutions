import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Tentar fazer login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Erro de autenticação:", error.message)
      return NextResponse.json({ error: "Email ou senha inválidos" }, { status: 401 })
    }

    // Buscar dados adicionais do usuário
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (userError) {
      console.error("Erro ao buscar dados do usuário:", userError.message)
      return NextResponse.json({ error: "Erro ao buscar dados do usuário" }, { status: 500 })
    }

    // Retornar os dados do usuário e da sessão
    return NextResponse.json({
      user: {
        ...userData,
        id: data.user.id,
        email: data.user.email,
      },
      session: data.session,
    })
  } catch (error) {
    console.error("Erro no servidor:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
