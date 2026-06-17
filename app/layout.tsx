import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

const notoSansKR = localFont({
  src: [
    {
      path: "../public/fonts/noto-sans-kr-korean-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/noto-sans-kr-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/noto-sans-kr-korean-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/noto-sans-kr-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/noto-sans-kr-korean-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/noto-sans-kr-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

const nanumGothic = localFont({
  src: [
    {
      path: "../public/fonts/nanum-gothic-korean-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/nanum-gothic-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/nanum-gothic-korean-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/nanum-gothic-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-nanum-gothic",
});

export const metadata: Metadata = {
  title: "Stamplo",
  description: "팝업스토어 디지털 스탬프 랠리 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`h-full antialiased ${notoSansKR.variable} ${nanumGothic.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
