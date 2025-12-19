# File Linking Verification

## ✅ Application Notes - Automatically Linked

All application notes in `public/documents/application-notes/` are automatically detected and linked based on the AN number in the filename.

### How It Works:
- System scans the folder for PDF files
- Extracts AN numbers from filenames (e.g., "AN258", "an150")
- Creates automatic links to `/documents/application-notes/{an-id}`
- Files are served dynamically when clicked

### Files Detected:
- ✅ All files with "AN###" pattern are detected
- ✅ "Cold Weather Operation" → mapped to `an153`
- ✅ "VIA Analyzer vs the VIA Bravo" → mapped to `white-paper-via`

### Testing:
Visit `/api/application-notes/mapping` to see which files were detected and their mappings.

## ✅ Datasheets - Automatically Linked

All datasheets in `public/documents/datasheets/` are automatically detected and linked to product pages.

### File Mappings:
- `Avionics Data Sheet 10 2025.pdf` → `e20-20-avionics`
- `Bravo EX Data Sheet 10 2025.pdf` → `via-bravo-ex2`
- `Bravo MRI 3000 Data Sheet 10 2025.pdf` → `via-bravo-mri-3000`
- `E2020 General Data Sheet Nov 2025.pdf` → `e20-20n`, `e20-20b`, `e20-20f-catv` (shared)
- `SWR Data Sheet 10 2025.pdf` → `swr-site-analyzer`

### How It Works:
- System scans the folder for PDF files
- Extracts product identifiers from filenames (e.g., "Avionics", "Bravo MRI", "SWR")
- Creates automatic links to `/documents/datasheets/{product-slug}`
- Files are served dynamically when clicked from product pages

### Product Pages:
Each product page has a "Datasheet" download button in the Resources tab that links to the appropriate datasheet.

## Verification Steps

1. **Application Notes:**
   - Visit `/resources?tab=application-notes`
   - Click on any application note
   - Verify the PDF downloads correctly

2. **Datasheets:**
   - Visit any product page (e.g., `/products/e20-20-avionics`)
   - Go to the "Resources" tab
   - Click "Download" on the Datasheet card
   - Verify the PDF downloads correctly

3. **API Endpoints:**
   - `/api/application-notes/mapping` - Shows all detected application notes
   - `/documents/application-notes/{an-id}` - Serves application note PDFs
   - `/documents/datasheets/{slug}` - Serves datasheet PDFs

## Notes

- Files are served dynamically, so no renaming is required
- The system automatically matches files based on content in the filename
- If a file isn't detected, check the filename contains the expected keywords/numbers
- All links are generated automatically - no manual configuration needed

