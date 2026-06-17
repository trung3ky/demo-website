"use client";

import React, { useState } from 'react';

type BranchKey = 'g1' | 'g2' | 'g3';
type MenuCat = 'all' | 'espresso' | 'cold' | 'tea' | 'pastry';

interface MenuItem {
  id: string;
  cat: Exclude<MenuCat, 'all'>;
  name: string;
  price: string;
  desc: string;
  popular?: boolean;
}

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
}

const BRANCHES: Record<BranchKey, { label: string; short: string; address: string; embed: string }> = {
  g1: {
    label: 'Gé1 — Lê Hồng Phong',
    short: 'Gé1',
    address: '24-26 Lê Hồng Phong, Hải Châu, Đà Nẵng',
    embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d900!2d108.2198686!3d16.0659729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219fa6c34dc6d%3A0x4676f79b884440cf!2sG%C3%A9%20Cafe!5e0!3m2!1svi!2svn!4v1718600000000!5m2!1svi!2svn',
  },
  g2: {
    label: 'Gé2 — Đỗ Quang',
    short: 'Gé2',
    address: '66 Đỗ Quang, Thanh Khê, Đà Nẵng',
    embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d900!2d108.2079423!3d16.0628245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219824f8cbd6f%3A0xad2c63e0689b6697!2sG%C3%A9%20Cafe%20-%20CN%20%C4%90%E1%BB%97%20Quang!5e0!3m2!1svi!2svn!4v1718600000001!5m2!1svi!2svn',
  },
  g3: {
    label: 'Gé3 — Nguyễn Phước Lan',
    short: 'Gé3',
    address: '123 Nguyễn Phước Lan, Hoà Xuân, Cẩm Lệ, Đà Nẵng',
    embed: 'GE3_EMBED_URL',
  },
};

const MENU: MenuItem[] = [
  { id: 'm1', cat: 'espresso', name: 'Espresso', price: '29.000₫', desc: 'Shot đậm đặc từ hạt rang đặc biệt của Gé.', popular: true },
  { id: 'm2', cat: 'espresso', name: 'Americano', price: '35.000₫', desc: 'Espresso pha với nước nóng, vị thanh và nhẹ.' },
  { id: 'm3', cat: 'espresso', name: 'Latte', price: '45.000₫', desc: 'Espresso và sữa tươi steamed bông mịn.', popular: true },
  { id: 'm4', cat: 'espresso', name: 'Cappuccino', price: '45.000₫', desc: 'Tỷ lệ cân bằng espresso – sữa – foam chuẩn Ý.' },
  { id: 'm5', cat: 'cold', name: 'Cold Brew', price: '55.000₫', desc: 'Ủ lạnh 12 tiếng, vị mượt sâu không gắt.', popular: true },
  { id: 'm6', cat: 'cold', name: 'Cold Brew Tonic', price: '60.000₫', desc: 'Cold brew kết hợp tonic sủi bọt, chua thanh mát.' },
  { id: 'm7', cat: 'cold', name: 'Dirty Matcha', price: '65.000₫', desc: 'Shot espresso đổ lên matcha latte đá lạnh.' },
  { id: 'm8', cat: 'cold', name: 'Cà Phê Sữa Đá', price: '35.000₫', desc: 'Phin Việt truyền thống, sữa đặc Ngôi Sao.' },
  { id: 'm9', cat: 'tea', name: 'Trà Đào Cam Sả', price: '45.000₫', desc: 'Đào tươi, cam và sả thơm — mát sảng khoái.', popular: true },
  { id: 'm10', cat: 'tea', name: 'Trà Ô Long Lạnh', price: '40.000₫', desc: 'Ô long ủ nóng rồi làm lạnh, hương hoa nhẹ.' },
  { id: 'm11', cat: 'pastry', name: 'Croissant Bơ', price: '35.000₫', desc: 'Handmade mỗi sáng — vỏ giòn, lõi mềm béo ngậy.' },
  { id: 'm12', cat: 'pastry', name: 'Bánh Flan Caramel', price: '30.000₫', desc: 'Flan mịn, caramel đắng nhẹ tự làm tại quán.' },
];

