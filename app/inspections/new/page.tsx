"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronRight, MapPin, Save } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { MediaUpload } from "@/components/media-upload"
import { useOfflineStore } from "@/lib/offline-store"
import { LoadingScreen } from "@/components/loading-screen"

export default function NewInspectionPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("info")
  const [photos, setPhotos] = useState<File[]>([])
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const { saveOfflineData } = useOfflineStore()

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    company: "construtora",
    type: "epi",
    responsible: "João Silva",
    description: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleMediaCaptured = (files: File[]) => {
    setPhotos((prev) => [...prev, ...files])
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`)
          toast({
            title: "Localização obtida",
            description: "Coordenadas GPS capturadas com sucesso.",
          })
        },
        (error) => {
          console.error("Erro ao obter localização:", error)
          toast({
            title: "Erro de localização",
            description: "Não foi possível obter sua localização. Verifique as permissões.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocalização não suportada",
        description: "Seu navegador não suporta geolocalização.",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    setLoading(true)

    // Verificar se está online ou offline
    const online = navigator.onLine
    setIsOnline(online)

    // Gerar ID único para a inspeção
    const inspectionId = `INS-${Date.now().toString(36)}`

    // Se estiver offline, salvar localmente
    if (!online) {
      saveOfflineData({
        id: inspectionId,
        title: formData.title || "Nova Inspeção",
        date: formData.date,
        type: "inspection",
        // outros campos relevantes
      })

      setTimeout(() => {
        setLoading(false)
        toast({
          title: "Inspeção salva offline",
          description: "A inspeção foi salva localmente e será sincronizada quando houver conexão.",
        })
        router.push("/inspections")
      }, 1500)
    } else {
      // Simulação de salvamento online
      setTimeout(() => {
        setLoading(false)
        toast({
          title: "Inspeção salva",
          description: "A inspeção foi salva com sucesso.",
        })
        router.push("/inspections")
      }, 1500)
    }
  }

  if (loading) {
    return <LoadingScreen message="Salvando inspeção..." />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Nova Inspeção</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="items">Itens de Inspeção</TabsTrigger>
            <TabsTrigger value="photos">Fotos</TabsTrigger>
            <TabsTrigger value="signatures">Assinaturas</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Inspeção</CardTitle>
                <CardDescription>Preencha as informações básicas da inspeção</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título da Inspeção</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Inspeção de EPI - Construção Civil"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data da Inspeção</Label>
                    <Input id="date" type="date" value={formData.date} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Select value={formData.company} onValueChange={(value) => handleSelectChange("company", value)}>
                      <SelectTrigger id="company">
                        <SelectValue placeholder="Selecione a empresa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="construtora">Construtora ABC</SelectItem>
                        <SelectItem value="eletrotec">Eletrotec Ltda</SelectItem>
                        <SelectItem value="industria">Indústria XYZ</SelectItem>
                        <SelectItem value="supermercado">Supermercados Rede</SelectItem>
                        <SelectItem value="escritorio">Escritório Central</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Inspeção</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="epi">Inspeção de EPI</SelectItem>
                        <SelectItem value="extintores">Inspeção de Extintores</SelectItem>
                        <SelectItem value="seguranca">Inspeção de Segurança</SelectItem>
                        <SelectItem value="equipamentos">Inspeção de Equipamentos</SelectItem>
                        <SelectItem value="eletrica">Inspeção Elétrica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <div className="flex gap-2">
                    <Input id="location" placeholder="Localização GPS" value={location} readOnly className="flex-1" />
                    <Button type="button" variant="outline" onClick={handleGetLocation}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Obter Localização
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsável pela Inspeção</Label>
                  <Input
                    id="responsible"
                    placeholder="Nome do responsável"
                    value={formData.responsible}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição/Observações</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhes adicionais sobre a inspeção"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button onClick={() => setActiveTab("items")}>
                  Próximo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Itens de Inspeção</CardTitle>
                <CardDescription>Verifique os itens de segurança e adicione observações</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="epi">
                    <AccordionTrigger>Equipamentos de Proteção Individual (EPI)</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <ChecklistItem id="capacete" label="Capacetes de segurança em bom estado e sendo utilizados" />
                        <ChecklistItem id="luvas" label="Luvas de proteção adequadas para cada atividade" />
                        <ChecklistItem id="calcados" label="Calçados de segurança em bom estado" />
                        <ChecklistItem id="oculos" label="Óculos de proteção disponíveis e sendo utilizados" />
                        <ChecklistItem id="protetores" label="Protetores auriculares disponíveis em áreas ruidosas" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sinalizacao">
                    <AccordionTrigger>Sinalização e Demarcação</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <ChecklistItem id="placas" label="Placas de sinalização visíveis e em bom estado" />
                        <ChecklistItem id="fitas" label="Fitas de demarcação em áreas de risco" />
                        <ChecklistItem id="rotas" label="Rotas de fuga sinalizadas adequadamente" />
                        <ChecklistItem id="extintores_sinalizacao" label="Extintores com sinalização adequada" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="extintores">
                    <AccordionTrigger>Extintores e Equipamentos de Combate a Incêndio</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <ChecklistItem id="extintores_validade" label="Extintores dentro da validade" />
                        <ChecklistItem id="extintores_pressao" label="Extintores com pressão adequada" />
                        <ChecklistItem id="hidrantes" label="Hidrantes desobstruídos e em funcionamento" />
                        <ChecklistItem id="mangueiras" label="Mangueiras em bom estado de conservação" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="instalacoes">
                    <AccordionTrigger>Instalações Elétricas</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <ChecklistItem id="quadros" label="Quadros elétricos sinalizados e fechados" />
                        <ChecklistItem id="fios" label="Fios e cabos em bom estado, sem emendas improvisadas" />
                        <ChecklistItem id="tomadas" label="Tomadas e interruptores em bom estado" />
                        <ChecklistItem id="aterramento" label="Sistema de aterramento adequado" />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("info")}>
                  Anterior
                </Button>
                <Button onClick={() => setActiveTab("photos")}>
                  Próximo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evidências Fotográficas</CardTitle>
                <CardDescription>Adicione fotos e vídeos para documentar a inspeção</CardDescription>
              </CardHeader>
              <CardContent>
                <MediaUpload
                  onMediaCaptured={handleMediaCaptured}
                  existingMedia={photos.map((file, index) => ({
                    url: URL.createObjectURL(file),
                    type: file.type.startsWith("video/") ? "video" : "image",
                    description: `Evidência ${index + 1}`,
                  }))}
                  onRemoveExisting={handleRemovePhoto}
                  allowVideo={true}
                  maxFiles={10}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("items")}>
                  Anterior
                </Button>
                <Button onClick={() => setActiveTab("signatures")}>
                  Próximo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signatures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assinaturas</CardTitle>
                <CardDescription>Colete as assinaturas necessárias para finalizar a inspeção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Responsável pela Inspeção</Label>
                    <div className="border rounded-md p-4 h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                      <Button>
                        <span>Assinar</span>
                      </Button>
                    </div>
                    <Input placeholder="Nome do responsável" defaultValue="João Silva" />
                  </div>

                  <div className="space-y-2">
                    <Label>Responsável pelo Local</Label>
                    <div className="border rounded-md p-4 h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                      <Button>
                        <span>Assinar</span>
                      </Button>
                    </div>
                    <Input placeholder="Nome do responsável pelo local" />
                  </div>

                  <div className="space-y-2">
                    <Label>Observações Finais</Label>
                    <Textarea placeholder="Adicione observações finais sobre a inspeção" rows={4} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("photos")}>
                  Anterior
                </Button>
                <Button onClick={handleSave}>
                  {isOnline ? "Finalizar Inspeção" : "Salvar Offline"}
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ChecklistItem({ id, label }: { id: string; label: string }) {
  const [status, setStatus] = useState<"ok" | "nok" | "na">("ok")
  const [observation, setObservation] = useState("")

  return (
    <div className="border rounded-md p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-2">
          <Checkbox id={id} />
          <Label htmlFor={id} className="font-medium">
            {label}
          </Label>
        </div>
        <Select value={status} onValueChange={(value) => setStatus(value as "ok" | "nok" | "na")}>
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ok">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                Conforme
              </div>
            </SelectItem>
            <SelectItem value="nok">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                Não Conforme
              </div>
            </SelectItem>
            <SelectItem value="na">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-gray-500 mr-2" />
                Não Aplicável
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {status === "nok" && (
        <div className="mt-2">
          <Textarea
            placeholder="Descreva a não conformidade"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            className="text-sm"
            rows={2}
          />
        </div>
      )}
    </div>
  )
}
