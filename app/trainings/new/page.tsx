"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronRight, Plus, Save, Trash2, Upload } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function NewTrainingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("info")
  const [participants, setParticipants] = useState<{ name: string; document: string; company: string }[]>([
    { name: "", document: "", company: "" },
  ])
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      setLoading(false)
      router.push("/trainings")
    }, 1500)
  }

  const addParticipant = () => {
    setParticipants([...participants, { name: "", document: "", company: "" }])
  }

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      const newParticipants = [...participants]
      newParticipants.splice(index, 1)
      setParticipants(newParticipants)
    }
  }

  const updateParticipant = (index: number, field: string, value: string) => {
    const newParticipants = [...participants]
    newParticipants[index] = { ...newParticipants[index], [field]: value }
    setParticipants(newParticipants)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Novo Treinamento</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
              <Save className="ml-2 h-4 w-4" />
            </Button>
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
                <CardDescription>Preencha as informações básicas do treinamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Treinamento</Label>
                    <Input id="title" placeholder="Ex: Treinamento NR-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data do Treinamento</Label>
                    <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Select defaultValue="industria">
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
                    <Label htmlFor="type">Tipo de Treinamento</Label>
                    <Select defaultValue="nr10">
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nr10">NR-10 (Segurança em Instalações Elétricas)</SelectItem>
                        <SelectItem value="nr35">NR-35 (Trabalho em Altura)</SelectItem>
                        <SelectItem value="brigada">Brigada de Incêndio</SelectItem>
                        <SelectItem value="primeiros_socorros">Primeiros Socorros</SelectItem>
                        <SelectItem value="cipa">CIPA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor">Instrutor</Label>
                  <Input id="instructor" placeholder="Nome do instrutor" defaultValue="João Silva" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Carga Horária (horas)</Label>
                  <Input id="duration" type="number" min="1" defaultValue="8" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo Programático</Label>
                  <Textarea
                    id="content"
                    placeholder="Descreva o conteúdo abordado no treinamento"
                    rows={6}
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
                </div>

                <div className="space-y-2">
                  <Label>Material de Apoio</Label>
                  <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      <span>Anexar Arquivos</span>
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Anexe apresentações, apostilas ou outros materiais</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button onClick={() => setActiveTab("participants")}>
                  Próximo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="participants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Participantes</CardTitle>
                <CardDescription>Adicione os participantes do treinamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>CPF/Documento</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead className="w-[100px]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participants.map((participant, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              placeholder="Nome completo"
                              value={participant.name}
                              onChange={(e) => updateParticipant(index, "name", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="CPF ou documento"
                              value={participant.document}
                              onChange={(e) => updateParticipant(index, "document", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              placeholder="Empresa"
                              value={participant.company}
                              onChange={(e) => updateParticipant(index, "company", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeParticipant(index)}
                              disabled={participants.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Button variant="outline" onClick={addParticipant}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Participante
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("info")}>
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
                <CardDescription>
                  Colete as assinaturas necessárias para finalizar o registro do treinamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Instrutor</Label>
                    <div className="border rounded-md p-4 h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                      <Button>
                        <span>Assinar</span>
                      </Button>
                    </div>
                    <Input placeholder="Nome do instrutor" defaultValue="João Silva" />
                  </div>

                  <div className="space-y-2">
                    <Label>Responsável pela Empresa</Label>
                    <div className="border rounded-md p-4 h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                      <Button>
                        <span>Assinar</span>
                      </Button>
                    </div>
                    <Input placeholder="Nome do responsável pela empresa" />
                  </div>

                  <div className="space-y-2">
                    <Label>Observações Finais</Label>
                    <Textarea placeholder="Adicione observações finais sobre o treinamento" rows={4} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("participants")}>
                  Anterior
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "Finalizando..." : "Finalizar Treinamento"}
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
