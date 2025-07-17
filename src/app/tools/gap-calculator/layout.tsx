import GapCalculatorSchema from './schema';

export default function GapCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <GapCalculatorSchema />
    </>
  );
}