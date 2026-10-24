import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Building, Bed, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatRupiah } from '../../utils/formatters';

export const PropertyCard = ({ property }) => {
  const { isFavorite, toggleFavorite } = useApp();
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isFav = isFavorite(property.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const images = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="group relative rounded-3xl glass-card overflow-hidden glass-card-hover flex flex-col h-full border border-charcoal-200/50 bg-white/80">
      
      {/* Image Container with Slider/Carousel dots */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-charcoal-100">
        <img
          src={images[activeImgIdx]}
          alt={property.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Liquid Glass Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFav ? "Hapus dari favorit" : "Tambah ke favorit"}
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-xs transition-transform active:scale-90 hover:scale-110 hover:bg-white"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFav ? 'fill-coral-500 text-coral-500' : 'text-charcoal-700 hover:text-coral-500'
            }`}
          />
        </button>

        {/* Property Type Badge */}
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide backdrop-blur-md uppercase shadow-xs ${
              property.type === 'kos'
                ? 'bg-amber-500/90 text-white'
                : 'bg-emerald-600/90 text-white'
            }`}
          >
            {property.subType || (property.type === 'kos' ? 'Kos' : 'Hotel')}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-coral-500/95 text-white backdrop-blur-md uppercase shadow-xs">
              Pilihan
            </span>
          )}
        </div>

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveImgIdx(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImgIdx === i ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`View photo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-1.5">
            <span className="flex items-center gap-1 font-medium text-charcoal-600 truncate max-w-[70%]">
              <MapPin className="w-3.5 h-3.5 text-coral-500 shrink-0" />
              {property.city}
            </span>
            <span className="flex items-center gap-1 font-bold text-charcoal-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {property.rating}
              <span className="font-normal text-charcoal-400 text-[10px]">({property.reviewCount})</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-charcoal-900 group-hover:text-coral-600 transition-colors line-clamp-1">
            {property.name}
          </h3>

          {/* Quick facilities preview */}
          <p className="text-xs text-charcoal-500 line-clamp-1 mt-1">
            {property.facilities ? property.facilities.slice(0, 3).join(' • ') : property.roomSize}
          </p>
        </div>

        {/* Footer: Price & CTA */}
        <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-charcoal-900">
                {formatRupiah(property.price)}
              </span>
              <span className="text-xs text-charcoal-500 font-medium">
                /{property.priceUnit || (property.type === 'kos' ? 'bulan' : 'malam')}
              </span>
            </div>
          </div>

          <Link
            to={`/property/${property.id}`}
            className="px-3.5 py-1.5 rounded-xl bg-charcoal-900 hover:bg-coral-500 text-white text-xs font-semibold shadow-xs transition-all duration-200 active:scale-95"
          >
            Lihat Detail
          </Link>
        </div>

      </div>

    </div>
  );
};
