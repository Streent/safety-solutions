"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Edit, User, Users } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ExportOptions } from "@/components/export-options"
import { DeleteDialog } from "@/components/delete-dialog"
import { LoadingScreen } from "@/components/loading-screen"

export default function TrainingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("info")
  const [loading, setLoading] = useState(false)

  // Simulação de dados do treinamento
  const training = {
    id: params.id,
    title: "Treinamento NR-10",
    date: "05/04/2025",
    status: "completed",
    company: "Indústria XYZ",
    type: "NR-10",
    instructor: "João Silva",
    participants: 12,
    duration: 8,
    location: "Sala de Treinamento - Indústria XYZ",
    description: "Treinamento obrigatório sobre segurança em instalações e serviços com eletricidade.",
    content: `1. Introdução à NR-10
2. Riscos em instalações e serviços com eletricidade
3. Técnicas de análise de risco
4. Medidas de controle do risco elétrico
5. Equipamentos de proteção coletiva e individual
6. Rotinas de trabalho e procedimentos
7. Documentação de instalações elétricas
8. Riscos adicionais
9. Proteção e combate a incêndios
10. Acidentes de origem elétrica`,
    attendees: [
      { name: "Carlos Oliveira", document: "123.456.789-00", company: "Indústria XYZ", present: true },
      { name: "Ana Silva", document: "987.654.321-00", company: "Indústria XYZ", present: true },
      { name: "Roberto Santos", document: "456.789.123-00", company: "Indústria XYZ", present: true },
      { name: "Mariana Costa", document: "789.123.456-00", company: "Indústria XYZ", present: false },
      { name: "Paulo Mendes", document: "321.654.987-00", company: "Indústria XYZ", present: true },
    ],
    signatures: [
      { name: "João Silva", role: "Instrutor", date: "05/04/2025" },
      { name: "Antônio Ferreira", role: "Responsável pela Empresa", date: "05/04/2025" },
    ],
    observations: "Treinamento realizado com sucesso. Todos os participantes demonstraram bom aproveitamento.",
  }

  const handleDelete = () => {
    setLoading(true)

    // Simulação de redirecionamento após exclusão
    setTimeout(() => {
      router.push("/trainings")
    }, 1000)
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{training.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/trainings/${params.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/trainings/${params.id}/attendance`}>
                <Users className="mr-2 h-4 w-4" />
                Lista de Presença
              </Link>
            </Button>
            <ExportOptions id={params.id} title={training.title} type="training" />
            <DeleteDialog id={params.id} title={training.title} type="training" onDelete={handleDelete} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          <Badge className={training.status === "completed" ? "bg-green-500" : "bg-yellow-500"}>
            {training.status === "completed" ? "Concluído" : "Pendente"}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{training.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="h-4 w-4" />
            <span>{training.instructor}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{training.participants} participantes</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{training.duration}h</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="participants">Participantes</TabsTrigger>
            <TabsTrigger value="signatures">Assinaturas</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Treinamento</CardTitle>
                <CardDescription>Detalhes gerais sobre o treinamento realizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">ID do Treinamento</h3>
                    <p>{training.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data do Treinamento</h3>
                    <p>{training.date}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Empresa</h3>
                    <p>{training.company}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Tipo de Treinamento</h3>
                    <p>{training.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Instrutor</h3>
                    <p>{training.instructor}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Local</h3>
                    <p>{training.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Carga Horária</h3>
                    <p>{training.duration} horas</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Participantes</h3>
                    <p>{training.participants} pessoas</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                  <p>{training.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Conteúdo Programático</h3>
                  <pre className="whitespace-pre-wrap text-sm mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    {training.content}
                  </pre>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Observações Finais</h3>
                  <p>{training.observations}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Participantes</CardTitle>
                <CardDescription>Participantes registrados no treinamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nome
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Documento
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Empresa
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Presença
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {training.attendees.map((attendee, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{attendee.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.document}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.company}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={attendee.present ? "bg-green-500" : "bg-red-500"}>
                              {attendee.present ? "Presente" : "Ausente"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signatures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assinaturas</CardTitle>
                <CardDescription>Assinaturas coletadas para validação do treinamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {training.signatures.map((signature, index) => (
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

import Link from "next/link"
