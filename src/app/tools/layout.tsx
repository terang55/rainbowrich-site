import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | 부동산 투자 계산기 - 레인보우리치',
    default: '부동산 투자 계산기 - 레인보우리치'
  },
  description: '부동산 투자에 필요한 모든 계산을 한 곳에서! 갭투자 수익률, 전세가율, 대출 이자, ROI 시뮬레이터 등 무료 계산기를 제공합니다.',
  keywords: [
    '부동산 계산기', '갭투자 계산기', '전세가율 계산기', '대출 이자 계산기',
    '투자 수익률 계산기', '아파트 적정가 계산기', '부동산 투자 도구',
    '부동산 ROI 계산', '부동산 투자 시뮬레이터', '무료 부동산 계산기'
  ],
  openGraph: {
    title: '부동산 투자 계산기 - 레인보우리치',
    description: '부동산 투자 성공을 위한 필수 계산기들을 무료로 제공합니다.',
    type: 'website',
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