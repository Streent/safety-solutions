"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { getSupabaseClient } from "@/lib/supabase"
import { LoadingScreen } from "@/components/loading-screen"
import { BarChart, FileText, ClipboardList, Users, Building } from "lucide-react"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    inspections: 0,
    trainings: 0,
    reports: 0,
    companies: 0,
    users: 0,
  })
  const supabase = getSupabaseClient()

  useEffect(() => {
    async function fetchStats() {
      try {
        // Buscar contagem de inspeções
        const { count: inspectionsCount } = await supabase
          .from("inspections")
          .select("*", { count: "exact", head: true })

        // Buscar contagem de treinamentos
        const { count: trainingsCount } = await supabase.from("trainings").select("*", { count: "exact", head: true })

        // Buscar contagem de relatórios
        const { count: reportsCount } = await supabase.from("reports").select("*", { count: "exact", head: true })

        // Buscar contagem de empresas
        const { count: companiesCount } = await supabase.from("companies").select("*", { count: "exact", head: true })

        // Buscar contagem de usuários
        const { count: usersCount } = await supabase.from("users").select("*", { count: "exact", head: true })

        setStats({
          inspections: inspectionsCount || 0,
          trainings: trainingsCount || 0,
          reports: reportsCount || 0,
          companies: companiesCount || 0,
          users: usersCount || 0,
        })
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  if (loading) {
    return <LoadingScreen message="Carregando dashboard..." />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inspeções</CardTitle>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.inspections}</div>
                    <p className="text-xs text-muted-foreground">Total de inspeções registradas no sistema</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Treinamentos</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.trainings}</div>
                    <p className="text-xs text-muted-foreground">Total de treinamentos registrados no sistema</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Relatórios</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.reports}</div>
                    <p className="text-xs text-muted-foreground">Total de relatórios registrados no sistema</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Empresas</CardTitle>
                    <Building className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.companies}</div>
                    <p className="text-xs text-muted-foreground">Total de empresas cadastradas no sistema</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="col-span-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Atividades Recentes</CardTitle>
                    <CardDescription>Últimas atividades registradas no sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Nova inspeção registrada</p>
                          <p className="text-xs text-muted-foreground">Há 2 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Treinamento concluído</p>
                          <p className="text-xs text-muted-foreground">Há 5 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Novo relatório gerado</p>
                          <p className="text-xs text-muted-foreground">Há 1 dia</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="col-span-3"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Usuários Ativos</CardTitle>
                    <CardDescription>Total de {stats.users} usuários no sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-muted-foreground mr-2" />
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">75%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      75% dos usuários estiveram ativos nos últimos 7 dias
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análises</CardTitle>
                <CardDescription>Visualize estatísticas e tendências do sistema</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Funcionalidade de análises será implementada em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios</CardTitle>
                <CardDescription>Gere relatórios personalizados do sistema</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Funcionalidade de geração de relatórios será implementada em breve.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
