import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMORE 24/7 — Không Gian Sáng Tạo Không Ngủ Tại Đà Nẵng",
  description:
    "Tổ hợp cà phê, nghệ thuật và đồ thủ công mở cửa 24/7 tại Đà Nẵng. Không phụ thu đêm. 2 cơ sở Hải Châu: 72-76 Lê Đình Dương & 191 Nguyễn Hoàng.",
  keywords: ["TMORE", "cà phê 24/7", "Đà Nẵng", "tô tượng", "acoustic", "workshop", "không gian học tập"],
  openGraph: {
    title: "TMORE 24/7 — Không Gian Sáng Tạo Không Ngủ Tại Đà Nẵng",
    description:
      "Tổ hợp cà phê, nghệ thuật và đồ thủ công mở cửa 24/7. Không phụ thu đêm. Đêm nhạc Acoustic mỗi tối thứ Sáu.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function TMORELayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