const INIT_REVIEWS: Review[] = [
  {
    id: 'r1', name: 'Minh Anh', date: '2 tuần trước', rating: 5,
    text: 'Không gian cực kỳ chill, ánh sáng tự nhiên đổ vào làm mình ngồi cả buổi sáng không muốn về. Cold brew ở đây là ngon nhất Đà Nẵng mình từng uống.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
  },
  {
    id: 'r2', name: 'Trọng Khải', date: '1 tháng trước', rating: 5,
    text: 'Tông màu trắng sáng, gạch thô và gỗ mộc tạo không khí rất riêng. Latte pha khéo, sữa foam đẹp. Hay ghé buổi sáng sớm khi còn vắng người.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
  },
  {
    id: 'r3', name: 'Thu Hà', date: '3 tuần trước', rating: 5,
    text: 'Chú ý từ đồ uống đến không gian. Cái "é" nhỏ trên bảng hiệu cũng được chăm chút. Mở đến 3h sáng không tính phụ thu — quá ổn cho dân hay thức khuya.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
  },
];

const GALLERY = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=900', alt: 'Không gian Gé Cafe' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600', alt: 'Espresso shot' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=700', alt: 'Latte art' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800', alt: 'Góc ngồi đọc sách' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=700', alt: 'Cold brew' },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800', alt: 'Không gian làm việc' },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=700', alt: 'Croissant handmade' },
];

const MENU_CATS: { val: MenuCat; label: string }[] = [
  { val: 'all', label: 'Tất cả' },
  { val: 'espresso', label: 'Espresso' },
  { val: 'cold', label: 'Cold Brew' },
  { val: 'tea', label: 'Trà' },
  { val: 'pastry', label: 'Bánh' },
];

const NAV_LINKS = [
  { href: '#about', label: 'Về chúng tôi' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'Không gian' },
  { href: '#reviews', label: 'Đánh giá' },
  { href: '#location', label: 'Địa chỉ' },
];

