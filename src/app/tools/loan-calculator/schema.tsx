export default function LoanCalculatorSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "대출 이자 계산기",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "description": "주택담보대출의 월 상환액과 총 이자를 정확히 계산하고 다양한 상환 방식을 비교해보세요.",
    "featureList": "월 상환액 계산, 총 이자 비용, 상환 스케줄, 상환 방식 비교, 금리 변동 시뮬레이션",
    "url": "https://rainbowrich.site/tools/loan-calculator",
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