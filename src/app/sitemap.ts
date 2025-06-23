import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mohdharish.xyz'; // Make sure this is your production URL

  // Add your static routes here
  const staticRoutes = [
    '/',
    '/blog',
    '/mascot',
    '/terminal',
    '/timeline',
    '/skills-radar',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // In the future, you can fetch dynamic blog post slugs here
  // const blogPosts = ...
  // const blogUrls = blogPosts.map(post => ({ ... }))

  return [
    ...staticUrls,
    // ...blogUrls 
  ];
}
