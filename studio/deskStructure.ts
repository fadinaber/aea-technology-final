import { StructureBuilder } from 'sanity/desk'

// Icons for better visual navigation
const icons = {
  home: '🏠',
  settings: '⚙️',
  about: 'ℹ️',
  products: '📦',
  resources: '📚',
  appNotes: '📝',
  press: '📰',
  faq: '❓',
  distributors: '🌍',
  team: '👥',
}

export const deskStructure = (S: StructureBuilder) => {
  return S.list()
    .title('AEA Technology CMS')
    .items([
      // ========== PAGES (Most Used) ==========
      S.listItem()
        .title(`${icons.home} Homepage`)
        .id('homepage-singleton')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Edit Homepage')
        ),
      
      S.listItem()
        .title(`${icons.about} About Page`)
        .id('about-singleton')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('Edit About Page')
        ),
      
      S.divider(),
      
      // ========== CONTENT ==========
      S.listItem()
        .title(`${icons.products} Products`)
        .id('products-list')
        .child(
          S.documentTypeList('product')
            .title('All Products')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),
      
      S.listItem()
        .title(`${icons.press} Press Releases`)
        .id('press-list')
        .child(
          S.documentTypeList('pressRelease')
            .title('Press Releases')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),
      
      S.listItem()
        .title(`${icons.faq} FAQs`)
        .id('faq-list')
        .child(
          S.documentTypeList('faq')
            .title('Frequently Asked Questions')
            .defaultOrdering([{ field: 'question', direction: 'asc' }])
        ),
      
      S.divider(),
      
      // ========== RESOURCES ==========
      S.listItem()
        .title(`${icons.resources} Resources`)
        .id('resources-group')
        .child(
          S.list()
            .title('Resources')
            .items([
              S.listItem()
                .title(`${icons.appNotes} Application Notes`)
                .id('app-notes')
                .child(
                  S.documentTypeList('resource')
                    .title('Application Notes')
                    .filter('_type == "resource" && type == "application-note"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              
              S.listItem()
                .title('💾 Software')
                .id('software')
                .child(
                  S.documentTypeList('resource')
                    .title('Software Downloads')
                    .filter('type == "software"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              
              S.listItem()
                .title('📖 Manuals')
                .id('manuals')
                .child(
                  S.documentTypeList('resource')
                    .title('Manuals & Guides')
                    .filter('type == "manual" || type == "guide"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              
              S.listItem()
                .title('🎥 Videos')
                .id('videos')
                .child(
                  S.documentTypeList('resource')
                    .title('Video Resources')
                    .filter('type == "video"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              
              S.listItem()
                .title('🎓 Training Materials')
                .id('training')
                .child(
                  S.documentTypeList('resource')
                    .title('Training Materials')
                    .filter('type == "training"')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
              
              S.divider(),
              
              S.listItem()
                .title('📋 All Resources')
                .id('all-resources')
                .child(
                  S.documentTypeList('resource')
                    .title('All Resources')
                    .defaultOrdering([{ field: 'type', direction: 'asc' }, { field: 'title', direction: 'asc' }])
                ),
            ])
        ),
      
      S.divider(),
      
      // ========== CONTACTS & DISTRIBUTION ==========
      S.listItem()
        .title(`${icons.distributors} Distributors`)
        .id('distributors-list')
        .child(
          S.documentTypeList('distributor')
            .title('Distributors & Representatives')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),
      
      S.listItem()
        .title(`${icons.team} Team Members`)
        .id('team-list')
        .child(
          S.documentTypeList('teamMember')
            .title('Team Members')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),
      
      S.divider(),
      
      // ========== SETTINGS ==========
      S.listItem()
        .title(`${icons.settings} Site Settings`)
        .id('settings-singleton')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Site Settings')
        ),
    ])
}
