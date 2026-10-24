import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Layers, 
  Hotel, 
  CreditCard, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  ShieldCheck, 
  TrendingUp, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PropertyModal } from '../components/admin/PropertyModal';
import { formatRupiah, formatDate } from '../utils/formatters';

export const AdminDashboardPage = () => {
  const { 
    properties, 
    bookings, 
    user, 
    switchUserRole, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    updateBookingStatus,
    handleResetDemoData
  } = useApp();

  const [activeTab, setActiveTab] = useState('properties'); // 'properties' or 'transactions'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Stats calculation
  const totalKos = properties.filter(p => p.type === 'kos').length;
  const totalHotel = properties.filter(p => p.type === 'hotel').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const confirmedBookings = bookings.filter(b => b.bookingStatus === 'Dikonfirmasi').length;

  const handleOpenAdd = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleSaveProperty = (propertyData) => {
    if (editingProperty) {
      updateProperty(editingProperty.id, propertyData);
    } else {
      addProperty(propertyData);
    }
  };

  const handleDelete = (id) => {
    deleteProperty(id);
    setDeleteConfirmId(null);
  };

  // Filter properties by search
  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Admin Mode Switch Banner if current user is not admin */}
      {user.role !== 'admin' && (
        <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs font-bold">
              Anda sedang melihat halaman ini dalam mode Tamu/Pengguna biasa. Klik tombol untuk beralih ke Mode Admin penuh.
            </p>
          </div>
          <button
            onClick={() => switchUserRole('admin')}
            className="px-4 py-2 rounded-xl bg-charcoal-900 text-white text-xs font-bold shadow-xs whitespace-nowrap self-start sm:self-auto"
          >
            Aktifkan Mode Admin StaySpace
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral-600 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Manajemen Sistem StaySpace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight">
            Dashboard Panel Administrator
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Kelola inventaris properti dummy, pantau riwayat pesanan, dan perbarui status transaksi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDemoData}
            className="px-3.5 py-2 rounded-2xl border border-charcoal-200 bg-white hover:bg-charcoal-50 text-xs font-bold text-charcoal-700 shadow-xs flex items-center gap-1.5 transition-colors"
            title="Kembalikan data properti & transaksi ke sampel awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold shadow-md shadow-coral-500/25 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Properti</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-3xl border border-charcoal-200/60 bg-white/80 space-y-1">
          <div className="flex items-center justify-between text-charcoal-500 text-xs font-bold">
            <span>Total Properti</span>
            <Building2 className="w-4 h-4 text-coral-500" />
          </div>
          <p className="text-2xl font-black text-charcoal-900">{properties.length}</p>
          <p className="text-[11px] text-charcoal-400">
            {totalKos} Kos • {totalHotel} Hotel
          </p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-charcoal-200/60 bg-white/80 space-y-1">
          <div className="flex items-center justify-between text-charcoal-500 text-xs font-bold">
            <span>Total Transaksi</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-charcoal-900">{bookings.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">
            {confirmedBookings} Dikonfirmasi
          </p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-charcoal-200/60 bg-white/80 space-y-1">
          <div className="flex items-center justify-between text-charcoal-500 text-xs font-bold">
            <span>Total Estimasi Transaksi</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-black text-charcoal-900 truncate">
            {formatRupiah(totalRevenue)}
          </p>
          <p className="text-[11px] text-charcoal-400">
            Akumulasi transaksi simulasi
          </p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-charcoal-200/60 bg-white/80 space-y-1">
          <div className="flex items-center justify-between text-charcoal-500 text-xs font-bold">
            <span>Tingkat Kepuasan</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-charcoal-900">4.92 / 5.0</p>
          <p className="text-[11px] text-charcoal-400">
            Rata-rata 1.200+ ulasan
          </p>
        </div>

      </div>

      {/* Tabs Selector */}
      <div className="flex items-center justify-between border-b border-charcoal-200/60 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('properties')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'properties'
                ? 'bg-charcoal-900 text-white shadow-md'
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Daftar Properti ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'transactions'
                ? 'bg-charcoal-900 text-white shadow-md'
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Semua Transaksi ({bookings.length})</span>
          </button>
        </div>

        {activeTab === 'properties' && (
          <div className="hidden sm:block relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari properti..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-charcoal-200 text-xs bg-white focus:outline-hidden"
            />
          </div>
        )}
      </div>

      {/* Tab 1: Properti Management */}
      {activeTab === 'properties' && (
        <div className="glass-card rounded-3xl border border-charcoal-200/60 bg-white/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-charcoal-100 bg-charcoal-50/70 text-charcoal-500 font-extrabold uppercase text-[10px] tracking-wider">
                  <th className="p-4">Properti</th>
                  <th className="p-4">Kategori & Kota</th>
                  <th className="p-4">Harga Sewa</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-charcoal-50/50 transition-colors">
                    
                    {/* Properti Name & Image */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=150&q=80"}
                          alt={prop.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-charcoal-200"
                        />
                        <div className="min-w-0 max-w-xs">
                          <p className="font-extrabold text-charcoal-900 truncate">{prop.name}</p>
                          <p className="text-[11px] text-charcoal-400 truncate">{prop.address}</p>
                        </div>
                      </div>
                    </td>

                    {/* Type & City */}
                    <td className="p-4 whitespace-nowrap">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase mb-1 ${
                        prop.type === 'kos' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {prop.subType || prop.type}
                      </span>
                      <p className="text-charcoal-600 font-medium">{prop.city}</p>
                    </td>

                    {/* Price */}
                    <td className="p-4 whitespace-nowrap">
                      <p className="font-black text-charcoal-900">{formatRupiah(prop.price)}</p>
                      <p className="text-[10px] text-charcoal-400">/{prop.priceUnit || (prop.type === 'kos' ? 'bulan' : 'malam')}</p>
                    </td>

                    {/* Rating */}
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-bold text-charcoal-800">★ {prop.rating}</span>
                      <span className="text-[10px] text-charcoal-400 block">({prop.reviewCount} ulasan)</span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/property/${prop.id}`}
                          className="p-2 rounded-xl text-charcoal-500 hover:text-charcoal-900 hover:bg-charcoal-100 transition-colors"
                          title="Lihat Halaman Properti"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(prop)}
                          className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Data Properti"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(prop.id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Hapus Properti"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Transactions Table */}
      {activeTab === 'transactions' && (
        <div className="glass-card rounded-3xl border border-charcoal-200/60 bg-white/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-charcoal-100 bg-charcoal-50/70 text-charcoal-500 font-extrabold uppercase text-[10px] tracking-wider">
                  <th className="p-4">Kode Transaksi</th>
                  <th className="p-4">Properti</th>
                  <th className="p-4">Pemesan</th>
                  <th className="p-4">Durasi & Jadwal</th>
                  <th className="p-4">Total Biaya</th>
                  <th className="p-4">Status Pemesanan</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-charcoal-50/50 transition-colors">
                    
                    {/* Kode Transaksi */}
                    <td className="p-4 font-mono font-bold text-coral-600 whitespace-nowrap">
                      {b.id}
                      <span className="block text-[10px] text-charcoal-400 font-sans font-normal">
                        {formatDate(b.createdAt)}
                      </span>
                    </td>

                    {/* Properti */}
                    <td className="p-4">
                      <p className="font-extrabold text-charcoal-900 max-w-xs truncate">{b.propertyName}</p>
                      <p className="text-[11px] text-charcoal-500">{b.propertyCity}</p>
                    </td>

                    {/* Pemesan */}
                    <td className="p-4">
                      <p className="font-bold text-charcoal-800">{b.guestName}</p>
                      <p className="text-[10px] text-charcoal-500">{b.guestEmail}</p>
                    </td>

                    {/* Durasi */}
                    <td className="p-4 whitespace-nowrap text-charcoal-600">
                      <p className="font-semibold text-charcoal-900">{b.duration} {b.durationUnit}</p>
                      <p className="text-[10px]">Mulai: {formatDate(b.checkInDate)}</p>
                    </td>

                    {/* Total */}
                    <td className="p-4 font-black text-charcoal-900 whitespace-nowrap">
                      {formatRupiah(b.totalPrice)}
                      <span className="block text-[10px] text-charcoal-500 font-normal">
                        Via {b.paymentMethod}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-4 whitespace-nowrap">
                      <select
                        value={b.bookingStatus}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                        className={`text-xs font-bold rounded-lg px-2 py-1 border cursor-pointer ${
                          b.bookingStatus === 'Dikonfirmasi'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : b.bookingStatus === 'Selesai'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        <option value="Dikonfirmasi">Dikonfirmasi</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </td>

                    {/* Aksi */}
                    <td className="p-4 text-right whitespace-nowrap">
                      <Link
                        to={`/booking-success/${b.id}`}
                        state={{ booking: b }}
                        className="px-3 py-1.5 rounded-xl border border-charcoal-200 hover:border-charcoal-300 text-charcoal-700 font-semibold text-[11px] inline-flex items-center gap-1"
                      >
                        <span>Lihat Bukti</span>
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Property Create/Edit Modal */}
      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProperty}
        initialData={editingProperty}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-sm glass-modal rounded-3xl p-6 bg-white space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-extrabold text-base text-charcoal-900">
                Hapus Properti Ini?
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Tindakan ini akan menghapus properti dummy dari katalog StaySpace.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-charcoal-200 text-xs font-bold text-charcoal-700"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
