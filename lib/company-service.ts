"use server"

import { createServerSupabaseClient } from "./supabase"
import type { Company } from "./supabase"

export async function getCompanies() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("companies").select("*").order("name")

  if (error) {
    console.error("Error fetching companies:", error)
    return []
  }

  return data
}

export async function getCompanyById(id: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("companies").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching company:", error)
    return null
  }

  return data
}

export async function createCompany(company: Omit<Company, "id" | "created_at" | "updated_at">) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("companies")
    .insert({
      name: company.name,
      document: company.document,
      address: company.address,
      phone: company.phone,
      email: company.email,
      contact_person: company.contact_person,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating company:", error)
    return { error: error.message }
  }

  return { company: data }
}

export async function updateCompany(id: string, company: Partial<Company>) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("companies")
    .update({
      ...company,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating company:", error)
    return { error: error.message }
  }

  return { company: data }
}

export async function deleteCompany(id: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("companies").delete().eq("id", id)

  if (error) {
    console.error("Error deleting company:", error)
    return { error: error.message }
  }

  return { success: true }
}
