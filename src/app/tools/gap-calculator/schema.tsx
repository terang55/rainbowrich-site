export default function GapCalculatorSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "갭투자 수익률 계산기",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "description": "갭투자의 예상 수익률과 현금흐름을 정확하게 계산해보세요.",
    "featureList": "월 현금흐름 계산, 연간 수익률 산출, 투자 회수 기간, 매도차익 계산, 총 수익 분석",
    "url": "https://rainbowrich.site/tools/gap-calculator",
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