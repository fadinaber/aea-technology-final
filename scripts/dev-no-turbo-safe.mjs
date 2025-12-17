import { spawn } from "node:child_process"
import { createRequire } from "node:module"
import fs from "node:fs"
import path from "node:path"

// Disable Turbopack (more stable on Windows right now)
// Next 16: prefer explicit CLI flag.
process.env.NEXT_DISABLE_TURBOPACK = "1"

function loadEnvLocal() {
  try {
    const envPath = path.join(process.cwd(), ".env.local")
    if (!fs.existsSync(envPath)) return { loaded: false, reason: "missing" }
    const content = fs.readFileSync(envPath, "utf8")
    const lines = content.split(/\r?\n/)
    let applied = 0
    for (const raw of lines) {
      const line = raw.trim()
      if (!line || line.startsWith("#")) continue
      const eq = line.indexOf("=")
      if (eq <= 0) continue
      const key = line.slice(0, eq).trim()
      let value = line.slice(eq + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      if (!key) continue
      if (process.env[key] == null || process.env[key] === "") {
        process.env[key] = value
        applied++
      }
    }
    return { loaded: true, applied }
  } catch (e) {
    return { loaded: false, reason: "error" }
  }
}

const envLoad = loadEnvLocal()

// Avoid `shell: true` to prevent Node DEP0190 deprecation warning.
// Run the Next CLI directly via Node to keep behavior consistent across Windows/macOS/Linux.
const require = createRequire(import.meta.url)
const nextBin = require.resolve("next/dist/bin/next")

const child = spawn(process.execPath, [nextBin, "dev"], {
  stdio: "inherit",
  shell: false,
  env: process.env,
})

child.on("exit", (code) => {
  process.exit(code ?? 0)
})


