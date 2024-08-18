import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El.sneaker",
  description: "Sneaker and stuff authentic 100%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 antialiased">
        {children}
      </body>
    </html>
  );
}
