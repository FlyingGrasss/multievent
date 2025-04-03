import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://multievent.org',
      lastModified: new Date(),
    },
    {
      url: 'https://multievent.org/contact',
      lastModified: new Date(),
    },
    // Add all other pages
  ]
}