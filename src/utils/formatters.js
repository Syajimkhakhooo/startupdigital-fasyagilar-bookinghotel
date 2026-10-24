export const formatRupiah = (number) => {
  if (number === undefined || number === null) return "Rp 0";
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d);
  } catch (e) {
    return dateString;
  }
};

export const calculateBookingTotals = (pricePerUnit, duration, durationUnit = 'malam') => {
  const dur = Math.max(1, parseInt(duration) || 1);
  const price = parseInt(pricePerUnit) || 0;
  const subtotal = price * dur;
  
  // Platform fee 1.5% or fixed min
  const serviceFee = durationUnit === 'bulan' ? 50000 : 25000;
  
  // Optional promo discount simulation
  const discount = dur >= 3 && durationUnit === 'bulan' ? 100000 : (dur >= 3 && durationUnit === 'malam' ? 50000 : 0);
  
  const total = subtotal + serviceFee - discount;

  return {
    pricePerUnit: price,
    duration: dur,
    durationUnit,
    subtotal,
    serviceFee,
    discount,
    totalPrice: Math.max(0, total)
  };
};
