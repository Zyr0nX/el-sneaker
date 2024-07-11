import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: [
    {
      path: "./Gilroy-bold.woff2",
      weight: "700",
      style: "normal"
    }
  ],
  display: "swap",
  variable: "--font-gilroy"
});
