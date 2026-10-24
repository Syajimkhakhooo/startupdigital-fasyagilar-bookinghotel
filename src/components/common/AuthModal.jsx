import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, ShieldCheck, Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, user } = useApp();
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'admin'
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleQuickLogin = (role) => {
    if (role === 'admin') {
      loginUser({
        id: 'adm-01',
        name: 'Administrator StaySpace',
        email: 'admin@stayspace.id',
        phone: '0811-9988-7766',
        role: 'admin'
      });
    } else {
      loginUser({
        id: 'usr-01',
        name: 'Fasya Nabila',
        email: 'fasya@example.com',
        phone: '0812-3456-7890',
        role: 'user'
      });
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return;

    loginUser({
      id: `usr-${Date.now()}`,
      name: name,
      email: email,
      phone: '0812-0000-1111',
      role: activeTab === 'admin' ? 'admin' : 'user'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div 
        className="fixed inset-0"
        onClick={() => setIsAuthModalOpen(false)}
      />
      
      <div className="relative w-full max-w-md glass-modal rounded-3xl p-6 sm:p-8 border border-white/80 shadow-2xl z-10 bg-white/95">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-charcoal-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-coral-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-coral-500/25">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-charcoal-900">
            Masuk ke StaySpace
          </h3>
          <p className="text-xs text-charcoal-500 mt-1">
            Simulasi login untuk demonstrasi tugas startup & PKL
          </p>
        </div>

        {/* Quick Demo Login Cards */}
        <div className="space-y-2.5 mb-6">
          <p className="text-[11px] font-bold text-charcoal-500 uppercase tracking-wider text-center">
            Pilih Akun Demo Siap Pakai:
          </p>

          <button
            type="button"
            onClick={() => handleQuickLogin('user')}
            className="w-full p-3 rounded-2xl border border-charcoal-200/80 hover:border-coral-400 bg-white hover:bg-coral-50/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center font-bold text-sm">
                FN
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-900 group-hover:text-coral-600">
                  Fasya Nabila (Pengguna)
                </p>
                <p className="text-[11px] text-charcoal-500">fasya@example.com</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-coral-600 px-2.5 py-1 rounded-full bg-coral-50">
              Masuk
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            className="w-full p-3 rounded-2xl border border-charcoal-200/80 hover:border-charcoal-800 bg-white hover:bg-charcoal-50 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-charcoal-900 text-white flex items-center justify-center font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-coral-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-900">
                  Administrator StaySpace
                </p>
                <p className="text-[11px] text-charcoal-500">Kelola Properti & Transaksi</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-charcoal-800 px-2.5 py-1 rounded-full bg-charcoal-100">
              Admin
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-charcoal-200/60" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider text-charcoal-400 bg-white px-2">
            atau login kustom
          </div>
        </div>

        {/* Custom Login Form */}
        <form onSubmit={handleCustomSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              className="w-full px-3.5 py-2 rounded-xl border border-charcoal-200 text-xs focus:outline-hidden focus:border-coral-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-charcoal-700 mb-1">
              Alamat Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-3.5 py-2 rounded-xl border border-charcoal-200 text-xs focus:outline-hidden focus:border-coral-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-charcoal-900 hover:bg-coral-500 text-white text-xs font-bold transition-colors shadow-md mt-2 flex items-center justify-center gap-1.5"
          >
            <span>Masuk Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
