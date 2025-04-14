"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, CloudIcon as CloudSync } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useOfflineStore } from "@/lib/offline-store"
import { LoadingScreen } from "@/components/loading-screen"

export function OfflineManager() {
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const { pendingItems, syncData } = useOfflineStore()

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Add event listeners for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      toast({
        title: "Conexão restaurada",
        description: "Você está online novamente. Clique em sincronizar para enviar os dados pendentes.",
      })
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast({
        title: "Sem conexão",
        description:
          "Você está offline. Os dados serão salvos localmente e sincronizados quando a conexão for restaurada.",
        variant: "destructive",
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleSync = async () => {
    if (!isOnline) {
      toast({
        title: "Sem conexão",
        description: "Você está offline. Não é possível sincronizar os dados.",
        variant: "destructive",
      })
      return
    }

    if (pendingItems === 0) {
      toast({
        title: "Nada para sincronizar",
        description: "Não há dados pendentes para sincronização.",
      })
      return
    }

    setIsSyncing(true)

    try {
      // Simulate sync delay
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await syncData()

      toast({
        title: "Sincronização concluída",
        description: `${pendingItems} itens foram sincronizados com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro na sincronização",
        description: "Ocorreu um erro ao sincronizar os dados. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  if (isSyncing) {
    return <LoadingScreen message="Sincronizando dados..." />
  }

  return (
    <div className="flex items-center gap-2">
      {pendingItems > 0 && (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          {pendingItems} pendentes
        </Badge>
      )}

      <Button
        variant="outline"
        size="sm"
        className={isOnline ? "text-green-600" : "text-red-600"}
        onClick={handleSync}
        disabled={!isOnline || pendingItems === 0}
      >
        {isOnline ? (
          <>
            <Wifi className="mr-2 h-4 w-4" />
            <span>Online</span>
          </>
        ) : (
          <>
            <WifiOff className="mr-2 h-4 w-4" />
            <span>Offline</span>
          </>
        )}
      </Button>

      {isOnline && pendingItems > 0 && (
        <Button variant="outline" size="sm" onClick={handleSync}>
          <CloudSync className="mr-2 h-4 w-4" />
          <span>Sincronizar</span>
        </Button>
      )}
    </div>
  )
}
