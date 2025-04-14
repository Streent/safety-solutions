"use server"
import { createServerSupabaseClient } from "./supabase"

export async function signIn(email: string, password: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { user: data.user, session: data.session }
}

export async function signOut() {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function getCurrentUser() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return null
  }

  // Buscar informações adicionais do usuário
  const { data: userData } = await supabase.from("users").select("*").eq("id", data.user.id).single()

  return {
    ...data.user,
    ...userData,
  }
}

export async function createUser(userData: {
  email: string
  password: string
  name: string
  phone?: string
  position?: string
  company_id?: string
}) {
  const supabase = createServerSupabaseClient()

  // Criar usuário na autenticação
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    email_confirm: true,
  })

  if (authError) {
    return { error: authError.message }
  }

  // Criar perfil do usuário
  const { data: profileData, error: profileError } = await supabase
    .from("users")
    .insert({
      id: authData.user.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      position: userData.position,
      company_id: userData.company_id,
    })
    .select()
    .single()

  if (profileError) {
    return { error: profileError.message }
  }

  return { user: profileData }
}
