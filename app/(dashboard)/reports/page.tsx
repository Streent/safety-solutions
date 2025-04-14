"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Download, Filter, Plus, Search, Calendar, ChevronDown } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPeriod, setFilterPeriod] = useState("all")

  const reports = [
    {
      id: "REL-001",
      title: "Inspeção de EPI - Construção Civil",
      date: "12/04/2025",
      status: "completed",
      company: "Construtora ABC",
      type: "Inspeção",
    },
    {
      id: "REL-002",
      title: "Análise de Risco - Setor Elétrico",
      date: "10/04/2025",
      status: "pending",
      company: "Eletrotec Ltda",
      type: "Análise",
    },
    {
      id: "REL-003",
      title: "Treinamento NR-10",
      date: "05/04/2025",
      status: "completed",
      company: "Indústria XYZ",
      type: "Treinamento",
    },
    {
      id: "REL-004",
      title: "Inspeção de Extintores",
      date: "01/04/2025",
      status: "overdue",
      company: "Supermercados Rede",
      type: "Inspeção",
    },
    {
      id: "REL-005",
      title: "Avaliação Ergonômica",
      date: "28/03/2025",
      status: "completed",
      company: "Escritório Central",
      type: "Avaliação",
    },
    {
      id: "REL-006",
      title: "Treinamento Brigada de Incêndio",
      date: "25/03/2025",
      status: "completed",
      company: "Hotel Estrela",
      type: "Treinamento",
    },
    {
      id: "REL-007",
      title: "Inspeção de Segurança - Área Industrial",
      date: "20/03/2025",
      status: "completed",
      company: "Metalúrgica Silva",
      type: "Inspeção",
    },
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || report.type === filterType

    // Simplificado para demonstração
    const matchesPeriod = true

    return matchesSearch && matchesType && matchesPeriod
  })

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
          <Button asChild>
            <Link href="/reports/new">
              <Plus className="mr-2 h-4 w-4" /> Novo Relatório
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="inspections">Inspeções</TabsTrigger>
              <TabsTrigger value="trainings">Treinamentos</TabsTrigger>
              <TabsTrigger value="analysis">Análises</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar relatórios..."
                  className="pl-8 w-full sm:w-[250px]"
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
                          <SelectItem value="Inspeção">Inspeção</SelectItem>
                          <SelectItem value="Treinamento">Treinamento</SelectItem>
                          <SelectItem value="Análise">Análise</SelectItem>
                          <SelectItem value="Avaliação">Avaliação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Período</p>
                      <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os períodos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os períodos</SelectItem>
                          <SelectItem value="week">Última semana</SelectItem>
                          <SelectItem value="month">Último mês</SelectItem>
                          <SelectItem value="quarter">Último trimestre</SelectItem>
                          <SelectItem value="year">Último ano</SelectItem>
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Todos os Relatórios</CardTitle>
                <CardDescription>Visualize e gerencie todos os relatórios gerados</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredReports.length > 0 ? (
                  <div className="space-y-4">
                    {filteredReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                report.status === "completed"
                                  ? "bg-green-500"
                                  : report.status === "pending"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            />
                            <span className="font-medium">{report.title}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {report.company} • {report.date} • {report.type}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/reports/${report.id}`}>
                              <span>Visualizar</span>
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
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium">Nenhum relatório encontrado</h3>
                    <p className="text-sm text-gray-500 mt-1">Tente ajustar seus filtros ou criar um novo relatório</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inspections" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Relatórios de Inspeção</CardTitle>
                <CardDescription>Visualize e gerencie relatórios de inspeção</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredReports
                  .filter((report) => report.type === "Inspeção")
                  .map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 mb-4"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              report.status === "completed"
                                ? "bg-green-500"
                                : report.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <span className="font-medium">{report.title}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {report.company} • {report.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/reports/${report.id}`}>
                            <span>Visualizar</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Exportar PDF</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trainings" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Relatórios de Treinamento</CardTitle>
                <CardDescription>Visualize e gerencie relatórios de treinamento</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredReports
                  .filter((report) => report.type === "Treinamento")
                  .map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 mb-4"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              report.status === "completed"
                                ? "bg-green-500"
                                : report.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <span className="font-medium">{report.title}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {report.company} • {report.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/reports/${report.id}`}>
                            <span>Visualizar</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Exportar PDF</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Relatórios de Análise</CardTitle>
                <CardDescription>Visualize e gerencie relatórios de análise</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredReports
                  .filter((report) => report.type === "Análise" || report.type === "Avaliação")
                  .map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 mb-4"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              report.status === "completed"
                                ? "bg-green-500"
                                : report.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <span className="font-medium">{report.title}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {report.company} • {report.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/reports/${report.id}`}>
                            <span>Visualizar</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Exportar PDF</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
