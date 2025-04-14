"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Download, Search, FileText, ArrowUpDown, Check } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingScreen } from "@/components/loading-screen"
import { PageTransition } from "@/components/page-transition"
import { TabTransition } from "@/components/tab-transition"

// Tipos para os relatórios
interface Report {
  id: string
  title: string
  date: string
  status: "completed" | "pending" | "overdue"
  company: string
  type: string
  responsible: string
}

export default function GeneratedReportsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [period, setPeriod] = useState("all")
  const [reportType, setReportType] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [reports, setReports] = useState<Report[]>([])
  const [filteredReports, setFilteredReports] = useState<Report[]>([])
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  // Simulação de carregamento de dados
  useEffect(() => {
    const fetchReports = async () => {
      // Simulação de busca de dados
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dados simulados
      const mockReports: Report[] = [
        {
          id: "REL-001",
          title: "Inspeção de EPI - Construção Civil",
          date: "2025-04-12",
          status: "completed",
          company: "Construtora ABC",
          type: "Inspeção",
          responsible: "João Silva",
        },
        {
          id: "REL-002",
          title: "Análise de Risco - Setor Elétrico",
          date: "2025-04-10",
          status: "pending",
          company: "Eletrotec Ltda",
          type: "Análise",
          responsible: "Maria Santos",
        },
        {
          id: "REL-003",
          title: "Treinamento NR-10",
          date: "2025-04-05",
          status: "completed",
          company: "Indústria XYZ",
          type: "Treinamento",
          responsible: "Carlos Oliveira",
        },
        {
          id: "REL-004",
          title: "Inspeção de Extintores",
          date: "2025-04-01",
          status: "overdue",
          company: "Supermercados Rede",
          type: "Inspeção",
          responsible: "Ana Silva",
        },
        {
          id: "REL-005",
          title: "Avaliação Ergonômica",
          date: "2025-03-28",
          status: "completed",
          company: "Escritório Central",
          type: "Avaliação",
          responsible: "Roberto Santos",
        },
        {
          id: "REL-006",
          title: "Inspeção de Segurança - Área Industrial",
          date: "2025-03-20",
          status: "completed",
          company: "Metalúrgica Silva",
          type: "Inspeção",
          responsible: "Mariana Costa",
        },
        {
          id: "REL-007",
          title: "Treinamento Brigada de Incêndio",
          date: "2025-03-15",
          status: "completed",
          company: "Hotel Estrela",
          type: "Treinamento",
          responsible: "Paulo Mendes",
        },
        {
          id: "REL-008",
          title: "Análise Preliminar de Risco",
          date: "2025-03-10",
          status: "completed",
          company: "Construtora ABC",
          type: "Análise",
          responsible: "Juliana Alves",
        },
        {
          id: "REL-009",
          title: "Inspeção de Instalações Elétricas",
          date: "2025-03-05",
          status: "completed",
          company: "Eletrotec Ltda",
          type: "Inspeção",
          responsible: "Fernando Gomes",
        },
        {
          id: "REL-010",
          title: "Treinamento NR-35 - Trabalho em Altura",
          date: "2025-03-01",
          status: "completed",
          company: "Construtora ABC",
          type: "Treinamento",
          responsible: "Carla Martins",
        },
        {
          id: "REL-011",
          title: "Inspeção de Equipamentos",
          date: "2025-02-25",
          status: "completed",
          company: "Fábrica de Móveis",
          type: "Inspeção",
          responsible: "Ricardo Souza",
        },
        {
          id: "REL-012",
          title: "Treinamento Primeiros Socorros",
          date: "2025-02-20",
          status: "completed",
          company: "Escritório Central",
          type: "Treinamento",
          responsible: "Patrícia Lima",
        },
        {
          id: "REL-013",
          title: "Análise de Acidentes",
          date: "2025-02-15",
          status: "completed",
          company: "Indústria XYZ",
          type: "Análise",
          responsible: "Lucas Ferreira",
        },
        {
          id: "REL-014",
          title: "Inspeção de EPI - Setor Químico",
          date: "2025-02-10",
          status: "completed",
          company: "Química Brasil",
          type: "Inspeção",
          responsible: "Amanda Ribeiro",
        },
        {
          id: "REL-015",
          title: "Treinamento CIPA",
          date: "2025-02-05",
          status: "completed",
          company: "Metalúrgica Silva",
          type: "Treinamento",
          responsible: "João Silva",
        },
      ]

      setReports(mockReports)
      setFilteredReports(mockReports)
      setLoading(false)
    }

    fetchReports()
  }, [])

  // Filtrar relatórios com base nos critérios
  useEffect(() => {
    let filtered = [...reports]

    // Filtrar por período
    if (period !== "all") {
      const today = new Date()
      const startDate = new Date()

      switch (period) {
        case "week":
          startDate.setDate(today.getDate() - 7)
          break
        case "month":
          startDate.setMonth(today.getMonth() - 1)
          break
        case "semester":
          startDate.setMonth(today.getMonth() - 6)
          break
        case "year":
          startDate.setFullYear(today.getFullYear() - 1)
          break
      }

      filtered = filtered.filter((report) => {
        const reportDate = new Date(report.date)
        return reportDate >= startDate && reportDate <= today
      })
    }

    // Filtrar por tipo
    if (reportType !== "all") {
      filtered = filtered.filter((report) => report.type.toLowerCase() === reportType.toLowerCase())
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(term) ||
          report.company.toLowerCase().includes(term) ||
          report.responsible.toLowerCase().includes(term) ||
          report.id.toLowerCase().includes(term),
      )
    }

    // Filtrar por status (aba)
    if (activeTab !== "all") {
      filtered = filtered.filter((report) => report.status === activeTab)
    }

    // Ordenar
    filtered.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "company":
          comparison = a.company.localeCompare(b.company)
          break
        case "type":
          comparison = a.type.localeCompare(b.type)
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredReports(filtered)
  }, [reports, searchTerm, period, reportType, activeTab, sortBy, sortOrder])

  const handleExportSelected = () => {
    if (selectedReports.length === 0) {
      return
    }

    setLoading(true)

    // Simulação de exportação
    setTimeout(() => {
      setLoading(false)
      setSelectedReports([])
      alert(`Exportados ${selectedReports.length} relatórios selecionados.`)
    }, 1500)
  }

  const toggleSelectReport = (id: string) => {
    setSelectedReports((prev) => (prev.includes(id) ? prev.filter((reportId) => reportId !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(filteredReports.map((report) => report.id))
    }
  }

  if (loading) {
    return <LoadingScreen message="Carregando relatórios..." />
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Relatórios Gerados</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleExportSelected}
                disabled={selectedReports.length === 0}
                className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar Selecionados ({selectedReports.length})
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Filtros</CardTitle>
                <CardDescription>Filtre os relatórios por diferentes critérios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Buscar por título, empresa..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Período</Label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger id="period">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os períodos</SelectItem>
                      <SelectItem value="week">Última semana</SelectItem>
                      <SelectItem value="month">Último mês</SelectItem>
                      <SelectItem value="semester">Último semestre</SelectItem>
                      <SelectItem value="year">Último ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Relatório</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="inspeção">Inspeção</SelectItem>
                      <SelectItem value="treinamento">Treinamento</SelectItem>
                      <SelectItem value="análise">Análise</SelectItem>
                      <SelectItem value="avaliação">Avaliação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ordenar por</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        <span>
                          {sortBy === "date"
                            ? "Data"
                            : sortBy === "title"
                              ? "Título"
                              : sortBy === "company"
                                ? "Empresa"
                                : "Tipo"}
                          {" - "}
                          {sortOrder === "asc" ? "Crescente" : "Decrescente"}
                        </span>
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSortBy("date")}>
                        {sortBy === "date" && <Check className="mr-2 h-4 w-4" />}
                        <span className={sortBy === "date" ? "font-medium" : ""}>Data</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("title")}>
                        {sortBy === "title" && <Check className="mr-2 h-4 w-4" />}
                        <span className={sortBy === "title" ? "font-medium" : ""}>Título</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("company")}>
                        {sortBy === "company" && <Check className="mr-2 h-4 w-4" />}
                        <span className={sortBy === "company" ? "font-medium" : ""}>Empresa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("type")}>
                        {sortBy === "type" && <Check className="mr-2 h-4 w-4" />}
                        <span className={sortBy === "type" ? "font-medium" : ""}>Tipo</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                        {sortOrder === "asc" ? "Decrescente" : "Crescente"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Resultados</CardTitle>
                <CardDescription>
                  {filteredReports.length} relatórios encontrados
                  {selectedReports.length > 0 && ` (${selectedReports.length} selecionados)`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="completed">Concluídos</TabsTrigger>
                    <TabsTrigger value="pending">Pendentes</TabsTrigger>
                    <TabsTrigger value="overdue">Atrasados</TabsTrigger>
                  </TabsList>

                  <TabTransition active={true} className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="select-all"
                          checked={filteredReports.length > 0 && selectedReports.length === filteredReports.length}
                          onCheckedChange={toggleSelectAll}
                        />
                        <Label htmlFor="select-all">Selecionar todos</Label>
                      </div>
                      <div className="text-sm text-muted-foreground">{filteredReports.length} relatórios</div>
                    </div>

                    <div className="space-y-2">
                      {filteredReports.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          Nenhum relatório encontrado com os filtros selecionados.
                        </div>
                      ) : (
                        filteredReports.map((report) => (
                          <div
                            key={report.id}
                            className="flex items-center gap-3 p-3 border rounded-md hover:bg-accent/50 transition-colors"
                          >
                            <Checkbox
                              id={`select-${report.id}`}
                              checked={selectedReports.includes(report.id)}
                              onCheckedChange={() => toggleSelectReport(report.id)}
                            />
                            <div className="flex-1 cursor-pointer" onClick={() => router.push(`/reports/${report.id}`)}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{report.title}</span>
                                  <Badge
                                    className={
                                      report.status === "completed"
                                        ? "bg-green-500"
                                        : report.status === "pending"
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                    }
                                  >
                                    {report.status === "completed"
                                      ? "Concluído"
                                      : report.status === "pending"
                                        ? "Pendente"
                                        : "Atrasado"}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{report.type}</Badge>
                                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(report.date).toLocaleDateString("pt-BR")}
                                  </span>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {report.company} • {report.responsible}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => router.push(`/reports/${report.id}`)}>
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Ver Relatório</span>
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </TabTransition>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
