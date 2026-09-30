export const SITE_NAME = 'Saree Times'
/** Social crawlers need absolute image URLs, so this must never fall back to localhost in production. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sareetimes.com'
export const SITE_TAGLINE = 'Reported with care · Written to last'
export const SITE_DESCRIPTION =
  'Saree Times is a daily record of the stories that matter — politics, business, technology, sport and culture, reported plainly and edited with care.'
