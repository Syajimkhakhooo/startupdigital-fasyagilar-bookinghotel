import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Wallet, 
  Building, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Lock,
  User,
  Mail,
  Phone,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatRupiah, calculateBookingTotals, formatDate } from '../utils/formatters';

export const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { properties, user, addBooking } = useApp();

  const property = properties.find((p) => p.id === id);

  // Initial state passed from Detail page or defaults
  const passedState = location.state || {};
  const isKos = property?.type === 'kos';
  const durationUnit = property?.priceUnit || (isKos ? 'bulan' : 'malam');

  const [guestName, setGuestName] = useState(user.name || '');
  const [guestEmail, setGuestEmail] = useState(user.email || '');
  const [guestPhone, setGuestPhone] = useState(user.phone || '0812-3456-7890');
  const [checkInDate, setCheckInDate] = useState(() => {
    if (passedState.checkInDate) return passedState.checkInDate;
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [duration, setDuration] = useState(passedState.duration || (isKos ? 3 : 2));
  const [guestsCount, setGuestsCount] = useState(passedState.guestsCount || 1);
  const [notes, setNotes] = useState('');

  // Payment Method Selection
  const [paymentCategory, setPaymentCategory] = useState('qris'); // 'qris', 'bank', 'ewallet'
  const [selectedMethod, setSelectedMethod] = useState('QRIS Instant Pay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user.name && !guestName) setGuestName(user.name);
    if (user.email && !guestEmail) setGuestEmail(user.email);
    if (user.phone && !guestPhone) setGuestPhone(user.phone);
  }, [user]);

  if (!property) {
    return (
      <div className="pt-32 pb-20 max-w-2xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-charcoal-900">Properti tidak ditemukan</h2>
        <Link to="/explore" className="text-coral-600 font-bold underline">
          Kembali ke katalog
        </Link>
      </div>
    );
  }

  // Recalculate totals dynamically
  const totals = calculateBookingTotals(property.price, duration, durationUnit);

  const validateForm = () => {
    const errors = {};
    if (!guestName.trim()) errors.guestName = "Nama lengkap wajib diisi";
    if (!guestEmail.trim() || !guestEmail.includes('@')) errors.guestEmail = "Email tidak valid";
    if (!guestPhone.trim() || guestPhone.length < 9) errors.guestPhone = "Nomor telepon/WA tidak valid";
    if (!checkInDate) errors.checkInDate = "Tanggal check-in wajib dipilih";
    if (duration < 1) errors.duration = "Durasi minimal 1 " + durationUnit;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate instant secure processing
    setTimeout(() => {
      const newBooking = addBooking({
        propertyId: property.id,
        propertyName: property.name,
        propertyType: property.type,
        propertyCity: property.city,
        propertyAddress: property.address,
        propertyImage: property.images?.[0] || '',
        guestName,
        guestEmail,
        guestPhone,
        checkInDate,
        duration: Number(duration),
        durationUnit,
        guestsCount: Number(guestsCount),
        pricePerUnit: property.price,
        subtotal: totals.subtotal,
        serviceFee: totals.serviceFee,
        discount: totals.discount,
        totalPrice: totals.totalPrice,
        paymentMethod: selectedMethod,
        notes: notes.trim()
      });

      setIsSubmitting(false);
      navigate(`/booking-success/${newBooking.id}`, { state: { booking: newBooking } });
    }, 900);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back CTA */}
      <div>
        <Link
          to={`/property/${property.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-charcoal-600 hover:text-coral-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Detail Properti</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form & Payment Methods */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
              Konfirmasi & Pembayaran Simulasi
            </h1>
            <p className="text-xs text-charcoal-500 mt-1">
              Lengkapi data pemesanan dan pilih metode pembayaran simulasi di bawah ini.
            </p>
          </div>

          {/* Prominent Simulation Disclaimer Alert */}
          <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-3 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-extrabold uppercase tracking-wide text-amber-800">
                ⚠️ PERHATIAN: PEMBAYARAN HANYA SIMULASI
              </p>
              <p className="text-amber-700/90 leading-relaxed">
                Website ini dibuat untuk demonstrasi proyek tugas/PKL. Tidak ada transaksi perbankan nyata dan kartu kredit Anda tidak akan ditagih. Seluruh data transaksi disimpan di penyimpanan lokal browser Anda.
              </p>
            </div>
          </div>

          <form onSubmit={handleConfirmBooking} className="space-y-8">
            
            {/* Step 1: Data Tamu & Pemesan */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-charcoal-200/60 bg-white/80 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-charcoal-100">
                <div className="w-7 h-7 rounded-xl bg-coral-500 text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h2 className="font-extrabold text-base text-charcoal-900">
                  Data Pemesan / Penyewa
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Nama Lengkap */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-charcoal-700">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Masukkan nama sesuai KTP"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-hidden ${
                        formErrors.guestName ? 'border-rose-400 bg-rose-50/30' : 'border-charcoal-200 focus:border-coral-500'
                      }`}
                    />
                  </div>
                  {formErrors.guestName && (
                    <p className="text-[10px] text-rose-500 font-bold">{formErrors.guestName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-charcoal-700">
                    Email Pengiriman Bukti <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-hidden ${
                        formErrors.guestEmail ? 'border-rose-400 bg-rose-50/30' : 'border-charcoal-200 focus:border-coral-500'
                      }`}
                    />
                  </div>
                  {formErrors.guestEmail && (
                    <p className="text-[10px] text-rose-500 font-bold">{formErrors.guestEmail}</p>
                  )}
                </div>

                {/* Telepon / WA */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-charcoal-700">
                    Nomor WhatsApp / HP <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="0812-xxxx-xxxx"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-hidden ${
                        formErrors.guestPhone ? 'border-rose-400 bg-rose-50/30' : 'border-charcoal-200 focus:border-coral-500'
                      }`}
                    />
                  </div>
                  {formErrors.guestPhone && (
                    <p className="text-[10px] text-rose-500 font-bold">{formErrors.guestPhone}</p>
                  )}
                </div>

                {/* Tanggal Check-in */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-charcoal-700">
                    Tanggal Check-in <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-charcoal-200 text-xs font-semibold focus:outline-hidden focus:border-coral-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Durasi */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-charcoal-700">
                    Durasi Sewa ({durationUnit})
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDuration(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 rounded-xl border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100 font-extrabold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center py-2 rounded-xl border border-charcoal-200 text-xs font-extrabold focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setDuration(prev => prev + 1)}
                      className="w-10 h-10 rounded-xl border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100 font-extrabold"
                    >
                      +
                    </button>
                    <span className="text-xs font-bold text-charcoal-600 capitalize">
                      {durationUnit}
                    </span>
                  </div>
                </div>

                {/* Jumlah Tamu */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-charcoal-700">
                    Kapasitas Tamu
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 text-xs font-bold text-charcoal-800 focus:outline-hidden focus:border-coral-500 cursor-pointer"
                  >
                    <option value={1}>1 Orang (Tunggal)</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang (Maksimal)</option>
                  </select>
                </div>

              </div>

              {/* Catatan Tambahan */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-bold text-charcoal-700">
                  Permintaan Khusus atau Catatan (Opsional)
                </label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Late check-in pukul 20.00 WIB, butuh kamar lantai 2, dsb."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-charcoal-200 text-xs focus:outline-hidden focus:border-coral-500"
                />
              </div>

            </div>

            {/* Step 2: Metode Pembayaran Simulasi */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-charcoal-200/60 bg-white/80 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-charcoal-100">
                <div className="w-7 h-7 rounded-xl bg-coral-500 text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h2 className="font-extrabold text-base text-charcoal-900">
                  Pilih Pembayaran Simulasi
                </h2>
              </div>

              {/* Category Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentCategory('qris');
                    setSelectedMethod('QRIS Instant Pay');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentCategory === 'qris'
                      ? 'border-coral-500 bg-coral-50/70 text-coral-700 font-bold shadow-xs'
                      : 'border-charcoal-200/80 bg-white/60 text-charcoal-600 hover:bg-white'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-coral-500" />
                  <span className="text-xs">QRIS Instan</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentCategory('bank');
                    setSelectedMethod('BCA Virtual Account');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentCategory === 'bank'
                      ? 'border-coral-500 bg-coral-50/70 text-coral-700 font-bold shadow-xs'
                      : 'border-charcoal-200/80 bg-white/60 text-charcoal-600 hover:bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-coral-500" />
                  <span className="text-xs">Virtual Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentCategory('ewallet');
                    setSelectedMethod('GoPay / GoTo');
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentCategory === 'ewallet'
                      ? 'border-coral-500 bg-coral-50/70 text-coral-700 font-bold shadow-xs'
                      : 'border-charcoal-200/80 bg-white/60 text-charcoal-600 hover:bg-white'
                  }`}
                >
                  <Wallet className="w-5 h-5 mx-auto mb-1 text-coral-500" />
                  <span className="text-xs">E-Wallet</span>
                </button>
              </div>

              {/* Specific Options */}
              <div className="space-y-2 pt-2">
                {paymentCategory === 'qris' && (
                  <div className="p-4 rounded-2xl bg-charcoal-50 border border-charcoal-200/60 text-center space-y-3">
                    <p className="text-xs font-bold text-charcoal-800">
                      Scan QRIS (Mendukung BCA, Mandiri, GoPay, OVO, ShopeePay, Dana)
                    </p>
                    <div className="w-40 h-40 bg-white p-3 rounded-2xl mx-auto shadow-md border border-charcoal-200 flex flex-col items-center justify-center">
                      <QrCode className="w-32 h-32 text-charcoal-900" />
                    </div>
                    <p className="text-[11px] text-charcoal-500">
                      Kode QR simulasi akan otomatis diverifikasi saat tombol konfirmasi ditekan.
                    </p>
                  </div>
                )}

                {paymentCategory === 'bank' && (
                  <div className="space-y-2">
                    {['BCA Virtual Account', 'Mandiri Virtual Account', 'BNI Virtual Account', 'BRI Virtual Account'].map((bank) => (
                      <label
                        key={bank}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          selectedMethod === bank
                            ? 'border-coral-500 bg-coral-50/40 text-charcoal-900 font-bold'
                            : 'border-charcoal-200/70 bg-white/60 text-charcoal-700 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 text-xs">
                          <input
                            type="radio"
                            name="paymentBank"
                            checked={selectedMethod === bank}
                            onChange={() => setSelectedMethod(bank)}
                            className="accent-coral-500"
                          />
                          <span>{bank}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded">
                          Verifikasi Otomatis
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {paymentCategory === 'ewallet' && (
                  <div className="space-y-2">
                    {['GoPay / GoTo', 'ShopeePay', 'OVO Cash', 'DANA ID'].map((ew) => (
                      <label
                        key={ew}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          selectedMethod === ew
                            ? 'border-coral-500 bg-coral-50/40 text-charcoal-900 font-bold'
                            : 'border-charcoal-200/70 bg-white/60 text-charcoal-700 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 text-xs">
                          <input
                            type="radio"
                            name="paymentEwallet"
                            checked={selectedMethod === ew}
                            onChange={() => setSelectedMethod(ew)}
                            className="accent-coral-500"
                          />
                          <span>{ew}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded">
                          Instan
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Submit Action */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-coral-500 via-coral-600 to-rose-500 hover:from-coral-600 hover:to-rose-600 text-white font-extrabold text-base shadow-xl shadow-coral-500/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memproses Transaksi Simulasi...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Konfirmasi Pembayaran ({formatRupiah(totals.totalPrice)})</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </div>

        {/* Right Column: Order Summary Card */}
        <aside className="lg:col-span-5 xl:col-span-4 sticky top-28">
          <div className="glass-modal rounded-3xl p-6 sm:p-7 border border-white/90 shadow-glass bg-white/90 space-y-6">
            
            <h3 className="font-extrabold text-base text-charcoal-900 pb-3 border-b border-charcoal-100">
              Ringkasan Pemesanan
            </h3>

            {/* Property Preview */}
            <div className="flex items-center gap-3.5">
              <img
                src={property.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80"}
                alt={property.name}
                className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-xs"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-coral-600">
                  {property.subType || property.type.toUpperCase()}
                </span>
                <h4 className="font-bold text-xs text-charcoal-900 truncate">
                  {property.name}
                </h4>
                <p className="text-[11px] text-charcoal-500 truncate mt-0.5">
                  {property.city} • {property.address}
                </p>
              </div>
            </div>

            {/* Dates & Duration Summary */}
            <div className="p-3.5 rounded-2xl bg-charcoal-50/80 border border-charcoal-200/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Mulai Check-in:</span>
                <span className="font-bold text-charcoal-900">{formatDate(checkInDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Durasi Sewa:</span>
                <span className="font-bold text-charcoal-900">{duration} {durationUnit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Tamu:</span>
                <span className="font-bold text-charcoal-900">{guestsCount} Orang</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-charcoal-600">
                <span>Harga Sewa ({formatRupiah(property.price)} x {duration} {durationUnit})</span>
                <span className="font-bold text-charcoal-900">{formatRupiah(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal-600">
                <span>Biaya Layanan & Sistem</span>
                <span className="font-bold text-charcoal-900">{formatRupiah(totals.serviceFee)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Diskon Promo Spesial</span>
                  <span>-{formatRupiah(totals.discount)}</span>
                </div>
              )}
              
              <div className="pt-3 border-t border-charcoal-200/80 flex justify-between items-baseline font-black text-charcoal-900">
                <span className="text-sm">Total Pembayaran</span>
                <span className="text-xl text-coral-600">{formatRupiah(totals.totalPrice)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-charcoal-100 flex items-center justify-center gap-2 text-charcoal-500 text-[11px]">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulasi enkripsi aman 256-bit</span>
            </div>

          </div>
        </aside>

      </div>

    </div>
  );
};
