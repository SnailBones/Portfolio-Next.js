import TreeCanvas from "@/components/treeViz/treeViz";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ailanthus",
  description: "Aidan H",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="background">
          <TreeCanvas />
        </div>
        {children}
      </body>
    </html>
  );
}
