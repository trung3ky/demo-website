"use client";

import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  category: 'coffee' | 'tea' | 'snacks' | 'crafts';
  description: string;
  image: string;
  isPopular?: boolean;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  source: 'Google' | 'Huvi' | 'Facebook';
  text: string;
  avatar: string;
}

interface EventSession {
  id: string;
  title: string;
  time: string;
  date: string;
  price: string;
  spotsLeft: number;
  type: 'acoustic' | 'workshop' | 'boardgame';
}

const BRANCHES = {
  CS1: {
    id: 'CS1',
    name: 'CS1: Trụ Sở Cầu Rồng (Lê Đình Dương)',
    address: '72-76 Lê Đình Dương, Phước Ninh, Hải Châu, Đà Nẵng',
    phone: '0901 408 449',
    mapIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3833.896229388147!2d108.2173166!3d16.0593457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219cc1a1d95cf%3A0xe744e8ec506ce5be!2s76%20L%C3%AA%20%C4%90%E1%BB%93ng%20D%C6%B0%C6%A1ng%2C%20Ph%C6%B0%E1%BB%9Bc%20Ninh%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20550000%2C%20Vietnam!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
    features: ['Không gian nhiều tầng siêu rộng rãi', 'Ban công lộng gió ngắm trọn vẹn Cầu Rồng', 'Sân khấu Acoustic mộc ấm cúng tối cuối tuần', 'Xưởng tô tượng & xỏ vòng handmade cực chill']
  },
  CS2: {
    id: 'CS2',
    name: 'CS2: Trạm Học Tập Trung Tâm (Nguyễn Hoàng)',
    address: '191 Nguyễn Hoàng, Nam Dương, Hải Châu, Đà Nẵng',
    phone: '0935 404 465',
    mapIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3833.9554045558917!2d108.2117564!3d16.0563456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b666497f1f%3A0x866380c85c2c4d92!2s191%20Nguy%E1%BB%85n%20Ho%C3%A0ng%2C%20Nam%20D%C6%B0%E1%BB%9Bng%2C%20H%E1%BA%A3i%20Ch%C3%A2u%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng%20550000%2C%20Vietnam!5e0!3m2!1sen!2s!4v1700000000001!5m2!1sen!2s',
    features: ['Bố trí ổ cắm điện mật độ siêu cao tại mỗi bàn', 'Không gian cây xanh dịu mắt, yên tĩnh tuyệt đối', 'Khu vực cabin học tập cá nhân riêng tư', 'Kho boardgame khổng lồ kết nối bạn bè']
  }
};

const MENU_ITEMS: Product[] = [
  {
    id: 'm1',
    name: 'Cà Phê Muối Sông Hàn',
    price: '29.000₫',
    category: 'coffee',
    description: 'Lớp kem béo mặn mịn màng phủ dày trên nền cà phê phin đậm đặc nguyên chất chuẩn vị miền Trung.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'm2',
    name: 'Cà Phê Cốt Dừa Đá Xay',
    price: '35.000₫',
    category: 'coffee',
    description: 'Sốt cốt dừa sánh mịn được đá xay thơm ngậy hòa quyện mượt mà cùng espresso đắng nhẹ quyến rũ.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm3',
    name: 'Trà Chanh Sông Hàn',
    price: '19.000₫',
    category: 'tea',
    description: 'Trà chanh tươi mát lạnh chuẩn vị truyền thống thơm hương nhài tự nhiên cùng mật ong ngọt dịu.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'm4',
    name: 'Trà Đào Cam Sả',
    price: '29.000₫',
    category: 'tea',
    description: 'Hương sả nồng ấm quyện cùng vị ngọt thanh của đào miếng giòn sần sật và nước cam tươi mọng nước.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm5',
    name: 'Trà Ô Long Xoài Chanh Leo',
    price: '32.000₫',
    category: 'tea',
    description: 'Sự bùng nổ nhiệt đới từ xoài chín ngọt lịm cùng chanh leo chua thanh trên nền trà ô long đậm đà thơm ngát.',
    image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'm6',
    name: 'Cacao Kem Trứng Béo Ngậy',
    price: '35.000₫',
    category: 'coffee',
    description: 'Cacao nóng ấm thơm lừng kết hợp với lớp kem lòng đỏ trứng đánh bông tơi mềm mượt béo ngậy không tanh.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm7',
    name: 'Khô Gà Lá Chanh Cay Tê',
    price: '25.000₫',
    category: 'snacks',
    description: 'Sợi khô gà xé tơi giòn rụm đậm vị tỏi ớt cay cay quyện cùng hương lá chanh thơm ngào ngạt.',
    image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm8',
    name: 'Hạt Hướng Dương Hảo Hạng',
    price: '15.000₫',
    category: 'snacks',
    description: 'Món nhâm nhi kinh điển được rang sấy thủ công giòn bùi, không thể thiếu trong các buổi trò chuyện thâu đêm.',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm9',
    name: 'Tô Tượng Nghệ Thuật',
    price: '20.000₫ - 45.000₫',
    category: 'crafts',
    description: 'Tự do lựa chọn hàng chục mẫu tượng thạch cao độc đáo, đã bao gồm cọ vẽ và khay màu acrylic cao cấp mượt mà.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
    isPopular: true
  },
  {
    id: 'm10',
    name: 'Tự Làm Vòng Tay Handmade',
    price: '30.000₫',
    category: 'crafts',
    description: 'Trải nghiệm xỏ hạt hạt cườm, charm nhựa, hạt gỗ đa sắc màu để tạo nên chiếc vòng độc nhất mang dấu ấn cá nhân.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=600'
  }
];

