import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Heart, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X, 
  Building2, 
  ArrowRight, 
  MapPin, 
  ShieldCheck,
  CreditCard,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { formatRupiah, formatDate } from '../utils/formatters';

export const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, bookings, favorites, properties, switchUserRole } = useApp();

  const initialTab = searchParams.get('tab') || 'bookings';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab'));
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Filter bookings for user
  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.bookingStatus === statusFilter;
  });

  // Get favorite properties
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Dikonfirmasi':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Dikonfirmasi
          </span>
        );
      case 'Selesai':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Selesai
          </span>
        );
      case 'Dibatalkan':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Dibatalkan
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Profile Header Glass Card */}
      <div className="glass-modal rounded-3xl p-6 sm:p-8 border border-white/80 shadow-glass bg-white/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-coral-500 to-rose-400 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-coral-500/25">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-charcoal-900">{user.name}</h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-coral-100 text-coral-700">
                  {user.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
              </div>
              <p className="text-xs text-charcoal-500 mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-4 sm:gap-6 bg-charcoal-50/80 p-3 sm:p-4 rounded-2xl border border-charcoal-200/60">
            <div className="text-center px-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Total Booking</p>
              <p className="text-lg font-black text-charcoal-900">{bookings.length}</p>
            </div>
            <div className="w-px h-8 bg-charcoal-200" />
            <div className="text-center px-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Favorit Disimpan</p>
              <p className="text-lg font-black text-coral-600">{favorites.length}</p>
            </div>
            <div className="w-px h-8 bg-charcoal-200" />
            <div className="text-center px-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Total Pengeluaran</p>
              <p className="text-xs sm:text-sm font-extrabold text-charcoal-900">{formatRupiah(totalSpent)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-charcoal-200/60 pb-1">
        <button
          onClick={() => handleTabChange('bookings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'bookings'
              ? 'bg-charcoal-900 text-white shadow-md'
              : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Riwayat Pemesanan ({bookings.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('favorites')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'favorites'
              ? 'bg-charcoal-900 text-white shadow-md'
              : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-white'
          }`}
        >
          <Heart className="w-4 h-4 text-coral-500" />
          <span>Wishlist Favorit ({favorites.length})</span>
        </button>

        {user.role === 'admin' && (
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-coral-600 hover:bg-coral-50 ml-auto"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Ke Panel Admin</span>
          </Link>
        )}
      </div>

      {/* Tab 1: Riwayat Pemesanan */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          
          {/* Status Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-charcoal-400 font-semibold text-[11px]">Status:</span>
            {['all', 'Dikonfirmasi', 'Selesai', 'Dibatalkan'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? 'bg-coral-500 text-white shadow-xs'
                    : 'glass-pill text-charcoal-600 hover:bg-white'
                }`}
              >
                {st === 'all' ? 'Semua Status' : st}
              </button>
            ))}
          </div>

          {filteredBookings.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-4 border border-charcoal-200/60 bg-white/70">
              <div className="w-16 h-16 rounded-full bg-coral-50 text-coral-500 flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                Belum Ada Riwayat Pemesanan
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Mulai eksplorasi katalog kos eksklusif dan hotel mewah pilihan untuk melakukan pemesanan pertama Anda.
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coral-500 text-white text-xs font-bold shadow-md shadow-coral-500/20"
              >
                <span>Cari Properti Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="glass-card rounded-3xl p-5 sm:p-6 border border-charcoal-200/60 bg-white/80 hover:bg-white transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left: Thumbnail & Main Info */}
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={b.propertyImage || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=300&q=80"}
                      alt={b.propertyName}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-charcoal-100 shadow-xs"
                    />
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-black text-coral-600 bg-coral-50 px-2 py-0.5 rounded">
                          {b.id}
                        </span>
                        {getStatusBadge(b.bookingStatus)}
                      </div>

                      <h3 className="font-extrabold text-sm sm:text-base text-charcoal-900">
                        {b.propertyName}
                      </h3>

                      <p className="text-xs text-charcoal-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-coral-500" />
                        {b.propertyCity} • Check-in: {formatDate(b.checkInDate)} ({b.duration} {b.durationUnit})
                      </p>

                      <p className="text-xs text-charcoal-500">
                        Metode: <span className="font-medium text-charcoal-700">{b.paymentMethod}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Total Price & Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-charcoal-100 gap-3">
                    <div className="text-left md:text-right">
                      <p className="text-[10px] text-charcoal-400 font-bold uppercase">Total Biaya</p>
                      <p className="text-base sm:text-lg font-black text-charcoal-900">
                        {formatRupiah(b.totalPrice)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBookingDetail(b)}
                        className="px-3.5 py-1.5 rounded-xl border border-charcoal-200 hover:border-charcoal-300 bg-white text-xs font-semibold text-charcoal-700 shadow-xs transition-colors"
                      >
                        Detail Booking
                      </button>

                      <Link
                        to={`/booking-success/${b.id}`}
                        state={{ booking: b }}
                        className="px-3.5 py-1.5 rounded-xl bg-charcoal-900 hover:bg-coral-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                        title="Cetak Bukti Pemesanan"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Cetak Bukti</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Tab 2: Wishlist Favorit */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          {favoriteProperties.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center space-y-4 border border-charcoal-200/60 bg-white/70">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-coral-500 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                Daftar Favorit Masih Kosong
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Klik ikon hati pada properti yang Anda sukai di katalog untuk menyimpannya di sini.
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coral-500 text-white text-xs font-bold shadow-md shadow-coral-500/20"
              >
                <span>Jelajahi Properti</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBookingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div 
            className="fixed inset-0"
            onClick={() => setSelectedBookingDetail(null)}
          />

          <div className="relative w-full max-w-xl glass-modal rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl z-10 bg-white/95 max-h-[90vh] overflow-y-auto space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-charcoal-400">
                  Rincian Transaksi
                </span>
                <h3 className="text-base font-black text-charcoal-900">
                  {selectedBookingDetail.propertyName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookingDetail(null)}
                className="p-1.5 rounded-full text-charcoal-400 hover:bg-charcoal-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Information Grid */}
            <div className="p-4 rounded-2xl bg-charcoal-50 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Kode Transaksi:</span>
                <span className="font-mono font-bold text-coral-600">{selectedBookingDetail.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Status:</span>
                <span>{getStatusBadge(selectedBookingDetail.bookingStatus)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Nama Pemesan:</span>
                <span className="font-bold text-charcoal-900">{selectedBookingDetail.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Email:</span>
                <span className="font-bold text-charcoal-900">{selectedBookingDetail.guestEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Check-in:</span>
                <span className="font-bold text-charcoal-900">{formatDate(selectedBookingDetail.checkInDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Durasi:</span>
                <span className="font-bold text-charcoal-900">{selectedBookingDetail.duration} {selectedBookingDetail.durationUnit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Metode Bayar:</span>
                <span className="font-bold text-charcoal-900">{selectedBookingDetail.paymentMethod}</span>
              </div>
            </div>

            {/* Financial Details */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal Sewa</span>
                <span className="font-bold">{formatRupiah(selectedBookingDetail.subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-600">
                <span>Biaya Layanan</span>
                <span className="font-bold">{formatRupiah(selectedBookingDetail.serviceFee)}</span>
              </div>
              {selectedBookingDetail.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Diskon Promo</span>
                  <span>-{formatRupiah(selectedBookingDetail.discount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-charcoal-200 flex justify-between font-black text-sm">
                <span>Total Biaya</span>
                <span className="text-coral-600">{formatRupiah(selectedBookingDetail.totalPrice)}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-charcoal-100">
              <Link
                to={`/booking-success/${selectedBookingDetail.id}`}
                state={{ booking: selectedBookingDetail }}
                className="flex-1 py-2.5 rounded-xl bg-charcoal-900 hover:bg-coral-500 text-white text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Bukti Pemesanan</span>
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
