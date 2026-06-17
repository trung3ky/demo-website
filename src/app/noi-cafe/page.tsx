"use client";

import React, { useState, useEffect } from 'react';

type MenuCat = 'all' | 'coffee' | 'tea' | 'drink' | 'food';

interface MenuItem {
  id: string;
  cat: Exclude<MenuCat, 'all'>;
  name: string;
  price: string;
  desc: string;
  signature?: boolean;
}

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
}

const MENU: MenuItem[] = [
  { id: 'm1', cat: 'coffee', name: 'Cà Phê Trứng', price: '35.000₫', desc: 'Lòng đỏ trứng đánh bông cùng sữa đặc, phủ lên espresso đậm — đặc sản Hà Nội.', signature: true },
  { id: 'm2', cat: 'coffee', name: 'Cacao Trứng', price: '35.000₫', desc: 'Phiên bản cacao của cà phê trứng — đậm đà, béo ngậy và ngọt vừa phải.' },
  { id: 'm3', cat: 'coffee', name: 'Bạc Xỉu', price: '20.000₫', desc: 'Nhiều sữa, ít cà phê — nhẹ nhàng và thân thuộc cho buổi sáng sớm.', signature: true },
  { id: 'm4', cat: 'coffee', name: 'Cà Phê Đen', price: '15.000₫', desc: 'Phin nhỏ giọt từng chút, uống nóng hoặc đá — đơn giản và đúng điệu.' },
  { id: 'm5', cat: 'coffee', name: 'Cà Phê Sữa', price: '20.000₫', desc: 'Cà phê phin truyền thống với sữa đặc Ngôi Sao.' },
  { id: 'm6', cat: 'tea', name: 'Trà Đào', price: '25.000₫', desc: 'Đào tươi, thanh mát — lựa chọn nhẹ nhàng cho buổi chiều.' },
  { id: 'm7', cat: 'tea', name: 'Trà Gừng Mật Ong', price: '25.000₫', desc: 'Ấm bụng, thơm gừng — thích hợp những ngày mưa.' },
  { id: 'm8', cat: 'drink', name: 'Nước Chanh Muối', price: '20.000₫', desc: 'Chua thanh, mặn nhẹ — giải nhiệt tức thì.' },
  { id: 'm9', cat: 'drink', name: 'Sinh Tố Bơ', price: '30.000₫', desc: 'Bơ Đà Lạt xay mịn với sữa đặc — béo ngậy.' },
  { id: 'm10', cat: 'food', name: 'Bánh Mì Que', price: '15.000₫', desc: 'Bánh mì Đà Nẵng giòn rụm, ăn kèm cà phê sáng.' },
  { id: 'm11', cat: 'food', name: 'Xôi Ngũ Sắc', price: '25.000₫', desc: 'Xôi nếp dẻo nhiều màu, no lâu cho buổi sáng.' },
];

const MENU_CATS: { val: MenuCat; label: string }[] = [
  { val: 'all', label: 'Tất cả' },
  { val: 'coffee', label: 'Cà phê' },
  { val: 'tea', label: 'Trà' },
  { val: 'drink', label: 'Nước' },
  { val: 'food', label: 'Ăn sáng' },
];

