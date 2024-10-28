import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ai·lan·thus",
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
