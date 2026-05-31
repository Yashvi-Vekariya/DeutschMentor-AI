import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeutschMentor AI",
  description: "AI-powered German learning platform from A1 to C2"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

