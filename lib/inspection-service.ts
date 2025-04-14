"use server"

import { createServerSupabaseClient } from "./supabase"
import type { Inspection, InspectionItem } from "./supabase"

export async function getInspections(filters?: {
  status?: string
  company_id?: string
  type?: string
  from_date?: string
  to_date?: string
  search?: string
}) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("inspections")
    .select(`
      *,
      companies(name),
      users!responsible_id(name)
    `)
    .order("date", { ascending: false })

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  if (filters?.company_id) {
    query = query.eq("company_id", filters.company_id)
  }

  if (filters?.type) {
    query = query.eq("type", filters.type)
  }

  if (filters?.from_date) {
    query = query.gte("date", filters.from_date)
  }

  if (filters?.to_date) {
    query = query.lte("date", filters.to_date)
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching inspections:", error)
    return []
  }

  return data
}

export async function getInspectionById(id: string) {
  const supabase = createServerSupabaseClient()

  // Buscar a inspeção
  const { data: inspection, error: inspectionError } = await supabase
    .from("inspections")
    .select(`
      *,
      companies(name),
      users!responsible_id(name)
    `)
    .eq("id", id)
    .single()

  if (inspectionError) {
    console.error("Error fetching inspection:", inspectionError)
    return null
  }

  // Buscar os itens da inspeção
  const { data: items, error: itemsError } = await supabase
    .from("inspection_items")
    .select("*")
    .eq("inspection_id", id)
    .order("category")

  if (itemsError) {
    console.error("Error fetching inspection items:", itemsError)
    return null
  }

  // Buscar as mídias da inspeção
  const { data: media, error: mediaError } = await supabase
    .from("media")
    .select("*")
    .eq("entity_type", "inspection")
    .eq("entity_id", id)

  if (mediaError) {
    console.error("Error fetching inspection media:", mediaError)
    return null
  }

  // Buscar as assinaturas da inspeção
  const { data: signatures, error: signaturesError } = await supabase
    .from("signatures")
    .select("*")
    .eq("entity_type", "inspection")
    .eq("entity_id", id)

  if (signaturesError) {
    console.error("Error fetching inspection signatures:", signaturesError)
    return null
  }

  // Organizar os itens por categoria
  const itemsByCategory: Record<string, InspectionItem[]> = {}
  items.forEach((item) => {
    if (!itemsByCategory[item.category]) {
      itemsByCategory[item.category] = []
    }
    itemsByCategory[item.category].push(item)
  })

  return {
    ...inspection,
    items: Object.entries(itemsByCategory).map(([category, items]) => ({
      category,
      items,
    })),
    media,
    signatures,
  }
}

export async function createInspection(
  inspection: Omit<Inspection, "id" | "created_at" | "updated_at">,
  items: Omit<InspectionItem, "id" | "inspection_id" | "created_at" | "updated_at">[],
  media: { url: string; type: "image" | "video"; description?: string }[],
  signatures: { name: string; role?: string; signature_url?: string; date: string }[],
) {
  const supabase = createServerSupabaseClient()

  // Iniciar uma transação
  const { data: inspectionData, error: inspectionError } = await supabase
    .from("inspections")
    .insert({
      title: inspection.title,
      date: inspection.date,
      company_id: inspection.company_id,
      type: inspection.type,
      responsible_id: inspection.responsible_id,
      location: inspection.location,
      gps_coordinates: inspection.gps_coordinates,
      description: inspection.description,
      status: inspection.status,
      observations: inspection.observations,
      created_by: inspection.created_by,
    })
    .select()
    .single()

  if (inspectionError) {
    console.error("Error creating inspection:", inspectionError)
    return { error: inspectionError.message }
  }

  // Inserir os itens da inspeção
  if (items.length > 0) {
    const itemsToInsert = items.map((item) => ({
      inspection_id: inspectionData.id,
      category: item.category,
      label: item.label,
      status: item.status,
      observation: item.observation,
    }))

    const { error: itemsError } = await supabase.from("inspection_items").insert(itemsToInsert)

    if (itemsError) {
      console.error("Error creating inspection items:", itemsError)
      return { error: itemsError.message }
    }
  }

  // Inserir as mídias
  if (media.length > 0) {
    const mediaToInsert = media.map((m) => ({
      entity_type: "inspection" as const,
      entity_id: inspectionData.id,
      url: m.url,
      type: m.type,
      description: m.description,
      created_by: inspection.created_by,
    }))

    const { error: mediaError } = await supabase.from("media").insert(mediaToInsert)

    if (mediaError) {
      console.error("Error creating inspection media:", mediaError)
      return { error: mediaError.message }
    }
  }

  // Inserir as assinaturas
  if (signatures.length > 0) {
    const signaturesToInsert = signatures.map((s) => ({
      entity_type: "inspection" as const,
      entity_id: inspectionData.id,
      name: s.name,
      role: s.role,
      signature_url: s.signature_url,
      date: s.date,
    }))

    const { error: signaturesError } = await supabase.from("signatures").insert(signaturesToInsert)

    if (signaturesError) {
      console.error("Error creating inspection signatures:", signaturesError)
      return { error: signaturesError.message }
    }
  }

  return { inspection: inspectionData }
}

