import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ailanthus",
  description: "Portfolio of Aidan H",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
