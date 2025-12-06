/**
 * Execute Demo Data Clearance
 *
 * This script:
 * 1. Clears all demo/test data from production tables
 * 2. Keeps schema intact for fresh start
 * 3. Logs cleared records for audit trail
 */

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function clearDemoData() {
  console.log("[v0] Starting demo data clearance...")

  const clearLog = {
    timestamp: new Date().toISOString(),
    cleared: {} as Record<string, number>,
  }

  try {
    // Clear in proper order to respect foreign key constraints
    // Messages don't have FK constraints on properties
    const { count: messagesCleared } = await supabase.from("messages").delete().neq("id", "")
    console.log(`[v0] Cleared ${messagesCleared || 0} messages`)
    clearLog.cleared.messages = messagesCleared || 0

    // Property features must be deleted before properties
    const { count: featuresCleared } = await supabase.from("property_features").delete().neq("id", "")
    console.log(`[v0] Cleared ${featuresCleared || 0} property features`)
    clearLog.cleared.property_features = featuresCleared || 0

    // Clear properties
    const { count: propertiesCleared } = await supabase.from("properties").delete().neq("id", "")
    console.log(`[v0] Cleared ${propertiesCleared || 0} properties`)
    clearLog.cleared.properties = propertiesCleared || 0

    // Clear contacts
    const { count: contactsCleared } = await supabase.from("contacts").delete().neq("id", "")
    console.log(`[v0] Cleared ${contactsCleared || 0} contacts`)
    clearLog.cleared.contacts = contactsCleared || 0

    // Note: LLM configs might be worth keeping if they represent user preferences
    // Uncomment to also clear LLM configs:
    // const { count: configsCleared } = await supabase.from('llm_configs').delete().neq('id', '')
    // console.log(`[v0] Cleared ${configsCleared || 0} LLM configs`)
    // clearLog.cleared.llm_configs = configsCleared || 0

    console.log("[v0] Demo data clearance complete!")
    console.log(JSON.stringify(clearLog, null, 2))

    return clearLog
  } catch (error) {
    console.error("[v0] Error clearing demo data:", error)
    throw error
  }
}

clearDemoData()
