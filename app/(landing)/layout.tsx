export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased text-gomin-black bg-white">
      {children}
    </div>
  );
}
