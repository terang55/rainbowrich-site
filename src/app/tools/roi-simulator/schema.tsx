export default function RoiSimulatorSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "부동산 투자 수익률 시뮬레이터 (ROI)",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "description": "다양한 시나리오별 부동산 투자 수익률을 시뮬레이션하여 최적의 투자 결정을 내리세요.",
    "featureList": "시나리오 분석, 세금 고려 분석, 인플레이션 조정 분석, 리스크 분석, 벤치마크 비교, 민감도 분석",
    "url": "https://rainbowrich.site/tools/roi-simulator",
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