"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Download, Save } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export default function TrainingAttendancePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Simulação de dados do treinamento
  const training = {
    id: params.id,
    title: "Treinamento NR-10",
    date: "05/04/2025",
    company: "Indústria XYZ",
    instructor: "João Silva",
    location: "Sala de Treinamento - Indústria XYZ",
    duration: 8,
    attendees: [
      { id: 1, name: "Carlos Oliveira", document: "123.456.789-00", company: "Indústria XYZ", present: true },
      { id: 2, name: "Ana Silva", document: "987.654.321-00", company: "Indústria XYZ", present: true },
      { id: 3, name: "Roberto Santos", document: "456.789.123-00", company: "Indústria XYZ", present: true },
      { id: 4, name: "Mariana Costa", document: "789.123.456-00", company: "Indústria XYZ", present: false },
      { id: 5, name: "Paulo Mendes", document: "321.654.987-00", company: "Indústria XYZ", present: true },
      { id: 6, name: "Juliana Alves", document: "654.321.987-00", company: "Indústria XYZ", present: true },
      { id: 7, name: "Fernando Gomes", document: "147.258.369-00", company: "Indústria XYZ", present: true },
      { id: 8, name: "Carla Martins", document: "369.258.147-00", company: "Indústria XYZ", present: false },
      { id: 9, name: "Ricardo Souza", document: "258.369.147-00", company: "Indústria XYZ", present: true },
      { id: 10, name: "Patrícia Lima", document: "741.852.963-00", company: "Indústria XYZ", present: true },
      { id: 11, name: "Lucas Ferreira", document: "963.852.741-00", company: "Indústria XYZ", present: true },
      { id: 12, name: "Amanda Ribeiro", document: "852.963.741-00", company: "Indústria XYZ", present: true },
    ],
  }

  const [attendees, setAttendees] = useState(training.attendees)
  const [observations, setObservations] = useState("")

  const handleAttendanceChange = (id: number, present: boolean) => {
    setAttendees(attendees.map((attendee) => (attendee.id === id ? { ...attendee, present } : attendee)))
  }

  const handleSave = () => {
    setLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      setLoading(false)
      router.push(`/trainings/${params.id}`)
    }, 1500)
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Lista de Presença</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
              <Save className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{training.title}</CardTitle>
            <CardDescription>Registro de presença dos participantes do treinamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Empresa</Label>
                <p>{training.company}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Data</Label>
                <p>{training.date}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Instrutor</Label>
                <p>{training.instructor}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Local</Label>
                <p>{training.location}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Carga Horária</Label>
                <p>{training.duration} horas</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Total de Participantes</Label>
                <p>{attendees.length} pessoas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Participantes</CardTitle>
            <CardDescription>Marque os participantes presentes no treinamento</CardDescription>
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
                      Presença
                    </th>
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
                      Assinatura
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {attendees.map((attendee) => (
                    <tr key={attendee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Checkbox
                          checked={attendee.present}
                          onCheckedChange={(checked) => handleAttendanceChange(attendee.id, checked === true)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{attendee.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.document}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {attendee.present ? (
                          <div className="italic text-gray-500">Assinado digitalmente</div>
                        ) : (
                          <Badge variant="outline" className="text-red-500 border-red-200">
                            Não assinado
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Aplicado</CardTitle>
            <CardDescription>Registre o conteúdo aplicado durante o treinamento</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Descreva o conteúdo aplicado durante o treinamento..."
              className="min-h-[150px]"
              defaultValue={`1. Introdução à NR-10
2. Riscos em instalações e serviços com eletricidade
3. Técnicas de análise de risco
4. Medidas de controle do risco elétrico
5. Equipamentos de proteção coletiva e individual
6. Rotinas de trabalho e procedimentos
7. Documentação de instalações elétricas
8. Riscos adicionais
9. Proteção e combate a incêndios
10. Acidentes de origem elétrica`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Observações</CardTitle>
            <CardDescription>Adicione observações sobre o treinamento e os participantes</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Adicione observações sobre o treinamento..."
              className="min-h-[100px]"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Salvando..." : "Salvar Lista de Presença"}
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
