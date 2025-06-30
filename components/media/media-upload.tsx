"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ImagePlus, Trash, Upload, X } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

interface MediaFile {
  id: string
  file: File
  url: string
  type: "image" | "video"
}

export function MediaUpload() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image/") ? "image" : "video",
      }))

      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image/") ? "image" : "video",
      }))

      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleRemove = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-2 text-center",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="rounded-full bg-primary/10 p-4">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Drag and drop your files here</h3>
        <p className="text-sm text-muted-foreground">or click the button below to select files</p>
        <p className="text-xs text-muted-foreground mt-2">
          Supported formats: JPG, PNG, GIF, MP4, WebM <br />
          Max file size: 10MB
        </p>
        <Button type="button" variant="outline" className="mt-2" onClick={() => fileInputRef.current?.click()}>
          <ImagePlus className="mr-2 h-4 w-4" />
          Select Files
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*, video/*"
          multiple
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Uploaded Files ({files.length})</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {files.map((file) => (
              <div key={file.id} className="group relative aspect-square rounded-md border overflow-hidden">
                {file.type === "image" ? (
                  <Image src={file.url || "/placeholder.svg"} alt={file.file.name} fill className="object-cover" />
                ) : (
                  <video src={file.url} className="h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button type="button" variant="destructive" size="icon" onClick={() => handleRemove(file.id)}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={() => handleRemove(file.id)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
                  {file.type === "image" ? "Image" : "Video"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
