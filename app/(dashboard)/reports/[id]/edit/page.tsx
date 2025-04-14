"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormEditor } from "@/components/form-editor"
import { MediaUpload } from "@/components/media-upload"
import { LoadingScreen } from "@/components/loading-screen"

export default function EditReportPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("info")
  const [report, setReport] = useState<any>(null)

  // Simulação de carregamento de dados do relatório
  useEffect(() => {
    const fetchReport = async () => {
      // Simulação de busca de dados
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dados simulados do relatório
      setReport({
        id: params.id,
        title: "Inspeção de EPI - Construção Civil",
        date: "2025-04-12",
        status: "completed",
        company: "construtora",
        type: "inspection",
        responsible: "João Silva",
        location: "Obra Central - São Paulo, SP",
        gpsCoordinates: "Latitude: -23.5505, Longitude: -46.6333",
        description: "Relatório de inspeção de rotina para verificar o uso adequado de EPIs no canteiro de obras.",
        items: [
          {
            category: "Equipamentos de Proteção Individual (EPI)",
            items: [
              { id: "capacete", label: "Capacetes de segurança em bom estado e sendo utilizados", status: "ok" },
              { id: "luvas", label: "Luvas de proteção adequadas para cada atividade", status: "ok" },
              {
                id: "calcados",
                label: "Calçados de segurança em bom estado",
                status: "nok",
                observation: "Alguns funcionários com calçados danificados. Necessário substituição imediata.",
              },
              { id: "oculos", label: "Óculos de proteção disponíveis e sendo utilizados", status: "ok" },
              { id: "protetores", label: "Protetores auriculares disponíveis em áreas ruidosas", status: "ok" },
            ],
          },
          {
            category: "Sinalização e Demarcação",
            items: [
              { id: "placas", label: "Placas de sinalização visíveis e em bom estado", status: "ok" },
              {
                id: "fitas",
                label: "Fitas de demarcação em áreas de risco",
                status: "nok",
                observation: "Fitas de isolamento rompidas na área de escavação. Necessário recolocação.",
              },
              { id: "rotas", label: "Rotas de fuga sinalizadas adequadamente", status: "ok" },
              { id: "extintores_sinalizacao", label: "Extintores com sinalização adequada", status: "ok" },
            ],
          },
        ],
        photos: [
          { url: "/placeholder.svg?height=200&width=200", description: "Área de trabalho principal" },
          { url: "/placeholder.svg?height=200&width=200", description: "Funcionários utilizando EPIs" },
          { url: "/placeholder.svg?height=200&width=200", description: "Sinalização de segurança" },
        ],
        signatures: [
          { name: "João Silva", role: "Técnico de Segurança", date: "12/04/2025" },
          { name: "Roberto Almeida", role: "Responsável pelo Local", date: "12/04/2025" },
        ],
        observations:
          "Relatório concluído com sucesso. Foram identificadas duas não conformidades que devem ser corrigidas em até 7 dias.",
      })

      setLoading(false)
    }

    fetchReport()
  }, [params.id])

  const handleSave = (updatedReport: any) => {
    // Aqui você implementaria a lógica para salvar as alterações no servidor
    console.log("Relatório atualizado:", updatedReport)

    // Redirecionar para a página de detalhes após salvar
    setTimeout(() => {
      router.push(`/reports/${params.id}`)
    }, 500)
  }

  if (loading || !report) {
    return <LoadingScreen message="Carregando relatório..." />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FormEditor id={params.id} type="report" initialData={report} onSave={handleSave}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Editar Relatório</h2>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="items">Itens Verificados</TabsTrigger>
              <TabsTrigger value="photos">Fotos</TabsTrigger>
              <TabsTrigger value="signatures">Assinaturas</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Relatório</CardTitle>
                  <CardDescription>Edite as informações básicas do relatório</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título do Relatório</Label>
                      <Input
                        id="title"
                        defaultValue={report.title}
                        onChange={(e) => {
                          const newReport = { ...report, title: e.target.value }
                          setReport(newReport)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Data do Relatório</Label>
                      <Input
                        id="date"
                        type="date"
                        defaultValue={report.date}
                        onChange={(e) => {
                          const newReport = { ...report, date: e.target.value }
                          setReport(newReport)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Select
                        defaultValue={report.company}
                        onValueChange={(value) => {
                          const newReport = { ...report, company: value }
                          setReport(newReport)
                        }}
                      >
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
                      <Label htmlFor="type">Tipo de Relatório</Label>
                      <Select
                        defaultValue={report.type}
                        onValueChange={(value) => {
                          const newReport = { ...report, type: value }
                          setReport(newReport)
                        }}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inspection">Inspeção</SelectItem>
                          <SelectItem value="training">Treinamento</SelectItem>
                          <SelectItem value="survey">Levantamento</SelectItem>
                          <SelectItem value="audit">Auditoria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="responsible">Responsável</Label>
                      <Input
                        id="responsible"
                        defaultValue={report.responsible}
                        onChange={(e) => {
                          const newReport = { ...report, responsible: e.target.value }
                          setReport(newReport)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Local</Label>
                      <Input
                        id="location"
                        defaultValue={report.location}
                        onChange={(e) => {
                          const newReport = { ...report, location: e.target.value }
                          setReport(newReport)
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gpsCoordinates">Coordenadas GPS</Label>
                    <Input
                      id="gpsCoordinates"
                      defaultValue={report.gpsCoordinates}
                      onChange={(e) => {
                        const newReport = { ...report, gpsCoordinates: e.target.value }
                        setReport(newReport)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      defaultValue={report.description}
                      onChange={(e) => {
                        const newReport = { ...report, description: e.target.value }
                        setReport(newReport)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observations">Observações Finais</Label>
                    <Textarea
                      id="observations"
                      rows={4}
                      defaultValue={report.observations}
                      onChange={(e) => {
                        const newReport = { ...report, observations: e.target.value }
                        setReport(newReport)
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => router.back()}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setActiveTab("items")} className="bg-yellow-500 hover:bg-yellow-600">
                    Próximo
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="items" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Itens Verificados</CardTitle>
                  <CardDescription>Edite os itens verificados durante a inspeção</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {report.items.map((category: any, categoryIndex: number) => (
                      <div key={categoryIndex} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-lg">{category.category}</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newItems = [...report.items]
                              newItems[categoryIndex].items.push({
                                id: `new-item-${Date.now()}`,
                                label: "Novo item",
                                status: "ok",
                              })
                              const newReport = { ...report, items: newItems }
                              setReport(newReport)
                            }}
                          >
                            Adicionar Item
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {category.items.map((item: any, itemIndex: number) => (
                            <div key={item.id} className="border rounded-md p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <Input
                                    defaultValue={item.label}
                                    className="mb-2"
                                    onChange={(e) => {
                                      const newItems = [...report.items]
                                      newItems[categoryIndex].items[itemIndex].label = e.target.value
                                      const newReport = { ...report, items: newItems }
                                      setReport(newReport)
                                    }}
                                  />
                                  <div className="flex items-center gap-4">
                                    <Select
                                      defaultValue={item.status}
                                      onValueChange={(value) => {
                                        const newItems = [...report.items]
                                        newItems[categoryIndex].items[itemIndex].status = value
                                        const newReport = { ...report, items: newItems }
                                        setReport(newReport)
                                      }}
                                    >
                                      <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="ok">Conforme</SelectItem>
                                        <SelectItem value="nok">Não Conforme</SelectItem>
                                        <SelectItem value="na">Não Aplicável</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-red-500"
                                      onClick={() => {
                                        const newItems = [...report.items]
                                        newItems[categoryIndex].items.splice(itemIndex, 1)
                                        const newReport = { ...report, items: newItems }
                                        setReport(newReport)
                                      }}
                                    >
                                      Remover
                                    </Button>
                                  </div>
                                  {item.status === "nok" && (
                                    <div className="mt-2">
                                      <Label htmlFor={`observation-${item.id}`}>Observação</Label>
                                      <Textarea
                                        id={`observation-${item.id}`}
                                        defaultValue={item.observation || ""}
                                        rows={2}
                                        className="mt-1"
                                        onChange={(e) => {
                                          const newItems = [...report.items]
                                          newItems[categoryIndex].items[itemIndex].observation = e.target.value
                                          const newReport = { ...report, items: newItems }
                                          setReport(newReport)
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newItems = [...report.items]
                        newItems.push({
                          category: "Nova Categoria",
                          items: [
                            {
                              id: `new-item-${Date.now()}`,
                              label: "Novo item",
                              status: "ok",
                            },
                          ],
                        })
                        const newReport = { ...report, items: newItems }
                        setReport(newReport)
                      }}
                    >
                      Adicionar Nova Categoria
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("info")}>
                    Anterior
                  </Button>
                  <Button onClick={() => setActiveTab("photos")} className="bg-yellow-500 hover:bg-yellow-600">
                    Próximo
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Evidências Fotográficas</CardTitle>
                  <CardDescription>Edite as fotos registradas durante a inspeção</CardDescription>
                </CardHeader>
                <CardContent>
                  <MediaUpload
                    existingMedia={report.photos.map((photo: any) => ({
                      url: photo.url,
                      type: "image",
                      description: photo.description,
                    }))}
                    onMediaCaptured={(files) => {
                      // Simulação de upload de novas fotos
                      const newPhotos = [
                        ...report.photos,
                        ...files.map((file) => ({
                          url: URL.createObjectURL(file),
                          description: "Nova foto",
                        })),
                      ]
                      const newReport = { ...report, photos: newPhotos }
                      setReport(newReport)
                    }}
                    onRemoveExisting={(index) => {
                      const newPhotos = [...report.photos]
                      newPhotos.splice(index, 1)
                      const newReport = { ...report, photos: newPhotos }
                      setReport(newReport)
                    }}
                    onUpdateDescription={(index, description) => {
                      const newPhotos = [...report.photos]
                      newPhotos[index].description = description
                      const newReport = { ...report, photos: newPhotos }
                      setReport(newReport)
                    }}
                    allowVideo={true}
                    maxFiles={10}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("items")}>
                    Anterior
                  </Button>
                  <Button onClick={() => setActiveTab("signatures")} className="bg-yellow-500 hover:bg-yellow-600">
                    Próximo
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="signatures" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assinaturas</CardTitle>
                  <CardDescription>Edite as assinaturas coletadas para validação do relatório</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {report.signatures.map((signature: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">{signature.role}</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500"
                            onClick={() => {
                              const newSignatures = [...report.signatures]
                              newSignatures.splice(index, 1)
                              const newReport = { ...report, signatures: newSignatures }
                              setReport(newReport)
                            }}
                          >
                            Remover
                          </Button>
                        </div>
                        <div className="border rounded-md p-4 h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                          <p className="text-xl font-signature">{signature.name}</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Label htmlFor={`signature-name-${index}`}>Nome</Label>
                            <Input
                              id={`signature-name-${index}`}
                              defaultValue={signature.name}
                              onChange={(e) => {
                                const newSignatures = [...report.signatures]
                                newSignatures[index].name = e.target.value
                                const newReport = { ...report, signatures: newSignatures }
                                setReport(newReport)
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={`signature-role-${index}`}>Cargo</Label>
                            <Input
                              id={`signature-role-${index}`}
                              defaultValue={signature.role}
                              onChange={(e) => {
                                const newSignatures = [...report.signatures]
                                newSignatures[index].role = e.target.value
                                const newReport = { ...report, signatures: newSignatures }
                                setReport(newReport)
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={`signature-date-${index}`}>Data</Label>
                            <Input
                              id={`signature-date-${index}`}
                              defaultValue={signature.date}
                              onChange={(e) => {
                                const newSignatures = [...report.signatures]
                                newSignatures[index].date = e.target.value
                                const newReport = { ...report, signatures: newSignatures }
                                setReport(newReport)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newSignatures = [...report.signatures]
                        newSignatures.push({
                          name: "Novo Assinante",
                          role: "Cargo",
                          date: new Date().toLocaleDateString("pt-BR"),
                        })
                        const newReport = { ...report, signatures: newSignatures }
                        setReport(newReport)
                      }}
                    >
                      Adicionar Assinatura
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("photos")}>
                    Anterior
                  </Button>
                  <Button onClick={() => handleSave(report)} className="bg-yellow-500 hover:bg-yellow-600">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Relatório
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </FormEditor>
      </div>
    </div>
  )
}