const INITIAL_REVIEWS: Review[] = [
  { id: 'r1', name: 'N. Ngọc Đ.', rating: 5, date: '2 tháng trước', source: 'Google', text: 'Quán tủ tối nào cũng hát rất chill, so với những quán hát acoustic mình từng đi thì nước ngon hơn nhiều, có cả Workshop tô vẽ nên không lo nhàm chán. Rất đáng trải nghiệm!', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' },
  { id: 'r2', name: 'T. Trinh N.', rating: 5, date: '1 tháng trước', source: 'Huvi', text: 'Không gian siêu dễ thương, nhân viên cực kỳ nhiệt tình dù mình đến lúc 2h sáng. Đồ uống ngon mát, góc tô tượng thạch cao nhiều mẫu tượng xinh lắm.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100' },
  { id: 'r3', name: 'T. Thị H.', rating: 5, date: '2 tháng trước', source: 'Google', text: 'Trà đào sả cam thơm phức, trà chanh thì ngọt mát tự nhiên rất đã khát. Band nhạc acoustic chơi hay, hệ thống âm thanh mộc mạc chuẩn gu mộc.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100' },
  { id: 'r4', name: 'Khang Minh', rating: 4, date: '3 tuần trước', source: 'Facebook', text: 'Cứu cánh thực sự cho mùa đồ án tốt nghiệp của sinh viên tụi mình. Wifi nhanh xé gió, ổ điện ở khắp mọi góc và đặc biệt không bao giờ phụ thu đêm!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' }
];

const UPCOMING_EVENTS: EventSession[] = [
  { id: 'e1', title: 'Đêm Nhạc Acoustic: Giai Điệu Mộc', time: '20:00 - 22:30', date: 'Tối thứ Sáu hàng tuần', price: 'Không phụ thu vé nước', spotsLeft: 12, type: 'acoustic' },
  { id: 'e2', title: 'Workshop Đất Sét: Tự Tay Tạo Hình', time: '14:00 - 17:00', date: 'Chiều thứ Bảy', price: '35.000₫ (Đã gồm nguyên liệu)', spotsLeft: 6, type: 'workshop' },
  { id: 'e3', title: 'Đại Chiến Boardgame: Ma Sói & Avalon', time: '19:30 - Nửa Đêm', date: 'Tối Chủ Nhật', price: 'Tham gia miễn phí', spotsLeft: 15, type: 'boardgame' }
];

const Icons = {
  Clock: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 01-18 0z"></path></svg>
  ),
  Phone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
  ),
  MapPin: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
  ),
  Star: ({ filled }: { filled: boolean }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.588 1.81l-3.97 2.88a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.176 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.773-.558-.375-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
  ),
  Check: () => (
    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
  ),
  Quote: () => (
    <svg className="w-8 h-8 text-emerald-500/30" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg>
  ),
  Sparkles: () => (
    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
  ),
  X: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
  )
};

