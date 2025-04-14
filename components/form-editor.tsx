"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { LoadingScreen } from "@/components/loading-screen"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useOfflineStore } from "@/lib/offline-store"

interface FormEditorProps {
  id: string
  type: "report" | "inspection" | "training"
  initialData: any
  onSave: (data: any) => void
  children: React.ReactNode
}

export function FormEditor({ id, type, initialData, onSave, children }: FormEditorProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showUnsavedChangesAlert, setShowUnsavedChangesAlert] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const { saveOfflineData } = useOfflineStore()
  const [isOnline, setIsOnline] = useState(true)

  // Verificar status de conexão
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    updateOnlineStatus()
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  // Detectar mudanças no formulário
  useEffect(() => {
    if (JSON.stringify(initialData) !== JSON.stringify(formData)) {
      setHasChanges(true)
    } else {
      setHasChanges(false)
    }
  }, [formData, initialData])

  // Alerta ao tentar sair com mudanças não salvas
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [hasChanges])

  const handleUpdateFormData = (newData: any) => {
    setFormData((prev: any) => ({ ...prev, ...newData }))
  }

  const handleSave = async () => {
    setLoading(true)

    try {
      // Se estiver offline, salvar localmente
      if (!isOnline) {
        saveOfflineData({
          id,
          title: formData.title || `${type} ${id}`,
          date: formData.date || new Date().toISOString().split("T")[0],
          type,
          ...formData,
        })

        setTimeout(() => {
          setLoading(false)
          toast({
            title: "Salvo offline",
            description: `${type === "report" ? "Relatório" : type === "inspection" ? "Inspeção" : "Treinamento"} salvo localmente. Será sincronizado quando houver conexão.`,
          })
          setHasChanges(false)
          setIsEditing(false)
          onSave(formData)
        }, 1500)
      } else {
        // Simulação de salvamento online
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setLoading(false)
        toast({
          title: "Salvo com sucesso",
          description: `${type === "report" ? "Relatório" : type === "inspection" ? "Inspeção" : "Treinamento"} atualizado com sucesso.`,
        })
        setHasChanges(false)
        setIsEditing(false)
        onSave(formData)
      }
    } catch (error) {
      setLoading(false)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    if (hasChanges) {
      setShowUnsavedChangesAlert(true)
    } else {
      router.back()
    }
  }

  const handleDiscardChanges = () => {
    setShowUnsavedChangesAlert(false)
    router.back()
  }

  const handleContinueEditing = () => {
    setShowUnsavedChangesAlert(false)
  }

  if (loading) {
    return <LoadingScreen message={`Salvando ${type}...`} />
  }

  return (
    <div className="space-y-4">
      {showUnsavedChangesAlert && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Alterações não salvas</AlertTitle>
          <AlertDescription>
            Você tem alterações não salvas. Deseja descartar as alterações ou continuar editando?
          </AlertDescription>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={handleDiscardChanges}>
              Descartar
            </Button>
            <Button size="sm" onClick={handleContinueEditing}>
              Continuar Editando
            </Button>
          </div>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          {isEditing ? "Editando" : "Visualizando"}{" "}
          {type === "report" ? "Relatório" : type === "inspection" ? "Inspeção" : "Treinamento"}
        </h2>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges} className="bg-yellow-500 hover:bg-yellow-600">
                <Save className="mr-2 h-4 w-4" />
                Salvar
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-yellow-500 hover:bg-yellow-600">
              Editar
            </Button>
          )}
        </div>
      </div>

      {/* Passar o contexto de edição para os componentes filhos */}
      <div className={isEditing ? "" : "pointer-events-none opacity-90"}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              isEditing,
              formData,
              onUpdateFormData: handleUpdateFormData,
            })
          }
          return child
        })}
      </div>

      {isEditing && (
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} disabled={!hasChanges} className="bg-yellow-500 hover:bg-yellow-600">
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      )}
    </div>
  )
}
