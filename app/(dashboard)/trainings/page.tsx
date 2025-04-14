"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronDown, Download, Filter, Plus, Search, Users } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function TrainingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPeriod, setFilterPeriod] = useState("all")

  const trainings = [
    {
      id: "TRN-001",
      title: "Treinamento NR-10",
      date: "05/04/2025",
      status: "completed",
      company: "Indústria XYZ",
      type: "NR-10",
      instructor: "João Silva",
      participants: 12,
      duration: 8,
    },
    {
      id: "TRN-002",
      title: "Treinamento Brigada de Incêndio",
      date: "25/03/2025",
      status: "completed",
      company: "Hotel Estrela",
      type: "Brigada",
      instructor: "Carlos Santos",
      participants: 8,
      duration: 16,
    },
    {
      id: "TRN-003",
      title: "Treinamento NR-35 - Trabalho em Altura",
      date: "15/03/2025",
      status: "completed",
      company: "Construtora ABC",
      type: "NR-35",
      instructor: "João Silva",
      participants: 6,
      duration: 8,
    },
    {
      id: "TRN-004",
      title: "Treinamento Primeiros Socorros",
      date: "10/03/2025",
      status: "completed",
      company: "Escritório Central",
      type: "Primeiros Socorros",
      instructor: "Ana Pereira",
      participants: 15,
      duration: 4,
    },
    {
      id: "TRN-005",
      title: "Treinamento CIPA",
      date: "05/03/2025",
      status: "completed",
      company: "Metalúrgica Silva",
      type: "CIPA",
      instructor: "Paulo Mendes",
      participants: 10,
      duration: 20,
    },
    {
      id: "TRN-006",
      title: "Treinamento NR-33 - Espaços Confinados",
      date: "20/04/2025",
      status: "pending",
      company: "Indústria Química",
      type: "NR-33",
      instructor: "João Silva",
      participants: 8,
      duration: 16,
    },
    {
      id: "TRN-007",
      title: "Treinamento Ergonomia no Trabalho",
      date: "15/02/2025",
      status: "completed",
      company: "Escritório Central",
      type: "Ergonomia",
      instructor: "Maria Oliveira",
      participants: 20,
      duration: 4,
    },
  ]

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || training.type === filterType
    const matchesStatus = filterStatus === "all" || training.status === filterStatus

    // Simplificado para demonstração
    const matchesPeriod = true

    return matchesSearch && matchesType && matchesStatus && matchesPeriod
  })

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Treinamentos</h2>
          <Button asChild>
            <Link href="/trainings/new">
              <Plus className="mr-2 h-4 w-4" /> Novo Treinamento
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar treinamentos..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filtrar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2">
                  <div className="mb-2">
                    <p className="text-sm font-medium mb-1">Tipo</p>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os tipos</SelectItem>
                        <SelectItem value="NR-10">NR-10</SelectItem>
                        <SelectItem value="NR-35">NR-35</SelectItem>
                        <SelectItem value="NR-33">NR-33</SelectItem>
                        <SelectItem value="Brigada">Brigada de Incêndio</SelectItem>
                        <SelectItem value="CIPA">CIPA</SelectItem>
                        <SelectItem value="Primeiros Socorros">Primeiros Socorros</SelectItem>
                        <SelectItem value="Ergonomia">Ergonomia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm font-medium mb-1">Status</p>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Período
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterPeriod("week")}>Última semana</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPeriod("month")}>Último mês</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPeriod("quarter")}>Último trimestre</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPeriod("year")}>Último ano</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterPeriod("all")}>Todos os períodos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Lista de Treinamentos</CardTitle>
            <CardDescription>{filteredTrainings.length} treinamentos encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTrainings.map((training) => (
                <div
                  key={training.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex flex-col mb-3 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <Badge className={training.status === "completed" ? "bg-green-500" : "bg-yellow-500"}>
                        {training.status === "completed" ? "Concluído" : "Pendente"}
                      </Badge>
                      <span className="font-medium">{training.title}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {training.id} • {training.company} • {training.date} • Instrutor: {training.instructor}
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{training.participants} participantes</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{training.duration}h</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/trainings/${training.id}`}>
                        <span>Visualizar</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/trainings/${training.id}/attendance`}>
                        <Users className="h-4 w-4 mr-1" />
                        <span>Lista de Presença</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Exportar PDF</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Clock } from "lucide-react"
