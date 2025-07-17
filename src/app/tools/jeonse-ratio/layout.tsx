import JeonseRatioSchema from './schema';

export default function JeonseRatioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <JeonseRatioSchema />
    </>
  );
}