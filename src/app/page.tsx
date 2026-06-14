import type { Metadata } from "next";
import TMOREPage from './tmore/page';
import TabTeaPage from './tab-tea/page';
import { APP_CONFIG } from './config';

const META = {
  'tmore': {
    title: 'TMORE 24/7 — Không Gian Sáng Tạo Không Ngủ Tại Đà Nẵng',
    description: 'Tổ hợp cà phê, nghệ thuật và đồ thủ công mở cửa 24/7 tại Đà Nẵng. Không phụ thu đêm. 2 cơ sở Hải Châu: 72-76 Lê Đình Dương & 191 Nguyễn Hoàng.',
  },
  'tab-tea': {
    title: 'Tab Tea — Trà Tươi Đậm Vị Từ Đà Nẵng',
    description: 'Thưởng thức trà sữa sạch, trà tươi đậm vị chuẩn nguyên chất từ Tab Tea Đà Nẵng. 3 chi nhánh tại Liên Chiểu, Ngũ Hành Sơn và Hải Châu. Chỉ từ 22.000đ.',
  },
} as const;

export const metadata: Metadata = META[APP_CONFIG.rootApp];

export default function Page() {
  if (APP_CONFIG.rootApp === 'tab-tea') {
    return <TabTeaPage />;
  }
  return <TMOREPage />;
}