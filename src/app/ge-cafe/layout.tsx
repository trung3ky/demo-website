import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gé Cafe — Cà phê phong cách Địa Trung Hải tại Đà Nẵng",
  description:
    "Tiệm cà phê phong cách Địa Trung Hải tại Đà Nẵng. Không gian trắng sáng, gạch thô rustic, mở 06:00–03:00. 2 chi nhánh: 24 Lê Hồng Phong & 66 Đỗ Quang.",
  keywords: ["Gé Cafe", "cà phê Đà Nẵng", "Địa Trung Hải", "cold brew", "Lê Hồng Phong", "Đỗ Quang"],
  openGraph: {
    title: "Gé Cafe — Cà phê phong cách Địa Trung Hải tại Đà Nẵng",
    description:
      "Không gian trắng sáng, gạch thô rustic, mở 06:00–03:00. 2 chi nhánh tại Hải Châu và Thanh Khê.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function GeCafeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
