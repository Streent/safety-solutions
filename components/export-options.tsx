"use client"

import type React from "react"

import { useState } from "react"
import { Download, FileText, FileImage, File, Share2, Check, Mail, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { LoadingScreen } from "@/components/loading-screen"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

interface ExportOptionsProps {
  id: string
  title: string
  type: "report" | "inspection" | "training"
}

export function ExportOptions({ id, title, type }: ExportOptionsProps) {
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [progress, setProgress] = useState(0)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false)
  const [emailData, setEmailData] = useState({
    to: "",
    subject: `${title} - Safety Solutions`,
    message: `Segue em anexo o ${type === "report" ? "relatório" : type === "inspection" ? "inspeção" : "treinamento"} "${title}" gerado pelo sistema Safety Solutions.`,
  })
  const [whatsappData, setWhatsAppData] = useState({
    number: "",
    message: `Segue o link para o ${type === "report" ? "relatório" : type === "inspection" ? "inspeção" : "treinamento"} "${title}" gerado pelo sistema Safety Solutions: https://safety-solutions.com/${type}/${id}`,
  })

  const handleExport = async (format: "pdf" | "word" | "excel" | "powerpoint") => {
    setLoading(true)
    setProgress(0)
    setLoadingMessage(`Gerando ${title} em formato ${format.toUpperCase()}...`)

    // Simulação de exportação com progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Simulação de exportação
    await new Promise((resolve) => setTimeout(resolve, 2000))

    clearInterval(interval)
    setLoading(false)

    toast({
      title: "Exportação concluída",
      description: `${title} foi exportado com sucesso em formato ${format.toUpperCase()}.`,
      action: (
        <Button variant="outline" size="sm" className="gap-1">
          <Check className="h-4 w-4" /> OK
        </Button>
      ),
    })
  }

  const handleShare = async () => {
    setLoading(true)
    setLoadingMessage("Preparando opções de compartilhamento...")

    // Simulação de compartilhamento
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)

    toast({
      title: "Compartilhamento",
      description: "Link de compartilhamento copiado para a área de transferência.",
      action: (
        <Button variant="outline" size="sm" className="gap-1">
          <Check className="h-4 w-4" /> OK
        </Button>
      ),
    })
  }

  const handleEmailShare = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowEmailDialog(false)
    setLoading(true)
    setProgress(0)
    setLoadingMessage("Enviando por e-mail...")

    // Simulação de envio com progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulação de envio
    await new Promise((resolve) => setTimeout(resolve, 2000))

    clearInterval(interval)
    setLoading(false)

    toast({
      title: "E-mail enviado",
      description: `${title} foi enviado com sucesso para ${emailData.to}.`,
      action: (
        <Button variant="outline" size="sm" className="gap-1">
          <Check className="h-4 w-4" /> OK
        </Button>
      ),
    })
  }

  const handleWhatsAppShare = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowWhatsAppDialog(false)
    setLoading(true)
    setProgress(0)
    setLoadingMessage("Enviando por WhatsApp...")

    // Simulação de envio com progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 20
      })
    }, 200)

    // Simulação de envio
    await new Promise((resolve) => setTimeout(resolve, 1000))

    clearInterval(interval)
    setLoading(false)

    toast({
      title: "Mensagem enviada",
      description: `${title} foi enviado com sucesso via WhatsApp para ${whatsappData.number}.`,
      action: (
        <Button variant="outline" size="sm" className="gap-1">
          <Check className="h-4 w-4" /> OK
        </Button>
      ),
    })
  }

  return (
    <>
      {loading && (
        <LoadingScreen message={loadingMessage}>
          {progress > 0 && (
            <div className="w-64 mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center mt-1">{progress}%</p>
            </div>
          )}
        </LoadingScreen>
      )}

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar por E-mail</DialogTitle>
            <DialogDescription>Preencha os dados para enviar o {type} por e-mail.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailShare}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Destinatário</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={emailData.to}
                  onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  placeholder="Assunto do e-mail"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Mensagem do e-mail"
                  value={emailData.message}
                  onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                  rows={4}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowEmailDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit">Enviar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showWhatsAppDialog} onOpenChange={setShowWhatsAppDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar por WhatsApp</DialogTitle>
            <DialogDescription>Preencha os dados para enviar o {type} por WhatsApp.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWhatsAppShare}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número de Telefone</Label>
                <Input
                  id="number"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={whatsappData.number}
                  onChange={(e) => setWhatsAppData({ ...whatsappData, number: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-message">Mensagem</Label>
                <Textarea
                  id="whatsapp-message"
                  placeholder="Mensagem do WhatsApp"
                  value={whatsappData.message}
                  onChange={(e) => setWhatsAppData({ ...whatsappData, message: e.target.value })}
                  rows={4}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowWhatsAppDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit">Enviar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Opções de Exportação</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleExport("pdf")}>
            <FileText className="mr-2 h-4 w-4 text-red-500" />
            <span>Exportar como PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("word")}>
            <File className="mr-2 h-4 w-4 text-blue-500" />
            <span>Exportar como Word</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("excel")}>
            <FileText className="mr-2 h-4 w-4 text-green-500" />
            <span>Exportar como Excel</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("powerpoint")}>
            <FileImage className="mr-2 h-4 w-4 text-orange-500" />
            <span>Exportar como PowerPoint</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Compartilhar</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowEmailDialog(true)}>
            <Mail className="mr-2 h-4 w-4 text-blue-600" />
            <span>Enviar por E-mail</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowWhatsAppDialog(true)}>
            <Smartphone className="mr-2 h-4 w-4 text-green-600" />
            <span>Enviar por WhatsApp</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            <span>Copiar Link</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