const GALLERY = [
  { id: 'p1', src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=900', alt: 'Không gian retro Nối Café' },
  { id: 'p2', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600', alt: 'Cà phê buổi sáng' },
  { id: 'p3', src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=700', alt: 'Góc đọc sách vintage' },
  { id: 'p4', src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800', alt: 'Đĩa nhựa vinyl' },
  { id: 'p5', src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=700', alt: 'Ly cà phê trứng' },
  { id: 'p6', src: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800', alt: 'Ánh đèn dầu vàng ấm' },
  { id: 'p7', src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=700', alt: 'Góc máy đánh chữ' },
  { id: 'p8', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800', alt: 'Ngoài sân quán' },
];

const INIT_REVIEWS: Review[] = [
  {
    id: 'r1', name: 'Lan Anh', date: '1 tuần trước', rating: 5,
    text: 'Bước vào Nối như bước vào căn nhà của ông bà — đồ đạc cũ kỹ, nhạc xưa, mùi cà phê phin quen thuộc. Cà phê trứng ngon không thua gì Hà Nội.',
  },
  {
    id: 'r2', name: 'Hoàng Minh', date: '2 tuần trước', rating: 5,
    text: 'Không gian yên tĩnh, khách ngồi nói chuyện nhỏ nhẹ. Mình thích nhất cái góc có máy đánh chữ — ngồi đó làm việc cả buổi sáng mà không muốn về.',
  },
  {
    id: 'r3', name: 'Thùy Dung', date: '3 tuần trước', rating: 5,
    text: 'Bạc xỉu ở đây rất đúng vị — sữa nhiều, cà phê đủ, không quá ngọt. Giá cả bình dân mà không gian thì cực kỳ có hồn.',
  },
  {
    id: 'r4', name: 'Phúc Nguyên', date: '1 tháng trước', rating: 4,
    text: 'Lần đầu đến vì thấy ảnh máy đánh chữ trên mạng, ở lại vì cái không khí không nơi nào có. Quán nhỏ nhưng mỗi góc đều có một câu chuyện.',
  },
];

const NOI_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,400;1,600;1,700&family=Nunito:wght@300;400;500;600;700&display=swap');

  :root {
    --paper:  #FBF7F1;
    --cream:  #F2EAD8;
    --ink:    #2C1F14;
    --amber:  #C17F24;
    --warm:   #8B5E3C;
    --sage:   #6B8F71;
    --smoke:  #7A6F62;
    --dark:   #1E1510;
    --border: rgba(44,31,20,0.1);
    --amber-light: rgba(193,127,36,0.12);
  }

  html { scroll-behavior: smooth; }

  .n-serif { font-family: 'Playfair Display', Georgia, serif; }
  .n-sans  { font-family: 'Nunito', system-ui, sans-serif; }

  .n-cursor::after {
    content: '|';
    color: var(--amber);
    animation: n-blink 1s step-end infinite;
  }
  @keyframes n-blink { 0%,100%{opacity:1} 50%{opacity:0} }

  @keyframes n-up {
    from { opacity:0; transform: translateY(20px); }
    to   { opacity:1; transform: translateY(0); }
  }
  .n-up   { animation: n-up 0.7s ease both; }
  .n-up-2 { animation: n-up 0.7s 0.18s ease both; }
  .n-up-3 { animation: n-up 0.7s 0.36s ease both; }

  .n-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .n-card:hover {
    box-shadow: 0 8px 32px rgba(44,31,20,0.08);
    transform: translateY(-2px);
  }

  .n-photo {
    overflow: hidden;
    border-radius: 12px;
  }
  .n-photo img {
    transition: transform 0.5s ease;
  }
  .n-photo:hover img {
    transform: scale(1.05);
  }
`;

const TYPEWRITER_TEXT = '— nơi cũ, người mới, chuyện chưa kể.';

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="w-3.5 h-3.5">
          <path
            d="M6 1l1.236 3.236L11 4.618l-2.618 2.382.764 3.764L6 8.882 3.854 10.764l.764-3.764L2 4.618l3.764-.382z"
            fill={i < n ? 'var(--amber)' : '#E2D8CF'}
          />
        </svg>
      ))}
    </span>
  );
}

export default function NoiCafePage() {
  const [menuCat, setMenuCat] = useState<MenuCat>('all');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(INIT_REVIEWS);
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [typed, setTyped] = useState('');
  const [typeDone, setTypeDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < TYPEWRITER_TEXT.length) {
          setTyped(TYPEWRITER_TEXT.slice(0, i + 1));
          i++;
        } else {
          setTypeDone(true);
          clearInterval(interval);
        }
      }, 55);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = menuCat === 'all' ? MENU : MENU.filter(m => m.cat === menuCat);

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setReviews(prev => [{
      id: 'r_' + Date.now(),
      name: form.name,
      date: 'Vừa xong',
      rating: form.rating,
      text: form.text,
    }, ...prev]);
    setForm({ name: '', text: '', rating: 5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const NAV_LINKS = [
    { href: '#about', label: 'Về quán' },
    { href: '#menu', label: 'Menu' },
    { href: '#gallery', label: 'Không gian' },
    { href: '#reviews', label: 'Đánh giá' },
    { href: '#location', label: 'Địa chỉ' },
  ];

  return (
    <div className="n-sans min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <style dangerouslySetInnerHTML={{ __html: NOI_CSS }} />

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav
        className="fixed top-0 inset-x-0 z-40 border-b"
        style={{ background: 'rgba(251,247,241,0.93)', borderColor: 'var(--border)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <a href="#" className="n-serif text-2xl font-bold italic" style={{ color: 'var(--ink)' }}>
            Nối<span style={{ color: 'var(--amber)' }}>.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="n-sans text-sm font-500 transition-colors hover:opacity-60"
                style={{ color: 'var(--smoke)' }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:0935804537"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-opacity hover:opacity-85"
              style={{ background: 'var(--amber)', color: '#fff' }}
            >
              <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Gọi ngay
            </a>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: 'var(--ink)' }}
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
          <div className="md:hidden border-t px-5 pt-4 pb-6 flex flex-col gap-4" style={{ borderColor: 'var(--border)' }}>
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="n-sans text-sm font-medium py-1"
                style={{ color: 'var(--smoke)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:0935804537"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full w-fit mt-1"
              style={{ background: 'var(--amber)', color: '#fff' }}
            >
              093 580 45 37
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end overflow-hidden pt-16">
        {/* Full bleed hero image */}
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1800"
          alt="Không gian Nối Café"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(28,16,8,0.88) 0%, rgba(28,16,8,0.3) 50%, rgba(28,16,8,0.05) 100%)' }}
        />

        {/* Oversized background letter */}
        <div
          className="n-serif absolute -right-4 top-1/2 -translate-y-1/2 font-bold italic select-none pointer-events-none leading-none"
          style={{ fontSize: 'clamp(16rem, 38vw, 48rem)', color: '#fff', opacity: 0.04 }}
          aria-hidden
        >
          N
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 pb-20 w-full">
          <p className="n-up n-sans text-xs tracking-[0.25em] uppercase font-semibold mb-5" style={{ color: 'var(--amber)' }}>
            Cà phê · Đà Nẵng
          </p>

          <h1
            className="n-serif n-up-2 font-bold italic leading-[0.9] mb-7 text-white"
            style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
          >
            Nối<span style={{ color: 'var(--amber)' }}>.</span>
          </h1>

          <p
            className={`n-up-3 n-sans text-base md:text-lg text-white/70 mb-10 ${!typeDone ? 'n-cursor' : ''}`}
            style={{ minHeight: '1.75rem' }}
          >
            {typed}
          </p>

          <div className="flex flex-wrap gap-4 n-up-3">
            <a
              href="#menu"
              className="px-7 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: 'var(--amber)', color: '#fff' }}
            >
              Xem thực đơn
            </a>
            <a
              href="#location"
              className="px-7 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-all"
            >
              Tìm đường đến quán
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-6 text-white/40 text-xs tracking-widest uppercase font-medium">
            <span>06:30 – 22:00</span>
            <span>·</span>
            <span>15,000 – 35,000₫</span>
            <span>·</span>
            <span>113/18 Nguyễn Chí Thanh</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32" style={{ background: 'var(--paper)' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=700"
                alt="Góc vintage Nối Café"
                className="w-full rounded-2xl object-cover shadow-lg"
                style={{ aspectRatio: '4/5', filter: 'sepia(0.15) saturate(0.9)' }}
              />
              {/* Floating tag */}
              <div
                className="absolute -bottom-6 -right-4 md:right-8 px-5 py-4 rounded-2xl shadow-xl"
                style={{ background: '#fff', border: '1px solid var(--border)' }}
              >
                <p className="n-sans text-xs text-gray-400 mb-0.5">Có mặt từ</p>
                <p className="n-serif text-2xl font-bold italic" style={{ color: 'var(--amber)' }}>2018</p>
              </div>
            </div>

            {/* Text side */}
            <div className="order-1 lg:order-2">
              <p className="n-sans text-xs tracking-[0.25em] uppercase font-semibold mb-5" style={{ color: 'var(--amber)' }}>
                Về Nối Café
              </p>
              <h2 className="n-serif text-4xl md:text-5xl font-bold leading-tight mb-7" style={{ color: 'var(--ink)' }}>
                Một góc Hà Nội<br />
                <span className="italic" style={{ color: 'var(--warm)' }}>giữa phố biển.</span>
              </h2>
              <p className="n-sans text-base leading-relaxed mb-5" style={{ color: 'var(--smoke)' }}>
                Chủ quán người Hà Nội mang vào đây tình cảm với những thứ đã qua — bộ sưu tập máy đánh chữ, chồng đĩa vinyl, đèn dầu leo lét, và những chiếc Vespa cũ không ai còn đi nữa.
              </p>
              <p className="n-sans text-base leading-relaxed" style={{ color: 'var(--smoke)' }}>
                Nhạc xưa mở nhỏ. Khách nói chuyện nhỏ nhẹ. Cà phê phin nhỏ giọt từng chút. Nối không vội.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-6 pt-10 border-t" style={{ borderColor: 'var(--border)' }}>
                {[
                  { value: '200+', label: 'Đồ cổ sưu tầm' },
                  { value: '6+', label: 'Năm hoạt động' },
                  { value: '35k', label: 'Cà phê trứng' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="n-serif text-3xl font-bold" style={{ color: 'var(--amber)' }}>{s.value}</p>
                    <p className="n-sans text-sm mt-1" style={{ color: 'var(--smoke)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MENU ──────────────────────────────────────────── */}
      <section id="menu" className="py-24 md:py-32" style={{ background: 'var(--cream)' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="n-sans text-xs tracking-[0.25em] uppercase font-semibold mb-4" style={{ color: 'var(--amber)' }}>
                Thực đơn
              </p>
              <h2 className="n-serif text-4xl md:text-5xl font-bold" style={{ color: 'var(--ink)' }}>Menu.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {MENU_CATS.map(tab => (
                <button
                  key={tab.val}
                  onClick={() => setMenuCat(tab.val)}
                  className="px-4 py-2 rounded-full text-sm font-semibold border transition-all"
                  style={{
                    background: menuCat === tab.val ? 'var(--ink)' : '#fff',
                    color: menuCat === tab.val ? '#fff' : 'var(--smoke)',
                    borderColor: menuCat === tab.val ? 'var(--ink)' : 'var(--border)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map(item => (
              <div
                key={item.id}
                className="n-card p-6 flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="n-sans font-semibold text-base" style={{ color: 'var(--ink)' }}>
                      {item.name}
                    </span>
                    {item.signature && (
                      <span
                        className="n-sans text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}
                      >
                        Đặc trưng
                      </span>
                    )}
                  </div>
                  <p className="n-sans text-sm leading-relaxed" style={{ color: 'var(--smoke)' }}>
                    {item.desc}
                  </p>
                </div>
                <span className="n-serif font-bold text-base shrink-0" style={{ color: 'var(--amber)' }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 n-sans text-sm" style={{ color: 'var(--smoke)', opacity: 0.6 }}>
            * Giá có thể thay đổi theo mùa. Liên hệ <strong>093 580 45 37</strong> để hỏi thêm.
          </p>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────── */}
      <section id="gallery" className="py-24 md:py-32" style={{ background: 'var(--dark)' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-14">
            <p className="n-sans text-xs tracking-[0.25em] uppercase font-semibold mb-4" style={{ color: 'var(--amber)' }}>
              Không gian
            </p>
            <h2 className="n-serif text-4xl md:text-5xl font-bold text-white">Từng góc nhỏ.</h2>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
            {GALLERY.map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => setLightbox(photo.src)}
                className="n-photo break-inside-avoid mb-3 cursor-zoom-in"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: i % 4 === 1 ? '3/4' : i % 5 === 0 ? '1/1' : '4/3' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section id="reviews" className="py-24 md:py-32" style={{ background: 'var(--paper)' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-14">
            <p className="n-sans text-xs tracking-[0.25em] uppercase font-semibold mb-4" style={{ color: 'var(--amber)' }}>
              Khách ghé quán
            </p>
            <h2 className="n-serif text-4xl md:text-5xl font-bold" style={{ color: 'var(--ink)' }}>Họ nói gì.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-4 max-h-140 overflow-y-auto pr-1">
              {reviews.map(rev => (
                <div key={rev.id} className="n-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="n-sans font-semibold text-sm" style={{ color: 'var(--ink)' }}>{rev.name}</p>
                      <p className="n-sans text-xs mt-0.5" style={{ color: 'var(--smoke)', opacity: 0.6 }}>{rev.date}</p>
                    </div>
                    <Stars n={rev.rating} />
                  </div>
                  <p className="n-sans text-sm leading-relaxed" style={{ color: 'var(--smoke)' }}>
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5">
              <div className="n-card p-8">
                <h3 className="n-serif text-xl font-semibold mb-1" style={{ color: 'var(--ink)' }}>Để lại cảm nhận</h3>
                <p className="n-sans text-sm mb-6" style={{ color: 'var(--smoke)' }}>Bạn đã từng ghé Nối? Chia sẻ kỷ niệm.</p>

                {submitted ? (
                  <p className="n-sans text-sm py-4 font-medium" style={{ color: 'var(--sage)' }}>✓ Cảm ơn bạn — đánh giá đã được ghi nhận.</p>
                ) : (
                  <form onSubmit={handleReview} className="space-y-4">
                    <input
                      required
                      placeholder="Tên của bạn"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border text-sm n-sans outline-none"
                      style={{ borderColor: 'var(--border)', background: 'var(--paper)', color: 'var(--ink)' }}
                    />
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setForm(f => ({ ...f, rating: n }))}
                          className="text-2xl transition-transform hover:scale-110 leading-none"
                          style={{ color: n <= form.rating ? 'var(--amber)' : '#D9CFC5' }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      required
                      rows={4}
                      placeholder="Kỷ niệm của bạn tại Nối..."
                      value={form.text}
                      onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border text-sm n-sans outline-none resize-none"
                      style={{ borderColor: 'var(--border)', background: 'var(--paper)', color: 'var(--ink)' }}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-sm font-semibold n-sans transition-opacity hover:opacity-85"
                      style={{ background: 'var(--amber)', color: '#fff' }}
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

      {/* ── LOCATION ──────────────────────────────────────────── */}
      <section id="location" className="py-24 md:py-32" style={{ background: 'var(--cream)' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-10">
            <p className="n-sans text-xs tracking-[0.25em] uppercase font-semibold mb-4" style={{ color: 'var(--amber)' }}>
              Tìm chúng tôi
            </p>
            <h2 className="n-serif text-4xl md:text-5xl font-bold" style={{ color: 'var(--ink)' }}>Địa chỉ.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div
              className="lg:col-span-8 rounded-2xl overflow-hidden border"
              style={{ height: 420, borderColor: 'var(--border)' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d450!2d108.2208238!3d16.0738303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421830b8f7ac35%3A0xb33f644c4ec6cbe4!2sN%E1%BB%91i+Caf%C3%A9!5e0!3m2!1svi!2svn!4v1718600000000!5m2!1svi!2svn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Nối Café"
              />
            </div>

            <div className="lg:col-span-4 space-y-7">
              <div>
                <p className="n-sans text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: 'var(--amber)' }}>Địa chỉ</p>
                <p className="n-serif font-semibold text-lg leading-snug" style={{ color: 'var(--ink)' }}>
                  113/18 Nguyễn Chí Thanh
                </p>
                <p className="n-sans text-sm mt-1" style={{ color: 'var(--smoke)' }}>
                  Hải Châu 1, Hải Châu, Đà Nẵng
                </p>
              </div>

              <div>
                <p className="n-sans text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: 'var(--amber)' }}>Điện thoại</p>
                <a
                  href="tel:0935804537"
                  className="n-serif font-bold text-2xl hover:opacity-60 transition-opacity"
                  style={{ color: 'var(--ink)' }}
                >
                  093 580 45 37
                </a>
              </div>

              <div>
                <p className="n-sans text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: 'var(--amber)' }}>Giờ mở cửa</p>
                <p className="n-serif font-bold text-3xl leading-none" style={{ color: 'var(--ink)' }}>06:30</p>
                <p className="n-serif font-bold text-3xl leading-none mt-1" style={{ color: 'var(--amber)' }}>– 22:00</p>
                <p className="n-sans text-xs mt-2" style={{ color: 'var(--smoke)' }}>Mỗi ngày</p>
              </div>

              <div>
                <p className="n-sans text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: 'var(--amber)' }}>Mức giá</p>
                <p className="n-serif font-semibold text-lg" style={{ color: 'var(--ink)' }}>15,000 – 35,000₫</p>
              </div>

              <a
                href="https://www.facebook.com/NoiCafeDaNang/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 n-sans text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: 'var(--amber)' }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook · Nối Cafe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t py-14" style={{ background: 'var(--paper)', borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <p className="n-serif text-4xl font-bold italic" style={{ color: 'var(--ink)' }}>
                Nối<span style={{ color: 'var(--amber)' }}>.</span>
              </p>
              <p className="n-sans text-sm mt-1" style={{ color: 'var(--smoke)', opacity: 0.6 }}>Cà phê hoài niệm · Đà Nẵng · 06:30–22:00</p>
            </div>

            <div className="n-sans text-sm space-y-1" style={{ color: 'var(--smoke)', opacity: 0.7 }}>
              <p>113/18 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng</p>
              <p>ĐT: 093 580 45 37</p>
            </div>

            <div className="n-sans text-sm" style={{ color: 'var(--smoke)', opacity: 0.5 }}>
              <a
                href="https://www.facebook.com/NoiCafeDaNang/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--amber)' }}
              >
                facebook.com/NoiCafeDaNang
              </a>
              <p className="mt-1.5">© 2025 Nối Café Đà Nẵng</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ── LIGHTBOX ──────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          style={{ background: 'rgba(28,16,8,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-6 text-3xl font-light leading-none text-white/60 hover:text-white transition-colors"
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
