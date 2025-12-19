# Documents Folder Structure

This folder contains PDF files for the website.

## Folder Structure

```
public/documents/
├── application-notes/    # TDR Application Notes PDFs
├── datasheets/           # Product Datasheet PDFs
└── README.md            # This file
```

## File Naming Conventions

### Application Notes
- **Location**: `public/documents/application-notes/`
- **Naming**: Use the application note ID in lowercase
- **Examples**:
  - `an150.pdf` (AN150 - Using Batteries)
  - `an223.pdf` (AN223 - Wet Twisted Pair Cable)
  - `an100.pdf` (AN100 - What SWR Does Not Show)
  - `white-paper-via.pdf` (White Paper - VIA Analyzer vs VIA Bravo)

### Product Datasheets
- **Location**: `public/documents/datasheets/`
- **Naming**: Use the product slug (same as URL slug)
- **Examples**:
  - `e20-20n.pdf` (for /products/e20-20n)
  - `e20-20-avionics.pdf` (for /products/e20-20-avionics)
  - `via-bravo-mri-3000.pdf` (for /products/via-bravo-mri-3000)
  - `swr-site-analyzer.pdf` (for /products/swr-site-analyzer)

## How It Works

The code automatically links to these files:
- **Application Notes**: Links are generated based on the note ID (e.g., `an223` → `/documents/application-notes/an223.pdf`)
- **Product Datasheets**: Links are generated based on the product slug (e.g., `e20-20n` → `/documents/datasheets/e20-20n.pdf`)

## Priority Order

1. **Sanity CMS URLs** (if file is uploaded to Sanity) - highest priority
2. **Local files** (if file exists in these folders) - fallback
3. **External URLs** (if set in Sanity) - fallback
4. **"#" placeholder** - if no file found

## SEO Benefits

Hosting PDFs locally provides:
- ✅ Better SEO (files on your domain)
- ✅ Faster loading (same domain, no external requests)
- ✅ Better user experience
- ✅ Full control over URLs and metadata
- ✅ Analytics tracking

