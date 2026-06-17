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
  title: {
    default: "Stamplo - 모바일 스탬프 투어 플랫폼",
    template: "%s | Stamplo",
  },
  description:
    "종이 브로슈어와 도장 대신 웹서비스와 QR코드로 간편하게 즐기는 모바일 스탬프 투어 플랫폼, Stamplo",
  keywords: [
    "스탬프",
    "스탬프 투어",
    "스탬프 랠리",
    "팝업스토어",
    "QR 스탬프",
    "행사",
    "Stamplo",
  ],
  openGraph: {
    title: "Stamplo - 모바일 스탬프 투어 플랫폼",
    description:
      "종이 브로슈어와 도장 대신 웹서비스와 QR코드로 간편하게 즐기는 모바일 스탬프 투어 플랫폼, Stamplo",
    url: "https://go-stamplo.vercel.app",
    siteName: "Stamplo",
    images: [
      {
        url: "/images/landing/landingThumbnail.png",
        width: 1200,
        height: 630,
        alt: "Stamplo 썸네일",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stamplo - 모바일 스탬프 투어 플랫폼",
    description:
      "종이 브로슈어와 도장 대신 웹서비스와 QR코드로 간편하게 시작하는 모바일 스탬프 투어 플랫폼, Stamplo",
    images: ["/images/landing/landingThumbnail.png"],
  },
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
