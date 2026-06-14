"use client";

import React, { useState, useEffect } from 'react';

interface CartItem {
  name: string;
  price: number;
  size: string;
  sweetness: string;
  ice: string;
  toppings: string[];
}

interface ProductInfo {
  name: string;
  basePrice: number;
  image: string;
}

export default function Page() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [menuFilter, setMenuFilter] = useState<'all' | 'milktea' | 'fruit' | 'milo' | 'snacks'>('all');
  
  // Customizer Modal States
  const [customizerModalOpen, setCustomizerModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductInfo | null>(null);
  const [sizeOption, setSizeOption] = useState<'M' | 'L'>('M');
  const [sweetness, setSweetness] = useState<'100' | '70' | '50'>('100');
  const [ice, setIce] = useState<'100' | '70' | '0'>('100');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  
  // Cart & Order States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  
  // FAQ states
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
  });

  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactBranch, setContactBranch] = useState('cs1');
  const [contactMessage, setContactMessage] = useState('');

  // Toast States
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  // Monitor scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
    }, 3000);
  };

  // Open product customizer modal
  const openCustomizer = (name: string, price: number, image: string) => {
    setSelectedProduct({ name, basePrice: price, image });
    setSizeOption('M');
    setSweetness('100');
    setIce('100');
    setSelectedToppings([]);
    setCustomizerModalOpen(true);
  };

  // Calculate current price in modal
  const calculateTotalPrice = () => {
    if (!selectedProduct) return 0;
    let total = selectedProduct.basePrice;
    if (sizeOption === 'L') {
      total += 5000;
    }
    total += selectedToppings.length * 5000;
    return total;
  };

  // Add customized item to cart
  const addSelectedToOrder = () => {
    if (!selectedProduct) return;
    const total = calculateTotalPrice();
    const toppingsList: string[] = [];
    if (selectedToppings.includes('pearl')) toppingsList.push('Trân châu hoàng kim');
    if (selectedToppings.includes('cheese')) toppingsList.push('Thạch phô mai');
    if (selectedToppings.includes('pudding')) toppingsList.push('Pudding trứng');

    const cartItem: CartItem = {
      name: selectedProduct.name,
      price: total,
      size: sizeOption,
      sweetness,
      ice,
      toppings: toppingsList
    };

    setCart([...cart, cartItem]);
    setCustomizerModalOpen(false);
    showToast(`✅ Đã thêm ${selectedProduct.name} vào giỏ hàng!`);
  };

  // Quick combo order
  const orderCombo = (comboName: string, priceVal: number) => {
    const cartItem: CartItem = {
      name: comboName,
      price: priceVal,
      size: 'Đặc biệt',
      sweetness: '100',
      ice: '100',
      toppings: []
    };
    setCart([...cart, cartItem]);
    showToast(`💖 Đã thêm ${comboName} vào đơn hàng!`);
  };

  // Remove item from cart
  const removeCartItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    showToast('🗑️ Đã xóa món ăn khỏi giỏ hàng!');
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setCartModalOpen(false);
    showToast('🗑️ Giỏ hàng đã được làm trống!');
  };

  // Submit order via clipboard copy & map redirection
  const submitOrder = () => {
    if (cart.length === 0) return;
    
    const listString = cart.map((item, index) => 
      `${index + 1}. ${item.name} (Size ${item.size}, ${item.sweetness}% Đường, ${item.ice}% Đá${item.toppings.length > 0 ? ', Topping: ' + item.toppings.join(', ') : ''})`
    ).join('\n');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const copyText = `ĐƠN HÀNG TAB TEA ĐÀ NẴNG:\n${listString}\nTổng: ${total.toLocaleString('vi-VN')}đ`;

    navigator.clipboard.writeText(copyText).then(() => {
      setCartModalOpen(false);
      showToast('📋 Đã copy đơn hàng thành công! Đang chuyển hướng bạn sang Maps...');
      setTimeout(() => {
        window.open('https://maps.app.goo.gl/skShq4GXJ2TEtWzT6', '_blank');
      }, 1800);
    }).catch(() => {
      // Fallback copy
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = copyText;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);

      setCartModalOpen(false);
      showToast('📋 Đã copy đơn hàng thành công! Đang chuyển hướng bạn sang Maps...');
      setTimeout(() => {
        window.open('https://maps.app.goo.gl/skShq4GXJ2TEtWzT6', '_blank');
      }, 1800);
    });
  };

  // Toggle FAQ item
  const toggleFaq = (id: number) => {
    setFaqOpen({
      ...faqOpen,
      [id]: !faqOpen[id],
    });
  };

  // Handle feedback form submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('📨 Cảm ơn góp ý! Tab Tea sẽ ghi nhận phản hồi để cải tiến chất lượng.');
    setContactName('');
    setContactPhone('');
    setContactMessage('');
  };

  // Handle topping checkbox change
  const handleToppingChange = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter(t => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  // Render product card
  const products = [
    { name: 'Trà Sữa Trân Châu Hoàng Kim', price: 25000, category: 'milktea', isPopular: true, image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=400', desc: 'Vị trà đậm đà truyền thống kết hợp trân châu hoàng kim dai giòn sần sật ngọt dịu.' },
    { name: 'Trà Sữa Milo Dầm Trân Châu', price: 30000, category: 'milo', isHot: true, image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=400', desc: 'Sốt cacao đậm đặc hòa quyện milo bột thơm lừng và trân châu đen ngập ngụa, béo bùi khó cưỡng.' },
    { name: 'Trà Đào Cam Sả Tươi', price: 22000, category: 'fruit', isHealthy: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', desc: 'Sả thơm nồng, cam vàng mọng nước cùng những miếng đào giòn ngọt thơm lừng sảng khoái ngày hè.' },
    { name: 'Sữa Tươi Đường Đen Tab', price: 28000, category: 'milktea', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=400', desc: 'Sữa tươi Đà Lạt Milk thanh trùng béo ngậy quện với đường đen bọc quanh ly cực đẹp mắt.' },
    { name: 'Trà Vải Lài Thạch Nha Đam', price: 22000, category: 'fruit', image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=400', desc: 'Vị thanh chát nhẹ của trà lài hòa với vải thiều thơm mọng cùng thạch nha đam thanh mát sần sật.' },
    { name: 'Trà Sữa Thái Xanh Phô Mai', price: 25000, category: 'milktea', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400', desc: 'Vị béo ngậy của sữa kết hợp hương thơm đặc trưng thảo mộc Thái Lan cùng những viên thạch phô mai khổng lồ.' },
    { name: 'Phô Mai Que Giòn Rụm', price: 18000, category: 'snacks', image: 'https://images.unsplash.com/photo-1531749668029-2db88e4b76ce?auto=format&fit=crop&q=80&w=400', desc: 'Lớp vỏ ngoài chiên xù vàng óng, cắn ngập răng kéo sợi phô mai béo ngậy sướng tê tái đầu lưỡi.' },
    { name: 'Mẹt Ăn Vặt Tab Combo', price: 45000, category: 'snacks', isValue: true, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400', desc: 'Tụ hội cực phẩm: phô mai que, khoai tây lắc phô mai, nem chua rán và cá viên sốt siêu cay mặn.' }
  ];

  const filteredProducts = menuFilter === 'all'
    ? products
    : products.filter(p => p.category === menuFilter);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-[#FCFCFB] text-gray-800 font-sans antialiased selection:bg-accent-200 selection:text-brand-900 overflow-x-hidden min-h-screen">
      
      {/* HEADER / NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-brand-700/50 shadow-lg ${isHeaderScrolled ? 'bg-brand-500/95 py-1 backdrop-blur-md shadow-2xl' : 'bg-brand-500 py-3'}`} id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 bg-brand-500">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="16" fill="#021359"/>
                <rect x="30" y="12" width="40" height="54" rx="20" stroke="#E2F099" strokeWidth="2"/>
                <text x="50" y="24" fill="#E2F099" fontSize="5.5" fontFamily="'Inter', sans-serif" fontWeight="800" textAnchor="middle" letterSpacing="0.2">SINCE 2020</text>
                <path d="M35 48 L44 38 L52 44 L65 35" stroke="#E2F099" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M42 45 Q47 39 52 48" stroke="#E2F099" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M50 49 C46 53 44 58 50 61 C56 58 54 53 50 49 Z" stroke="#E2F099" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <path d="M41 52 C41 55 43 58 47 56" stroke="#E2F099" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <path d="M59 52 C59 55 57 58 53 56" stroke="#E2F099" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                <text x="50" y="86" fill="#E2F099" fontSize="14.5" fontFamily="'Playfair Display', serif" fontWeight="900" textAnchor="middle" letterSpacing="0.8">TAB TEA</text>
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-2xl font-black tracking-tight text-accent-500 block leading-tight">Tab Tea</span>
              <span className="text-[10px] font-bold tracking-widest text-brand-100 uppercase block">Trà Tươi Đậm Vị • Since 2020</span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
            <a href="#about" className="text-brand-100 hover:text-accent-500 transition-colors">Về Tab Tea</a>
            <a href="#menu" className="text-brand-100 hover:text-accent-500 transition-colors">Thực Đơn</a>
            <a href="#combos" className="text-brand-100 hover:text-accent-500 transition-colors">Ưu Đãi</a>
            <a href="#branches" className="text-brand-100 hover:text-accent-500 transition-colors">Hệ Thống</a>
            <a href="#contact" className="text-brand-100 hover:text-accent-500 transition-colors">Liên Hệ</a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://maps.app.goo.gl/skShq4GXJ2TEtWzT6" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs font-bold text-accent-500 hover:text-white bg-brand-850 px-4 py-2.5 rounded-xl border border-brand-700 transition-colors">
              <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Chỉ đường Google Map</span>
            </a>
            <a href="#menu" className="bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-accent-500/10 hover:shadow-accent-500/20 transition-all hover:-translate-y-0.5">
              Đặt Trà Ngay
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-xl hover:bg-brand-800 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-900 border-b border-brand-800 px-4 pt-2 pb-6 space-y-3 transition-all">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-xl text-brand-100 hover:bg-brand-800 hover:text-accent-500 font-medium transition-all text-sm">Về Tab Tea</a>
            <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-xl text-brand-100 hover:bg-brand-800 hover:text-accent-500 font-medium transition-all text-sm">Thực Đơn</a>
            <a href="#combos" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-xl text-brand-100 hover:bg-brand-800 hover:text-accent-500 font-medium transition-all text-sm">Ưu Đãi</a>
            <a href="#branches" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-xl text-brand-100 hover:bg-brand-800 hover:text-accent-500 font-medium transition-all text-sm">Hệ Thống Chi Nhánh</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-xl text-brand-100 hover:bg-brand-800 hover:text-accent-500 font-medium transition-all text-sm">Liên Hệ</a>
            <div className="pt-4 border-t border-brand-800 flex flex-col space-y-3">
              <a href="https://maps.app.goo.gl/skShq4GXJ2TEtWzT6" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 py-3 bg-brand-800 rounded-xl border border-brand-700 text-accent-500 font-semibold text-sm text-center">
                <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Google Maps Chi Nhánh Chính</span>
              </a>
              <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="block py-3 bg-accent-500 text-brand-900 rounded-xl font-bold text-center shadow-md text-sm">Đặt Trà Ngay</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 bg-brand-500 relative overflow-hidden text-white">
        <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-brand-600/60 blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-accent-900/30 blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center space-x-2 bg-brand-800 text-accent-500 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-brand-700">
                <span className="w-2.5 h-2.5 bg-accent-500 rounded-full animate-ping"></span>
                <span>Trà Sữa Sạch - Trà Tươi Đậm Vị Từ Đà Nẵng</span>
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight">
                Thưởng Thức Hương Vị <br/>
                <span className="bg-gradient-to-r from-accent-500 to-white bg-clip-text text-transparent">Trà Sữa Đích Thực</span> <br/>
                Cùng Tab Tea!
              </h1>
              <p className="text-brand-100 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Từ những búp trà xanh tươi nguyên chất được chọn lọc kĩ càng kết hợp công thức pha chế độc bản. Tab Tea đem đến trải nghiệm uống đậm đà, mát lạnh và trọn vẹn từng khoảnh khắc giải trí, học tập của học sinh - sinh viên.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a href="#menu" className="w-full sm:w-auto px-8 py-4 bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold rounded-2xl shadow-lg shadow-accent-500/20 hover:shadow-accent-500/30 transition-all hover:-translate-y-1 text-center">
                  Khám Phá Menu Ngay
                </a>
                <a href="https://maps.app.goo.gl/skShq4GXJ2TEtWzT6" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-brand-800 hover:bg-brand-700 text-accent-500 border border-brand-700 font-semibold rounded-2xl transition-all flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                  <span>Xem Vị Trí Google Map</span>
                </a>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-brand-700 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <span className="block font-serif text-2xl font-black text-accent-500">100%</span>
                  <span className="text-xs text-brand-200 font-medium">Trà tươi nguyên chất</span>
                </div>
                <div className="text-center lg:text-left border-x border-brand-700 px-4">
                  <span className="block font-serif text-2xl font-black text-accent-500">3+</span>
                  <span className="text-xs text-brand-200 font-medium">Chi nhánh Đà Nẵng</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block font-serif text-2xl font-black text-accent-500">10k+</span>
                  <span className="text-xs text-brand-200 font-medium">Khách hàng tin chọn</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 sm:w-80 md:w-96 lg:w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-500 to-brand-600 rounded-[3rem] transform rotate-3 -z-10 opacity-40"></div>
                <div className="bg-brand-600 p-4 rounded-[3rem] shadow-2xl shadow-black/40 border border-brand-700 overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
                  <img src="https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=800" 
                       alt="Trà sữa Tab Tea cao cấp" 
                       className="w-full h-80 sm:h-96 object-cover rounded-2xl mb-4"
                       onError={(e) => {
                         (e.target as HTMLImageElement).src = 'https://placehold.co/400x450/021359/ffffff?text=Tab+Tea+Premium';
                       }}/>
                  
                  <div className="flex items-center justify-between px-2 pb-2">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-accent-500">Trà Sữa Trân Châu Tab</h4>
                      <p className="text-xs text-brand-100 font-semibold">Best-seller của hệ thống</p>
                    </div>
                    <div className="bg-brand-800 px-3 py-1.5 rounded-xl border border-brand-700 text-right">
                      <span className="block text-xs font-semibold text-brand-300 line-through">35.000đ</span>
                      <span className="block text-sm font-black text-accent-500">chỉ từ 25.000đ</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 bg-brand-800 p-3.5 rounded-2xl shadow-lg border border-brand-700 flex items-center space-x-2.5 animate-bounce">
                  <span className="text-2xl">🔥</span>
                  <div className="text-left">
                    <span className="block font-bold text-xs text-white">Trà Sữa Milo Dầm</span>
                    <span className="text-[10px] text-brand-200 block">Giới trẻ phát cuồng</span>
                  </div>
                </div>

                <div className="absolute bottom-10 -right-6 bg-accent-500 text-brand-900 p-3.5 rounded-2xl shadow-xl flex items-center space-x-2.5 transform rotate-3 border border-accent-400">
                  <div className="p-1.5 bg-brand-500 rounded-lg text-accent-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"/></svg>
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-xs uppercase tracking-wide">Đạt Chuẩn Sạch</span>
                    <span className="text-[10px] text-brand-700 font-semibold block">Vệ sinh an toàn thực phẩm</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUE / ABOUT US */}
      <section id="about" className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs sm:text-sm">Về Tab Tea</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-500">Mộc Mạc - Tận Tâm - Đậm Vị</h2>
            <p className="text-gray-500 text-sm sm:text-base">Chúng tôi không chỉ bán trà sữa, chúng tôi trao gửi những khoảnh khắc nghỉ ngơi ý nghĩa nhất cho bạn sau giờ làm việc, học tập căng thẳng.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-brand-50/50 border border-brand-100 hover:border-brand-300 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 space-y-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-accent-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-500">Trà Tươi Thu Hoạch Mỗi Ngày</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Lá trà được thu hái nguyên chất từ các đồi trà chất lượng của Việt Nam, giữ trọn hương vị nồng nàn và giàu chất chống oxy hóa tự nhiên.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-accent-100/40 border border-accent-200 hover:border-brand-500 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 space-y-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center text-accent-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"/></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-500">Nguyên Liệu Chuẩn Sạch</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nói không với hóa chất bảo quản và bột béo kém chất lượng. Sữa tươi thanh trùng, trân châu tươi nấu mới mỗi 4 giờ là lời cam kết của chúng tôi.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-brand-50/50 border border-brand-100 hover:border-brand-300 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 space-y-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center text-accent-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-500">Mức Giá Học Sinh - Sinh Viên</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chỉ từ 15k đến 35k cho một ly nước chất lượng siêu bự. Cùng không gian thư giãn lý tưởng hoàn toàn miễn phí điều hòa và wifi tốc độ cao.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MENU SECTION */}
      <section id="menu" className="py-20 relative bg-brand-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs sm:text-sm">Khám Phá Menu</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-500">Thực Đơn Đậm Vị Mê Ly</h2>
            <p className="text-gray-500 text-sm">Nhấp chọn các danh mục bên dưới để lọc nhanh món uống bạn yêu thích!</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-10 gap-3 no-scrollbar scroll-smooth">
            <button 
              onClick={() => setMenuFilter('all')} 
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap border transition-all ${menuFilter === 'all' ? 'bg-brand-500 text-accent-500 shadow-md shadow-brand-500/20 border-brand-500' : 'bg-white text-brand-500 hover:bg-brand-50 border-brand-100'}`}
            >
              ✨ Tất Cả Món
            </button>
            <button 
              onClick={() => setMenuFilter('milktea')} 
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap border transition-all ${menuFilter === 'milktea' ? 'bg-brand-500 text-accent-500 shadow-md shadow-brand-500/20 border-brand-500' : 'bg-white text-brand-500 hover:bg-brand-50 border-brand-100'}`}
            >
              🧋 Trà Sữa Quốc Dân
            </button>
            <button 
              onClick={() => setMenuFilter('fruit')} 
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap border transition-all ${menuFilter === 'fruit' ? 'bg-brand-500 text-accent-500 shadow-md shadow-brand-500/20 border-brand-500' : 'bg-white text-brand-500 hover:bg-brand-50 border-brand-100'}`}
            >
              🍓 Trà Trái Cây Tươi
            </button>
            <button 
              onClick={() => setMenuFilter('milo')} 
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap border transition-all ${menuFilter === 'milo' ? 'bg-brand-500 text-accent-500 shadow-md shadow-brand-500/20 border-brand-500' : 'bg-white text-brand-500 hover:bg-brand-50 border-brand-100'}`}
            >
              🍫 Milo Dầm & Đặc Biệt
            </button>
            <button 
              onClick={() => setMenuFilter('snacks')} 
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap border transition-all ${menuFilter === 'snacks' ? 'bg-brand-500 text-accent-500 shadow-md shadow-brand-500/20 border-brand-500' : 'bg-white text-brand-500 hover:bg-brand-50 border-brand-100'}`}
            >
              🍿 Ăn Vặt Giới Trẻ
            </button>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p, idx) => (
              <div key={idx} className="bg-white p-4 rounded-3xl border border-brand-100 hover:border-brand-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left">
                <div>
                  <div className="relative overflow-hidden rounded-2xl mb-4 group aspect-[4/3]">
                    <img src={p.image} 
                         alt={p.name} 
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                         onError={(e) => {
                           (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/021359/ffffff?text=Tra+Sua+Tab+Tea';
                         }}/>
                    {p.isPopular && (
                      <span className="absolute top-3 left-3 bg-accent-500 text-brand-900 text-[10px] uppercase font-black px-2.5 py-1 rounded-md">Bán Chạy</span>
                    )}
                    {p.isHot && (
                      <span className="absolute top-3 left-3 bg-brand-800 text-accent-500 text-[10px] uppercase font-black px-2.5 py-1 rounded-md">Hot Trend</span>
                    )}
                    {p.isHealthy && (
                      <span className="absolute top-3 left-3 bg-brand-700 text-brand-100 text-[10px] uppercase font-black px-2.5 py-1 rounded-md">Healthy</span>
                    )}
                    {p.isValue && (
                      <span className="absolute top-3 left-3 bg-brand-800 text-accent-500 text-[10px] uppercase font-black px-2.5 py-1 rounded-md">Giá Siêu Hời</span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-brand-500 mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{p.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-base font-black text-brand-500">{p.price.toLocaleString('vi-VN')}đ</span>
                  <button 
                    onClick={() => openCustomizer(p.name, p.price, p.image)} 
                    className="px-3.5 py-2.5 bg-brand-500 hover:bg-brand-600 text-accent-500 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 shadow-sm"
                  >
                    <span>Thêm món</span>
                    <svg className="w-3.5 h-3.5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMIZER MODAL */}
      {customizerModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-brand-900/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl border border-brand-100 flex flex-col max-h-[90vh] transition-all duration-300">
            {/* Header */}
            <div className="relative h-44 sm:h-48">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent"></div>
              <button onClick={() => setCustomizerModalOpen(false)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all" aria-label="Close modal">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-left">
                <h3 className="font-serif text-2xl font-bold text-accent-500 leading-tight">{selectedProduct.name}</h3>
                <p className="text-xs text-brand-200 font-semibold">Giá gốc: {selectedProduct.basePrice.toLocaleString('vi-VN')}đ</p>
              </div>
            </div>

            {/* Content options */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-left">
              {/* Size */}
              <div className="space-y-3">
                <h4 className="font-bold text-brand-500 border-l-4 border-accent-500 pl-2">Chọn kích cỡ (Size)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSizeOption('M')} 
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${sizeOption === 'M' ? 'border-brand-500 bg-brand-50/40' : 'border-gray-100 hover:bg-gray-50'}`}
                  >
                    <span className="font-semibold text-brand-900">Size M (Vừa)</span>
                    <span className="text-xs font-bold text-gray-500">+0đ</span>
                  </button>
                  <button 
                    onClick={() => setSizeOption('L')} 
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${sizeOption === 'L' ? 'border-brand-500 bg-brand-50/40' : 'border-gray-100 hover:bg-gray-50'}`}
                  >
                    <span className="font-semibold text-brand-900">Size L (Lớn)</span>
                    <span className="text-xs font-bold text-brand-600">+5.000đ</span>
                  </button>
                </div>
              </div>

              {/* Sweetness */}
              <div className="space-y-3">
                <h4 className="font-bold text-brand-500 border-l-4 border-brand-500 pl-2">Mức đường (Ngọt)</h4>
                <div className="grid grid-cols-3 gap-2">
                  {(['100', '70', '50'] as const).map((level) => (
                    <button 
                      key={level} 
                      onClick={() => setSweetness(level)} 
                      className={`text-center p-2.5 rounded-xl border text-xs font-bold ${sweetness === level ? 'border-brand-500 bg-brand-50/20 text-brand-800' : 'border-gray-100 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {level}% Đường
                    </button>
                  ))}
                </div>
              </div>

              {/* Ice */}
              <div className="space-y-3">
                <h4 className="font-bold text-brand-500 border-l-4 border-brand-500 pl-2">Mức đá (Mát lạnh)</h4>
                <div className="grid grid-cols-3 gap-2">
                  {(['100', '70', '0'] as const).map((level) => (
                    <button 
                      key={level} 
                      onClick={() => setIce(level)} 
                      className={`text-center p-2.5 rounded-xl border text-xs font-bold ${ice === level ? 'border-brand-500 bg-brand-50/20 text-brand-800' : 'border-gray-100 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {level === '0' ? 'Không Đá' : `${level}% Đá`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toppings */}
              <div className="space-y-3">
                <h4 className="font-bold text-brand-500 border-l-4 border-brand-500 pl-2">Thêm Toppings (Chọn nhiều)</h4>
                <div className="space-y-2">
                  {[
                    { key: 'pearl', label: 'Trân châu hoàng kim dai dẻo' },
                    { key: 'cheese', label: 'Thạch phô mai cục siêu to' },
                    { key: 'pudding', label: 'Pudding trứng béo mềm' }
                  ].map((t) => (
                    <button 
                      key={t.key} 
                      onClick={() => handleToppingChange(t.key)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${selectedToppings.includes(t.key) ? 'border-brand-500 bg-brand-50/20' : 'border-gray-100 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedToppings.includes(t.key) ? 'bg-brand-500 border-brand-500 text-white' : 'border-gray-300'}`}>
                          {selectedToppings.includes(t.key) && <span className="text-[10px]">✓</span>}
                        </div>
                        <span className="font-medium text-brand-900">{t.label}</span>
                      </div>
                      <span className="text-xs font-bold text-brand-600">+5.000đ</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs text-gray-500 block font-semibold">TỔNG CỘNG</span>
                <span className="text-2xl font-black text-brand-500">{calculateTotalPrice().toLocaleString('vi-VN')}đ</span>
              </div>
              <button onClick={addSelectedToOrder} className="px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-accent-500 font-bold rounded-2xl shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all flex items-center space-x-2">
                <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                <span>Thêm Vào Giỏ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SPECIAL PROMO SECTION */}
      <section id="combos" className="py-20 bg-gradient-to-br from-brand-900 to-brand-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/35 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center space-x-1.5 bg-accent-500 text-brand-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                ⭐ Siêu Khuyến Mãi Đầu Tuần
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2]">
                Combo Tiết Kiệm <br/>
                <span className="text-accent-500">Bừng Tỉnh Đam Mê!</span>
              </h2>
              <p className="text-brand-100 text-sm sm:text-base leading-relaxed font-light">
                Nhóm bạn đi đông, ngại chi hóa đơn đắt? Tab Tea ra mắt bộ sưu tập siêu Combo đồng giá hấp dẫn dành riêng cho học sinh, sinh viên các trường đại học tại khu vực Ngũ Hành Sơn & Liên Chiểu.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <a href="#menu" className="px-6 py-3.5 bg-accent-500 text-brand-900 font-bold rounded-2xl text-center hover:bg-accent-600 transition-all">Đặt Combo Ngay</a>
                <a href="#contact" className="px-6 py-3.5 bg-transparent border border-white/20 hover:border-white text-white font-semibold rounded-2xl text-center transition-all">Nhận Tin Ưu Đãi Mới</a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Combo 1 */}
              <div className="bg-brand-900/60 backdrop-blur-md p-6 rounded-[2rem] border border-brand-700 space-y-4 hover:bg-brand-900/80 transition-all text-left">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-brand-800 rounded-lg text-xs font-bold tracking-wider text-accent-500 font-medium">COMBO ĐÔI BẠN</span>
                  <span className="text-accent-500 font-bold text-xs">-20% GIẢM</span>
                </div>
                <h3 className="font-serif text-xl font-bold">2 Ly Trà sữa bất kì + 1 Mẹt ăn vặt</h3>
                <p className="text-xs text-brand-200 leading-relaxed font-light">Thoải mái trò chuyện xuyên lục địa cùng chiến hữu với bộ đôi best-seller béo bùi và khay đồ chiên đẫm sốt tương ớt.</p>
                <div className="pt-4 flex items-center justify-between border-t border-brand-800">
                  <div>
                    <span className="block text-[10px] text-brand-300 line-through">95.000đ</span>
                    <span className="text-lg font-black text-accent-500 font-bold">75.000đ</span>
                  </div>
                  <button onClick={() => orderCombo('Combo Đôi Bạn (2 Trà sữa + 1 Mẹt ăn vặt)', 75000)} className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold rounded-xl text-xs transition-all">Đặt ngay</button>
                </div>
              </div>

              {/* Combo 2 */}
              <div className="bg-brand-900/60 backdrop-blur-md p-6 rounded-[2rem] border border-brand-700 space-y-4 hover:bg-brand-900/80 transition-all text-left">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-brand-800 rounded-lg text-xs font-bold tracking-wider text-accent-500 font-medium">COMBO ĐẠI HỌC</span>
                  <span className="text-accent-500 font-bold text-xs">HOT DEAL</span>
                </div>
                <h3 className="font-serif text-xl font-bold">3 Ly Milo dầm trân châu</h3>
                <p className="text-xs text-brand-200 leading-relaxed font-light">Hội họp nhóm sau giờ làm bài tập lớn căng thẳng. Năng lượng ngọt ngào đậm vị milo mát lạnh sẽ sạc đầy năng lực chiến đấu.</p>
                <div className="pt-4 flex items-center justify-between border-t border-brand-800">
                  <div>
                    <span className="block text-[10px] text-brand-300 line-through">90.000đ</span>
                    <span className="text-lg font-black text-accent-500 font-bold">69.000đ</span>
                  </div>
                  <button onClick={() => orderCombo('Combo Đại Học (3 Milo dầm trân châu)', 69000)} className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold rounded-xl text-xs transition-all">Đặt ngay</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BRANCHES / LOCATIONS SECTION */}
      <section id="branches" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs sm:text-sm">Hệ Thống Cửa Hàng</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-500">Chuỗi Cửa Hàng Tab Tea Đà Nẵng</h2>
            <p className="text-gray-500 text-sm">Hiện diện tại các trục đường sầm uất và khu vực học tập nhộn nhịp của Đà thành.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Branch 1 */}
            <div className="bg-brand-500 rounded-[2.5rem] border-2 border-accent-500 p-8 flex flex-col justify-between shadow-xl relative transform lg:-translate-y-2 text-white text-left">
              <div className="absolute -top-4 -right-4 bg-accent-500 text-brand-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                Cơ Sở Chính
              </div>
              <div>
                <div className="p-3 bg-brand-600 rounded-2xl w-14 h-14 flex items-center justify-center text-accent-500 mb-6 border border-brand-700">
                  <svg className="w-8 h-8 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                </div>
                <h3 className="font-serif text-2xl font-extrabold text-accent-500 mb-2">CS 1: Liên Chiểu</h3>
                <p className="text-sm font-semibold text-brand-100 mb-4">65 Ngô Văn Sở, Liên Chiểu, Đà Nẵng</p>
                <p className="text-xs text-brand-100 leading-relaxed mb-6 font-light">
                  Quán nằm ngay khu vực sầm uất đối diện trường Đại Học Sư Phạm Đà Nẵng, không gian vô cùng thoáng mát, rộng rãi, decor siêu kute trẻ trung, là điểm tụ tập lý tưởng của giới trẻ quận Liên Chiểu.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-brand-600">
                <a href="https://maps.app.goo.gl/skShq4GXJ2TEtWzT6" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold rounded-2xl text-center shadow-md flex items-center justify-center space-x-2 transition-all">
                  <svg className="w-5 h-5 text-brand-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2l5.447 2.724A1 1 0 0115 5.618v10.764a1 1 0 01-.553.894L9 20z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 2v18"/></svg>
                  <span>Xem Google Maps</span>
                </a>
                <div className="flex items-center justify-between text-xs text-brand-200 font-semibold px-2">
                  <span>Giờ mở cửa: 07:00 - 22:30</span>
                  <span className="text-accent-500">● Đang mở cửa</span>
                </div>
              </div>
            </div>

            {/* Branch 2 */}
            <div className="bg-white rounded-[2.5rem] border border-brand-100 p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 text-left">
              <div>
                <div className="p-3 bg-brand-50 rounded-2xl w-14 h-14 flex items-center justify-center text-brand-500 mb-6">
                  <svg className="w-8 h-8 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                </div>
                <h3 className="font-serif text-2xl font-extrabold text-brand-500 mb-2">CS 2: Ngũ Hành Sơn</h3>
                <p className="text-sm font-semibold text-gray-500 mb-4">229 Huỳnh Văn Nghệ, Ngũ Hành Sơn, Đà Nẵng</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 font-light">
                  Nằm sát cạnh khu Làng Đại Học, đặc biệt rất gần trường Đại học Công nghệ thông tin và Truyền thông Việt - Hàn (VKU). Quán thiết kế với nhiều góc học tập làm việc yên tĩnh, ổ cắm bố trí tối đa cực kì tiện lợi.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <a href="https://maps.app.goo.gl/skShq4GXJ2TEtWzT6" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-brand-50 hover:bg-brand-100 text-brand-500 font-bold rounded-2xl text-center flex items-center justify-center space-x-2 transition-all">
                  <span>Xem Bản Đồ Cơ Sở 2</span>
                </a>
                <div className="flex items-center justify-between text-xs text-gray-400 font-semibold px-2">
                  <span>Giờ mở cửa: 07:00 - 22:00</span>
                  <span className="text-green-600">● Đang mở cửa</span>
                </div>
              </div>
            </div>

            {/* Branch 3 */}
            <div className="bg-white rounded-[2.5rem] border border-brand-100 p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 text-left">
              <div>
                <div className="p-3 bg-brand-50 rounded-2xl w-14 h-14 flex items-center justify-center text-brand-500 mb-6">
                  <svg className="w-8 h-8 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                </div>
                <h3 className="font-serif text-2xl font-extrabold text-brand-500 mb-2">CS 3: Hải Châu</h3>
                <p className="text-sm font-semibold text-gray-500 mb-4">395 Hoàng Diệu, Hải Châu, Đà Nẵng</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 font-light">
                  Tọa lạc trên trục đường sầm uất bậc nhất trung tâm thành phố Đà Nẵng. Cơ sở Hải Châu có dịch vụ giao hàng siêu nhanh, chỗ đỗ xe máy lớn, phục vụ nhanh chóng và nhiều chương trình ưu đãi take-away tiện lợi.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <a href="https://maps.app.goo.gl/skShq4GXJ2TEtWzT6" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-brand-50 hover:bg-brand-100 text-brand-500 font-bold rounded-2xl text-center flex items-center justify-center space-x-2 transition-all">
                  <span>Xem Bản Đồ Cơ Sở 3</span>
                </a>
                <div className="flex items-center justify-between text-xs text-gray-400 font-semibold px-2">
                  <span>Giờ mở cửa: 07:00 - 22:30</span>
                  <span className="text-green-600">● Đang mở cửa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-brand-50/40 border-y border-brand-100/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs sm:text-sm">Đánh Giá Từ Khách Hàng</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-500">Giới Trẻ Nói Gì Về Tab Tea?</h2>
            <p className="text-gray-500 text-sm">Ý kiến đóng góp chân thật từ những vị khách quý ghé thăm chuỗi cửa hàng.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md space-y-4 hover:-translate-y-1 transition-transform text-left">
              <div className="flex items-center space-x-1 text-accent-700">
                <span className="text-lg">★★★★★</span>
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed">
                "Là sinh viên Sư Phạm mình ghé quán bên Ngô Văn Sở suốt. Nước siêu ngon nhất là trà sữa thái xanh phô mai béo ngậy. Giá thì siêu hạt dẻ phù hợp túi tiền tụi mình lắm, phục vụ lại vô cùng nhiệt tình!"
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-900 text-sm">
                  HN
                </div>
                <div>
                  <span className="block font-bold text-xs text-gray-900">Hoàng Ngân</span>
                  <span className="text-[10px] text-gray-400 block">Sinh viên ĐH Sư Phạm Đà Nẵng</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md space-y-4 hover:-translate-y-1 transition-transform text-left">
              <div className="flex items-center space-x-1 text-accent-700">
                <span className="text-lg">★★★★★</span>
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed">
                "Menu đa dạng lắm, thích nhất là trà sữa milo dầm topping quá trời ăn muốn xỉu luôn. Quán có máy điều hòa mát lạnh với nhiều ổ cắm nên cuối tuần là mình kéo nhóm sang Huỳnh Văn Nghệ chạy deadline rất thoải mái."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-accent-200 flex items-center justify-center font-bold text-brand-900 text-sm">
                  MH
                </div>
                <div>
                  <span className="block font-bold text-xs text-gray-900">Minh Hoàng</span>
                  <span className="text-[10px] text-gray-400 block">Sinh viên Đại học Việt - Hàn</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md space-y-4 hover:-translate-y-1 transition-transform text-left">
              <div className="flex items-center space-x-1 text-accent-700">
                <span className="text-lg">★★★★★</span>
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed">
                "Trà vải lài thạch nha đam thanh mát, thơm cực kì và không hề ngọt gắt. Giao hàng qua ShopeeFood cực kì nhanh, đóng gói ly giấy thân thiện bảo vệ môi trường nữa, 10 điểm tuyệt đối cho Tab Tea!"
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-900 text-sm">
                  TT
                </div>
                <div>
                  <span className="block font-bold text-xs text-gray-900">Thùy Trang</span>
                  <span className="text-[10px] text-gray-400 block">Nhân viên Văn phòng (Hải Châu)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & CONTACT SECTION */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* FAQ */}
            <div className="space-y-8 text-left">
              <div>
                <span className="text-brand-500 font-extrabold uppercase tracking-widest text-xs sm:text-sm">Giải Đáp Thắc Mắc</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-500 mt-2">Câu Hỏi Thường Gặp</h2>
              </div>

              <div className="space-y-4">
                {[
                  { id: 1, q: '1. Nguyên liệu pha chế của Tab Tea có rõ nguồn gốc không?', a: 'Toàn bộ nguồn trà và nguyên vật liệu của Tab Tea đều được tuyển chọn kỹ càng, có xuất xứ rõ ràng từ những thương hiệu uy tín hàng đầu trong nước. Trà tươi được pha mới liên tục trong ngày để đảm bảo độ thanh mộc và an toàn vệ sinh tối ưu nhất.' },
                  { id: 2, q: '2. Quán có chương trình ưu đãi nào dành cho hội nhóm, câu lạc bộ không?', a: 'Có! Chúng tôi liên tục hỗ trợ giảm giá từ 10-15% cho các hội sinh viên đặt số lượng lớn phục vụ sự kiện, hoặc offline câu lạc bộ học tập tại các cơ sở. Vui lòng liên hệ hotline hoặc gửi form đăng ký để được hỗ trợ báo giá chi tiết.' },
                  { id: 3, q: '3. Thời gian giao hàng và các app đặt giao hàng như thế nào?', a: 'Tab Tea hoạt động giao hàng liên tục từ 08:00 đến 22:00. Bạn có thể tìm thấy quán trực tiếp trên ShopeeFood, GrabFood hoặc đặt trực tiếp qua số Zalo của hệ thống để được freeship trong bán kính 2km xung quanh các cơ sở chính.' }
                ].map((faq) => (
                  <div key={faq.id} className="border-b border-gray-100 pb-4">
                    <button 
                      className="w-full flex justify-between items-center text-left py-2 font-bold text-brand-900 hover:text-brand-500 transition-colors" 
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span>{faq.q}</span>
                      <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${faqOpen[faq.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    {faqOpen[faq.id] && (
                      <div className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed font-light">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-brand-50/50 p-8 sm:p-10 rounded-[2.5rem] border border-brand-100 shadow-xl space-y-6 text-left">
              <div>
                <h3 className="font-serif text-2xl font-extrabold text-brand-500">Góp Ý Hoặc Đăng Ký Trải Nghiệm</h3>
                <p className="text-xs text-gray-500 mt-1">Cửa hàng luôn ghi nhận mọi phản hồi để cải thiện chất lượng phục vụ tốt nhất.</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700 block">Tên của bạn *</label>
                    <input 
                      type="text" 
                      required 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Nguyễn Văn A" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 transition-colors bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-semibold text-gray-700 block">Số điện thoại *</label>
                    <input 
                      type="tel" 
                      required 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="0905xxxxxx" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 transition-colors bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700 block font-medium">Chọn Chi Nhánh Phản Hồi *</label>
                  <select 
                    value={contactBranch}
                    onChange={(e) => setContactBranch(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 transition-colors bg-white font-medium"
                  >
                    <option value="cs1">Cơ sở 1: 65 Ngô Văn Sở (Liên Chiểu)</option>
                    <option value="cs2">Cơ sở 2: 229 Huỳnh Văn Nghệ (Ngũ Hành Sơn)</option>
                    <option value="cs3">Cơ sở 3: 395 Hoàng Diệu (Hải Châu)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-gray-700 block">Lời nhắn / Nội dung góp ý *</label>
                  <textarea 
                    rows={4} 
                    required 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Bạn cần hỗ trợ gì hoặc có ý kiến đóng góp nào cho quán..." 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 transition-colors bg-white"
                  />
                </div>

                <button type="submit" className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-accent-500 font-bold rounded-xl shadow-md shadow-brand-500/10 hover:shadow-brand-500/20 transition-all flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                  <span>Gửi Thư Góp Ý</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-900 text-gray-400 py-16 border-t border-brand-800 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 text-sm">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-accent-500 font-serif text-xl font-bold">
                T
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">Tab Tea Đà Nẵng</span>
            </div>
            <p className="text-xs text-brand-100 leading-relaxed max-w-sm font-light">
              Thương hiệu trà sữa hàng đầu phục vụ sinh viên học sinh tại Đà thành. Cam kết đem đến trải nghiệm ngọt mát, sạch lành và những khoảng thời gian nghỉ chân tuyệt vời nhất.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-500 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="https://maps.app.goo.gl/skShq4GXJ2TEtWzT6" target="_blank" rel="noopener noreferrer" className="hover:text-accent-500 transition-colors" aria-label="Google Maps">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Liên Kết Nhanh</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#about" className="hover:text-accent-500 transition-colors">Về chúng tôi</a></li>
              <li><a href="#menu" className="hover:text-accent-500 transition-colors">Khám phá thực đơn</a></li>
              <li><a href="#combos" className="hover:text-accent-500 transition-colors">Chương trình khuyến mãi</a></li>
              <li><a href="#branches" className="hover:text-accent-500 transition-colors">Vị trí địa lý</a></li>
              <li><a href="https://maps.app.goo.gl/skShq4GXJ2TEtWzT6" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline">Google Map chỉ đường ↗</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">Chuỗi Cửa Hàng</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <span className="block text-white font-semibold font-medium">📍 CS1: Liên Chiểu (Đại Học Sư Phạm)</span>
                <span className="block text-[11px] text-brand-200">65 Ngô Văn Sở, Liên Chiểu, Đà Nẵng</span>
              </li>
              <li>
                <span className="block text-white font-semibold font-medium">📍 CS2: Ngũ Hành Sơn (Làng Đại Học)</span>
                <span className="block text-[11px] text-brand-200">229 Huỳnh Văn Nghệ, Ngũ Hành Sơn, Đà Nẵng</span>
              </li>
              <li>
                <span className="block text-white font-semibold font-medium">📍 CS3: Hải Châu (Trung tâm)</span>
                <span className="block text-[11px] text-brand-200">395 Hoàng Diệu, Hải Châu, Đà Nẵng</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Tab Tea Đà Nẵng. Tất cả các quyền được bảo lưu.</p>
          <p>Phát triển dựa trên nhận diện cốt lõi của Tab Tea.</p>
        </div>
      </footer>

      {/* CART OVERVIEW MODAL */}
      {cartModalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-900/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-md w-full overflow-hidden shadow-2xl border border-brand-100 flex flex-col max-h-[85vh] transition-all duration-300">
            {/* Header */}
            <div className="p-6 bg-brand-500 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                <h3 className="font-serif text-xl font-bold text-accent-500">Giỏ Hàng Của Bạn</h3>
              </div>
              <button onClick={() => setCartModalOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Items List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-left">
              {cart.map((item, index) => (
                <div key={index} className="flex items-start justify-between p-3.5 bg-brand-50 rounded-2xl border border-brand-100">
                  <div className="space-y-1">
                    <span className="block font-bold text-brand-900">{index + 1}. {item.name}</span>
                    <span className="block text-[11px] text-gray-500 font-medium">
                      Size {item.size} • {item.sweetness}% Đường • {item.ice === '0' ? 'Không Đá' : `${item.ice}% Đá`}
                      {item.toppings.length > 0 && (
                        <>
                          <br />
                          <span className="text-brand-500 font-semibold">+ {item.toppings.join(', ')}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end justify-between h-full min-h-[48px]">
                    <span className="text-sm font-black text-brand-600 font-bold">{item.price.toLocaleString('vi-VN')}đ</span>
                    <button onClick={() => removeCartItem(index)} className="text-[11px] text-red-500 font-bold hover:underline">Xóa</button>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="text-center text-gray-400 py-8">Giỏ hàng trống trơn...</p>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-500">TỔNG CỘNG:</span>
                <span className="text-2xl font-black text-brand-500 font-bold">{cartTotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={clearCart} className="py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl text-xs transition-colors">
                  Xóa Giỏ Hàng
                </button>
                <button onClick={submitOrder} className="py-3 bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold rounded-xl text-xs shadow-md transition-colors">
                  Copy & Gửi Order ↗
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center font-light">Đơn hàng sẽ được copy vào Clipboard và mở Maps cửa hàng gần nhất để bạn liên hệ trực tiếp!</p>
            </div>
          </div>
        </div>
      )}

      {/* FLOAT SHOPPING CART BUTTON */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-45">
          <button 
            onClick={() => setCartModalOpen(true)} 
            className="p-4 bg-accent-500 hover:bg-accent-600 text-brand-950 rounded-full shadow-2xl flex items-center justify-center relative transform hover:scale-105 transition-all border border-accent-400"
          >
            <span className="absolute -top-1.5 -right-1.5 bg-brand-500 text-accent-500 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-accent-500 font-bold">
              {cart.length}
            </span>
            <svg className="w-6 h-6 text-brand-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </button>
        </div>
      )}

      {/* TOAST NOTIFICATION MESSAGE */}
      <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-brand-900 border border-brand-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 pointer-events-none transition-all duration-300 ${toastOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <span className="text-lg">✅</span>
        <span className="text-xs sm:text-sm font-semibold text-accent-500">{toastMessage}</span>
      </div>
    </div>
  );
}
