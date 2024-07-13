import localFont from "next/font/local";

export const gilroy = localFont({
  src: [
    {
      path: "./Gilroy-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Gilroy-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gilroy",
});
