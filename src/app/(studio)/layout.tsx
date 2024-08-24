import type { Metadata } from "next";
import { inter } from "~/utils/font/inter";
import "../globals.css";

export const metadata: Metadata = {
  title: "El.sneaker CMS",
  description: "Sneaker and stuff authentic 100%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#f1f3f6] ${inter.variable}`}>{children}</body>
    </html>
  );
}
