import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | 부동산 계산기 - 레인보우리치',
    default: '부동산 계산기 - 레인보우리치'
  },
  description: '부동산 투자에 필요한 모든 계산기를 한 곳에서! 갭투자 수익률, 전세가율, 대출 이자, ROI 시뮬레이터 등 무료 부동산 계산기로 투자 결정을 더 쉽고 정확하게!',
  keywords: [
    '부동산 계산기', '무료 부동산 계산기', '갭투자 계산기', '전세가율 계산기', 
    '부동산 대출 계산기', '부동산 수익률 계산기', '아파트 적정가 계산기', 
    '부동산 투자 도구', '부동산 ROI 계산', '부동산 투자 시뮬레이터',
    '부동산 현금흐름 계산', '부동산 투자 분석', '부동산 투자 계산'
  ],
  openGraph: {
    title: '부동산 계산기 - 레인보우리치',
    description: '부동산 투자에 필요한 모든 계산기를 무료로 제공합니다. 갭투자, 전세가율, 대출 이자 등 5가지 부동산 계산기로 투자 결정을 더 쉽고 정확하게!',
    type: 'website',
    images: [
      {
        url: 'https://rainbowrich.site/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '부동산 계산기 모음 - 레인보우리치',
      }
    ],
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}