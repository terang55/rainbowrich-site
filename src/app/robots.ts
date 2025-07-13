import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 모든 검색 엔진에 공통적으로 적용될 규칙
  const commonRules = {
    allow: '/',
    disallow: [
      '/private/',      // 비공개 페이지
      '/admin/',        // 관리자 페이지
      '/order/success', // 주문 성공 페이지
      '/*?*',           // 쿼리 파라미터가 있는 모든 URL (중복 콘텐츠 방지)
    ],
  };

  return {
    rules: [
      // Google, Bing, Naver 등 주요 봇에 대한 규칙
      {
        userAgent: ['Googlebot', 'Bingbot', 'NaverBot', 'Daum'],
        ...commonRules,
        // crawlDelay: 1, // 필요시 주석 해제 (1초 딜레이)
      },
      // 그 외 모든 봇에 대한 규칙 (API 경로는 모든 봇에게 차단)
      {
        userAgent: '*',
        ...commonRules,
        disallow: [
          ...commonRules.disallow,
          '/api/', // API 경로는 모든 봇에게 차단
        ],
      },
    ],
    sitemap: 'https://rainbowrich.site/sitemap.xml',
  };
} 