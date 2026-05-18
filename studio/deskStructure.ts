import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('AEA Technology CMS')
    .items([

      // ── Pages & Settings ──────────────────────────────────────────
      S.listItem()
        .title('🏠  Homepage')
        .child(S.document().schemaType('homepage').documentId('homepage').title('Homepage')),

      S.listItem()
        .title('ℹ️  About Page')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('About Page')),

      S.listItem()
        .title('⚙️  Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),

      S.divider(),

      // ── Products ──────────────────────────────────────────────────
      S.listItem()
        .title('📦  Products')
        .child(
          S.documentTypeList('product')
            .title('Products')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.divider(),

      // ── Resources ─────────────────────────────────────────────────
      S.listItem()
        .title('📝  Application Notes')
        .child(
          S.documentTypeList('resource')
            .title('Application Notes')
            .filter('_type == "resource" && type == "application-note"')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      S.listItem()
        .title('💾  Software & Manuals')
        .child(
          S.documentTypeList('resource')
            .title('Software & Manuals')
            .filter('_type == "resource" && (type == "software" || type == "manual")')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),

      S.listItem()
        .title('🎬  Videos')
        .child(
          S.documentTypeList('resource')
            .title('Videos')
            .filter('_type == "resource" && type == "video"')
        ),

      S.divider(),

      // ── News ──────────────────────────────────────────────────────
      S.listItem()
        .title('📰  Press Releases')
        .child(
          S.documentTypeList('pressRelease')
            .title('Press Releases')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),

      S.listItem()
        .title('❓  FAQs')
        .child(
          S.documentTypeList('faq')
            .title('FAQs')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ── People & Partners ─────────────────────────────────────────
      S.listItem()
        .title('👤  Team Members')
        .child(
          S.documentTypeList('teamMember')
            .title('Team Members')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('🌍  Distributors')
        .child(
          S.documentTypeList('distributor')
            .title('Distributors')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
    ])
