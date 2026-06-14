import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Freelance Demo",
    template: "%s | Đà Nẵng",
  },
  description: "Trang web giới thiệu dịch vụ tại Đà Nẵng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
