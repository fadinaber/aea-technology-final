// Sanity Schema Index
// Export all schemas for registration

import product from "./product"
import pressRelease from "./press-release"
import resource from "./resource"
import faq from "./faq"
import distributor from "./distributor"
import teamMember from "./team-member"
import page from "./page"
import siteSettings from "./site-settings"
import homepage from "./homepage"
import aboutPage from "./about-page"

export const schemaTypes = [
  // Documents
  product,
  pressRelease,
  resource,
  faq,
  distributor,
  teamMember,
  page,

  // Singletons
  siteSettings,
  homepage,
  aboutPage,
]
