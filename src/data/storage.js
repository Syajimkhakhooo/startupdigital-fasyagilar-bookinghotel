import { initialProperties } from './dummyProperties';

const PROPERTIES_KEY = 'stayspace_properties_v1';
const BOOKINGS_KEY = 'stayspace_bookings_v1';
const FAVORITES_KEY = 'stayspace_favorites_v1';
const USER_KEY = 'stayspace_current_user_v1';

const sampleBookings = [
  {
    id: "TRX-20261024-8921",
    propertyId: "prop-1",
    propertyName: "Tembalang Urban Living Exclusive Kos",
    propertyType: "kos",
    propertyCity: "Semarang",
    propertyAddress: "Jl. Prof. Soedarto No. 42, Tembalang, Kota Semarang",
    propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    guestName: "Fasya Nabila",
    guestEmail: "fasya@example.com",
    guestPhone: "0812-3456-7890",
    checkInDate: "2026-11-01",
    duration: 3, // 3 bulan
    durationUnit: "bulan",
    guestsCount: 1,
    pricePerUnit: 1850000,
    subtotal: 5550000,
    serviceFee: 50000,
    discount: 150000,
    totalPrice: 5450000,
    paymentMethod: "QRIS",
    paymentStatus: "Lunas (Simulasi)",
    bookingStatus: "Dikonfirmasi",
    createdAt: "2026-10-24T08:30:00.000Z",
    notes: "Mohon kamar di lantai 2 jika tersedia."
  },
  {
    id: "TRX-20261020-4109",
    propertyId: "prop-4",
    propertyName: "Royal Malioboro Heritage Resort & Gallery",
    propertyType: "hotel",
    propertyCity: "Yogyakarta",
    propertyAddress: "Jl. Dagen No. 8, Malioboro, Kota Yogyakarta",
    propertyImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    guestName: "Fasya Nabila",
    guestEmail: "fasya@example.com",
    guestPhone: "0812-3456-7890",
    checkInDate: "2026-10-20",
    duration: 2, // 2 malam
    durationUnit: "malam",
    guestsCount: 2,
    pricePerUnit: 680000,
    subtotal: 1360000,
    serviceFee: 35000,
    discount: 0,
    totalPrice: 1395000,
    paymentMethod: "BCA Virtual Account",
    paymentStatus: "Lunas (Simulasi)",
    bookingStatus: "Selesai",
    createdAt: "2026-10-18T14:15:00.000Z",
    notes: "Late check-in sekitar jam 19.00 WIB."
  }
];

export const getStoredProperties = () => {
  try {
    const raw = localStorage.getItem(PROPERTIES_KEY);
    if (!raw) {
      localStorage.setItem(PROPERTIES_KEY, JSON.stringify(initialProperties));
      return initialProperties;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading properties from storage:", err);
    return initialProperties;
  }
};

export const setStoredProperties = (properties) => {
  try {
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
  } catch (err) {
    console.error("Error writing properties to storage:", err);
  }
};

export const getStoredBookings = () => {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(sampleBookings));
      return sampleBookings;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading bookings from storage:", err);
    return sampleBookings;
  }
};

export const setStoredBookings = (bookings) => {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (err) {
    console.error("Error saving bookings to storage:", err);
  }
};

export const getStoredFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      // Default initial favorites: prop-1 & prop-2
      const initialFavs = ["prop-1", "prop-2"];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(initialFavs));
      return initialFavs;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading favorites:", err);
    return ["prop-1", "prop-2"];
  }
};

export const setStoredFavorites = (favs) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch (err) {
    console.error("Error saving favorites:", err);
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      const defaultUser = {
        id: "usr-01",
        name: "Fasya Nabila",
        email: "fasya@example.com",
        phone: "0812-3456-7890",
        role: "user" // 'user' | 'admin'
      };
      localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(raw);
  } catch (err) {
    return {
      id: "usr-01",
      name: "Fasya Nabila",
      email: "fasya@example.com",
      phone: "0812-3456-7890",
      role: "user"
    };
  }
};

export const setStoredUser = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Error saving user:", err);
  }
};

export const resetToDefaultData = () => {
  localStorage.setItem(PROPERTIES_KEY, JSON.stringify(initialProperties));
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(sampleBookings));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(["prop-1", "prop-2"]));
  return {
    properties: initialProperties,
    bookings: sampleBookings,
    favorites: ["prop-1", "prop-2"]
  };
};
