"use client";

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface AddToCartButtonProps {
  product: {
    title: string;
    price: string;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    // Add multiple times based on quantity
    for(let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <div className="flex items-center border border-gray-300 rounded-full w-max">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-full transition"
        >
          -
        </button>
        <span className="w-12 text-center font-bold text-lg">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-full transition"
        >
          +
        </button>
      </div>

      <button 
        onClick={handleAdd}
        className={`flex-1 px-8 py-3 rounded-full font-bold text-lg transition shadow-lg transform active:scale-95 flex items-center justify-center gap-2
          ${added 
            ? 'bg-green-600 text-white shadow-green-200' 
            : 'bg-yellow-600 text-white hover:bg-yellow-700 shadow-yellow-200'
          }`}
      >
        {added ? (
          <>
            <span className="text-xl">✓</span> Dodato u korpu
          </>
        ) : (
          <>
            Dodaj u korpu
          </>
        )}
      </button>
    </div>
  );
}
