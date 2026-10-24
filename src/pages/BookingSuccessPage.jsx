import React, { useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Printer, 
  ArrowRight, 
  Building2, 
  Calendar, 
  User, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Download,
  AlertTriangle,
  Home
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { formatRupiah, formatDate } from '../utils/formatters';

export const BookingSuccessPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookings } = useApp();

  // Find booking by ID or use state passed
  const booking = location.state?.booking || bookings.find(b => b.id === id);

  useEffect(() => {
    // Trigger celebratory confetti on load
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti failed gracefully', e);
    }
  }, []);

  if (!booking) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-charcoal-900">Transaksi Tidak Ditemukan</h2>
        <p className="text-xs text-charcoal-500">
          Kode pemesanan tidak ditemukan dalam riwayat lokal.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coral-500 text-white text-xs font-bold"
        >
          <Home className="w-4 h-4" />
          Ke Beranda
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner (Hidden on Print) */}
      <div className="no-print text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Transaksi Berhasil Dikonfirmasi!</span>
        </div>
        <h1 className="text-3xl font-black text-charcoal-900">
          Terima Kasih, Pemesanan Anda Selesai
        </h1>
        <p className="text-xs text-charcoal-500 max-w-md mx-auto">
          Voucher pemesanan resmi telah diterbitkan dan tersimpan dalam dashboard akun Anda.
        </p>
      </div>

      {/* Action Buttons Bar (Hidden on Print) */}
      <div className="no-print flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-coral-400" />
          <span>Cetak Bukti Pemesanan</span>
        </button>

        <Link
          to="/dashboard"
          className="px-5 py-2.5 rounded-2xl glass-pill border border-charcoal-300 text-charcoal-800 hover:bg-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
        >
          <span>Lihat Riwayat di Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Official Booking Voucher / Receipt (Printable Card) */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-charcoal-200/80 bg-white shadow-xl relative overflow-hidden print-clean-shadow">
        
        {/* Top Header of Receipt */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200/80">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-coral-500 text-white flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-charcoal-900">StaySpace</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-coral-100 text-coral-700 uppercase">
                  Voucher Resmi
                </span>
              </div>
              <p className="text-xs text-charcoal-500">Platform Pemesanan Kos & Hotel Indonesia</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider">
              Nomor Transaksi
            </p>
            <p className="text-base font-black font-mono text-coral-600">{booking.id}</p>
            <p className="text-[11px] text-charcoal-500">
              Waktu: {formatDate(booking.createdAt)}
            </p>
          </div>
        </div>

        {/* Simulation Watermark Banner */}
        <div className="my-6 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Catatan Bukti Transaksi:</strong> Transaksi ini berstatus <span className="underline font-bold">Simulasi Pembelajaran</span>. Tidak melibatkan aliran dana riil.
          </span>
        </div>

        {/* Content Details: Property & Customer info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          
          {/* Properti Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-charcoal-400">
              Detail Akomodasi
            </h3>

            <div className="flex gap-4">
              {booking.propertyImage && (
                <img
                  src={booking.propertyImage}
                  alt={booking.propertyName}
                  className="w-24 h-24 rounded-2xl object-cover border border-charcoal-200 shrink-0"
                />
              )}
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-charcoal-100 text-charcoal-700">
                  {booking.propertyType === 'kos' ? 'Kos-Kosan' : 'Hotel'}
                </span>
                <h4 className="text-sm font-black text-charcoal-900 leading-snug">
                  {booking.propertyName}
                </h4>
                <p className="text-xs text-charcoal-500">
                  {booking.propertyAddress || booking.propertyCity}
                </p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-charcoal-600 pt-2">
              <div className="flex justify-between">
                <span>Tanggal Check-in:</span>
                <span className="font-bold text-charcoal-900">{formatDate(booking.checkInDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Durasi Menginap:</span>
                <span className="font-bold text-charcoal-900">{booking.duration} {booking.durationUnit}</span>
              </div>
              <div className="flex justify-between">
                <span>Jumlah Tamu:</span>
                <span className="font-bold text-charcoal-900">{booking.guestsCount || 1} Orang</span>
              </div>
            </div>
          </div>

          {/* Pemesan & Pembayaran */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-charcoal-400">
              Informasi Pemesan & Status
            </h3>

            <div className="p-4 rounded-2xl bg-charcoal-50/80 border border-charcoal-200/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Nama Lengkap:</span>
                <span className="font-bold text-charcoal-900">{booking.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Email:</span>
                <span className="font-bold text-charcoal-900">{booking.guestEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Telepon/WA:</span>
                <span className="font-bold text-charcoal-900">{booking.guestPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Metode Bayar:</span>
                <span className="font-bold text-coral-600">{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Status Pembayaran:</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {booking.paymentStatus || 'Lunas (Simulasi)'}
                </span>
              </div>
            </div>

            {booking.notes && (
              <div className="text-xs p-3 rounded-xl bg-charcoal-50 text-charcoal-600">
                <span className="font-bold block text-charcoal-700 mb-0.5">Catatan Khusus:</span>
                "{booking.notes}"
              </div>
            )}
          </div>

        </div>

        {/* Financial Breakdown Table */}
        <div className="mt-6 pt-6 border-t border-charcoal-200/80">
          <h3 className="text-xs font-black uppercase tracking-wider text-charcoal-400 mb-3">
            Rincian Biaya
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-charcoal-600">
              <span>Biaya Sewa ({booking.duration} {booking.durationUnit})</span>
              <span className="font-bold text-charcoal-900">{formatRupiah(booking.subtotal)}</span>
            </div>
            <div className="flex justify-between text-charcoal-600">
              <span>Biaya Pemeliharaan & Layanan</span>
              <span className="font-bold text-charcoal-900">{formatRupiah(booking.serviceFee)}</span>
            </div>
            {booking.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Diskon Promo</span>
                <span>-{formatRupiah(booking.discount)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-charcoal-200 flex justify-between items-baseline font-black">
              <span className="text-sm text-charcoal-900">Total Biaya Transaksi</span>
              <span className="text-xl text-coral-600 font-mono">
                {formatRupiah(booking.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer of Receipt */}
        <div className="mt-8 pt-6 border-t border-dashed border-charcoal-200 text-center text-[11px] text-charcoal-400 space-y-1">
          <p>Tunjukkan voucher ini kepada penjaga kos atau staf resepsionis hotel saat tiba.</p>
          <p>StaySpace Indonesia • Hak Cipta Dilindungi Undang-Undang</p>
        </div>

      </div>

    </div>
  );
};
