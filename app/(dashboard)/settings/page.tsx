"use client"

import { useState } from "react"
import { Globe, Moon, Save, Sun, Wifi, WifiOff, CloudIcon as CloudSync, Database } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"
import { useOfflineStore } from "@/lib/offline-store"
import { LoadingScreen } from "@/components/loading-screen"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [offlineMode, setOfflineMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState("pt-BR")
  const [loading, setLoading] = useState(false)
  const [syncLoading, setSyncLoading] = useState(false)
  const { pendingItems, syncData } = useOfflineStore()

  const handleSave = () => {
    setLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram salvas com sucesso.",
      })
    }, 1500)
  }

  const handleSync = async () => {
    setSyncLoading(true)

    try {
      // Simulação de sincronização
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
      setSyncLoading(false)
    }
  }

  const handleClearOfflineData = () => {
    // Simulação de limpeza de dados offline
    setTimeout(() => {
      toast({
        title: "Dados limpos",
        description: "Todos os dados offline foram removidos.",
      })
    }, 1000)
  }

  if (loading || syncLoading) {
    return <LoadingScreen message={syncLoading ? "Sincronizando dados..." : "Salvando configurações..."} />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="sync">Sincronização</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>Gerencie as configurações gerais do aplicativo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue placeholder="Selecione o idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Português (Brasil)
                        </div>
                      </SelectItem>
                      <SelectItem value="en-US">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          English (US)
                        </div>
                      </SelectItem>
                      <SelectItem value="es">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Español
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>Gerencie como e quando você recebe notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notificações</Label>
                    <p className="text-sm text-muted-foreground">
                      Ative para receber notificações sobre relatórios e inspeções
                    </p>
                  </div>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações por email sobre relatórios atrasados
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="deadline-notifications">Alertas de Prazo</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba alertas quando um relatório estiver próximo do prazo
                    </p>
                  </div>
                  <Switch id="deadline-notifications" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sync" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Sincronização</CardTitle>
                <CardDescription>Gerencie como os dados são sincronizados com o servidor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="offline-mode">Modo Offline</Label>
                    <p className="text-sm text-muted-foreground">
                      Trabalhe sem conexão com a internet e sincronize depois
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-gray-500" />
                    <Switch id="offline-mode" checked={offlineMode} onCheckedChange={setOfflineMode} />
                    <WifiOff className="h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-sync">Sincronização Automática</Label>
                    <p className="text-sm text-muted-foreground">Sincronize automaticamente quando houver conexão</p>
                  </div>
                  <Switch id="auto-sync" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Armazenamento Offline</Label>
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Dados armazenados localmente</p>
                        <p className="text-sm text-muted-foreground">{pendingItems} itens pendentes de sincronização</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleClearOfflineData}>
                      Limpar dados
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={handleSync} disabled={pendingItems === 0}>
                  <CloudSync className="mr-2 h-4 w-4" />
                  Sincronizar Agora ({pendingItems} pendentes)
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Última sincronização: {new Date().toLocaleString()}
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>Personalize a aparência do aplicativo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-24 gap-2"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-8 w-8" />
                      <span>Claro</span>
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-24 gap-2"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-8 w-8" />
                      <span>Escuro</span>
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      className="flex flex-col items-center justify-center h-24 gap-2"
                      onClick={() => setTheme("system")}
                    >
                      <div className="flex">
                        <Sun className="h-4 w-4" />
                        <Moon className="h-4 w-4" />
                      </div>
                      <span>Sistema</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
