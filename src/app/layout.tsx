import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMORE 24/7 — Không Gian Sáng Tạo Không Ngủ Tại Đà Nẵng",
  description: "Tổ hợp cà phê, nghệ thuật và đồ thủ công mở cửa 24/7 tại Đà Nẵng. Không phụ thu đêm. 2 cơ sở tại Hải Châu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
