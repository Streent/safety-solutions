import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  try {
    // Rotas públicas que não exigem autenticação
    const publicRoutes = ["/login", "/register", "/forgot-password", "/reset-password"]

    // Verificar se a rota atual é pública
    const isPublicRoute = publicRoutes.some(
      (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route),
    )

    // Para fins de demonstração, permitir acesso a todas as rotas
    return NextResponse.next()
  } catch (error) {
    console.error("Erro no middleware:", error)
    // Em caso de erro, permitir o acesso à página de login
    if (request.nextUrl.pathname !== "/login") {
      const redirectUrl = new URL("/login", request.url)
      return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.next()
  }
}

// Configurar quais rotas devem passar pelo middleware
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/auth).*)"],
}
