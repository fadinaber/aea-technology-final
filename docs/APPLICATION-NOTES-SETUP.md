# Application Notes Setup Guide

## ✅ No Renaming Required!

You can now paste your application note PDFs into the folder with **any filename** - the system will automatically detect and link them!

## Where to Put Application Notes PDFs

**Location**: `public/documents/application-notes/`

## How It Works

The system automatically:
1. Scans the folder for PDF files
2. Extracts the application note ID from the filename (e.g., "AN258", "an258")
3. Links them automatically based on the ID found

### Supported Filename Formats

The system can detect application note IDs from these filename patterns:

✅ **Works:**
- `63dc295f5032918ac9873629_AN258 USB-to-Serial Communications.pdf` → Detects "an258"
- `AN258 USB-to-Serial Communications.pdf` → Detects "an258"
- `an258.pdf` → Detects "an258"
- `AN258.pdf` → Detects "an258"
- `Application Note 258.pdf` → Detects "an258"
- `White Paper VIA Analyzer vs VIA Bravo.pdf` → Detects "white-paper-via"

### Examples

| Your Filename | System Detects | Links To |
|--------------|----------------|----------|
| `63dc295f5032918ac9873629_AN258 USB-to-Serial Communications.pdf` | `an258` | `/documents/application-notes/an258` |
| `AN150 Using Batteries.pdf` | `an150` | `/documents/application-notes/an150` |
| `White Paper VIA Analyzer vs VIA Bravo.pdf` | `white-paper-via` | `/documents/application-notes/white-paper-via` |

## Step-by-Step Instructions

1. **Navigate to the folder**:
   ```
   public/documents/application-notes/
   ```

2. **Copy your PDF files** into this folder - **keep their original names!**

3. **That's it!** The system will automatically:
   - Detect the application note ID from each filename
   - Link them on the Resources page
   - Make them available for download

## How the System Finds Files

The system looks for these patterns in filenames:
- `AN###` or `an###` (e.g., "AN258", "an150")
- Numbers in the range 100-259 (e.g., "258" in "Application Note 258")
- "white paper" + "via" for the white paper

## Complete List of Application Notes

The system expects these application note IDs (it will find them automatically):

### General Application Notes
- `an150` - Using Batteries in AEA Technology Instruments
- `an152` - Troubleshooting Serial Port Operations
- `an153` - Cold Weather Operations for AEA Technology Instruments

### VNA Application Notes
- `an100` through `an132` - Various VNA topics
- `white-paper-via` - White Paper - VIA Analyzer vs VIA Bravo

### TDR Application Notes
- `an200` through `an259` - Various TDR topics

## Testing

After adding files, you can:
1. Visit `/api/application-notes/mapping` to see which files were detected
2. Check the Resources page - the application notes should appear automatically
3. Click on any application note to download it

## Troubleshooting

**File not showing up?**
- Make sure the file is a PDF (`.pdf` extension)
- Check that the filename contains the application note ID (e.g., "AN258", "an150")
- Visit `/api/application-notes/mapping` to see if the file was detected

**File detected but link doesn't work?**
- The system uses a dynamic route that finds files automatically
- Make sure the file is in `public/documents/application-notes/`
- Check the browser console for any errors

## Benefits

✅ **No renaming required** - paste files as-is  
✅ **Automatic detection** - system finds IDs in filenames  
✅ **Flexible naming** - works with various filename formats  
✅ **Easy to manage** - just add files to the folder  
