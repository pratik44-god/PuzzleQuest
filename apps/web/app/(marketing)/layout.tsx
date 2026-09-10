export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      {children}
    </main>
  );
}