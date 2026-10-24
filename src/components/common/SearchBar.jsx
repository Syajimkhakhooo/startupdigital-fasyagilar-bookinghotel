import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Building, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SearchBar = ({ initialValues, compact = false }) => {
  const navigate = useNavigate();
  const { setSearchFilter } = useApp();

  const [location, setLocation] = useState(initialValues?.location || '');
  const [type, setType] = useState(initialValues?.type || 'all');
  const [checkIn, setCheckIn] = useState(initialValues?.checkIn || '');

  const cities = ['Semarang', 'Yogyakarta', 'Bandung', 'Jakarta', 'Malang'];

  const handleSearch = (e) => {
    e?.preventDefault();
    setSearchFilter({
      location,
      type,
      checkIn
    });

    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type && type !== 'all') params.set('type', type);
    if (checkIn) params.set('checkIn', checkIn);

    navigate(`/explore?${params.toString()}`);
  };

  if (compact) {
    return (
      <form
        onSubmit={handleSearch}
        className="w-full glass-modal p-2 rounded-2xl border border-white/60 shadow-glass flex flex-wrap md:flex-nowrap items-center gap-2"
      >
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 border border-charcoal-200/60">
          <MapPin className="w-4 h-4 text-coral-500 shrink-0" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold text-charcoal-800 focus:outline-hidden"
          >
            <option value="">Semua Lokasi Kota</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-44 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 border border-charcoal-200/60">
          <Building className="w-4 h-4 text-coral-500 shrink-0" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-transparent text-xs font-semibold text-charcoal-800 focus:outline-hidden"
          >
            <option value="all">Semua Tipe</option>
            <option value="kos">Kos (Bulanan)</option>
            <option value="hotel">Hotel (Harian)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-coral-500 to-rose-500 hover:from-coral-600 hover:to-rose-600 text-white text-xs font-bold shadow-md shadow-coral-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Search className="w-4 h-4" />
          Cari
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="glass-modal p-2 rounded-3xl lg:rounded-full border border-white/90 shadow-float bg-white/95 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:border-white flex flex-col lg:flex-row items-stretch lg:items-center gap-1 lg:gap-0"
      >
        {/* Location Col */}
        <div className="flex-1 px-5 py-2.5 rounded-2xl lg:rounded-full hover:bg-black/5 transition-colors cursor-pointer text-left min-w-0">
          <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-wider mb-0.5">
            Tujuan / Kota
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-coral-500 shrink-0" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-charcoal-900 focus:outline-hidden cursor-pointer truncate"
            >
              <option value="">Semua 5 Kota Pilihan</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-charcoal-200/70 shrink-0" />

        {/* Accommodation Type Col */}
        <div className="flex-1 px-5 py-2.5 rounded-2xl lg:rounded-full hover:bg-black/5 transition-colors cursor-pointer text-left min-w-0">
          <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-wider mb-0.5">
            Tipe Akomodasi
          </label>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-coral-500 shrink-0" />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-charcoal-900 focus:outline-hidden cursor-pointer truncate"
            >
              <option value="all">Kos & Hotel (Semua)</option>
              <option value="kos">Kos-kosan (Bulanan)</option>
              <option value="hotel">Hotel (Harian)</option>
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-charcoal-200/70 shrink-0" />

        {/* Date / CheckIn Col */}
        <div className="flex-1 px-5 py-2.5 rounded-2xl lg:rounded-full hover:bg-black/5 transition-colors cursor-pointer text-left min-w-0">
          <label className="block text-[11px] font-bold text-charcoal-500 uppercase tracking-wider mb-0.5">
            Mulai Tanggal
          </label>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-coral-500 shrink-0" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-charcoal-900 focus:outline-hidden cursor-pointer"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Search CTA Button */}
        <div className="p-1.5 flex items-center justify-center shrink-0">
          <button
            type="submit"
            className="w-full lg:w-12 h-12 rounded-2xl lg:rounded-full bg-gradient-to-r from-coral-500 via-coral-600 to-rose-500 hover:from-coral-600 hover:to-rose-600 text-white flex items-center justify-center shadow-lg shadow-coral-500/35 hover:scale-105 active:scale-95 transition-all duration-200 group px-4 lg:px-0"
            title="Cari Properti"
          >
            <Search className="w-5 h-5 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="lg:hidden ml-2 font-bold text-sm">Cari Properti Sekarang</span>
          </button>
        </div>
      </form>
    </div>
  );
};
