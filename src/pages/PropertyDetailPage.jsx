import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Star, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Wifi, 
  Wind, 
  Bath, 
  Tv, 
  Car, 
  Utensils, 
  Sparkles, 
  Calendar, 
  Users, 
  ArrowLeft,
  Clock,
  Coffee,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRupiah, calculateBookingTotals } from '../utils/formatters';

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, isFavorite, toggleFavorite, showToast } = useApp();

  const property = properties.find((p) => p.id === id);

  // Booking widget local state
  const isKos = property?.type === 'kos';
  const [duration, setDuration] = useState(isKos ? 3 : 2);
  const [checkInDate, setCheckInDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [guestsCount, setGuestsCount] = useState(1);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  if (!property) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-charcoal-900">Properti Tidak Ditemukan</h2>
        <p className="text-xs text-charcoal-500">
          Properti yang Anda cari mungkin telah dihapus atau tidak tersedia.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coral-500 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(property.id);
  const durationUnit = property.priceUnit || (isKos ? 'bulan' : 'malam');
  const totals = calculateBookingTotals(property.price, duration, durationUnit);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast("Tautan properti disalin ke clipboard!", "info");
  };

  const handleBookNow = () => {
    navigate(`/booking/${property.id}`, {
      state: {
        property,
        checkInDate,
        duration,
        durationUnit,
        guestsCount,
        totals
      }
    });
  };

  const images = property.images && property.images.length > 0 ? property.images : [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
  ];

  const facilityIcons = {
    'wifi': <Wifi className="w-4 h-4 text-coral-500" />,
    'ac': <Wind className="w-4 h-4 text-coral-500" />,
    'kamar mandi': <Bath className="w-4 h-4 text-coral-500" />,
    'tv': <Tv className="w-4 h-4 text-coral-500" />,
    'parkir': <Car className="w-4 h-4 text-coral-500" />,
    'dapur': <Utensils className="w-4 h-4 text-coral-500" />,
    'sarapan': <Coffee className="w-4 h-4 text-coral-500" />
  };

  const getFacilityIcon = (text) => {
    const lower = text.toLowerCase();
    for (const key in facilityIcons) {
      if (lower.includes(key)) return facilityIcons[key];
    }
    return <Sparkles className="w-4 h-4 text-coral-500" />;
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-coral-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-full glass-pill border border-charcoal-200 text-xs font-semibold text-charcoal-700 hover:bg-white flex items-center gap-1.5 shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan</span>
          </button>
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`px-3 py-1.5 rounded-full glass-pill border border-charcoal-200 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors ${
              isFav ? 'text-coral-500 bg-coral-50' : 'text-charcoal-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-coral-500 text-coral-500' : ''}`} />
            <span>{isFav ? 'Disimpan' : 'Simpan'}</span>
          </button>
        </div>
      </div>

      {/* Property Title & Meta */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-coral-50 text-coral-600 border border-coral-200">
            {property.subType || property.type.toUpperCase()}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-charcoal-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {property.rating} • {property.reviewCount} Ulasan Terverifikasi
          </span>
          <span className="text-xs text-charcoal-400">•</span>
          <span className="flex items-center gap-1 text-xs font-medium text-charcoal-600">
            <MapPin className="w-3.5 h-3.5 text-coral-500" />
            {property.city}, Indonesia
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-charcoal-900 tracking-tight">
          {property.name}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">{property.address}</p>
      </div>

      {/* Airbnb-style 5-Photo Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden aspect-16/10 sm:aspect-21/9 max-h-[480px]">
        {/* Main Big Photo (Left) */}
        <div className="md:col-span-2 relative group overflow-hidden bg-charcoal-100 h-full">
          <img
            src={images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </div>

        {/* 4 Small Photos (Right, 2x2) */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-full">
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative group overflow-hidden bg-charcoal-100 h-full">
              <img
                src={img}
                alt={`${property.name} view ${i + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Detail Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Information, Amenities, Host, Reviews */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-10">
          
          {/* Host Info Header */}
          <div className="flex items-center justify-between pb-6 border-b border-charcoal-200/60">
            <div>
              <h2 className="text-lg font-bold text-charcoal-900">
                Dikelola oleh {property.host?.name || "Mitra StaySpace"}
              </h2>
              <div className="flex items-center gap-2 text-xs text-charcoal-500 mt-1">
                <span className="font-semibold text-coral-600">{property.host?.badge || "Superhost"}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-charcoal-400" />
                  {property.host?.responseTime || "Balas dalam 15 menit"}
                </span>
              </div>
            </div>

            <img
              src={property.host?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
              alt={property.host?.name || "Host"}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
            />
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-charcoal-200/60">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-coral-50 text-coral-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal-900">Kamar Terverifikasi</h4>
                <p className="text-[11px] text-charcoal-500 mt-0.5">Sesuai foto 100% dan kondisi prima</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal-900">Ukuran Kamar Luas</h4>
                <p className="text-[11px] text-charcoal-500 mt-0.5">{property.roomSize || "Nyaman & Lega"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal-900">Bebas Ribet</h4>
                <p className="text-[11px] text-charcoal-500 mt-0.5">Check-in mandiri & akses fleksibel</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 pb-6 border-b border-charcoal-200/60">
            <h3 className="text-base font-extrabold text-charcoal-900">Tentang Properti Ini</h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Facilities / Amenities */}
          <div className="space-y-4 pb-6 border-b border-charcoal-200/60">
            <h3 className="text-base font-extrabold text-charcoal-900">Fasilitas yang Disediakan</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(property.facilities || []).map((fac, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-2xl glass-card border border-charcoal-200/50 bg-white/70 text-xs font-semibold text-charcoal-800"
                >
                  {getFacilityIcon(fac)}
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules */}
          {property.rules && property.rules.length > 0 && (
            <div className="space-y-3 pb-6 border-b border-charcoal-200/60">
              <h3 className="text-base font-extrabold text-charcoal-900">Aturan & Ketentuan Menginap</h3>
              <ul className="space-y-2 text-xs text-charcoal-600">
                {property.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-coral-500 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Location Map Mockup */}
          <div className="space-y-3 pb-6 border-b border-charcoal-200/60">
            <h3 className="text-base font-extrabold text-charcoal-900">Lokasi & Area Sekitar</h3>
            <div className="relative rounded-3xl overflow-hidden border border-charcoal-200/80 aspect-16/7 bg-slate-200 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Map Background"
                className="w-full h-full object-cover filter brightness-90 contrast-95"
              />
              <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white text-center p-4">
                <div className="w-12 h-12 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="font-extrabold text-sm mt-2">{property.name}</p>
                <p className="text-xs text-white/90 max-w-md">{property.address}</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-charcoal-900 flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                {property.rating} • {property.reviewCount} Ulasan Terverifikasi
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-2xl border border-charcoal-200/60 bg-white/80 space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    alt="Reviewer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">Aulia Salsabila</p>
                    <p className="text-[10px] text-charcoal-400">Oktober 2026</p>
                  </div>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  "Tempatnya persis di foto, sangat bersih dan wangi. Suasana tenang banget untuk istirahat setelah seharian kuliah."
                </p>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-charcoal-200/60 bg-white/80 space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                    alt="Reviewer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-charcoal-900">Dimas Pratama</p>
                    <p className="text-[10px] text-charcoal-400">September 2026</p>
                  </div>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  "Internet kencang, parkir aman, dan host sangat ramah membantu pas pertama kali tiba. Pasti sewa lagi di sini!"
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Booking Card */}
        <aside className="lg:col-span-5 xl:col-span-4 sticky top-28">
          <div className="glass-modal rounded-3xl p-6 sm:p-7 border border-white/90 shadow-glass bg-white/90 space-y-6">
            
            {/* Price & Rating Header */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-charcoal-900">
                  {formatRupiah(property.price)}
                </span>
                <span className="text-xs font-bold text-charcoal-500 ml-1">
                  /{durationUnit}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-charcoal-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {property.rating}
              </div>
            </div>

            {/* Selection Form */}
            <div className="rounded-2xl border border-charcoal-200/80 divide-y divide-charcoal-200/80 overflow-hidden bg-white/60">
              
              {/* CheckIn Date */}
              <div className="p-3">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-charcoal-500 mb-1">
                  Mulai Check-In
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-coral-500 shrink-0" />
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-transparent text-xs font-bold text-charcoal-900 focus:outline-hidden cursor-pointer"
                  />
                </div>
              </div>

              {/* Duration Selector */}
              <div className="p-3">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-charcoal-500 mb-1">
                  Durasi Sewa ({durationUnit})
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-charcoal-800">
                    {duration} {durationUnit}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDuration(prev => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-lg border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100 font-bold flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-extrabold">{duration}</span>
                    <button
                      type="button"
                      onClick={() => setDuration(prev => prev + 1)}
                      className="w-7 h-7 rounded-lg border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100 font-bold flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Guests Count */}
              <div className="p-3">
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-charcoal-500 mb-1">
                  Jumlah Tamu / Penghuni
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-charcoal-800 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-coral-500" />
                    {guestsCount} Orang
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setGuestsCount(prev => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-lg border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100 font-bold flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-extrabold">{guestsCount}</span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(prev => Math.min(4, prev + 1))}
                      className="w-7 h-7 rounded-lg border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100 font-bold flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Price Breakdown Calculation */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex justify-between text-charcoal-600">
                <span>{formatRupiah(property.price)} x {duration} {durationUnit}</span>
                <span className="font-semibold text-charcoal-900">{formatRupiah(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-600">
                <span>Biaya Layanan & Pemeliharaan</span>
                <span className="font-semibold text-charcoal-900">{formatRupiah(totals.serviceFee)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Diskon Promo Durasi Panjang</span>
                  <span>-{formatRupiah(totals.discount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-charcoal-200/80 flex justify-between items-baseline font-black text-sm text-charcoal-900">
                <span>Total Biaya</span>
                <span className="text-lg text-coral-600">{formatRupiah(totals.totalPrice)}</span>
              </div>
            </div>

            {/* CTA Pesan Sekarang */}
            <button
              onClick={handleBookNow}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-coral-500 via-coral-600 to-rose-500 hover:from-coral-600 hover:to-rose-600 text-white font-extrabold text-sm shadow-lg shadow-coral-500/30 transition-all duration-200 active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>Pesan Sekarang</span>
            </button>

            {/* Simulation Badge */}
            <div className="p-3 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Simulasi Pemesanan:</strong> Anda belum dikenakan biaya riil. Transaksi hanya tersimpan di browser Anda.
              </span>
            </div>

          </div>
        </aside>

      </div>

    </div>
  );
};
