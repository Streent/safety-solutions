import { createClient } from "@supabase/supabase-js"

// Tipos para as tabelas do Supabase
export type Tables = {
  companies: Company
  users: User
  inspections: Inspection
  inspection_items: InspectionItem
  trainings: Training
  training_participants: TrainingParticipant
  reports: Report
  media: Media
  signatures: Signature
}

// Tipos para as entidades
export type Company = {
  id: string
  name: string
  document?: string
  address?: string
  phone?: string
  email?: string
  contact_person?: string
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  position?: string
  company_id?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Inspection = {
  id: string
  title: string
  date: string
  company_id: string
  type: string
  responsible_id: string
  location?: string
  gps_coordinates?: string
  description?: string
  status: "pending" | "completed" | "overdue"
  observations?: string
  created_by: string
  created_at: string
  updated_at: string
}

export type InspectionItem = {
  id: string
  inspection_id: string
  category: string
  label: string
  status: "ok" | "nok" | "na"
  observation?: string
  created_at: string
  updated_at: string
}

export type Training = {
  id: string
  title: string
  date: string
  company_id: string
  type: string
  instructor_id: string
  location?: string
  duration?: number
  content?: string
  status: "pending" | "completed" | "overdue"
  observations?: string
  created_by: string
  created_at: string
  updated_at: string
}

export type TrainingParticipant = {
  id: string
  training_id: string
  name: string
  document?: string
  company?: string
  present: boolean
  signature_url?: string
  created_at: string
  updated_at: string
}

export type Report = {
  id: string
  title: string
  date: string
  company_id: string
  type: string
  responsible_id: string
  location?: string
  gps_coordinates?: string
  description?: string
  status: "pending" | "completed" | "overdue"
  observations?: string
  created_by: string
  created_at: string
  updated_at: string
}

export type Media = {
  id: string
  entity_type: "inspection" | "training" | "report"
  entity_id: string
  url: string
  type: "image" | "video"
  description?: string
  created_by: string
  created_at: string
  updated_at: string
}

export type Signature = {
  id: string
  entity_type: "inspection" | "training" | "report"
  entity_id: string
  name: string
  role?: string
  signature_url?: string
  date: string
  created_at: string
  updated_at: string
}

// Singleton pattern para o cliente Supabase
let supabaseClient: ReturnType<typeof createClient> | null = null

// Função para obter o cliente Supabase
export const getSupabaseClient = () => {
  if (supabaseClient) return supabaseClient

  // Usar as variáveis de ambiente diretamente do objeto process.env
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Variáveis de ambiente do Supabase não definidas:", { supabaseUrl, supabaseAnonKey })
    throw new Error("Variáveis de ambiente do Supabase não definidas")
  }

  try {
    console.log("Criando cliente Supabase com:", { supabaseUrl })
    supabaseClient = createClient<Tables>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
    return supabaseClient
  } catch (error) {
    console.error("Erro ao criar cliente Supabase:", error)
    throw error
  }
}

// Cliente Supabase para uso no lado do servidor
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Variáveis de ambiente do Supabase não definidas")
    throw new Error("Variáveis de ambiente do Supabase não definidas")
  }

  try {
    return createClient<Tables>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  } catch (error) {
    console.error("Erro ao criar cliente Supabase do servidor:", error)
    throw error
  }
}
