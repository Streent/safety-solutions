"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, Edit, Trash2, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface Media {
  url: string
  type: "image" | "video"
  description: string
}

interface MediaUploadProps {
  onMediaCaptured?: (files: File[]) => void
  existingMedia?: Media[]
  onRemoveExisting?: (index: number) => void
  onUpdateDescription?: (index: number, description: string) => void
  allowVideo?: boolean
  maxFiles?: number
}

export function MediaUpload({
  onMediaCaptured,
  existingMedia = [],
  onRemoveExisting,
  onUpdateDescription,
  allowVideo = false,
  maxFiles = 5,
}: MediaUploadProps) {
  const [capturedMedia, setCapturedMedia] = useState<File[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editDescription, setEditDescription] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)

      if (existingMedia.length + capturedMedia.length + files.length > maxFiles) {
        toast({
          title: "Limite de arquivos excedido",
          description: `Você pode adicionar no máximo ${maxFiles} arquivos.`,
          variant: "destructive",
        })
        return
      }

      setCapturedMedia((prev) => [...prev, ...files])
      if (onMediaCaptured) {
        onMediaCaptured(files)
      }

      // Limpar o input para permitir selecionar o mesmo arquivo novamente
      e.target.value = ""
    }
  }

  const handleCameraCapture = () => {
    if (cameraRef.current) {
      cameraRef.current.click()
    }
  }

  const handleVideoCapture = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click()
    }
  }

  const handleRemoveMedia = (index: number) => {
    if (onRemoveExisting) {
      onRemoveExisting(index)
    }
  }

  const handleEditDescription = (index: number, media: Media) => {
    setEditingIndex(index)
    setEditDescription(media.description)
  }

  const saveDescription = () => {
    if (editingIndex !== null && onUpdateDescription) {
      onUpdateDescription(editingIndex, editDescription)
      setEditingIndex(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Selecionar Arquivos
        </Button>
        <Button type="button" variant="outline" onClick={handleCameraCapture}>
          <Camera className="mr-2 h-4 w-4" />
          Capturar Foto
        </Button>
        {allowVideo && (
          <Button type="button" variant="outline" onClick={handleVideoCapture}>
            <Video className="mr-2 h-4 w-4" />
            Capturar Vídeo
          </Button>
        )}
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" multiple className="hidden" />
      <input
        type="file"
        ref={cameraRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />
      {allowVideo && (
        <input
          type="file"
          ref={videoInputRef}
          onChange={handleFileChange}
          accept="video/*"
          capture="environment"
          className="hidden"
        />
      )}

      {existingMedia.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Mídia Existente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {existingMedia.map((media, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                {media.type === "image" ? (
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={media.url || "/placeholder.svg"}
                      alt={media.description}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600"
                        onClick={() => handleRemoveMedia(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleEditDescription(index, media)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 bg-gray-100">
                    <video src={media.url} controls className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600"
                        onClick={() => handleRemoveMedia(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleEditDescription(index, media)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                <div className="p-3 bg-white dark:bg-gray-800">
                  <p className="text-sm truncate">{media.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={editingIndex !== null} onOpenChange={(open) => !open && setEditingIndex(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Descrição</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditingIndex(null)}>
              Cancelar
            </Button>
            <Button type="button" onClick={saveDescription}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p className="text-xs text-muted-foreground mt-2">
        Formatos suportados: JPG, PNG, GIF{allowVideo ? ", MP4, WebM" : ""}. Máximo de {maxFiles} arquivos.
      </p>
    </div>
  )
}
