import RoiSimulatorSchema from './schema';

export default function RoiSimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <RoiSimulatorSchema />
    </>
  );
}