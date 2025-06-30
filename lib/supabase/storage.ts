import { createClient } from "./client"

const supabase = createClient()

export class ImageStorage {
  static async uploadPropertyImage(
    propertyId: string,
    file: File,
    userId: string,
  ): Promise<{ url: string; error?: string }> {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/${propertyId}/${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage.from("property-images").upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        return { url: "", error: error.message }
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("property-images").getPublicUrl(data.path)

      return { url: publicUrl }
    } catch (error) {
      return { url: "", error: "Failed to upload image" }
    }
  }

  static async uploadProfileImage(file: File, userId: string): Promise<{ url: string; error?: string }> {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/profile.${fileExt}`

      const { data, error } = await supabase.storage.from("profile-images").upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      })

      if (error) {
        return { url: "", error: error.message }
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("profile-images").getPublicUrl(data.path)

      return { url: publicUrl }
    } catch (error) {
      return { url: "", error: "Failed to upload profile image" }
    }
  }

  static async deleteImage(bucket: string, path: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.storage.from(bucket).remove([path])

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch (error) {
      return { error: "Failed to delete image" }
    }
  }

  static async optimizeImage(file: File, maxWidth = 1200): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!
      const img = new Image()

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(
          (blob) => {
            const optimizedFile = new File([blob!], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
            resolve(optimizedFile)
          },
          "image/jpeg",
          0.8,
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }
}
