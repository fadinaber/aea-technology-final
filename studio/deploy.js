#!/usr/bin/env node
/**
 * Deploy script that sets the hostname programmatically
 */
import { spawn } from 'child_process'

const hostname = 'aeatechnology'

console.log(`🚀 Deploying Sanity Studio with hostname: ${hostname}.sanity.studio\n`)

const deploy = spawn('npx', ['sanity', 'deploy'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true,
})

// Wait a moment then send the hostname selection
setTimeout(() => {
  // Select the existing hostname (press Enter)
  deploy.stdin?.write('\n')
  setTimeout(() => {
    deploy.stdin?.end()
  }, 1000)
}, 2000)

deploy.on('close', (code) => {
  if (code === 0) {
    console.log(`\n✅ Deployment complete!`)
    console.log(`📝 Access your Studio at: https://${hostname}.sanity.studio`)
  } else {
    console.error(`\n❌ Deployment failed with code ${code}`)
  }
  process.exit(code || 0)
})

