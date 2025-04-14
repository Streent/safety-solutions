"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Edit, FileText, MapPin, User } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExportOptions } from "@/components/export-options"
import { DeleteDialog } from "@/components/delete-dialog"
import { LoadingScreen } from "@/components/loading-screen"

export default function ReportDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("info")
  const [loading, setLoading] = useState(false)

  // Simulação de dados do relatório
  const report = {
    id: params.id,
    title: "Inspeção de EPI - Construção Civil",
    date: "12/04/2025",
    status: "completed",
    company: "Construtora ABC",
    type: "Inspeção",
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
  }

  const handleDelete = () => {
    setLoading(true)

    // Simulação de redirecionamento após exclusão
    setTimeout(() => {
      router.push("/reports")
    }, 1000)
  }

  const handleEdit = () => {
    router.push(`/reports/${params.id}/edit`)
  }

  if (loading) {
    return <LoadingScreen message="Redirecionando..." />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{report.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleEdit}
              className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <ExportOptions id={params.id} title={report.title} type="report" />
            <DeleteDialog id={params.id} title={report.title} type="report" onDelete={handleDelete} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          <Badge
            className={
              report.status === "completed"
                ? "bg-green-500"
                : report.status === "pending"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }
          >
            {report.status === "completed" ? "Concluído" : report.status === "pending" ? "Pendente" : "Atrasado"}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{report.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="h-4 w-4" />
            <span>{report.responsible}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{report.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileText className="h-4 w-4" />
            <span>{report.type}</span>
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
                <CardDescription>Detalhes gerais sobre o relatório</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">ID do Relatório</h3>
                    <p>{report.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data do Relatório</h3>
                    <p>{report.date}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Empresa</h3>
                    <p>{report.company}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tipo de Relatório</h3>
                    <p>{report.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Responsável</h3>
                    <p>{report.responsible}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Local</h3>
                    <p>{report.location}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Coordenadas GPS</h3>
                  <p>{report.gpsCoordinates}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                  <p>{report.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Observações Finais</h3>
                  <p>{report.observations}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Itens Verificados</CardTitle>
                <CardDescription>Checklist de itens verificados durante a inspeção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {report.items.map((category, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-medium text-lg">{category.category}</h3>
                      <div className="space-y-3">
                        {category.items.map((item) => (
                          <div key={item.id} className="border rounded-md p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-2">
                                <div
                                  className={`mt-1 h-4 w-4 rounded-full ${
                                    item.status === "ok"
                                      ? "bg-green-500"
                                      : item.status === "nok"
                                        ? "bg-red-500"
                                        : "bg-gray-500"
                                  }`}
                                />
                                <div>
                                  <p className="font-medium">{item.label}</p>
                                  {item.status === "nok" && item.observation && (
                                    <p className="text-sm text-red-600 mt-1">{item.observation}</p>
                                  )}
                                </div>
                              </div>
                              <Badge
                                className={
                                  item.status === "ok"
                                    ? "bg-green-500"
                                    : item.status === "nok"
                                      ? "bg-red-500"
                                      : "bg-gray-500"
                                }
                              >
                                {item.status === "ok"
                                  ? "Conforme"
                                  : item.status === "nok"
                                    ? "Não Conforme"
                                    : "Não Aplicável"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      {index < report.items.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evidências Fotográficas</CardTitle>
                <CardDescription>Fotos registradas durante a inspeção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {report.photos.map((photo, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <img
                        src={photo.url || "/placeholder.svg"}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3 bg-white dark:bg-gray-800">
                        <p className="text-sm">{photo.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signatures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assinaturas</CardTitle>
                <CardDescription>Assinaturas coletadas para validação do relatório</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {report.signatures.map((signature, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">{signature.role}</h3>
                      <div className="border rounded-md p-4 h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                        <p className="text-xl font-signature">{signature.name}</p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{signature.name}</span>
                        <span>{signature.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
