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
}

export default function ProductCard({ id, title, price, type, image }: ProductProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-yellow-100 flex flex-col group h-full">
      <Link href={`/proizvod/${id}`} className="block h-96 relative bg-yellow-50 overflow-hidden cursor-pointer">
        {/* Koristimo Next.js Image komponentu za optimizovane slike */}
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
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
          <button 
            onClick={() => addToCart({ title, price, image })}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer active:scale-95 shadow-md hover:shadow-lg"
          >
            Dodaj u korpu
          </button>
        </div>
      </div>
    </div>
  );
}
