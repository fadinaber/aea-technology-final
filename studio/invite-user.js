#!/usr/bin/env node
/**
 * Helper script to invite users to Sanity project
 * 
 * Usage: node invite-user.js email@example.com [role]
 * 
 * Roles: administrator, editor, viewer, contributor
 * Default: editor
 */

const email = process.argv[2]
const role = process.argv[3] || 'editor'

if (!email) {
  console.error('❌ Error: Email address is required')
  console.log('\nUsage: node invite-user.js email@example.com [role]')
  console.log('\nRoles: administrator, editor, viewer, contributor')
  console.log('Default: editor')
  process.exit(1)
}

const validRoles = ['administrator', 'editor', 'viewer', 'contributor']
if (!validRoles.includes(role)) {
  console.error(`❌ Error: Invalid role "${role}"`)
  console.log(`Valid roles: ${validRoles.join(', ')}`)
  process.exit(1)
}

console.log(`📧 Inviting ${email} with role: ${role}\n`)

const { spawn } = require('child_process')

const invite = spawn('npx', ['sanity', 'users', 'invite', email, '--role', role], {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true,
})

invite.on('close', (code) => {
  if (code === 0) {
    console.log(`\n✅ Invitation sent successfully!`)
    console.log(`📝 ${email} will receive an email invitation to join the project.`)
  } else {
    console.error(`\n❌ Invitation failed with code ${code}`)
    console.log('\n💡 Make sure you are logged in: npx sanity login')
  }
  process.exit(code || 0)
})

