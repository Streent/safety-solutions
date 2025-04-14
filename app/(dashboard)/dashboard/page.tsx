"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, Clock, FileText, Plus, ClipboardList, BarChart3, ArrowRight } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/page-transition"
import { TabTransition } from "@/components/tab-transition"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Variantes de animação para os cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center gap-2">
              <Button asChild>
                <Link href="/inspections/new">
                  <Plus className="mr-2 h-4 w-4" /> Nova Inspeção
                </Link>
              </Button>
            </div>
          </motion.div>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
              <TabsTrigger value="inspections">Inspeções</TabsTrigger>
              <TabsTrigger value="trainings">Treinamentos</TabsTrigger>
            </TabsList>

            <TabTransition active={activeTab === "overview"} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible">
                  <Card className="border-l-4 border-l-red-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Relatórios Atrasados</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">7</div>
                      <p className="text-xs text-muted-foreground">+2 desde a semana passada</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible">
                  <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Relatórios Pendentes</CardTitle>
                      <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">-3 desde a semana passada</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible">
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Relatórios Entregues</CardTitle>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">32</div>
                      <p className="text-xs text-muted-foreground">+8 desde a semana passada</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total de Relatórios</CardTitle>
                      <FileText className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">51</div>
                      <p className="text-xs text-muted-foreground">+5 desde a semana passada</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <motion.div
                  className="col-span-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Relatórios Recentes</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <RecentReportsList />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  className="col-span-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Ações Rápidas</CardTitle>
                      <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <Button className="w-full justify-start" asChild variant="outline">
                        <Link href="/inspections/new">
                          <ClipboardList className="mr-2 h-4 w-4" />
                          Nova Inspeção
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" asChild variant="outline">
                        <Link href="/reports/new">
                          <FileText className="mr-2 h-4 w-4" />
                          Novo Relatório
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" asChild variant="outline">
                        <Link href="/trainings/new">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Novo Treinamento
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" asChild variant="outline">
                        <Link href="/search">
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Buscar Relatórios
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" asChild variant="outline">
                        <Link href="/reports/generated">
                          <FileText className="mr-2 h-4 w-4" />
                          Relatórios Gerados
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabTransition>

            <TabTransition active={activeTab === "reports"} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios</CardTitle>
                  <CardDescription>Gerencie todos os seus relatórios de segurança</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportsList />
                </CardContent>
              </Card>
            </TabTransition>

            <TabTransition active={activeTab === "inspections"} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inspeções</CardTitle>
                  <CardDescription>Gerencie todas as suas inspeções de segurança</CardDescription>
                </CardHeader>
                <CardContent>
                  <InspectionsList />
                </CardContent>
              </Card>
            </TabTransition>

            <TabTransition active={activeTab === "trainings"} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Treinamentos</CardTitle>
                  <CardDescription>Gerencie todos os seus treinamentos de segurança</CardDescription>
                </CardHeader>
                <CardContent>
                  <TrainingsList />
                </CardContent>
              </Card>
            </TabTransition>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  )
}

function RecentReportsList() {
  const recentReports = [
    {
      id: "REL-001",
      title: "Inspeção de EPI - Construção Civil",
      date: "12/04/2025",
      status: "completed",
      company: "Construtora ABC",
    },
    {
      id: "REL-002",
      title: "Análise de Risco - Setor Elétrico",
      date: "10/04/2025",
      status: "pending",
      company: "Eletrotec Ltda",
    },
    {
      id: "REL-003",
      title: "Treinamento NR-10",
      date: "05/04/2025",
      status: "completed",
      company: "Indústria XYZ",
    },
    {
      id: "REL-004",
      title: "Inspeção de Extintores",
      date: "01/04/2025",
      status: "overdue",
      company: "Supermercados Rede",
    },
    {
      id: "REL-005",
      title: "Avaliação Ergonômica",
      date: "28/03/2025",
      status: "completed",
      company: "Escritório Central",
    },
  ]

  return (
    <div className="space-y-4">
      {recentReports.map((report, index) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors">
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
              <div className="text-xs text-muted-foreground">
                {report.company} • {report.date}
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/reports/${report.id}`}>
                <span>Ver</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ReportsList() {
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
  ]

  return (
    <div className="space-y-4">
      {reports.map((report, index) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50 transition-colors">
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
              <div className="text-xs text-muted-foreground mt-1">
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
                <FileText className="h-4 w-4" />
                <span className="sr-only">Exportar PDF</span>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function InspectionsList() {
  const inspections = [
    {
      id: "INS-001",
      title: "Inspeção de EPI - Construção Civil",
      date: "12/04/2025",
      status: "completed",
      company: "Construtora ABC",
    },
    {
      id: "INS-002",
      title: "Inspeção de Extintores",
      date: "01/04/2025",
      status: "overdue",
      company: "Supermercados Rede",
    },
    {
      id: "INS-003",
      title: "Inspeção de Segurança - Área Industrial",
      date: "20/03/2025",
      status: "completed",
      company: "Metalúrgica Silva",
    },
    {
      id: "INS-004",
      title: "Inspeção de Equipamentos",
      date: "15/03/2025",
      status: "completed",
      company: "Fábrica de Móveis",
    },
    {
      id: "INS-005",
      title: "Inspeção de Instalações Elétricas",
      date: "10/03/2025",
      status: "completed",
      company: "Eletrotec Ltda",
    },
  ]

  return (
    <div className="space-y-4">
      {inspections.map((inspection, index) => (
        <motion.div
          key={inspection.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50 transition-colors">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    inspection.status === "completed"
                      ? "bg-green-500"
                      : inspection.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
                <span className="font-medium">{inspection.title}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {inspection.company} • {inspection.date}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/inspections/${inspection.id}`}>
                  <span>Visualizar</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4" />
                <span className="sr-only">Exportar PDF</span>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function TrainingsList() {
  const trainings = [
    {
      id: "TRN-001",
      title: "Treinamento NR-10",
      date: "05/04/2025",
      status: "completed",
      company: "Indústria XYZ",
      participants: 12,
    },
    {
      id: "TRN-002",
      title: "Treinamento Brigada de Incêndio",
      date: "25/03/2025",
      status: "completed",
      company: "Hotel Estrela",
      participants: 8,
    },
    {
      id: "TRN-003",
      title: "Treinamento NR-35 - Trabalho em Altura",
      date: "15/03/2025",
      status: "completed",
      company: "Construtora ABC",
      participants: 6,
    },
    {
      id: "TRN-004",
      title: "Treinamento Primeiros Socorros",
      date: "10/03/2025",
      status: "completed",
      company: "Escritório Central",
      participants: 15,
    },
    {
      id: "TRN-005",
      title: "Treinamento CIPA",
      date: "05/03/2025",
      status: "completed",
      company: "Metalúrgica Silva",
      participants: 10,
    },
  ]

  return (
    <div className="space-y-4">
      {trainings.map((training, index) => (
        <motion.div
          key={training.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4 border rounded-md hover:bg-accent/50 transition-colors">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    training.status === "completed"
                      ? "bg-green-500"
                      : training.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
                <span className="font-medium">{training.title}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {training.company} • {training.date} • {training.participants} participantes
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/trainings/${training.id}`}>
                  <span>Visualizar</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4" />
                <span className="sr-only">Exportar PDF</span>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
