export default function FairPriceCalculatorSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "아파트 적정가 계산기",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "description": "다양한 요소를 고려하여 아파트의 적정 매매가를 산출하고 투자 가치를 평가해보세요.",
    "featureList": "시세 기반 적정가, 협상 가격 제안, 투자 가치 평가, 단위 가격 계산, 시세 비교 분석",
    "url": "https://rainbowrich.site/tools/fair-price",
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