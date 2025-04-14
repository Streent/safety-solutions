"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, ChevronDown, Download, FileText, SearchIcon } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCompany, setFilterCompany] = useState("all")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

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

  const handleSearch = () => {
    setHasSearched(true)

    const results = reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || report.type === filterType
      const matchesCompany = filterCompany === "all" || report.company === filterCompany

      // Simplificado para demonstração
      const matchesPeriod = true

      return matchesSearch && matchesType && matchesCompany && matchesPeriod
    })

    setSearchResults(results)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Buscar Relatórios</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros de Busca</CardTitle>
            <CardDescription>Utilize os filtros para encontrar relatórios específicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Buscar por título, ID ou empresa..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch}>Buscar</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Tipo de Relatório</Label>
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
                  <Label>Empresa</Label>
                  <Select value={filterCompany} onValueChange={setFilterCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as empresas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as empresas</SelectItem>
                      <SelectItem value="Construtora ABC">Construtora ABC</SelectItem>
                      <SelectItem value="Eletrotec Ltda">Eletrotec Ltda</SelectItem>
                      <SelectItem value="Indústria XYZ">Indústria XYZ</SelectItem>
                      <SelectItem value="Supermercados Rede">Supermercados Rede</SelectItem>
                      <SelectItem value="Escritório Central">Escritório Central</SelectItem>
                      <SelectItem value="Hotel Estrela">Hotel Estrela</SelectItem>
                      <SelectItem value="Metalúrgica Silva">Metalúrgica Silva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Período</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {filterPeriod === "all"
                            ? "Todos os períodos"
                            : filterPeriod === "week"
                              ? "Última semana"
                              : filterPeriod === "month"
                                ? "Último mês"
                                : filterPeriod === "quarter"
                                  ? "Último trimestre"
                                  : "Último ano"}
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem onClick={() => setFilterPeriod("all")}>Todos os períodos</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterPeriod("week")}>Última semana</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterPeriod("month")}>Último mês</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterPeriod("quarter")}>Último trimestre</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterPeriod("year")}>Último ano</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultados da Busca</CardTitle>
            <CardDescription>
              {hasSearched
                ? searchResults.length > 0
                  ? `${searchResults.length} relatórios encontrados`
                  : "Nenhum relatório encontrado"
                : "Utilize os filtros acima para buscar relatórios"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasSearched ? (
              searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((report) => (
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
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium">Nenhum relatório encontrado</h3>
                  <p className="text-sm text-gray-500 mt-1">Tente ajustar seus filtros ou termos de busca</p>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <SearchIcon className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">Busque por relatórios</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Utilize os filtros acima para encontrar relatórios específicos
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-medium mb-1.5">{children}</div>
}

import Link from "next/link"
