"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { LoadingScreen } from "@/components/loading-screen"

type User = {
  id: string
  email: string
  name: string
  avatar_url?: string
  company_id?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Verificar se há uma sessão ativa
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setLoading(false)
          return
        }

        // Buscar dados do usuário
        const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

        if (error || !userData) {
          console.error("Error fetching user data:", error)
          setLoading(false)
          return
        }

        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          avatar_url: userData.avatar_url,
          company_id: userData.company_id,
        })
      } catch (error) {
        console.error("Error in auth provider:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Configurar listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        // Buscar dados do usuário
        const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

        if (error || !userData) {
          console.error("Error fetching user data:", error)
          return
        }

        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          avatar_url: userData.avatar_url,
          company_id: userData.company_id,
        })
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        router.push("/login")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  // Modificar a função signIn para usar o servidor em vez do cliente
  // Isso garantirá que a autenticação funcione corretamente

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Fazer uma requisição para a API de login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { error: data.error || "Erro ao fazer login" }
      }

      // Atualizar o estado do usuário
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          avatar_url: data.user.avatar_url,
          company_id: data.user.company_id,
        })
      }

      return {}
    } catch (error) {
      console.error("Error signing in:", error)
      return { error: "Ocorreu um erro ao fazer login" }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/login")
  }

  if (loading) {
    return <LoadingScreen message="Carregando..." />
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