const GE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  :root {
    --blanc:    #F7F5F0;
    --med:      #4B7FA3;
    --brique:   #C08B6A;
    --bois:     #7A5C3D;
    --vert:     #5E8B4A;
    --espresso: #1E1209;
    --esp40:    rgba(30,18,9,0.4);
    --esp12:    rgba(30,18,9,0.08);
    --med12:    rgba(75,127,163,0.12);
  }

  html { scroll-behavior: smooth; }

  .ge-display { font-family: 'Lora', Georgia, serif; }
  .ge-body    { font-family: 'DM Sans', system-ui, sans-serif; }

  .ge-motif {
    font-family: 'Lora', serif;
    font-style: italic;
    font-weight: 700;
    color: var(--med);
    opacity: 0.07;
    user-select: none;
    pointer-events: none;
    line-height: 0.8;
    letter-spacing: -0.05em;
  }

  .ge-divider::before {
    content: 'é';
    font-family: 'Lora', serif;
    font-style: italic;
    font-weight: 700;
    color: var(--brique);
    opacity: 0.25;
    font-size: 2rem;
    display: block;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  @keyframes ge-fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ge-fade-up { animation: ge-fade-up 0.7s ease both; }
  .ge-fade-up-2 { animation: ge-fade-up 0.7s 0.15s ease both; }
  .ge-fade-up-3 { animation: ge-fade-up 0.7s 0.3s ease both; }
`;

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="w-3 h-3">
          <path
            d="M6 1l1.236 3.236L11 4.618l-2.618 2.382.764 3.764L6 8.882 3.854 10.764l.764-3.764L2 4.618l3.764-.382z"
            fill={i < n ? 'var(--brique)' : '#DDD'}
          />
        </svg>
      ))}
    </span>
  );
}

export default function GeCafePage() {
  const [activeBranch, setActiveBranch] = useState<BranchKey>('g1');
  const [menuCat, setMenuCat] = useState<MenuCat>('all');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(INIT_REVIEWS);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);

  const filtered = menuCat === 'all' ? MENU : MENU.filter(m => m.cat === menuCat);
  const branch = BRANCHES[activeBranch];

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setReviews(prev => [{
      id: 'r_' + Date.now(),
      name: form.name,
      date: 'Vừa xong',
      rating: form.rating,
      text: form.text,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    }, ...prev]);
    setForm({ name: '', text: '', rating: 5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="ge-body min-h-screen" style={{ background: 'var(--blanc)', color: 'var(--espresso)' }}>
      <style dangerouslySetInnerHTML={{ __html: GE_CSS }} />

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav
        className="fixed top-0 inset-x-0 z-40 border-b backdrop-blur-md"
        style={{ background: 'rgba(247,245,240,0.9)', borderColor: 'var(--esp12)' }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#" className="ge-display text-2xl font-bold italic" style={{ color: 'var(--espresso)' }}>
            Gé<span style={{ color: 'var(--brique)' }}>.</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium transition-opacity hover:opacity-50" style={{ color: 'var(--espresso)' }}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:0795545485"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{ background: 'var(--med)', color: '#fff' }}
            >
              <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Gọi ngay
            </a>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'var(--espresso)' }}
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen
                  ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t px-5 pt-4 pb-6 flex flex-col gap-4" style={{ borderColor: 'var(--esp12)' }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium py-1" style={{ color: 'var(--espresso)' }}>
                {l.label}
              </a>
            ))}
            <a href="tel:0795545485" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full w-fit mt-1" style={{ background: 'var(--med)', color: '#fff' }}>
              Gọi 0795 545 485
            </a>

          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=1800"
          alt="Không gian Gé Cafe — phong cách Địa Trung Hải"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(30,18,9,0.80) 0%, rgba(30,18,9,0.25) 55%, rgba(30,18,9,0.05) 100%)' }}
        />

        {/* Signature "é" motif */}
        <div
          className="ge-motif absolute right-[-2rem] top-1/2 -translate-y-1/2 select-none"
          style={{ fontSize: 'clamp(18rem, 35vw, 42rem)' }}
          aria-hidden
        >
          é
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 pb-20 pt-36 w-full">
          <p className="ge-fade-up text-xs tracking-[0.25em] uppercase font-semibold mb-5" style={{ color: 'var(--brique)' }}>
            Cà phê · Đà Nẵng
          </p>
          <h1 className="ge-display ge-fade-up-2 font-bold italic text-white leading-[0.88] mb-7" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}>
            Gé<span style={{ color: 'var(--brique)' }}>.</span>
          </h1>
          <p className="ge-fade-up-3 max-w-sm md:max-w-md text-white/75 leading-relaxed mb-9" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' }}>
            Một góc Địa Trung Hải giữa lòng Đà Nẵng — nơi cà phê được pha chỉnh chu và ánh sáng luôn đủ để ngồi lâu.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#menu"
              className="px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: 'var(--med)', color: '#fff' }}
            >
              Xem thực đơn
            </a>
            <a
              href="#location"
              className="px-6 py-3 rounded-full text-sm font-semibold border border-white/30 text-white transition-all hover:bg-white/10"
            >
              Tìm chi nhánh
            </a>
          </div>
          <div className="mt-14 flex flex-wrap gap-6 text-white/45 text-xs tracking-widest uppercase font-medium">
            <span>06:00 – 03:00</span>
            <span>·</span>
            <span>3 chi nhánh</span>
            <span>·</span>
            <span>Hải Châu · Thanh Khê · Cẩm Lệ</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-16 max-w-xl">
            <p className="text-xs tracking-[0.22em] uppercase font-semibold mb-4" style={{ color: 'var(--med)' }}>Về Gé Cafe</p>
            <h2 className="ge-display text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: 'var(--espresso)' }}>
              Không chỉ là<br />một quán cà phê.
            </h2>
            <p className="leading-relaxed text-sm md:text-base" style={{ color: 'var(--espresso)', opacity: 0.6 }}>
              Gé được xây dựng từ một ý tưởng đơn giản — tạo ra không gian nơi người ta muốn ở lại. Gạch thô, gỗ mộc và ánh sáng tự nhiên tạo nên một góc châu Âu thật sự giữa lòng phố biển.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                symbol: '◎',
                title: 'Không gian mở, sáng và thật',
                body: 'Sân ngoài gạch thô dưới nắng, nội thất gỗ ấm bên trong — mỗi góc đều đáng ngồi. Tầng 2 nhìn xuống phố Đà Nẵng vào ban đêm là trải nghiệm riêng.',
              },
              {
                symbol: '◉',
                title: 'Cà phê được pha chỉnh chu',
                body: 'Từ espresso rang đặc biệt đến cold brew ủ 12 tiếng — đồ uống tại Gé được làm với sự tôn trọng thật sự dành cho nguyên liệu và kỹ thuật.',
              },
              {
                symbol: '◈',
                title: 'Mở đến 3 giờ sáng, không phụ thu',
                body: 'Không gian dành cho những ai cần thêm vài tiếng để làm việc, học bài, hoặc chỉ đơn giản là muốn ngồi yên với một ly cà phê giữa đêm.',
              },
            ].map(card => (
              <div
                key={card.title}
                className="p-8 rounded-2xl border transition-transform duration-300 hover:-translate-y-1"
                style={{ borderColor: 'var(--esp12)', background: '#FFFFFF' }}
              >
                <div className="ge-display text-3xl italic mb-6" style={{ color: 'var(--med)' }}>{card.symbol}</div>
                <h3 className="ge-display font-semibold text-lg mb-3 leading-snug" style={{ color: 'var(--espresso)' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--espresso)', opacity: 0.6 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENU ─────────────────────────────────────────── */}
      <section id="menu" className="py-24 md:py-32 border-y" style={{ borderColor: 'var(--esp12)', background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs tracking-[0.22em] uppercase font-semibold mb-3" style={{ color: 'var(--med)' }}>Thực đơn</p>
              <h2 className="ge-display text-4xl md:text-5xl font-bold" style={{ color: 'var(--espresso)' }}>Menu.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {MENU_CATS.map(tab => (
                <button
                  key={tab.val}
                  onClick={() => setMenuCat(tab.val)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={{
                    background: menuCat === tab.val ? 'var(--espresso)' : 'transparent',
                    color: menuCat === tab.val ? '#fff' : 'var(--espresso)',
                    borderColor: menuCat === tab.val ? 'var(--espresso)' : 'var(--esp40)',
                    opacity: menuCat === tab.val ? 1 : 0.6,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {filtered.map(item => (
              <div
                key={item.id}
                className="py-5 border-b"
                style={{ borderColor: 'var(--esp12)' }}
              >
                <div className="flex items-start justify-between gap-4 mb-1.5">
                  <span className="ge-display font-semibold text-base leading-tight" style={{ color: 'var(--espresso)' }}>
                    {item.name}
                    {item.popular && (
                      <span
                        className="ml-2 text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded align-middle"
                        style={{ background: 'var(--med12)', color: 'var(--med)' }}
                      >
                        Bán chạy
                      </span>
                    )}
                  </span>
                  <span className="text-sm font-semibold shrink-0 tabular-nums" style={{ color: 'var(--brique)' }}>
                    {item.price}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--espresso)', opacity: 0.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs" style={{ color: 'var(--espresso)', opacity: 0.35 }}>
            * Giá có thể thay đổi theo mùa. Hotline 0795 545 485 để đặt trước hoặc hỏi thêm.
          </p>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────── */}
      <section id="gallery" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-12">
            <p className="text-xs tracking-[0.22em] uppercase font-semibold mb-3" style={{ color: 'var(--med)' }}>Không gian</p>
            <h2 className="ge-display text-4xl md:text-5xl font-bold" style={{ color: 'var(--espresso)' }}>Một vài khoảnh khắc.</h2>
          </div>

          <div className="columns-2 md:columns-3 gap-3">
            {GALLERY.map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => setLightbox(photo.src)}
                className="break-inside-avoid mb-3 rounded-xl overflow-hidden cursor-zoom-in group relative"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  style={{ aspectRatio: i % 3 === 1 ? '3/4' : i % 5 === 0 ? '1/1' : '4/3' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────── */}
      <section id="reviews" className="py-24 md:py-32 border-y" style={{ borderColor: 'var(--esp12)', background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-12">
            <p className="text-xs tracking-[0.22em] uppercase font-semibold mb-3" style={{ color: 'var(--med)' }}>Khách hàng nói gì</p>
            <h2 className="ge-display text-4xl md:text-5xl font-bold" style={{ color: 'var(--espresso)' }}>Đánh giá.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Review list */}
            <div className="lg:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-1">
              {reviews.map(rev => (
                <div key={rev.id} className="p-6 rounded-2xl border" style={{ borderColor: 'var(--esp12)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img src={rev.avatar} alt={rev.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                      <div>
                        <p className="text-sm font-semibold leading-none">{rev.name}</p>
                        <p className="text-xs mt-0.5" style={{ opacity: 0.4 }}>{rev.date}</p>
                      </div>
                    </div>
                    <Stars n={rev.rating} />
                  </div>
                  <p className="ge-display text-sm leading-relaxed italic" style={{ color: 'var(--espresso)', opacity: 0.75 }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Review form */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-2xl border" style={{ borderColor: 'var(--esp12)' }}>
                <h3 className="ge-display text-xl font-semibold mb-1" style={{ color: 'var(--espresso)' }}>Để lại đánh giá</h3>
                <p className="text-sm mb-6" style={{ opacity: 0.5 }}>Chia sẻ trải nghiệm của bạn tại Gé.</p>

                {submitted ? (
                  <p className="text-sm py-4 font-medium" style={{ color: 'var(--vert)' }}>✓ Cảm ơn bạn! Đánh giá đã được ghi nhận.</p>
                ) : (
                  <form onSubmit={handleReview} className="space-y-4">
                    <input
                      required
                      placeholder="Tên của bạn"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                      style={{ borderColor: 'var(--esp12)', background: 'var(--blanc)', color: 'var(--espresso)' }}
                    />
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, rating: n }))}
                          className="text-2xl transition-transform hover:scale-110 leading-none"
                          style={{ color: n <= form.rating ? 'var(--brique)' : '#DDD' }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      required
                      rows={4}
                      placeholder="Chia sẻ cảm nhận của bạn..."
                      value={form.text}
                      onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      style={{ borderColor: 'var(--esp12)', background: 'var(--blanc)', color: 'var(--espresso)' }}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-85"
                      style={{ background: 'var(--espresso)', color: '#fff' }}
                    >
                      Gửi đánh giá
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────────── */}
      <section id="location" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-10">
            <p className="text-xs tracking-[0.22em] uppercase font-semibold mb-3" style={{ color: 'var(--med)' }}>Tìm chúng tôi</p>
            <h2 className="ge-display text-4xl md:text-5xl font-bold mb-7" style={{ color: 'var(--espresso)' }}>Ba chi nhánh.</h2>
            <div className="flex gap-3">
              {(Object.keys(BRANCHES) as BranchKey[]).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveBranch(key)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-all"
                  style={{
                    background: activeBranch === key ? 'var(--med)' : 'transparent',
                    color: activeBranch === key ? '#fff' : 'var(--med)',
                    borderColor: 'var(--med)',
                  }}
                >
                  {BRANCHES[key].short}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 rounded-2xl overflow-hidden border" style={{ height: 420, borderColor: 'var(--esp12)' }}>
              {branch.embed === 'GE3_EMBED_URL' ? (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-8"
                  style={{ background: 'var(--esp12)', color: 'var(--espresso)', opacity: 0.6 }}
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-sm font-medium">{branch.address}</p>
                  <p className="text-xs">Cần điền embed URL Google Maps trong code.</p>
                </div>
              ) : (
                <iframe
                  src={branch.embed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Bản đồ ${branch.label}`}
                />
              )}
            </div>

            <div className="lg:col-span-4 space-y-7">
              <div>
                <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: 'var(--med)' }}>Địa chỉ</p>
                <p className="ge-display font-semibold leading-snug text-base" style={{ color: 'var(--espresso)' }}>{branch.address}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: 'var(--med)' }}>Điện thoại</p>
                <a href="tel:0795545485" className="font-bold text-2xl ge-display hover:opacity-60 transition-opacity" style={{ color: 'var(--espresso)' }}>
                  0795 545 485
                </a>
                <p className="text-xs mt-1" style={{ opacity: 0.4 }}>Tất cả chi nhánh</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase font-semibold mb-2" style={{ color: 'var(--med)' }}>Giờ mở cửa</p>
                <p className="ge-display font-bold text-3xl leading-none" style={{ color: 'var(--espresso)' }}>06:00</p>
                <p className="ge-display font-bold text-3xl leading-none" style={{ color: 'var(--brique)' }}>– 03:00</p>
                <p className="text-xs mt-2" style={{ opacity: 0.4 }}>Mỗi ngày · Không phụ thu đêm</p>
              </div>
              <a
                href="https://www.facebook.com/gecafedanang/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: 'var(--med)' }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook · Gé Cafe Đà Nẵng
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t py-14" style={{ borderColor: 'var(--esp12)' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <p className="ge-display text-4xl font-bold italic mb-2" style={{ color: 'var(--espresso)' }}>
                Gé<span style={{ color: 'var(--brique)' }}>.</span>
              </p>
              <p className="text-xs" style={{ opacity: 0.35 }}>Cà phê · Đà Nẵng · 06:00 – 03:00</p>
            </div>

            <div className="flex flex-col gap-1.5 text-sm" style={{ color: 'var(--espresso)', opacity: 0.55 }}>
              <span className="font-medium">Gé1: 24-26 Lê Hồng Phong, Hải Châu</span>
              <span className="font-medium">Gé2: 66 Đỗ Quang, Thanh Khê</span>
              <span className="font-medium">Gé3: 123 Nguyễn Phước Lan, Cẩm Lệ</span>
            </div>

            <div className="text-sm" style={{ color: 'var(--espresso)', opacity: 0.45 }}>
              <p>Điện thoại: 0795 545 485</p>
              <a href="https://www.facebook.com/gecafedanang/" target="_blank" rel="noreferrer" className="hover:opacity-60 transition-opacity" style={{ color: 'var(--med)' }}>
                facebook.com/gecafedanang
              </a>
              <p className="mt-2">© 2025 Gé Cafe Đà Nẵng</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          style={{ background: 'rgba(30,18,9,0.93)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl font-light leading-none transition-colors"
            aria-label="Đóng"
          >
            ✕
          </button>
          <img
            src={lightbox}
            alt="Ảnh phóng to"
            className="max-w-full max-h-[88vh] rounded-xl object-contain shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
