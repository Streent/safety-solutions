"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Eraser, Save, Undo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SignaturePadProps {
  onSave: (signatureDataUrl: string) => void
  className?: string
}

export function SignaturePad({ onSave, className }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }

      // Set drawing style
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.strokeStyle = "black"
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Save initial state
    const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setHistory([initialState])
    setHistoryIndex(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)

    // Get coordinates
    let x, y
    if ("touches" in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get coordinates
    let x, y
    if ("touches" in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // Mouse event
      x = e.nativeEvent.offsetX
      y = e.nativeEvent.offsetY
    }

    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  const endDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas || !isDrawing) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(false)

    // Save current state to history
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // Remove any states after current index
    const newHistory = history.slice(0, historyIndex + 1)

    // Add new state
    newHistory.push(currentState)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)

    // Save cleared state
    const clearedState = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setHistory([clearedState])
    setHistoryIndex(0)
  }

  const undo = () => {
    if (historyIndex <= 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const newIndex = historyIndex - 1
    ctx.putImageData(history[newIndex], 0, 0)
    setHistoryIndex(newIndex)

    // Check if canvas is empty
    setHasSignature(newIndex > 0)
  }

  const saveSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL("image/png")
    onSave(dataUrl)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="border rounded-md overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-32 touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={clearCanvas} disabled={!hasSignature}>
            <Eraser className="h-4 w-4 mr-1" />
            Limpar
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
            <Undo className="h-4 w-4 mr-1" />
            Desfazer
          </Button>
        </div>
        <Button type="button" size="sm" onClick={saveSignature} disabled={!hasSignature}>
          <Save className="h-4 w-4 mr-1" />
          Salvar Assinatura
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Assine no espaço acima usando o mouse ou toque na tela
      </p>
    </div>
  )
}
