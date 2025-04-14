"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronDown, Download, Filter, Plus, Search } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function InspectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPeriod, setFilterPeriod] = useState("all")

  const inspections = [
    {
      id: "INS-001",
      title: "Inspeção de EPI - Construção Civil",
      date: "12/04/2025",
      status: "completed",
      company: "Construtora ABC",
      type: "EPI",
      responsible: "João Silva",
    },
    {
      id: "INS-002",
      title: "Inspeção de Extintores",
      date: "01/04/2025",
      status: "overdue",
      company: "Supermercados Rede",
      type: "Extintores",
      responsible: "Maria Oliveira",
    },
    {
      id: "INS-003",
      title: "Inspeção de Segurança - Área Industrial",
      date: "20/03/2025",
      status: "completed",
      company: "Metalúrgica Silva",
      type: "Segurança",
      responsible: "Carlos Santos",
    },
    {
      id: "INS-004",
      title: "Inspeção de Equipamentos",
      date: "15/03/2025",
      status: "completed",
      company: "Fábrica de Móveis",
      type: "Equipamentos",
      responsible: "João Silva",
    },
    {
      id: "INS-005",
      title: "Inspeção de Instalações Elétricas",
      date: "10/03/2025",
      status: "pending",
      company: "Eletrotec Ltda",
      type: "Elétrica",
      responsible: "Ana Pereira",
    },
    {
      id: "INS-006",
      title: "Inspeção de Ergonomia - Escritórios",
      date: "05/03/2025",
      status: "completed",
      company: "Escritório Central",
      type: "Ergonomia",
      responsible: "Paulo Mendes",
    },
    {
      id: "INS-007",
      title: "Inspeção de Escadas e Andaimes",
      date: "01/03/2025",
      status: "completed",
      company: "Construtora ABC",
      type: "Altura",
      responsible: "João Silva",
    },
  ]

  const filteredInspections = inspections.filter((inspection) => {
    const matchesSearch =
      inspection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.responsible.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || inspection.type === filterType
    const matchesStatus = filterStatus === "all" || inspection.status === filterStatus

    // Simplificado para demonstração
    const matchesPeriod = true

    return matchesSearch && matchesType && matchesStatus && matchesPeriod
  })

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Inspeções</h2>
          <Button asChild>
            <Link href="/inspections/new">
              <Plus className="mr-2 h-4 w-4" /> Nova Inspeção
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar inspeções..."
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
                        <SelectItem value="EPI">EPI</SelectItem>
                        <SelectItem value="Extintores">Extintores</SelectItem>
                        <SelectItem value="Segurança">Segurança</SelectItem>
                        <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                        <SelectItem value="Elétrica">Elétrica</SelectItem>
                        <SelectItem value="Ergonomia">Ergonomia</SelectItem>
                        <SelectItem value="Altura">Altura</SelectItem>
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
                        <SelectItem value="overdue">Atrasado</SelectItem>
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
            <CardTitle>Lista de Inspeções</CardTitle>
            <CardDescription>{filteredInspections.length} inspeções encontradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex flex-col mb-3 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          inspection.status === "completed"
                            ? "bg-green-500"
                            : inspection.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }
                      >
                        {inspection.status === "completed"
                          ? "Concluído"
                          : inspection.status === "pending"
                            ? "Pendente"
                            : "Atrasado"}
                      </Badge>
                      <span className="font-medium">{inspection.title}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {inspection.id} • {inspection.company} • {inspection.date} • Responsável: {inspection.responsible}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/inspections/${inspection.id}`}>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
