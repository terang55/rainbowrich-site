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
      url: 'https://rainbowrich.site/order',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // 구매 페이지이므로 높은 우선순위
    },
    {
      url: 'https://rainbowrich.site/sample',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // 샘플 신청 페이지
    },
    {
      url: 'https://rainbowrich.site/blog',
      lastModified: currentDate,
      changeFrequency: 'weekly', // 블로그 콘텐츠 업데이트
      priority: 0.8, // SEO를 위한 높은 우선순위
    },
    {
      url: 'https://rainbowrich.site/features',
      lastModified: currentDate,
      changeFrequency: 'monthly', // 기능 소개 페이지
      priority: 0.8, // 주요 페이지이므로 높은 우선순위
    },
    {
      url: 'https://rainbowrich.site/updates',
      lastModified: currentDate,
      changeFrequency: 'weekly', // 업데이트가 자주 있으므로 변경
      priority: 0.7, // 중요도 조정
    },
    {
      url: 'https://rainbowrich.site/contact',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // 계산기 도구들
    {
      url: 'https://rainbowrich.site/tools',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // 높은 우선순위 - SEO 핵심 페이지
    },
    {
      url: 'https://rainbowrich.site/tools/gap-calculator',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://rainbowrich.site/tools/jeonse-ratio',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://rainbowrich.site/tools/loan-calculator',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://rainbowrich.site/tools/roi-simulator',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://rainbowrich.site/tools/fair-price',
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // order/success는 노인덱스 처리 (robots.txt에서 차단)
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