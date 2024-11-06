import type { Metadata } from "next";
import "../globals.css";
import { ClientProviders } from "../provider";
import { gilroy } from "~/utils/font/gilroy";
import { beVietnamPro } from "~/utils/font/be-vietnam-pro";
import Header from "~/components/header";
import Footer from "~/components/footer";
import { Analytics } from "@vercel/analytics/react";

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
      <body
        className={`text-neutral-900 ${gilroy.variable} ${beVietnamPro.className}`}
      >
        <ClientProviders>
            <Header />
            <main>{children}</main>
            <Footer />
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
