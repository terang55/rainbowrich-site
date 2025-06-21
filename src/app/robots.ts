import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
      userAgent: '*',
      allow: '/',
        disallow: [
          '/private/', 
          '/admin/', 
          '/api/',
          '/order/success',
          '/*?*',
          '/temp/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/private/', 
          '/admin/',
          '/order/success',
          '/*?*',
        ],
    },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/private/', 
          '/admin/',
          '/order/success',
          '/*?*',
        ],
      },
      {
        userAgent: 'NaverBot',
        allow: '/',
        disallow: [
          '/private/', 
          '/admin/',
          '/order/success',
          '/*?*',
        ],
      }
    ],
    sitemap: 'https://rainbowrich.site/sitemap.xml',
    host: 'https://rainbowrich.site',
  }
} 