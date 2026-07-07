import { MetadataRoute } from 'next'
import { serviceAreas } from '@/lib/data/serviceAreas'
import { serviceDetails } from '@/lib/data/services'
import { blogPosts } from '@/lib/data/blogPosts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gtascrub.com'

  // Base routes
  const routes = ['', '/about', '/contact', '/faq', '/services', '/service-areas', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic Service Areas
  const areas = serviceAreas.map((area) => ({
    url: `${baseUrl}/service-areas/${area.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic Services
  const services = serviceDetails.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Dynamic Blog Posts
  const blogs = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate).toISOString(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...routes, ...areas, ...services, ...blogs]
}
