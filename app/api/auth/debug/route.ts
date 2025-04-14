import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Verificar as variáveis de ambiente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Retornar informações de diagnóstico
    return NextResponse.json({
      success: true,
      diagnostics: {
        email,
        passwordLength: password.length,
        supabaseUrlDefined: !!supabaseUrl,
        supabaseAnonKeyDefined: !!supabaseAnonKey,
        supabaseUrl: supabaseUrl ? supabaseUrl.substring(0, 10) + "..." : null,
      },
    })
  } catch (error: any) {
    console.error("Erro no endpoint de debug:", error)
    return NextResponse.json({ error: "Erro interno do servidor", details: error.message }, { status: 500 })
  }
}
