import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://craftchirp.com';

  return {
    rules: [
      {
        // General search engine crawlers
        userAgent: ['Googlebot', 'Bingbot', 'YandexBot', 'Baiduspider', 'Applebot'],
        allow: '/',
        disallow: ['/admin', '/admin/*', '/checkout', '/checkout/*', '/order-confirmation/*'],
      },
      {
        // Reputable Generative AI Crawlers & LLM Search Agents
        userAgent: [
          'OAI-SearchBot',
          'GPTBot',
          'ClaudeBot',
          'PerplexityBot',
          'Google-Extended',
          'CCBot',
        ],
        allow: [
          '/',
          '/gallery',
          '/art/*',
          '/artists/*',
          '/collections/*',
          '/exhibitions/*',
          '/jewellery',
          '/journal/*',
          '/about',
          '/feed/*',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: ['/admin', '/admin/*', '/checkout', '/checkout/*', '/order-confirmation/*'],
      },
      {
        // Fallback for all other crawlers
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/checkout', '/order-confirmation/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