export default function Page() {
  const [selectedBranch, setSelectedBranch] = useState<'CS1' | 'CS2'>('CS1');
  const [menuFilter, setMenuFilter] = useState<'all' | 'coffee' | 'tea' | 'snacks' | 'crafts'>('all');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5, source: 'Google' as const });
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventSelected: 'e1',
    guests: 1,
    notes: '',
    branch: 'CS1'
  });
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingTicketId, setBookingTicketId] = useState<string>('');

  const [liveTime, setLiveTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBookEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      return;
    }
    const ticketNum = 'TM-' + Math.floor(100000 + Math.random() * 900000);
    setBookingTicketId(ticketNum);
    setBookingSuccess(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) {
      setReviewSuccessMsg('Vui lòng điền đầy đủ họ tên và nội dung đánh giá của bạn.');
      return;
    }
    const createdReview: Review = {
      id: 'r_new_' + Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      date: 'Vừa xong',
      source: newReview.source,
      text: newReview.text,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100`
    };
    setReviews([createdReview, ...reviews]);
    setNewReview({ name: '', text: '', rating: 5, source: 'Google' });
    setReviewSuccessMsg('Cảm ơn bạn! Đánh giá đã được ghi nhận thành công lên hệ thống lưu bút.');
    setTimeout(() => setReviewSuccessMsg(''), 5000);
  };

  const currentBranchData = BRANCHES[selectedBranch];

  const filteredMenuItems = menuFilter === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === menuFilter);

  return (
    <div className={`font-sans transition-colors duration-300 min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      <nav className={`fixed top-0 left-0 w-full z-40 transition-all backdrop-blur-md border-b ${isDarkMode ? 'bg-slate-950/85 border-slate-800' : 'bg-white/85 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-xl text-slate-950 shadow-md shadow-emerald-500/20">
              TM
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                TMORE 24/7
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-400 font-bold leading-none">Không gian không ngủ</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="hover:text-emerald-400 font-medium transition-colors text-sm">Về Chúng Tôi</a>
            <a href="#menu" className="hover:text-emerald-400 font-medium transition-colors text-sm">Thực Đơn & Đồ Chơi</a>
            <a href="#events" className="hover:text-emerald-400 font-medium transition-colors text-sm">Sự Kiện & Workshop</a>
            <a href="#gallery" className="hover:text-emerald-400 font-medium transition-colors text-sm">Bộ Sưu Tập</a>
            <a href="#reviews" className="hover:text-emerald-400 font-medium transition-colors text-sm">Lưu Bút</a>
            <a href="#location" className="hover:text-emerald-400 font-medium transition-colors text-sm">Hệ Thống Cơ Sở</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-full border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-yellow-400' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'}`}
              title="Chuyển chế độ sáng tối"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <a
              href="#book-now"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.03] text-sm"
            >
              Đặt Chỗ Trước
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-yellow-400' : 'bg-slate-100 border-slate-200 text-slate-800'}`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-emerald-400' : 'bg-slate-100 border-slate-200 text-slate-800'}`}
            >
              {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden px-4 pt-2 pb-6 border-b transition-all ${isDarkMode ? 'bg-slate-950/95 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex flex-col gap-4">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 font-semibold text-lg py-1 border-b border-dashed border-slate-800/20">Về Chúng Tôi</a>
              <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 font-semibold text-lg py-1 border-b border-dashed border-slate-800/20">Thực Đơn</a>
              <a href="#events" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 font-semibold text-lg py-1 border-b border-dashed border-slate-800/20">Sự Kiện</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 font-semibold text-lg py-1 border-b border-dashed border-slate-800/20">Bộ Sưu Tập</a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 font-semibold text-lg py-1 border-b border-dashed border-slate-800/20">Sổ Lưu Bút</a>
              <a href="#location" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 font-semibold text-lg py-1 border-b border-dashed border-slate-800/20">Hệ Thống</a>
              <a
                href="#book-now"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl mt-2 block shadow-lg shadow-emerald-500/10"
              >
                Đặt Chỗ Đăng Ký Ngay
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="relative pt-32 pb-24 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Đang Mở Cửa 24/7 • Giờ Hệ Thống: {liveTime || "00:00:00"}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                Cà Phê, Nghệ Thuật, <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Đồ Thủ Công & Không Gian
                </span> <br />
                Không Ngủ Tại Đà Nẵng.
              </h1>

              <p className={`text-base sm:text-lg max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Chào mừng bạn đến với <strong className="text-emerald-400 font-semibold">TMORE 24/7</strong> — Tổ hợp sáng tạo xuyên đêm hàng đầu tại Đà Nẵng. Thưởng thức Cà phê muối đậm đà, tô tượng nghệ thuật thạch cao, tự làm vòng tay handmade charm nhựa hay nghe nhạc Acoustic cuối tuần. Đặc biệt, <strong className="text-emerald-400">cam kết không phụ thu đêm sau 0 giờ</strong>!
              </p>

              <div className="grid grid-cols-3 gap-4 py-3 border-y border-slate-800/10 dark:border-slate-200/10 max-w-lg">
                <div>
                  <span className="block text-3xl font-extrabold text-emerald-400">24/7</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Mở Cửa Xuyên Đêm</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-emerald-400">2</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Cơ sở tại Hải Châu</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-emerald-400">0₫</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Phụ Thu Sau 0 Giờ</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#menu"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-full transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
                >
                  Xem Thực Đơn & Trò Chơi
                </a>
                <a
                  href="#book-now"
                  className={`border font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] ${isDarkMode ? 'border-slate-800 hover:bg-slate-900 text-slate-200' : 'border-slate-200 hover:bg-slate-100 text-slate-800'}`}
                >
                  Đăng Ký Workshop Cuối Tuần
                </a>
              </div>

              <div className="pt-4 flex items-center gap-4 text-xs text-slate-500 font-medium">
                <span>Khám phá thêm trên:</span>
                <a href="https://www.facebook.com/tmorecaurong" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Facebook Fanpage</a>
                <span>•</span>
                <a href="https://maps.app.goo.gl/xDqBddnsgJSxva489" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Google Maps</a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 rounded-3xl transform rotate-3 scale-105 blur-sm"></div>

                <div className={`relative rounded-3xl overflow-hidden border-2 shadow-2xl ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
                    alt="Không gian học tập và làm việc ấm cúng tại TMORE 24/7"
                    className="w-full h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-all duration-700"
                  />

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3 backdrop-blur-md">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl">
                      🎨
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase text-emerald-400 tracking-wider">Trải nghiệm đặc trưng</span>
                      <h4 className="text-sm font-extrabold text-white">Xưởng Tô Tượng & Đồ Handmade 24/7</h4>
                      <p className="text-[11px] text-slate-400">Trọn gói màu vẽ acrylic mịn màng chỉ từ 20.000₫.</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-5 -right-5 bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-bold p-4 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform hidden sm:block">
                  <div className="text-center">
                    <span className="block text-[10px] tracking-wider uppercase leading-none opacity-80">Tối thứ Sáu hàng tuần</span>
                    <span className="block text-lg font-black tracking-tight">ACOUSTIC LIVE</span>
                    <span className="block text-[9px] uppercase tracking-widest bg-slate-950/20 rounded px-1.5 py-0.5 mt-1">Không phụ thu</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="about" className={`py-24 border-y ${isDarkMode ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-100/60 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">Triết lý thiết kế không gian</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Không Chỉ Là Quán Cà Phê — Đây Là Tổ Hợp Sáng Tạo Của Bạn
            </p>
            <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className={`p-8 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800/80 hover:border-emerald-500/30' : 'bg-white border-slate-200 hover:border-emerald-400/50 hover:shadow-lg'}`}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl text-emerald-400 mb-6 font-bold">
                🕰️
              </div>
              <h3 className="text-xl font-bold mb-3">Thức Khuya Không Lo Về Giá</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Hỗ trợ tối đa cho học sinh, sinh viên chạy deadline đồ án và freelancer sáng tạo ban đêm. TMORE giữ nguyên mức giá ban ngày cho khung giờ đêm, không phụ thu thêm bất kỳ chi phí dịch vụ nào sau 0h.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-semibold text-emerald-400">
                <li className="flex items-center gap-2"><Icons.Check /> Đường truyền Wi-Fi tốc độ cao, băng thông rộng</li>
                <li className="flex items-center gap-2"><Icons.Check /> Trạm sạc đa năng bố trí đầy đủ tại mọi bàn học</li>
              </ul>
            </div>

            <div className={`p-8 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800/80 hover:border-emerald-500/30' : 'bg-white border-slate-200 hover:border-emerald-400/50 hover:shadow-lg'}`}>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-2xl text-teal-400 mb-6 font-bold">
                🎨
              </div>
              <h3 className="text-xl font-bold mb-3">Thư Giãn Cùng Đồ Thủ Công</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Giải tỏa áp lực bài vở một cách ngọt ngào nhất. Bạn có thể tự mình lựa chọn những bức tượng thạch cao độc đáo, tự xỏ vòng hạt cườm sắc màu, lắp lego mô hình hoặc tụ họp chơi các bộ boardgame vui vẻ cùng nhóm bạn.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-semibold text-teal-400">
                <li className="flex items-center gap-2"><Icons.Check /> Màu vẽ acrylic chất lượng cao mịn màng và bền màu</li>
                <li className="flex items-center gap-2"><Icons.Check /> Miễn phí sử dụng hàng loạt trò chơi boardgame hấp dẫn</li>
              </ul>
            </div>

            <div className={`p-8 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900 border-slate-800/80 hover:border-emerald-500/30' : 'bg-white border-slate-200 hover:border-emerald-400/50 hover:shadow-lg'}`}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl text-emerald-400 mb-6 font-bold">
                Guitar
              </div>
              <h3 className="text-xl font-bold mb-3">Âm Nhạc Mộc & Giao Lưu</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Hòa mình vào không gian âm nhạc acoustic mộc mạc và chân thực vào tối thứ Sáu hàng tuần. Ngoài ra, các lớp workshop tạo hình đất sét, làm hoa giấy hay nến thơm handmade cũng được tổ chức định kỳ.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-semibold text-emerald-400">
                <li className="flex items-center gap-2"><Icons.Check /> Sân khấu ca nhạc hoàn toàn miễn phí, không phụ thu</li>
                <li className="flex items-center gap-2"><Icons.Check /> Workshop giao lưu học hỏi các kỹ năng thủ công mới</li>
              </ul>
            </div>

          </div>

          <div className={`mt-16 p-8 rounded-3xl border text-center relative overflow-hidden ${isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
            <p className="text-lg sm:text-xl font-medium max-w-4xl mx-auto italic">
              "Tmore không đơn thuần là một quán nước; đây là điểm hẹn kết nối những tâm hồn đồng điệu tại Đà Nẵng, nơi tiếp thêm cảm hứng học tập và sáng tạo xuyên màn đêm cho thế hệ trẻ."
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <span>CS1: 72-76 Lê Đình Dương</span>
              <span>•</span>
              <span>CS2: 191 Nguyễn Hoàng</span>
            </div>
          </div>

        </div>
      </section>

      <section id="menu" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Thực đơn phong phú</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Thức Uống, Đồ Ăn Vặt & Trải Nghiệm</h3>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Thực đơn chất lượng với giá cực kỳ sinh viên chỉ từ 15.000₫ đến 35.000₫. Hoạt động tô vẽ nghệ thuật đã bao gồm trọn gói màu vẽ chất lượng.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {[
                { label: 'Tất cả', value: 'all' },
                { label: 'Cà Phê', value: 'coffee' },
                { label: 'Trà Trái Cây', value: 'tea' },
                { label: 'Ăn Vặt', value: 'snacks' },
                { label: 'Thủ Công / Tượng', value: 'crafts' }
              ].map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setMenuFilter(tab.value as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${menuFilter === tab.value
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                    : isDarkMode
                      ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMenuItems.map(item => (
              <div
                key={item.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all group ${isDarkMode ? 'bg-slate-900/60 border-slate-850 hover:border-slate-700' : 'bg-white border-slate-200 hover:shadow-lg'}`}
              >
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/600x400/111827/10b981?text=${encodeURIComponent(item.name)}`;
                    }}
                  />
                  {item.isPopular && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md leading-none">
                      ★ BÁN CHẠY
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-slate-950/90 text-emerald-400 font-extrabold text-xs px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-sm">
                    {item.price}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">{item.category === 'coffee' ? 'Cà Phê Việt' : item.category === 'tea' ? 'Trà Thanh Nhiệt' : item.category === 'snacks' ? 'Đồ Ăn Vặt' : 'Thủ Công Sáng Tạo'}</span>
                    <h4 className="text-base font-extrabold mt-1 group-hover:text-emerald-400 transition-colors">{item.name}</h4>
                    <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.description}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-dashed border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">Phục Vụ 24/7</span>
                    <a href="#book-now" className="text-emerald-400 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Gọi món tại quầy</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-xs text-slate-500 font-medium">
            * Nguyên liệu pha chế tại TMORE luôn tươi ngon, vệ sinh và được chuẩn bị trực tiếp mỗi ngày để đảm bảo an toàn thực phẩm.
          </div>

        </div>
      </section>

      <section id="events" className={`py-24 border-y ${isDarkMode ? 'bg-slate-900/30 border-slate-900' : 'bg-slate-100/50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">Lịch hoạt động sáng tạo</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sự Kiện Hàng Tuần & Đăng Ký Giữ Chỗ</p>
            <p className={`text-sm mt-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Hãy đăng ký trước khi đến tham gia các tối nhạc Acoustic hoặc lớp học Workshop làm đất sét để được ưu tiên vị trí đẹp và chuẩn bị nguyên vật liệu đầy đủ nhất.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <Icons.Sparkles /> Sự Kiện Đang Chờ Đón Bạn
              </h3>

              {UPCOMING_EVENTS.map(ev => (
                <div
                  key={ev.id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isDarkMode ? 'bg-slate-950 border-slate-850 hover:border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${ev.type === 'acoustic' ? 'bg-red-500/10 text-red-400' : ev.type === 'workshop' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                        }`}>
                      {ev.type === 'acoustic' ? 'Đêm Nhạc' : ev.type === 'workshop' ? 'Workshop' : 'Boardgame'}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{ev.date}</span>
                    </div>
                    <h4 className="text-base font-extrabold leading-snug">{ev.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Icons.Clock /> {ev.time}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{ev.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-dashed border-slate-800/10 dark:border-slate-250">
                    <div className="text-right">
                      <span className="block text-xs font-bold text-red-400 leading-none">Chỉ còn {ev.spotsLeft} chỗ trống</span>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Đăng ký ngay</span>
                    </div>
                    <a
                      href="#book-now"
                      onClick={() => setBookingForm({ ...bookingForm, eventSelected: ev.id })}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all"
                    >
                      Đăng Ký
                    </a>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 p-6 rounded-2xl border border-emerald-500/20 flex items-center gap-4">
                <div className="text-3xl">🎉</div>
                <div>
                  <h4 className="font-extrabold text-sm">Bạn cần thuê không gian học tập, sinh hoạt câu lạc bộ?</h4>
                  <p className="text-xs text-slate-400 mt-1">Liên hệ với chúng tôi qua số hotline để đăng ký đặt trước bàn học dài, máy chiếu hoặc bảng vẽ hoàn toàn miễn phí cho các sự kiện học thuật nhóm.</p>
                </div>
              </div>
            </div>

            <div id="book-now" className="lg:col-span-5">
              <div className={`p-8 rounded-2xl border relative ${isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200 shadow-md'}`}>

                <div className="mb-6">
                  <h4 className="text-lg font-black">Hệ Thống Đặt Chỗ Trực Tuyến</h4>
                  <p className="text-xs text-slate-500 mt-1">Nhận mã giữ chỗ ưu tiên của bạn qua vé điện tử trực tuyến ngay sau khi điền thông tin.</p>
                </div>

                {!bookingSuccess ? (
                  <form onSubmit={handleBookEvent} className="space-y-4">

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Chọn chương trình</label>
                      <select
                        value={bookingForm.eventSelected}
                        onChange={(e) => setBookingForm({ ...bookingForm, eventSelected: e.target.value })}
                        className={`w-full p-3 rounded-xl border text-sm font-semibold outline-none focus:border-emerald-400 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                      >
                        <option value="e1">Acoustic Đêm Thứ Sáu (Giai Điệu Mộc)</option>
                        <option value="e2">Workshop Thứ Bảy (Tự Tay Nặn Đất Sét)</option>
                        <option value="e3">Đại Chiến Đêm Chủ Nhật (Hội Chơi Boardgame)</option>
                        <option value="desk">Đặt Chỗ Bàn Học Yên Tĩnh (Làm Việc / Học Tập)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Chọn Điểm Hẹn</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setBookingForm({ ...bookingForm, branch: 'CS1' })}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all ${bookingForm.branch === 'CS1' ? 'border-emerald-400 bg-emerald-500/10 text-emerald-400' : isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}
                        >
                          CS1: Lê Đình Dương
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingForm({ ...bookingForm, branch: 'CS2' })}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all ${bookingForm.branch === 'CS2' ? 'border-emerald-400 bg-emerald-500/10 text-emerald-400' : isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'}`}
                        >
                          CS2: Nguyễn Hoàng
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Họ tên của bạn *</label>
                        <input
                          type="text"
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          placeholder="Hồng Hoa"
                          className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-emerald-400 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Số điện thoại *</label>
                        <input
                          type="tel"
                          required
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          placeholder="09xx xxx xxx"
                          className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-emerald-400 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Số ghế mong muốn</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={bookingForm.guests}
                        onChange={(e) => setBookingForm({ ...bookingForm, guests: parseInt(e.target.value) || 1 })}
                        className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-emerald-400 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10 mt-4 uppercase tracking-wider text-xs"
                    >
                      Xác Nhận Giữ Chỗ Ngay
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-emerald-400">Đăng Ký Đã Gửi Đi!</h4>
                      <p className="text-xs text-slate-500 mt-1">Chụp màn hình vé điện tử bên dưới để đưa cho nhân viên quầy phục vụ của TMORE khi bạn ghé quán.</p>
                    </div>

                    <div className={`p-5 rounded-2xl border border-dashed text-left ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex justify-between border-b border-dashed border-slate-800 pb-3 mb-3">
                        <span className="text-xs text-slate-500 font-bold uppercase">Mã Vé Điện Tử</span>
                        <span className="text-xs font-black text-emerald-400 tracking-wider">{bookingTicketId}</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Họ và tên:</span>
                          <span className="font-bold">{bookingForm.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Số liên hệ:</span>
                          <span className="font-bold">{bookingForm.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Chương trình:</span>
                          <span className="font-bold text-emerald-400">
                            {bookingForm.eventSelected === 'e1' ? 'Giai Điệu Mộc (Acoustic)' : bookingForm.eventSelected === 'e2' ? 'Workshop Nặn Đất Sét' : bookingForm.eventSelected === 'e3' ? 'Hội Chơi Boardgame' : 'Bàn Học Yên Tĩnh'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Địa chỉ hẹn:</span>
                          <span className="font-bold">{BRANCHES[bookingForm.branch as 'CS1' | 'CS2'].name.split(':')[0]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Số lượng:</span>
                          <span className="font-bold">{bookingForm.guests} Người</span>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-dashed border-slate-800/20 flex flex-col items-center">
                        <div className="h-10 w-full bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 dark:from-slate-200 dark:via-slate-400 dark:to-slate-200 flex items-center justify-around overflow-hidden rounded opacity-80">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-full ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}
                              style={{ width: `${Math.floor(Math.random() * 4) + 1}px` }}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-2">Xác thực hệ thống TM-Cloud</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setBookingSuccess(false)}
                      className="text-xs text-emerald-400 hover:underline font-bold"
                    >
                      Đăng ký giữ chỗ lượt mới
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">Hình ảnh chân thực tại quán</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Cận Cảnh Từng Góc Sáng Tạo</p>
            <p className={`text-sm mt-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Các bức hình thực tế thể hiện sinh động nét thiết kế đặc trưng, đêm nhạc live acoustic, ly nước thơm ngon mát mắt cùng sự tập trung tại trạm học tập.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {[
              { id: 'g1', tag: 'CS1 Cầu Rồng', title: 'Không gian góc bàn gỗ ấm cúng', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800' },
              { id: 'g2', tag: 'Live Acoustic', title: 'Sân khấu mộc giao lưu cuối tuần', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800' },
              { id: 'g3', tag: 'Thủ Công', title: 'Họa cụ cọ vẽ tô tượng thạch cao', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800' },
              { id: 'g4', tag: 'CS2 Góc Học', title: 'Môi trường tự học tập trung tối đa', url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800' },
              { id: 'g5', tag: 'Trà Sảng Khoái', title: 'Những ly trà trái cây thơm mát', url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800' },
              { id: 'g6', tag: 'Boardgame', title: 'Hội tụ chiến ma sói, avalon cùng bạn bè', url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=800' },
              { id: 'g7', tag: 'Làm Việc', title: 'Tốc độ kết nối internet mượt mà', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800' },
              { id: 'g8', tag: 'Đồ Handmade', title: 'Khay chuỗi cườm kết vòng thủ công', url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800' }
            ].map(photo => (
              <div
                key={photo.id}
                onClick={() => setLightboxImage(photo.url)}
                className="relative rounded-2xl overflow-hidden aspect-square bg-slate-900 group cursor-zoom-in border border-slate-800"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400">{photo.tag}</span>
                  <h4 className="text-white font-extrabold text-sm">{photo.title}</h4>
                  <span className="text-[10px] text-slate-400 mt-1">Bấm để phóng to hình ảnh</span>
                </div>
              </div>
            ))}

          </div>

          {lightboxImage && (
            <div
              className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setLightboxImage(null)}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 text-white text-3xl font-bold bg-slate-850 p-2 rounded-full leading-none hover:bg-slate-700"
              >
                &times;
              </button>
              <img
                src={lightboxImage}
                alt="Ảnh phóng to chi tiết"
                className="max-w-full max-h-[90vh] rounded-2xl border border-slate-800 object-contain shadow-2xl"
              />
            </div>
          )}

        </div>
      </section>

      <section id="reviews" className={`py-24 border-y ${isDarkMode ? 'bg-slate-900/30 border-slate-900' : 'bg-slate-100/50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Lời nhắn yêu thương</h2>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sổ Lưu Bút Khách Hàng</h3>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Các đóng góp, tâm sự thực tế từ những "cú đêm", học viên thiết kế hay lập trình viên thường ghé qua TMORE học tập và làm việc.
                </p>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {reviews.map(rev => (
                  <div
                    key={rev.id}
                    className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200 shadow-sm'}`}
                  >
                    <div className="flex items-center gap-4 justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-10 h-10 rounded-full object-cover bg-slate-850 border border-slate-750"
                        />
                        <div>
                          <h4 className="font-extrabold text-sm leading-none">{rev.name}</h4>
                          <span className="text-[10px] text-slate-500 font-medium">{rev.date}</span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${rev.source === 'Google' ? 'bg-blue-500/10 text-blue-400' : rev.source === 'Huvi' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                        {rev.source}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mt-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icons.Star key={i} filled={i < rev.rating} />
                      ))}
                    </div>

                    <p className={`text-xs sm:text-sm mt-3 leading-relaxed italic ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      "{rev.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200 shadow-md'}`}>

                <div className="mb-6">
                  <h4 className="text-lg font-black">Để Lại Lời Đóng Góp</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Góp ý chân thành của bạn là động lực lớn nhất để đội ngũ TMORE ngày càng hoàn thiện chất lượng dịch vụ!
                  </p>
                </div>

                {reviewSuccessMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    {reviewSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleAddReview} className="space-y-4">

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Tên của bạn</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Khánh Linh"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-emerald-400 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Số sao bình chọn</label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 5].map(starNum => (
                        <button
                          key={starNum}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: starNum })}
                          className="focus:outline-none"
                        >
                          <svg className={`w-8 h-8 ${starNum <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.588 1.81l-3.97 2.88a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.176 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.773-.558-.375-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Kênh đăng tải</label>
                    <select
                      value={newReview.source}
                      onChange={(e) => setNewReview({ ...newReview, source: e.target.value as any })}
                      className={`w-full p-3 rounded-xl border text-sm font-semibold outline-none focus:border-emerald-400 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                    >
                      <option value="Google">Đăng lên Google Maps</option>
                      <option value="Facebook">Đăng lên Facebook</option>
                      <option value="Huvi">Đăng lên Diễn đàn Huvi.vn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Đóng ý kiến của bạn *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Chia sẻ trải nghiệm chân thực của bạn về không gian học tập, đồ uống hoặc sự phục vụ của nhân viên..."
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      className={`w-full p-3 rounded-xl border text-sm outline-none focus:border-emerald-400 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-850 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-black py-3.5 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider"
                  >
                    Gửi Lưu Bút Đóng Góp
                  </button>
                </form>

              </div>
            </div>

          </div>

          <div className="mt-24 pt-20 border-t border-slate-800/10 dark:border-slate-800">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-extrabold tracking-tight">Câu Hỏi Thường Gặp (FAQs)</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-2">Giải đáp nhanh các thắc mắc trước khi bạn tới quán</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                { q: "Quán thực sự mở cửa xuyên đêm 24h và không có phụ thu chứ?", a: "Đúng vậy! TMORE cam kết giữ nguyên thực đơn đồng giá ban ngày cho toàn bộ khung giờ đêm muộn. Các tiện ích học tập luôn hoạt động liên tục." },
                { q: "Có giới hạn thời gian vẽ tượng hay xỏ vòng hạt charm không?", a: "Hoàn toàn tự do! Các kệ thạch cao tượng, cọ tô màu acrylic và hạt chuỗi charm thủ công luôn sẵn sàng phục vụ bạn bất kỳ lúc nào." },
                { q: "Quán có đủ ổ cắm sạc cho cả nhóm học tập hay làm việc lâu dài không?", a: "Tại cả hai chi nhánh, đặc biệt là cơ sở Nguyễn Hoàng, mật độ cổng sạc nguồn điện cực kỳ dày đặc tại chân bàn hỗ trợ học tập hết công suất." },
                { q: "Đêm nhạc Acoustic vào tối thứ Sáu có yêu cầu mua vé không?", a: "Sân khấu ca nhạc hoàn toàn phi lợi nhuận. Bạn chỉ cần gọi món nước thông thường tại quầy và thong thả tìm chỗ ngồi ưng ý để nghe nhạc mộc." }
              ].map((faq, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-200'}`}
                >
                  <h4 className="font-extrabold text-sm sm:text-base text-emerald-400">❓ {faq.q}</h4>
                  <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section id="location" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Vị trí giao điểm thuận lợi</h2>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Hệ Thống Cơ Sở TMORE</h3>
                <p className={`text-sm mt-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Các chi nhánh của TMORE đều được đặt tại vị trí trung tâm sầm uất bậc nhất của quận Hải Châu, Đà Nẵng, vô cùng dễ dàng tìm kiếm.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setSelectedBranch('CS1')}
                  className={`w-full p-5 rounded-2xl border text-left flex items-start gap-4 transition-all ${selectedBranch === 'CS1'
                    ? 'border-emerald-400 bg-emerald-500/10 text-emerald-400'
                    : isDarkMode ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300' : 'border-slate-200 bg-white hover:shadow-md text-slate-700'
                    }`}
                >
                  <span className="text-xl mt-1">📍</span>
                  <div>
                    <h4 className="font-extrabold text-sm">{BRANCHES.CS1.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{BRANCHES.CS1.address}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-red-400 border border-red-500/30 px-2 py-0.5 rounded uppercase">Vị trí đắc địa sát Cầu Rồng</span>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedBranch('CS2')}
                  className={`w-full p-5 rounded-2xl border text-left flex items-start gap-4 transition-all ${selectedBranch === 'CS2'
                    ? 'border-emerald-400 bg-emerald-500/10 text-emerald-400'
                    : isDarkMode ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300' : 'border-slate-200 bg-white hover:shadow-md text-slate-700'
                    }`}
                >
                  <span className="text-xl mt-1">📍</span>
                  <div>
                    <h4 className="font-extrabold text-sm">{BRANCHES.CS2.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{BRANCHES.CS2.address}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-red-400 border border-red-500/30 px-2 py-0.5 rounded uppercase">Gần trục đường Nguyễn Hoàng học tập</span>
                  </div>
                </button>
              </div>

              <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-850' : 'bg-slate-100/60 border-slate-200'}`}>
                <h4 className="font-extrabold text-sm text-emerald-400 uppercase tracking-wider mb-4">Tiện Nghi Đi Kèm Cơ Sở</h4>
                <ul className="space-y-3 text-xs font-semibold">
                  <li className="flex items-center gap-3">
                    <Icons.Clock />
                    <span>Mở cửa liên tục 24 giờ mỗi ngày (Kể cả ngày Lễ Tết)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.Phone />
                    <span>Hotline hỗ trợ: <a href={`tel:${currentBranchData.phone}`} className="text-emerald-400 hover:underline">{currentBranchData.phone}</a></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icons.MapPin />
                    <span>Địa chỉ liên hệ trực tiếp: {currentBranchData.address}</span>
                  </li>
                </ul>

                <div className="mt-4 pt-4 border-t border-dashed border-slate-800/10 dark:border-slate-200/10 flex flex-wrap gap-2">
                  {currentBranchData.features.map((feature, i) => (
                    <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="lg:col-span-7">
              <div className={`rounded-3xl overflow-hidden border-2 h-[350px] sm:h-[450px] relative shadow-xl ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-200'}`}>
                <iframe
                  src={currentBranchData.mapIframe}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Bản đồ Google Map chi tiết cho cơ sở ${currentBranchData.name}`}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      <footer className={`py-12 border-t ${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/20 dark:border-slate-200/10">

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-lg">
                  TM
                </div>
                <span className="font-black text-lg text-emerald-400 tracking-tight">TMORE 24/7</span>
              </div>
              <p className="text-xs leading-relaxed">
                Tổ hợp không gian học tập, làm việc sáng tạo, xưởng làm đồ handmade và thưởng thức âm nhạc acoustic mộc mạc hàng đầu tại Hải Châu, Đà Nẵng.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>HỆ THỐNG ĐANG HOẠT ĐỘNG 24/7</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-4">Đường Dẫn Nhanh</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li><a href="#about" className="hover:text-emerald-400">Giá Trị Cốt Lõi</a></li>
                <li><a href="#menu" className="hover:text-emerald-400">Thực Đơn Đồ Uống</a></li>
                <li><a href="#events" className="hover:text-emerald-400">Lịch Workshop Tuần</a></li>
                <li><a href="#gallery" className="hover:text-emerald-400">Không Gian Ảnh Đẹp</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-4">Tổng Đài Trợ Giúp</h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>Hotline CS1: <a href="tel:0901408449" className="text-emerald-400 font-bold hover:underline">0901 408 449</a></li>
                <li>Hotline CS2: <a href="tel:0935404465" className="text-emerald-400 font-bold hover:underline">0935 404 465</a></li>
                <li>Email phản hồi: <span className="text-emerald-400 font-bold">tmorecaurong@gmail.com</span></li>
                <li>Liên hệ học tập nhóm: <span className="text-slate-500 font-semibold">Miễn phí đặt chỗ trước</span></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-300 mb-4">Kênh Truyền Thông</h4>
              <p className="text-xs">Theo dõi Fanpage để cập nhật sớm các ý tưởng trang trí sự kiện theo mùa và nhận các chương trình khuyến mãi bất ngờ.</p>
              <div className="flex gap-4 text-xs font-bold">
                <a href="https://www.facebook.com/tmorecaurong" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Facebook</a>
                <a href="https://maps.app.goo.gl/xDqBddnsgJSxva489" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Google Maps</a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span>&copy; {new Date().getFullYear()} TMORE 24/7 Đà Nẵng. Toàn bộ bản quyền được bảo lưu.</span>
            <div className="flex gap-4">
              <span className="text-slate-500 font-bold">Trải nghiệm nét đẹp không ngủ Đà Thành</span>
              <span>•</span>
              <span className="text-slate-500 font-bold">Giao diện Việt hóa mượt mà</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
