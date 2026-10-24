import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Heart, Shield, Sparkles, MapPin, Phone, Mail, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { handleResetDemoData } = useApp();

  return (
    <footer className="mt-20 border-t border-charcoal-200/60 bg-white/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-coral-600 to-coral-400 flex items-center justify-center text-white shadow-md shadow-coral-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-charcoal-900">
                StaySpace
              </span>
            </Link>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Platform modern pencarian dan transaksi sewa kos-kosan eksklusif serta pemesanan hotel berkelas di Indonesia dengan visual Liquid Glass.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coral-50/80 border border-coral-200/60 text-[11px] font-semibold text-coral-700">
              <Sparkles className="w-3.5 h-3.5 text-coral-500" />
              <span>Startup Showcase 2026</span>
            </div>
          </div>

          {/* Kota Populer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
              Kota Pilihan
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-600">
              <li>
                <Link to="/explore?location=Semarang" className="hover:text-coral-600 transition-colors">
                  Kos & Hotel di Semarang
                </Link>
              </li>
              <li>
                <Link to="/explore?location=Yogyakarta" className="hover:text-coral-600 transition-colors">
                  Kos & Hotel di Yogyakarta
                </Link>
              </li>
              <li>
                <Link to="/explore?location=Bandung" className="hover:text-coral-600 transition-colors">
                  Kos & Hotel di Bandung
                </Link>
              </li>
              <li>
                <Link to="/explore?location=Jakarta" className="hover:text-coral-600 transition-colors">
                  Kos & Hotel di Jakarta
                </Link>
              </li>
              <li>
                <Link to="/explore?location=Malang" className="hover:text-coral-600 transition-colors">
                  Kos & Hotel di Malang
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan & Navigasi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
              Kategori & Menu
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-600">
              <li>
                <Link to="/explore?type=kos" className="hover:text-coral-600 transition-colors">
                  Sewa Kos Bulanan
                </Link>
              </li>
              <li>
                <Link to="/explore?type=hotel" className="hover:text-coral-600 transition-colors">
                  Booking Hotel Harian
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-coral-600 transition-colors">
                  Riwayat & Transaksi
                </Link>
              </li>
              <li>
                <Link to="/dashboard?tab=favorites" className="hover:text-coral-600 transition-colors">
                  Wishlist Favorit
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-coral-600 text-coral-600 font-semibold transition-colors">
                  Panel Manajemen Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Demo Controls & Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
              Informasi Demonstrasi
            </h4>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Seluruh transaksi dan data properti disimpan di browser Anda via <span className="font-semibold text-charcoal-700">localStorage</span> tanpa backend eksternal.
            </p>
            <div className="pt-1">
              <button
                onClick={handleResetDemoData}
                className="px-3 py-2 rounded-xl border border-charcoal-200 bg-white hover:bg-charcoal-50 text-xs font-semibold text-charcoal-700 shadow-xs transition-all w-full text-center"
              >
                Reset Data Demo Awal
              </button>
            </div>
            <p className="text-[11px] text-charcoal-400">
              Tugas Booking Startup — Dibuat untuk demonstrasi tugas kuliah PKL.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-charcoal-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} StaySpace Inc. Terinspirasi dari Airbnb & Desain Liquid Glass.</p>
          <div className="flex items-center gap-4 text-charcoal-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              100% Simulasi Transaksi Aman
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
