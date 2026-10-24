import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Heart, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  Compass, 
  Home as HomeIcon, 
  Sparkles,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
  Hotel,
  Layers
} from 'lucide-react';

export const Navbar = () => {
  const { user, favorites, setIsAuthModalOpen, switchUserRole, logoutUser } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = ({ isActive }) =>
    `relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
      isActive
        ? 'text-coral-500 font-semibold bg-coral-50/80 shadow-xs'
        : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-black/5'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3'
          : 'bg-white/80 backdrop-blur-md border-b border-charcoal-100/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-coral-600 via-coral-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-coral-500/25 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-coral-600 bg-clip-text text-transparent">
                StaySpace
              </span>
              <span className="text-[10px] -mt-1 font-semibold tracking-wider uppercase text-coral-500/90">
                Kos & Hotel Living
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 glass-pill px-3 py-1.5 rounded-full shadow-xs">
            <NavLink to="/" end className={navItemClass}>
              <HomeIcon className="w-4 h-4" />
              <span>Beranda</span>
            </NavLink>
            <NavLink to="/explore?type=kos" className={navItemClass}>
              <Layers className="w-4 h-4" />
              <span>Kos</span>
            </NavLink>
            <NavLink to="/explore?type=hotel" className={navItemClass}>
              <Hotel className="w-4 h-4" />
              <span>Hotel</span>
            </NavLink>
            <NavLink to="/explore" className={navItemClass}>
              <Compass className="w-4 h-4" />
              <span>Katalog</span>
            </NavLink>
            <NavLink to="/dashboard?tab=favorites" className={navItemClass}>
              <Heart className="w-4 h-4" />
              <span>Favorit</span>
              {favorites.length > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-coral-500 text-white leading-tight">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Right Section: User & Role Controls */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Quick Role Toggle Demo Badge */}
            <div className="flex items-center p-1 rounded-full bg-charcoal-100/80 border border-charcoal-200/50 text-xs">
              <button
                onClick={() => switchUserRole('user')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  user.role === 'user'
                    ? 'bg-white text-charcoal-900 shadow-xs font-semibold'
                    : 'text-charcoal-500 hover:text-charcoal-800'
                }`}
                title="Beralih ke mode Pengguna (Fasya)"
              >
                Pengguna
              </button>
              <button
                onClick={() => switchUserRole('admin')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1 ${
                  user.role === 'admin'
                    ? 'bg-coral-500 text-white shadow-xs font-semibold'
                    : 'text-charcoal-500 hover:text-charcoal-800'
                }`}
                title="Beralih ke mode Admin StaySpace"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-full border border-charcoal-200/80 bg-white/80 hover:bg-white hover:border-charcoal-300 shadow-xs transition-all duration-200 focus:outline-hidden"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-coral-500 to-rose-400 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <span className="text-xs font-semibold text-charcoal-700 max-w-[90px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-400" />
              </button>

              {isProfileMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileMenuOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-56 glass-dropdown rounded-2xl py-2 z-50 text-xs shadow-float border border-charcoal-200/60 divide-y divide-charcoal-100">
                    <div className="px-4 py-2.5">
                      <p className="font-semibold text-charcoal-900 text-sm">{user.name}</p>
                      <p className="text-charcoal-500 text-[11px] truncate">{user.email}</p>
                      <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-coral-100 text-coral-700' : 'bg-charcoal-100 text-charcoal-700'
                      }`}>
                        Peran: {user.role === 'admin' ? 'Administrator' : 'Customer'}
                      </span>
                    </div>

                    <div className="py-1.5">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-charcoal-700 hover:bg-coral-50/70 hover:text-coral-600 font-medium"
                      >
                        <User className="w-4 h-4 text-charcoal-400" />
                        Dashboard Pemesanan
                      </Link>
                      <Link
                        to="/dashboard?tab=favorites"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-charcoal-700 hover:bg-coral-50/70 hover:text-coral-600 font-medium"
                      >
                        <Heart className="w-4 h-4 text-charcoal-400" />
                        Wishlist ({favorites.length})
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-coral-600 bg-coral-50/40 hover:bg-coral-50 font-semibold"
                        >
                          <ShieldCheck className="w-4 h-4 text-coral-500" />
                          Dashboard Admin
                        </Link>
                      )}
                    </div>

                    <div className="py-1.5">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          setIsAuthModalOpen(true);
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-charcoal-700 hover:bg-charcoal-50 font-medium"
                      >
                        <Sparkles className="w-4 h-4 text-coral-500" />
                        Ganti Akun Demo
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logoutUser();
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 font-medium"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        Keluar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Admin CTA button if admin */}
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="px-3 py-1.5 rounded-full bg-coral-500 hover:bg-coral-600 text-white text-xs font-semibold shadow-xs shadow-coral-500/30 flex items-center gap-1.5 transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Panel Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/dashboard?tab=favorites"
              className="p-2 rounded-full text-charcoal-600 hover:bg-charcoal-100 relative"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-coral-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-charcoal-700 hover:bg-charcoal-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-modal border-t border-charcoal-200/60 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-float animate-fadeIn">
          <div className="flex items-center justify-between p-2 rounded-xl bg-charcoal-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-coral-500 text-white flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-900">{user.name}</p>
                <p className="text-[10px] text-charcoal-500">Peran: {user.role}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => switchUserRole('user')}
                className={`px-2 py-1 rounded text-[11px] font-medium ${
                  user.role === 'user' ? 'bg-white shadow-xs font-bold text-coral-600' : 'text-charcoal-500'
                }`}
              >
                User
              </button>
              <button
                onClick={() => switchUserRole('admin')}
                className={`px-2 py-1 rounded text-[11px] font-medium ${
                  user.role === 'admin' ? 'bg-coral-500 text-white font-bold' : 'text-charcoal-500'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white border border-charcoal-100 flex items-center gap-2 text-charcoal-800"
            >
              <HomeIcon className="w-4 h-4 text-coral-500" />
              Beranda
            </Link>
            <Link
              to="/explore"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white border border-charcoal-100 flex items-center gap-2 text-charcoal-800"
            >
              <Compass className="w-4 h-4 text-coral-500" />
              Semua Katalog
            </Link>
            <Link
              to="/explore?type=kos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white border border-charcoal-100 flex items-center gap-2 text-charcoal-800"
            >
              <Layers className="w-4 h-4 text-coral-500" />
              Katalog Kos
            </Link>
            <Link
              to="/explore?type=hotel"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white border border-charcoal-100 flex items-center gap-2 text-charcoal-800"
            >
              <Hotel className="w-4 h-4 text-coral-500" />
              Katalog Hotel
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white border border-charcoal-100 flex items-center gap-2 text-charcoal-800"
            >
              <User className="w-4 h-4 text-coral-500" />
              Dashboard Saya
            </Link>
            <Link
              to="/dashboard?tab=favorites"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white border border-charcoal-100 flex items-center gap-2 text-charcoal-800"
            >
              <Heart className="w-4 h-4 text-coral-500" />
              Favorit ({favorites.length})
            </Link>
          </div>

          {user.role === 'admin' && (
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-coral-500 text-white font-semibold text-center block text-sm shadow-xs"
            >
              Buka Panel Admin
            </Link>
          )}

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsAuthModalOpen(true);
            }}
            className="w-full py-2 px-3 rounded-xl border border-charcoal-200 text-xs font-semibold text-charcoal-700 text-center"
          >
            Login / Ganti Profil Demo
          </button>
        </div>
      )}
    </header>
  );
};
