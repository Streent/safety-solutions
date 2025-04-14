"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Tipos para os diferentes tipos de dados
type InspectionData = {
  id: string
  title: string
  date: string
  type: "inspection"
  // outros campos relevantes
}

type TrainingData = {
  id: string
  title: string
  date: string
  type: "training"
  // outros campos relevantes
}

type ReportData = {
  id: string
  title: string
  date: string
  type: "report"
  // outros campos relevantes
}

type OfflineData = InspectionData | TrainingData | ReportData

interface OfflineState {
  // Dados armazenados offline
  inspections: Record<string, InspectionData>
  trainings: Record<string, TrainingData>
  reports: Record<string, ReportData>

  // Fila de sincronização
  syncQueue: {
    id: string
    type: "inspection" | "training" | "report"
    action: "create" | "update" | "delete"
    timestamp: number
  }[]

  // Métodos
  saveOfflineData: (data: OfflineData) => void
  deleteOfflineData: (id: string, type: "inspection" | "training" | "report") => void
  getPendingItems: () => number
  syncData: () => Promise<void>

  // Propriedade computada
  pendingItems: number
}

export const useOfflineStore = create<OfflineState>()(
  persist(
    (set, get) => ({
      inspections: {},
      trainings: {},
      reports: {},
      syncQueue: [],
      pendingItems: 0,

      saveOfflineData: (data) => {
        set((state) => {
          // Adicionar à coleção apropriada
          if (data.type === "inspection") {
            return {
              ...state,
              inspections: {
                ...state.inspections,
                [data.id]: data as InspectionData,
              },
              syncQueue: [
                ...state.syncQueue,
                {
                  id: data.id,
                  type: "inspection",
                  action: state.inspections[data.id] ? "update" : "create",
                  timestamp: Date.now(),
                },
              ],
              pendingItems: state.pendingItems + 1,
            }
          } else if (data.type === "training") {
            return {
              ...state,
              trainings: {
                ...state.trainings,
                [data.id]: data as TrainingData,
              },
              syncQueue: [
                ...state.syncQueue,
                {
                  id: data.id,
                  type: "training",
                  action: state.trainings[data.id] ? "update" : "create",
                  timestamp: Date.now(),
                },
              ],
              pendingItems: state.pendingItems + 1,
            }
          } else {
            return {
              ...state,
              reports: {
                ...state.reports,
                [data.id]: data as ReportData,
              },
              syncQueue: [
                ...state.syncQueue,
                {
                  id: data.id,
                  type: "report",
                  action: state.reports[data.id] ? "update" : "create",
                  timestamp: Date.now(),
                },
              ],
              pendingItems: state.pendingItems + 1,
            }
          }
        })
      },

      deleteOfflineData: (id, type) => {
        set((state) => {
          // Remover da coleção apropriada
          if (type === "inspection") {
            const { [id]: _, ...restInspections } = state.inspections
            return {
              ...state,
              inspections: restInspections,
              syncQueue: [
                ...state.syncQueue,
                {
                  id,
                  type: "inspection",
                  action: "delete",
                  timestamp: Date.now(),
                },
              ],
              pendingItems: state.pendingItems + 1,
            }
          } else if (type === "training") {
            const { [id]: _, ...restTrainings } = state.trainings
            return {
              ...state,
              trainings: restTrainings,
              syncQueue: [
                ...state.syncQueue,
                {
                  id,
                  type: "training",
                  action: "delete",
                  timestamp: Date.now(),
                },
              ],
              pendingItems: state.pendingItems + 1,
            }
          } else {
            const { [id]: _, ...restReports } = state.reports
            return {
              ...state,
              reports: restReports,
              syncQueue: [
                ...state.syncQueue,
                {
                  id,
                  type: "report",
                  action: "delete",
                  timestamp: Date.now(),
                },
              ],
              pendingItems: state.pendingItems + 1,
            }
          }
        })
      },

      getPendingItems: () => {
        return get().syncQueue.length
      },

      syncData: async () => {
        // Simulação de sincronização com o servidor
        const { syncQueue } = get()

        // Aqui seria implementada a lógica real de sincronização com o servidor
        // Por exemplo, enviar cada item da fila para o endpoint apropriado

        // Limpar a fila após sincronização bem-sucedida
        set({ syncQueue: [], pendingItems: 0 })

        return Promise.resolve()
      },
    }),
    {
      name: "safety-solutions-offline-storage",
    },
  ),
)
