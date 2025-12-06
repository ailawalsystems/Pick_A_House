import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

let supabaseClient: ReturnType<typeof createServerClient> | null = null

export function createClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const cookieStore = cookies()

  supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch (error) {
            console.error("[v0] Error setting cookies:", error)
          }
        },
      },
    },
  )

  return supabaseClient
}
