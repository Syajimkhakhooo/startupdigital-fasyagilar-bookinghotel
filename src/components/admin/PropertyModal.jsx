import React, { useState, useEffect } from 'react';
import { X, Building2, Image, MapPin, Sparkles, Plus, Trash2 } from 'lucide-react';

export const PropertyModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'kos',
    subType: 'Kos Campur',
    city: 'Semarang',
    address: '',
    price: 1500000,
    priceUnit: 'bulan',
    roomSize: '4 x 4 m²',
    description: '',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'],
    facilities: ['WiFi 100 Mbps', 'AC', 'Kamar Mandi Dalam', 'Water Heater', 'Kasur Springbed'],
    rules: ['Akses 24 Jam', 'Dilarang merokok di dalam kamar'],
    featured: false
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [facilityInput, setFacilityInput] = useState('');
  const [ruleInput, setRuleInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        images: initialData.images || ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'],
        facilities: initialData.facilities || [],
        rules: initialData.rules || []
      });
    } else {
      setFormData({
        name: '',
        type: 'kos',
        subType: 'Kos Campur',
        city: 'Semarang',
        address: '',
        price: 1500000,
        priceUnit: 'bulan',
        roomSize: '4 x 4 m²',
        description: '',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'],
        facilities: ['WiFi 100 Mbps', 'AC', 'Kamar Mandi Dalam', 'Water Heater'],
        rules: ['Akses 24 Jam', 'Dilarang merokok di kamar'],
        featured: false
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleTypeChange = (newType) => {
    setFormData(prev => ({
      ...prev,
      type: newType,
      subType: newType === 'kos' ? 'Kos Campur' : 'Hotel Butik',
      priceUnit: newType === 'kos' ? 'bulan' : 'malam',
      price: newType === 'kos' ? 1800000 : 750000
    }));
  };

  const handleAddFacility = () => {
    if (!facilityInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      facilities: [...prev.facilities, facilityInput.trim()]
    }));
    setFacilityInput('');
  };

  const handleRemoveFacility = (index) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
  };

  const handleAddRule = () => {
    if (!ruleInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      rules: [...prev.rules, ruleInput.trim()]
    }));
    setRuleInput('');
  };

  const handleRemoveRule = (index) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl glass-modal rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl z-10 bg-white/95 max-h-[90vh] overflow-y-auto space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-charcoal-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-coral-500 text-white flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-charcoal-900">
              {initialData ? 'Edit Data Properti' : 'Tambah Properti Baru'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-400 hover:bg-charcoal-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Tipe Properti */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Kategori Properti
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleTypeChange('kos')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    formData.type === 'kos' ? 'bg-amber-500 text-white shadow-xs' : 'bg-charcoal-100 text-charcoal-700'
                  }`}
                >
                  Kos (Bulanan)
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('hotel')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    formData.type === 'hotel' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-charcoal-100 text-charcoal-700'
                  }`}
                >
                  Hotel (Harian)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Sub-Tipe
              </label>
              <select
                value={formData.subType}
                onChange={(e) => setFormData({ ...formData, subType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-charcoal-200 text-xs font-bold text-charcoal-800"
              >
                {formData.type === 'kos' ? (
                  <>
                    <option value="Kos Campur">Kos Campur</option>
                    <option value="Kos Putri">Kos Putri</option>
                    <option value="Kos Putra">Kos Putra</option>
                    <option value="Kos Eksekutif">Kos Eksekutif</option>
                  </>
                ) : (
                  <>
                    <option value="Hotel Butik">Hotel Butik</option>
                    <option value="Hotel Mewah">Hotel Mewah (Bintang 5)</option>
                    <option value="Hotel Bisnis">Hotel Bisnis</option>
                    <option value="Resort & Villa">Resort & Villa</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Nama Properti */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              Nama Properti <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Tembalang Residence Exclusive"
              className="w-full px-3.5 py-2 rounded-xl border border-charcoal-200 text-xs font-semibold focus:outline-hidden focus:border-coral-500"
            />
          </div>

          {/* Kota & Harga */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Kota <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-charcoal-200 text-xs font-bold text-charcoal-800"
              >
                <option value="Semarang">Semarang</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Bandung">Bandung</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Malang">Malang</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Harga (IDR) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min="100000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-charcoal-200 text-xs font-bold text-charcoal-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Satuan Harga
              </label>
              <input
                type="text"
                disabled
                value={`Per ${formData.priceUnit}`}
                className="w-full px-3 py-2 rounded-xl border border-charcoal-200 bg-charcoal-50 text-xs font-bold text-charcoal-500"
              />
            </div>
          </div>

          {/* Alamat Lengkap & Ukuran Kamar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Alamat Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Jl. Nama Jalan No. XX, Kecamatan"
                className="w-full px-3.5 py-2 rounded-xl border border-charcoal-200 text-xs font-medium focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 mb-1">
                Ukuran Kamar
              </label>
              <input
                type="text"
                value={formData.roomSize}
                onChange={(e) => setFormData({ ...formData, roomSize: e.target.value })}
                placeholder="4 x 5 m²"
                className="w-full px-3 py-2 rounded-xl border border-charcoal-200 text-xs font-medium"
              />
            </div>
          </div>

          {/* Foto URL Utama */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              URL Foto Utama (Unsplash / Gambar Eksternal)
            </label>
            <input
              type="url"
              value={formData.images[0] || ''}
              onChange={(e) => {
                const newImgs = [...formData.images];
                newImgs[0] = e.target.value;
                setFormData({ ...formData, images: newImgs });
              }}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2 rounded-xl border border-charcoal-200 text-xs font-medium"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              Deskripsi Properti
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan kenyamanan, keunggulan dan akses sekitar properti..."
              className="w-full px-3.5 py-2 rounded-xl border border-charcoal-200 text-xs font-medium"
            />
          </div>

          {/* Fasilitas Tag Builder */}
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              Fasilitas (Daftar Aktif)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {formData.facilities.map((fac, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-charcoal-100 text-charcoal-800 text-xs font-medium flex items-center gap-1.5"
                >
                  {fac}
                  <button
                    type="button"
                    onClick={() => handleRemoveFacility(i)}
                    className="hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={facilityInput}
                onChange={(e) => setFacilityInput(e.target.value)}
                placeholder="Tambah fasilitas baru (e.g. WiFi 100 Mbps)"
                className="flex-1 px-3 py-1.5 rounded-xl border border-charcoal-200 text-xs"
              />
              <button
                type="button"
                onClick={handleAddFacility}
                className="px-3 py-1.5 rounded-xl bg-charcoal-800 text-white text-xs font-bold"
              >
                Tambah
              </button>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featuredToggle"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 accent-coral-500 rounded cursor-pointer"
            />
            <label htmlFor="featuredToggle" className="text-xs font-bold text-charcoal-800 cursor-pointer">
              Tandai sebagai Properti Pilihan (Featured Card)
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t border-charcoal-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-charcoal-200 text-xs font-bold text-charcoal-700"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold shadow-md shadow-coral-500/20"
            >
              {initialData ? 'Simpan Perubahan' : 'Tambahkan Properti'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
