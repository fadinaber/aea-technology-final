import { spawn } from "node:child_process"

// Disable Turbopack (more stable on Windows right now)
// Next 16 supports the flag; env vars vary by version.
process.env.NEXT_DISABLE_TURBOPACK = "1"

// #region agent log
fetch('http://127.0.0.1:7242/ingest/5cdeb406-5c0a-4951-a5a6-6f8a4dcbcc43',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'scripts/dev-no-turbo.mjs:9',message:'dev launcher starting',data:{platform:process.platform,node:process.version,disableTurbopackEnv:process.env.NEXT_DISABLE_TURBOPACK},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'})}).catch(()=>{});
// #endregion agent log

const child = spawn("next", ["dev"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
})

child.on("exit", (code) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/5cdeb406-5c0a-4951-a5a6-6f8a4dcbcc43',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'scripts/dev-no-turbo.mjs:24',message:'dev launcher child exit',data:{code},timestamp:Date.now(),sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1'})}).catch(()=>{});
  // #endregion agent log
  process.exit(code ?? 0)
})


