import LoanCalculatorSchema from './schema';

export default function LoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <LoanCalculatorSchema />
    </>
  );
}