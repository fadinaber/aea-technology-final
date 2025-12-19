import { StructureBuilder } from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) => {
  return S.list()
    .title('Content')
    .items([
      // Application Notes Section - Dedicated section at the top
      S.listItem()
        .title('Application Notes')
        .child(
          S.documentTypeList('resource')
            .title('Application Notes')
            .filter('type == "application-note"')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      
      // Divider
      S.divider(),
      
      // Other Resources
      S.listItem()
        .title('Other Resources')
        .child(
          S.documentTypeList('resource')
            .title('Other Resources')
            .filter('_type == "resource" && type != "application-note"')
        ),
      
      // Divider
      S.divider(),
      
      // Products
      S.listItem()
        .title('Products')
        .child(S.documentTypeList('product').title('Products')),
      
      // Press Releases
      S.listItem()
        .title('Press Releases')
        .child(S.documentTypeList('pressRelease').title('Press Releases')),
      
      // FAQs
      S.listItem()
        .title('FAQs')
        .child(S.documentTypeList('faq').title('FAQs')),
      
      // Distributors
      S.listItem()
        .title('Distributors')
        .child(S.documentTypeList('distributor').title('Distributors')),
      
      // Team Members
      S.listItem()
        .title('Team Members')
        .child(S.documentTypeList('teamMember').title('Team Members')),
      
      // Divider
      S.divider(),
      
      // Pages (Singletons)
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      
      S.listItem()
        .title('About Page')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),
      
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ])
}

