export default function JeonseRatioSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "전세가율 계산기",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "description": "매매가 대비 전세가 비율을 계산하여 투자 안전성을 판단하세요.",
    "featureList": "전세가율 자동 계산, 지역 평균 비교, 투자 위험도 평가, 수익률 분석, 갭투자 분석",
    "url": "https://rainbowrich.site/tools/jeonse-ratio",
    "creator": {
      "@type": "Organization",
      "name": "레인보우리치"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}