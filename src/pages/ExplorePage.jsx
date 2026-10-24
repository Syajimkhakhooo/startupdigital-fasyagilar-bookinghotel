import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  Search, 
  MapPin, 
  Building, 
  X, 
  ArrowUpDown, 
  Check, 
  Sparkles,
  Layers,
  Hotel,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { formatRupiah } from '../utils/formatters';

export const ExplorePage = () => {
  const { properties } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters from URL or state
  const initialLocation = searchParams.get('location') || '';
  const initialType = searchParams.get('type') || 'all';

  const [selectedCity, setSelectedCity] = useState(initialLocation);
  const [selectedType, setSelectedType] = useState(initialType);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'
  const [maxPrice, setMaxPrice] = useState(4000000);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync when query params change
  useEffect(() => {
    if (searchParams.get('location') !== null) {
      setSelectedCity(searchParams.get('location') || '');
    }
    if (searchParams.get('type') !== null) {
      setSelectedType(searchParams.get('type') || 'all');
    }
  }, [searchParams]);

  const cities = ['Semarang', 'Yogyakarta', 'Bandung', 'Jakarta', 'Malang'];
  
  const commonFacilities = [
    'WiFi',
    'AC',
    'Kamar Mandi Dalam',
    'Water Heater',
    'Dapur',
    'Parkir Mobil',
    'Kolam Renang',
    'Smart TV'
  ];

  const handleFacilityToggle = (fac) => {
    setSelectedFacilities(prev =>
      prev.includes(fac) ? prev.filter(f => f !== fac) : [...prev, fac]
    );
  };

  const handleResetFilters = () => {
    setSelectedCity('');
    setSelectedType('all');
    setSearchKeyword('');
    setSortBy('featured');
    setMaxPrice(4000000);
    setSelectedFacilities([]);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        // City match
        if (selectedCity && prop.city.toLowerCase() !== selectedCity.toLowerCase()) {
          return false;
        }

        // Type match (kos or hotel)
        if (selectedType && selectedType !== 'all') {
          if (selectedType === 'kos' && prop.type !== 'kos') return false;
          if (selectedType === 'hotel' && prop.type !== 'hotel') return false;
        }

        // Keyword in name, address, or description
        if (searchKeyword.trim()) {
          const kw = searchKeyword.toLowerCase();
          const matchName = prop.name.toLowerCase().includes(kw);
          const matchDesc = prop.description?.toLowerCase().includes(kw);
          const matchAddr = prop.address?.toLowerCase().includes(kw);
          if (!matchName && !matchDesc && !matchAddr) return false;
        }

        // Price ceiling
        if (prop.price > maxPrice) {
          return false;
        }

        // Facilities check
        if (selectedFacilities.length > 0) {
          const propFacs = (prop.facilities || []).join(' ').toLowerCase();
          const matchesAll = selectedFacilities.every(f => propFacs.includes(f.toLowerCase()));
          if (!matchesAll) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default: featured first then review count
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [properties, selectedCity, selectedType, searchKeyword, maxPrice, selectedFacilities, sortBy]);

  const activeFiltersCount = (selectedCity ? 1 : 0) +
    (selectedType !== 'all' ? 1 : 0) +
    (searchKeyword ? 1 : 0) +
    (maxPrice < 4000000 ? 1 : 0) +
    selectedFacilities.length;

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-charcoal-200/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral-600 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Katalog Properti Terkurasi</span>
          </div>
          <h1 className="text-3xl font-black text-charcoal-900 tracking-tight">
            Eksplorasi Kos & Hotel Pilihan
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Menampilkan {filteredProperties.length} dari {properties.length} properti terdaftar
          </p>
        </div>

        {/* Quick Search & Sort on Desktop */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Keyword Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Cari nama, area..."
              className="pl-9 pr-3 py-2 rounded-2xl glass-pill text-xs font-medium text-charcoal-800 placeholder-charcoal-400 focus:outline-hidden focus:border-coral-400 w-48 sm:w-56"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl glass-pill border border-charcoal-200/60 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-coral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-charcoal-800 focus:outline-hidden cursor-pointer"
            >
              <option value="featured">Rekomendasi</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-2xl bg-charcoal-900 text-white text-xs font-bold"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter ({activeFiltersCount})</span>
          </button>
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block md:col-span-3 glass-card rounded-3xl p-6 border border-charcoal-200/60 bg-white/70 sticky top-28 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-coral-500" />
              <h3 className="font-extrabold text-sm text-charcoal-900">Filter Pencarian</h3>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-coral-600 hover:text-coral-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Tipe Akomodasi */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-charcoal-800 block">Tipe Akomodasi</label>
            <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-charcoal-100/70 text-xs">
              <button
                onClick={() => setSelectedType('all')}
                className={`py-1.5 rounded-lg font-bold transition-all ${
                  selectedType === 'all' ? 'bg-white text-coral-600 shadow-xs' : 'text-charcoal-600'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSelectedType('kos')}
                className={`py-1.5 rounded-lg font-bold transition-all ${
                  selectedType === 'kos' ? 'bg-white text-coral-600 shadow-xs' : 'text-charcoal-600'
                }`}
              >
                Kos
              </button>
              <button
                onClick={() => setSelectedType('hotel')}
                className={`py-1.5 rounded-lg font-bold transition-all ${
                  selectedType === 'hotel' ? 'bg-white text-coral-600 shadow-xs' : 'text-charcoal-600'
                }`}
              >
                Hotel
              </button>
            </div>
          </div>

          {/* Kota */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-charcoal-800 block">Kota Tujuan</label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCity('')}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  selectedCity === '' ? 'bg-coral-50 text-coral-600 font-bold' : 'text-charcoal-600 hover:bg-charcoal-50'
                }`}
              >
                <span>Semua 5 Kota</span>
                {selectedCity === '' && <Check className="w-3.5 h-3.5" />}
              </button>
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedCity === city ? 'bg-coral-50 text-coral-600 font-bold' : 'text-charcoal-600 hover:bg-charcoal-50'
                  }`}
                >
                  <span>{city}</span>
                  {selectedCity === city && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Batas Maksimum Harga */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-charcoal-800">Harga Maksimum</label>
              <span className="font-extrabold text-coral-600">{formatRupiah(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="500000"
              max="4000000"
              step="100000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-coral-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-400">
              <span>Rp 500rb</span>
              <span>Rp 4jt+</span>
            </div>
          </div>

          {/* Fasilitas */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-charcoal-800 block">Fasilitas Utama</label>
            <div className="space-y-1.5">
              {commonFacilities.map((fac) => {
                const checked = selectedFacilities.includes(fac);
                return (
                  <button
                    key={fac}
                    onClick={() => handleFacilityToggle(fac)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between border transition-all ${
                      checked
                        ? 'bg-charcoal-900 text-white border-charcoal-900 font-bold'
                        : 'bg-white/60 text-charcoal-700 border-charcoal-200/50 hover:border-charcoal-300'
                    }`}
                  >
                    <span>{fac}</span>
                    {checked && <Check className="w-3.5 h-3.5 text-coral-400" />}
                  </button>
                );
              })}
            </div>
          </div>

        </aside>

        {/* Property Grid Results */}
        <main className="md:col-span-9 space-y-6">
          
          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-charcoal-400 font-semibold text-[11px]">Filter aktif:</span>
              {selectedCity && (
                <span className="px-2.5 py-1 rounded-full bg-coral-100 text-coral-700 font-bold flex items-center gap-1">
                  Kota: {selectedCity}
                  <button onClick={() => setSelectedCity('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedType !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-coral-100 text-coral-700 font-bold flex items-center gap-1">
                  Tipe: {selectedType.toUpperCase()}
                  <button onClick={() => setSelectedType('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchKeyword && (
                <span className="px-2.5 py-1 rounded-full bg-coral-100 text-coral-700 font-bold flex items-center gap-1">
                  "{searchKeyword}"
                  <button onClick={() => setSearchKeyword('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedFacilities.map(f => (
                <span key={f} className="px-2.5 py-1 rounded-full bg-charcoal-100 text-charcoal-800 font-medium flex items-center gap-1">
                  {f}
                  <button onClick={() => handleFacilityToggle(f)}><X className="w-3 h-3" /></button>
                </span>
              ))}
              <button
                onClick={handleResetFilters}
                className="text-xs text-coral-600 hover:underline font-bold ml-1"
              >
                Hapus Semua
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredProperties.length === 0 ? (
            <div className="glass-modal rounded-3xl p-12 text-center space-y-4 border border-charcoal-200/60">
              <div className="w-16 h-16 rounded-full bg-coral-50 text-coral-500 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900">
                Tidak ada properti yang cocok
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Coba sesuaikan filter pencarian, kurangi fasilitas yang dipilih, atau perbesar rentang harga Anda.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold transition-all shadow-md shadow-coral-500/20"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}

        </main>

      </div>

      {/* Mobile Drawer Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
              <h3 className="text-base font-bold text-charcoal-900">Filter Properti</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-charcoal-400 hover:bg-charcoal-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Tipe */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-charcoal-800">Tipe Akomodasi</label>
              <div className="grid grid-cols-3 gap-2">
                {['all', 'kos', 'hotel'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize ${
                      selectedType === t ? 'bg-coral-500 text-white' : 'bg-charcoal-100 text-charcoal-700'
                    }`}
                  >
                    {t === 'all' ? 'Semua' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Kota */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-charcoal-800">Kota</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-charcoal-200 text-xs font-bold text-charcoal-800"
              >
                <option value="">Semua 5 Kota</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Mobile Harga */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Harga Maksimum</span>
                <span className="text-coral-600">{formatRupiah(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="4000000"
                step="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-coral-500"
              />
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-charcoal-100">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-charcoal-200 text-xs font-bold text-charcoal-700"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-coral-500 text-white text-xs font-bold shadow-md"
              >
                Terapkan ({filteredProperties.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
