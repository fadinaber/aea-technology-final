import fs from 'fs'

const filePath = 'app/resources/resources-client.tsx'
let content = fs.readFileSync(filePath, 'utf8')

// Only replace downloadUrl in application-notes section
// Pattern: Look for "application-notes": [ ... ] and replace downloadUrl: "#" with function calls

const lines = content.split('\n')
let inAppNotes = false
let currentId = null
const newLines = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  
  // Detect when we enter application-notes array
  if (line.includes('"application-notes":') || line.includes("'application-notes':")) {
    inAppNotes = true
    newLines.push(line)
    continue
  }
  
  // Detect when we exit application-notes array (closing bracket)
  if (inAppNotes && (line.trim() === '],' || line.trim() === ']')) {
    inAppNotes = false
    currentId = null
    newLines.push(line)
    continue
  }
  
  // Extract ID from line (only in application-notes)
  if (inAppNotes && line.includes('id: "')) {
    const match = line.match(/id:\s*"([^"]+)"/)
    if (match) {
      currentId = match[1]
    }
    newLines.push(line)
    continue
  }
  
  // Replace downloadUrl: "#" with function call (only in application-notes)
  if (inAppNotes && line.includes('downloadUrl:') && currentId) {
    if (line.includes('downloadUrl: "#"')) {
      // Remove any trailing comma, add function call with comma
      newLines.push(line.replace(/downloadUrl:\s*"#",?/, `downloadUrl: getAppNoteUrl("${currentId}"),`))
    } else {
      newLines.push(line)
    }
    continue
  }
  
  newLines.push(line)
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8')
console.log('Fixed all application note URLs')