export async function updateInspection(
  id: string,
  inspection: Partial<Inspection>,
  items?: { id?: string; category: string; label: string; status: string; observation?: string }[],
  media?: { id?: string; url: string; type: "image" | "video"; description?: string }[],
  signatures?: { id?: string; name: string; role?: string; signature_url?: string; date: string }[],
) {
  const supabase = createServerSupabaseClient()

  // Atualizar a inspeção
  const { data: inspectionData, error: inspectionError } = await supabase
    .from("inspections")
    .update({
      ...inspection,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (inspectionError) {
    console.error("Error updating inspection:", inspectionError)
    return { error: inspectionError.message }
  }

  // Atualizar os itens da inspeção
  if (items) {
    // Primeiro, remover todos os itens existentes
    const { error: deleteItemsError } = await supabase.from("inspection_items").delete().eq("inspection_id", id)

    if (deleteItemsError) {
      console.error("Error deleting inspection items:", deleteItemsError)
      return { error: deleteItemsError.message }
    }

    // Depois, inserir os novos itens
    if (items.length > 0) {
      const itemsToInsert = items.map((item) => ({
        inspection_id: id,
        category: item.category,
        label: item.label,
        status: item.status,
        observation: item.observation,
      }))

      const { error: insertItemsError } = await supabase.from("inspection_items").insert(itemsToInsert)

      if (insertItemsError) {
        console.error("Error inserting inspection items:", insertItemsError)
        return { error: insertItemsError.message }
      }
    }
  }

  // Atualizar as mídias
  if (media) {
    // Primeiro, remover todas as mídias existentes
    const { error: deleteMediaError } = await supabase
      .from("media")
      .delete()
      .eq("entity_type", "inspection")
      .eq("entity_id", id)

    if (deleteMediaError) {
      console.error("Error deleting inspection media:", deleteMediaError)
      return { error: deleteMediaError.message }
    }

    // Depois, inserir as novas mídias
    if (media.length > 0) {
      const mediaToInsert = media.map((m) => ({
        entity_type: "inspection" as const,
        entity_id: id,
        url: m.url,
        type: m.type,
        description: m.description,
        created_by: inspection.created_by || inspectionData.created_by,
      }))

      const { error: insertMediaError } = await supabase.from("media").insert(mediaToInsert)

      if (insertMediaError) {
        console.error("Error inserting inspection media:", insertMediaError)
        return { error: insertMediaError.message }
      }
    }
  }

  // Atualizar as assinaturas
  if (signatures) {
    // Primeiro, remover todas as assinaturas existentes
    const { error: deleteSignaturesError } = await supabase
      .from("signatures")
      .delete()
      .eq("entity_type", "inspection")
      .eq("entity_id", id)

    if (deleteSignaturesError) {
      console.error("Error deleting inspection signatures:", deleteSignaturesError)
      return { error: deleteSignaturesError.message }
    }

    // Depois, inserir as novas assinaturas
    if (signatures.length > 0) {
      const signaturesToInsert = signatures.map((s) => ({
        entity_type: "inspection" as const,
        entity_id: id,
        name: s.name,
        role: s.role,
        signature_url: s.signature_url,
        date: s.date,
      }))

      const { error: insertSignaturesError } = await supabase.from("signatures").insert(signaturesToInsert)

      if (insertSignaturesError) {
        console.error("Error inserting inspection signatures:", insertSignaturesError)
        return { error: insertSignaturesError.message }
      }
    }
  }

  return { inspection: inspectionData }
}

export async function deleteInspection(id: string) {
  const supabase = createServerSupabaseClient()

  // Excluir a inspeção (as tabelas relacionadas serão excluídas automaticamente devido às restrições ON DELETE CASCADE)
  const { error } = await supabase.from("inspections").delete().eq("id", id)

  if (error) {
    console.error("Error deleting inspection:", error)
    return { error: error.message }
  }

  return { success: true }
}
