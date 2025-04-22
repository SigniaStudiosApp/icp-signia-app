export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#171717] text-[#F2F2F2] font-sans min-h-screen">{children}</body>
    </html>
  );
}
