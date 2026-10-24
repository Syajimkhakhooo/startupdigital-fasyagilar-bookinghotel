import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Zap, 
  HeartHandshake, 
  Star, 
  MapPin, 
  Compass, 
  Award,
  Layers,
  Hotel
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/common/SearchBar';
import { PropertyCard } from '../components/common/PropertyCard';

export const HomePage = () => {
  const { properties } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua Pilihan', icon: Compass },
    { id: 'kos', label: 'Semua Kos', icon: Layers },
    { id: 'hotel', label: 'Semua Hotel', icon: Hotel },
    { id: 'Kos Putri', label: 'Kos Putri', icon: Sparkles },
    { id: 'Kos Campur', label: 'Kos Campur', icon: Building2 },
    { id: 'Hotel Mewah', label: 'Hotel Bintang 5', icon: Award }
  ];

  const cityHighlights = [
    { name: 'Semarang', count: 'Undip, Simpang Lima', img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80' },
    { name: 'Yogyakarta', count: 'UGM, Malioboro', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80' },
    { name: 'Bandung', count: 'Dago, Braga, ITB', img: 'https://images.unsplash.com/photo-1502005229762-ee152da915ba?auto=format&fit=crop&w=600&q=80' },
    { name: 'Jakarta', count: 'SCBD, Senopati', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80' },
    { name: 'Malang', count: 'Brawijaya, Alun-Alun', img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80' }
  ];

  const filteredProperties = properties.filter(prop => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'kos') return prop.type === 'kos';
    if (selectedCategory === 'hotel') return prop.type === 'hotel';
    return prop.subType === selectedCategory;
  });

  return (
    <div className="space-y-20 pb-16 pt-24 sm:pt-28">
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-coral-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-white/80 shadow-xs text-xs font-bold text-coral-600 animate-pulse">
            <Sparkles className="w-4 h-4 text-coral-500" />
            <span>Pemesanan Kos & Hotel Termudah & Terpercaya</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal-900 tracking-tight leading-[1.15]">
            Temukan Ruang Nyaman <br />
            <span className="bg-gradient-to-r from-coral-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Untuk Setiap Perjalananmu
            </span>
          </h1>

          <p className="text-sm sm:text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Dari kos-kosan eksklusif dekat kampus impian hingga hotel butik mewah di jantung kota. Pengalaman booking instan dengan desain modern Liquid Glass.
          </p>

          {/* Floating Search Bar */}
          <div className="pt-4">
            <SearchBar />
          </div>

        </div>

      </section>

      {/* Category Pills Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-md shadow-charcoal-900/20'
                    : 'glass-card text-charcoal-700 border-charcoal-200/60 hover:bg-white hover:border-charcoal-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-coral-400' : 'text-coral-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* City Destinations Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-charcoal-900 tracking-tight">
              Destinasi Kota Populer
            </h2>
            <p className="text-xs text-charcoal-500 mt-1">
              Jelajahi kos dan hotel terbaik di 5 kota pilihan Indonesia
            </p>
          </div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-coral-600 hover:text-coral-700"
          >
            <span>Lihat Semua Katalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {cityHighlights.map((city) => (
            <Link
              key={city.name}
              to={`/explore?location=${city.name}`}
              className="group relative rounded-3xl overflow-hidden aspect-4/5 shadow-xs hover:shadow-card-hover transition-all duration-300"
            >
              <img
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-coral-300 block">
                  Kota
                </span>
                <h3 className="text-base font-extrabold">{city.name}</h3>
                <p className="text-[11px] text-white/80 line-clamp-1">{city.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties Recommendation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-coral-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              Rekomendasi Terbaik
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
              Pilihan Favorit Pengguna StaySpace
            </h2>
            <p className="text-xs text-charcoal-500 mt-1">
              Menampilkan {filteredProperties.length} properti terverifikasi dengan ulasan bintang tertinggi
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/explore"
              className="px-4 py-2 rounded-2xl glass-pill text-xs font-bold text-charcoal-800 hover:bg-white shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Semua Properti</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.slice(0, 8).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length > 8 && (
          <div className="text-center pt-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal-900 hover:bg-coral-500 text-white text-xs font-bold shadow-lg transition-all active:scale-95"
            >
              <span>Jelajahi {filteredProperties.length - 8} Properti Lainnya</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Why Choose StaySpace Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-modal rounded-3xl p-8 sm:p-12 border border-white/80 shadow-glass">
          
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-coral-500">
              Kelebihan Platform
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal-900">
              Kenapa Memilih StaySpace?
            </h2>
            <p className="text-xs text-charcoal-500">
              Dirancang untuk memberikan kemudahan bagi mahasiswa, perantau, dan traveler modern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-white/70 border border-white/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-charcoal-900">100% Terverifikasi</h3>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Setiap kos dan hotel melewati kurasi fasilitas, foto asli, dan kejelasan izin pemilik tempat.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 border border-white/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-charcoal-900">Booking Instan Cepat</h3>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Pilih kamar, tentukan durasi sewa, dan selesaikan transaksi simulasi dalam hitungan detik.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 border border-white/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-charcoal-900">Liquid Glass Experience</h3>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Antarmuka visual modern yang bersih, interaktif, memanjakan mata, dan responsif di semua perangkat.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 border border-white/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-charcoal-900">Transparansi Tanpa Biaya Tersembunyi</h3>
              <p className="text-xs text-charcoal-500 leading-relaxed">
                Rincian sewa jelas, bukti pemesanan digital otomatis, dan riwayat yang tersimpan aman di peramban.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-md mx-auto space-y-2">
          <h2 className="text-2xl font-black text-charcoal-900">
            Kata Mereka Tentang StaySpace
          </h2>
          <p className="text-xs text-charcoal-500">
            Cerita kepuasan mahasiswa dan traveler setelah memesan lewat platform kami
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-charcoal-200/50 bg-white/80 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-charcoal-700 leading-relaxed italic">
              "Cari kos di Tembalang Semarang jadi gampang banget. Fotonya sesuai aslinya, ada fasilitas lengkap dan proses checkout transparan!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-charcoal-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Nabila"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-charcoal-900">Nabila Putri</p>
                <p className="text-[10px] text-charcoal-500">Mahasiswi Undip</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-charcoal-200/50 bg-white/80 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-charcoal-700 leading-relaxed italic">
              "Staycation di Malioboro bareng keluarga sangat berkesan. Bukti pemesanan langsung keluar dan bisa dicetak rapi. Desain webnya super mewah!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-charcoal-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Rizky"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-charcoal-900">Rizky Ramadhan</p>
                <p className="text-[10px] text-charcoal-500">Traveler Asal Bandung</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-charcoal-200/50 bg-white/80 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-charcoal-700 leading-relaxed italic">
              "Sebagai owner kos di Bandung, fitur admin StaySpace sangat praktis untuk memantau kamar terisi dan menambahkan unit baru."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-charcoal-100">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"
                alt="Jonathan"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-charcoal-900">Jonathan Halim</p>
                <p className="text-[10px] text-charcoal-500">Mitra Kos StaySpace</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-coral-950 p-8 sm:p-12 text-white shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none bg-[radial-gradient(#ff385c_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-coral-500/20 text-coral-300 text-[11px] font-bold border border-coral-500/30">
              Pesan Sekarang Tanpa Ribet
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Siap Menemukan Tempat Menginap Impianmu?
            </h2>
            <p className="text-xs text-charcoal-300 leading-relaxed">
              Daftar puluhan kos dan hotel terbaik di Semarang, Jogja, Bandung, Jakarta, dan Malang menunggu kedatanganmu.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/explore"
                className="px-6 py-3 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold shadow-lg shadow-coral-500/30 transition-all flex items-center gap-2"
              >
                <span>Buka Seluruh Katalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all"
              >
                Lihat Riwayat Booking
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
