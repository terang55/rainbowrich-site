import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  
  return [
    {
      url: 'https://rainbowrich.site',
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://rainbowrich.site/updates',
      lastModified: currentDate,
      changeFrequency: 'weekly', // 업데이트가 자주 있으므로 변경
      priority: 0.9, // 중요도 상향
    },
    {
      url: 'https://rainbowrich.site/contact',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // 구매 페이지이므로 중요도 상향
    },
    // 추가 페이지들 (미래 확장용)
    /*
    {
      url: 'https://rainbowrich.site/features',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://rainbowrich.site/pricing',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://rainbowrich.site/support',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }
    */
  ]
} 