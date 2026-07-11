"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

interface ProductProps {
  id: string; // Add ID prop
  title: string;
  price: string;
  type: string;
  image: string;
  available: boolean;
}

export default function ProductCard({ id, title, price, type, image, available }: ProductProps) {
  const { addToCart } = useCart();
  const cropHigher = id === 'bagremov-med' || id === 'vocni-med';

  return (
    <div className={`bg-white rounded-2xl shadow-lg flex flex-col group h-full overflow-hidden transition-shadow border ${available ? 'hover:shadow-xl border-yellow-100' : 'border-gray-200 opacity-80 grayscale-[20%]'}`}>
      <Link href={`/proizvod/${id}`} className="block h-96 relative bg-yellow-50 overflow-hidden cursor-pointer">
        {/* Koristimo Next.js Image komponentu za optimizovane slike */}
        <Image 
          src={image} 
          alt={title}
          fill
          className={`object-cover transition-transform duration-700 ${available ? 'scale-110 group-hover:scale-100' : ''}`}
          style={cropHigher ? { objectPosition: 'center 80%' } : undefined}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {!available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-600 text-white font-bold px-6 py-2 rounded-full shadow-lg transform -rotate-12 tracking-wider text-xl uppercase">NEDOSTUPNO</span>
          </div>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-sm text-yellow-600 font-semibold uppercase tracking-wider mb-2">{type}</span>
        <Link href={`/proizvod/${id}`} className="hover:text-yellow-700 transition">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">
          Klikni za više detalja o lekovitim svojstvima i preporučenom načinu upotrebe.
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{price} RSD</span>
          {available ? (
            <button 
              onClick={() => addToCart({ title, price, image })}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer active:scale-95 shadow-md hover:shadow-lg"
            >
              Dodaj u korpu
            </button>
          ) : (
            <button 
              disabled
              className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
            >
              Nedostupno
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
