"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MessageSquare, Phone, Search, Send } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulação de envio
    setTimeout(() => {
      setLoading(false)
      alert("Mensagem enviada com sucesso!")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Suporte</h2>
        </div>

        <Tabs defaultValue="faq" className="space-y-4">
          <TabsList>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perguntas Frequentes</CardTitle>
                <CardDescription>Encontre respostas para as dúvidas mais comuns</CardDescription>
                <div className="relative mt-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Buscar perguntas..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Como criar um novo relatório de inspeção?</AccordionTrigger>
                    <AccordionContent>
                      Para criar um novo relatório de inspeção, acesse o menu "Inspeções" e clique no botão "Nova
                      Inspeção". Preencha as informações solicitadas nas abas "Informações", "Itens de Inspeção",
                      "Fotos" e "Assinaturas". Ao finalizar, clique em "Finalizar Inspeção" para salvar o relatório.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Como exportar relatórios em PDF?</AccordionTrigger>
                    <AccordionContent>
                      Para exportar um relatório em PDF, acesse a página de relatórios, encontre o relatório desejado e
                      clique no ícone de download. O sistema irá gerar automaticamente um arquivo PDF com todas as
                      informações do relatório, incluindo fotos e assinaturas.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Como funciona o modo offline?</AccordionTrigger>
                    <AccordionContent>
                      O modo offline permite que você trabalhe sem conexão com a internet. Para ativá-lo, acesse
                      "Configurações" e ative a opção "Modo Offline". Quando estiver sem conexão, você poderá criar e
                      editar relatórios normalmente. Ao recuperar a conexão, clique em "Sincronizar Agora" para enviar
                      os dados ao servidor.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Como adicionar fotos a uma inspeção?</AccordionTrigger>
                    <AccordionContent>
                      Durante a criação ou edição de uma inspeção, acesse a aba "Fotos". Clique no botão "Adicionar
                      Foto" para tirar uma foto com a câmera do dispositivo ou em "Carregar da galeria" para selecionar
                      uma imagem existente. Você pode adicionar uma descrição para cada foto e remover fotos
                      indesejadas.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Como registrar assinaturas nos relatórios?</AccordionTrigger>
                    <AccordionContent>
                      Na aba "Assinaturas" de um relatório ou inspeção, clique no botão "Assinar" para abrir o campo de
                      assinatura. O responsável pode assinar diretamente na tela usando o dedo ou uma caneta stylus.
                      Após assinar, preencha o nome do responsável no campo abaixo e continue para a próxima assinatura
                      necessária.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Entre em Contato</CardTitle>
                <CardDescription>Envie uma mensagem para nossa equipe de suporte</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Assunto da mensagem" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Descreva sua dúvida ou problema em detalhes"
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar Mensagem"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outras Formas de Contato</CardTitle>
                <CardDescription>Entre em contato diretamente com nossa equipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center p-4 border rounded-md">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-sm text-gray-500">(11) 3456-7890</p>
                    <p className="text-sm text-gray-500">Segunda a Sexta, 9h às 18h</p>
                  </div>
                </div>

                <div className="flex items-center p-4 border rounded-md">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-500">suporte@safetysolutions.com.br</p>
                    <p className="text-sm text-gray-500">Resposta em até 24 horas</p>
                  </div>
                </div>

                <div className="flex items-center p-4 border rounded-md">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Chat Online</p>
                    <p className="text-sm text-gray-500">Disponível no horário comercial</p>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Iniciar Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
