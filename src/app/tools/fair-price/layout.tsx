import FairPriceCalculatorSchema from './schema';

export default function FairPriceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FairPriceCalculatorSchema />
    </>
  );
}