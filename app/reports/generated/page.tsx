"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, FileText, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/page-transition"
import Link from "next/link"
import { format, subDays, subMonths } from "date-fns"

// Tipos para os relatórios
type ReportStatus = "completed" | "pending" | "overdue"

interface Report {
  id: string
  title: string
  date: string
  status: ReportStatus
  company: string
  type: string
  period: "week" | "month" | "halfYear" | "year"
}

export default function GeneratedReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPeriod, setFilterPeriod] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [reports, setReports] = useState<Report[]>([])
  const [filteredReports, setFilteredReports] = useState<Report[]>([])

  // Gerar dados de exemplo
  useEffect(() => {
    const today = new Date()
    const generateReports: Report[] = [
      // Relatórios semanais
      {
        id: "REL-W001",
        title: "Relatório Semanal - Inspeção de EPI",
        date: format(subDays(today, 2), "dd/MM/yyyy"),
        status: "completed",
        company: "Construtora ABC",
        type: "Inspeção",
        period: "week",
      },
      {
        id: "REL-W002",
        title: "Relatório Semanal - Verificação de Extintores",
        date: format(subDays(today, 5), "dd/MM/yyyy"),
        status: "completed",
        company: "Indústria XYZ",
        type: "Inspeção",
        period: "week",
      },

      // Relatórios mensais
      {
        id: "REL-M001",
        title: "Relatório Mensal - Análise de Acidentes",
        date: format(subDays(today, 15), "dd/MM/yyyy"),
        status: "completed",
        company: "Construtora ABC",
        type: "Análise",
        period: "month",
      },
      {
        id: "REL-M002",
        title: "Relatório Mensal - Treinamentos Realizados",
        date: format(subDays(today, 20), "dd/MM/yyyy"),
        status: "completed",
        company: "Eletrotec Ltda",
        type: "Treinamento",
        period: "month",
      },

      // Relatórios semestrais
      {
        id: "REL-S001",
        title: "Relatório Semestral - Avaliação de Riscos",
        date: format(subMonths(today, 2), "dd/MM/yyyy"),
        status: "completed",
        company: "Indústria XYZ",
        type: "Avaliação",
        period: "halfYear",
      },
      {
        id: "REL-S002",
        title: "Relatório Semestral - Conformidade NR",
        date: format(subMonths(today, 3), "dd/MM/yyyy"),
        status: "pending",
        company: "Escritório Central",
        type: "Conformidade",
        period: "halfYear",
      },

      // Relatórios anuais
      {
        id: "REL-A001",
        title: "Relatório Anual - PPRA",
        date: format(subMonths(today, 6), "dd/MM/yyyy"),
        status: "completed",
        company: "Construtora ABC",
        type: "PPRA",
        period: "year",
      },
      {
        id: "REL-A002",
        title: "Relatório Anual - PCMSO",
        date: format(subMonths(today, 8), "dd/MM/yyyy"),
        status: "overdue",
        company: "Metalúrgica Silva",
        type: "PCMSO",
        period: "year",
      },
    ]

    setReports(generateReports)
    setFilteredReports(generateReports)
  }, [])

  // Filtrar relatórios
  useEffect(() => {
    let filtered = reports

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por período
    if (filterPeriod !== "all") {
      filtered = filtered.filter((report) => report.period === filterPeriod)
    }

    // Filtrar por tipo
    if (filterType !== "all") {
      filtered = filtered.filter((report) => report.type === filterType)
    }

    setFilteredReports(filtered)
  }, [searchTerm, filterPeriod, filterType, reports])

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Relatórios Gerados</h2>
            <Button asChild>
              <Link href="/reports/new">
                <FileText className="mr-2 h-4 w-4" /> Gerar Novo Relatório
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar relatórios..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os períodos</SelectItem>
                  <SelectItem value="week">Semanal</SelectItem>
                  <SelectItem value="month">Mensal</SelectItem>
                  <SelectItem value="halfYear">Semestral</SelectItem>
                  <SelectItem value="year">Anual</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="Inspeção">Inspeção</SelectItem>
                  <SelectItem value="Análise">Análise</SelectItem>
                  <SelectItem value="Treinamento">Treinamento</SelectItem>
                  <SelectItem value="Avaliação">Avaliação</SelectItem>
                  <SelectItem value="Conformidade">Conformidade</SelectItem>
                  <SelectItem value="PPRA">PPRA</SelectItem>
                  <SelectItem value="PCMSO">PCMSO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="weekly">Semanais</TabsTrigger>
              <TabsTrigger value="monthly">Mensais</TabsTrigger>
              <TabsTrigger value="halfYearly">Semestrais</TabsTrigger>
              <TabsTrigger value="yearly">Anuais</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Todos os Relatórios</CardTitle>
                  <CardDescription>{filteredReports.length} relatórios encontrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportsList reports={filteredReports} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Semanais</CardTitle>
                  <CardDescription>
                    {filteredReports.filter((r) => r.period === "week").length} relatórios encontrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportsList reports={filteredReports.filter((r) => r.period === "week")} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Mensais</CardTitle>
                  <CardDescription>
                    {filteredReports.filter((r) => r.period === "month").length} relatórios encontrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportsList reports={filteredReports.filter((r) => r.period === "month")} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="halfYearly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Semestrais</CardTitle>
                  <CardDescription>
                    {filteredReports.filter((r) => r.period === "halfYear").length} relatórios encontrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportsList reports={filteredReports.filter((r) => r.period === "halfYear")} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="yearly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Anuais</CardTitle>
                  <CardDescription>
                    {filteredReports.filter((r) => r.period === "year").length} relatórios encontrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportsList reports={filteredReports.filter((r) => r.period === "year")} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  )
}

function ReportsList({ reports }: { reports: Report[] }) {
  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <FileText className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium">Nenhum relatório encontrado</h3>
        <p className="text-sm text-gray-500 mt-1">Tente ajustar seus filtros ou termos de busca</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div className="flex flex-col mb-3 sm:mb-0">
            <div className="flex items-center gap-2">
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
              <span className="font-medium">{report.title}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {report.id} • {report.company} • {report.date} • {report.type}
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
  )
}
