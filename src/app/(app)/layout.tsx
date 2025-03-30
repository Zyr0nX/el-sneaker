import type { Metadata } from "next";
import "../globals.css";
import { ClientProviders } from "../provider";
import { gilroy } from "~/utils/font/gilroy";
import { beVietnamPro } from "~/utils/font/be-vietnam-pro";
import Header from "~/components/header";
import Footer from "~/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

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
        <SpeedInsights />
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API = Tawk_API || {},
                Tawk_LoadStart = new Date();
            (function() {
              var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/67e4f224aab3cd1911b88047/1inb53o2b';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
