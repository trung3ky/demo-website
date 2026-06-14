import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tab Tea — Trà Tươi Đậm Vị Từ Đà Nẵng",
  description:
    "Thưởng thức trà sữa sạch, trà tươi đậm vị chuẩn nguyên chất từ Tab Tea Đà Nẵng. 3 chi nhánh tại Liên Chiểu, Ngũ Hành Sơn và Hải Châu. Chỉ từ 22.000đ.",
  keywords: ["Tab Tea", "trà sữa", "Đà Nẵng", "trà tươi", "trà sữa sạch", "Liên Chiểu", "Ngũ Hành Sơn"],
  openGraph: {
    title: "Tab Tea — Trà Tươi Đậm Vị Từ Đà Nẵng",
    description:
      "Trà sữa sạch, trân châu tươi nấu mỗi 4 giờ. 3 chi nhánh tại Đà Nẵng. Chỉ từ 22.000đ.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function TabTeaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
