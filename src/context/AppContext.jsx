import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredProperties,
  setStoredProperties,
  getStoredBookings,
  setStoredBookings,
  getStoredFavorites,
  setStoredFavorites,
  getStoredUser,
  setStoredUser,
  resetToDefaultData
} from '../data/storage';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => getStoredProperties());
  const [bookings, setBookings] = useState(() => getStoredBookings());
  const [favorites, setFavorites] = useState(() => getStoredFavorites());
  const [user, setUser] = useState(() => getStoredUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Search criteria shared from Hero to Explore catalog
  const [searchFilter, setSearchFilter] = useState({
    location: '',
    type: 'all', // 'all', 'kos', 'hotel'
    checkIn: '',
    guests: 1
  });

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, 3500);
  };

  // Sync state to localStorage on updates
  useEffect(() => {
    setStoredProperties(properties);
  }, [properties]);

  useEffect(() => {
    setStoredBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    setStoredFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    setStoredUser(user);
  }, [user]);

  // Wishlist / Favorites Actions
  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const exists = prev.includes(propertyId);
      if (exists) {
        showToast("Dihapus dari daftar favorit", "info");
        return prev.filter(id => id !== propertyId);
      } else {
        showToast("Ditambahkan ke daftar favorit ❤️", "success");
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  // Booking Actions
  const addBooking = (newBookingData) => {
    const timestamp = new Date();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `STY-${timestamp.getFullYear()}${(timestamp.getMonth() + 1).toString().padStart(2, '0')}${timestamp.getDate().toString().padStart(2, '0')}-${randomDigits}`;

    const completeBooking = {
      id: bookingCode,
      createdAt: timestamp.toISOString(),
      bookingStatus: 'Dikonfirmasi',
      paymentStatus: 'Lunas (Simulasi)',
      ...newBookingData
    };

    setBookings(prev => [completeBooking, ...prev]);
    showToast("Pemesanan berhasil dikonfirmasi!", "success");
    return completeBooking;
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, bookingStatus: newStatus } : b)
    );
    showToast(`Status transaksi diperbarui menjadi "${newStatus}"`, "success");
  };

  // Admin Property CRUD Actions
  const addProperty = (newProperty) => {
    const generatedId = `prop-${Date.now()}`;
    const propertyWithId = {
      ...newProperty,
      id: generatedId,
      rating: 5.0,
      reviewCount: 1,
      featured: Boolean(newProperty.featured)
    };
    setProperties(prev => [propertyWithId, ...prev]);
    showToast("Properti baru berhasil ditambahkan!", "success");
    return propertyWithId;
  };

  const updateProperty = (propertyId, updatedData) => {
    setProperties(prev =>
      prev.map(p => p.id === propertyId ? { ...p, ...updatedData } : p)
    );
    showToast("Data properti berhasil diperbarui!", "success");
  };

  const deleteProperty = (propertyId) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId));
    // also remove from favorites
    setFavorites(prev => prev.filter(id => id !== propertyId));
    showToast("Properti berhasil dihapus dari sistem", "info");
  };

  // User & Role Management
  const switchUserRole = (role) => {
    if (role === 'admin') {
      setUser({
        id: 'adm-01',
        name: 'Administrator StaySpace',
        email: 'admin@stayspace.id',
        phone: '0811-9988-7766',
        role: 'admin'
      });
      showToast("Beralih ke mode Admin StaySpace", "info");
    } else {
      setUser({
        id: 'usr-01',
        name: 'Fasya Nabila',
        email: 'fasya@example.com',
        phone: '0812-3456-7890',
        role: 'user'
      });
      showToast("Beralih ke mode Pengguna (Fasya)", "info");
    }
  };

  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    showToast(`Selamat datang kembali, ${userData.name}!`, "success");
  };

  const logoutUser = () => {
    setUser({
      id: 'guest',
      name: 'Tamu',
      email: '',
      phone: '',
      role: 'guest'
    });
    showToast("Anda telah keluar", "info");
  };

  const handleResetDemoData = () => {
    const { properties: defaultProps, bookings: defaultBks, favorites: defaultFavs } = resetToDefaultData();
    setProperties(defaultProps);
    setBookings(defaultBks);
    setFavorites(defaultFavs);
    showToast("Data demo berhasil direset ke pengaturan awal!", "success");
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        bookings,
        favorites,
        user,
        searchFilter,
        setSearchFilter,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toast,
        showToast,
        toggleFavorite,
        isFavorite,
        addBooking,
        updateBookingStatus,
        addProperty,
        updateProperty,
        deleteProperty,
        switchUserRole,
        loginUser,
        logoutUser,
        handleResetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
