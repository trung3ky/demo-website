import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nối Café — Quán cà phê hoài niệm giữa lòng Đà Nẵng",
  description:
    "Nối Café — không gian retro vintage tại 113/18 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng. Máy đánh chữ, đĩa vinyl, đèn dầu và cà phê trứng đặc trưng. Mở 06:30–22:00.",
  keywords: [
    "Nối Cafe",
    "Nối Café",
    "cà phê retro Đà Nẵng",
    "cà phê hoài niệm",
    "cà phê trứng Đà Nẵng",
    "Nguyễn Chí Thanh",
    "vintage cafe Da Nang",
  ],
  openGraph: {
    title: "Nối Café — Quán cà phê hoài niệm giữa lòng Đà Nẵng",
    description:
      "Máy đánh chữ, đĩa vinyl, đèn dầu và nhạc xưa. Cà phê trứng 35,000đ. Mở 06:30–22:00 tại Hải Châu, Đà Nẵng.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function NoiCafeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
