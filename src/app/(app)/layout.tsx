import type { Metadata } from "next";
import "../globals.css";
import { ClientProviders } from "../provider";
import { gilroy } from "~/utils/font/gilroy";
import { beVietnamPro } from "~/utils/font/be-vietnam-pro";
import Header from "~/components/header";
import Footer from "~/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProviders>
      <div
        className={`text-neutral-900 ${gilroy.variable} ${beVietnamPro.className}`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </ClientProviders>
  );
}
