"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay pozadina */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white z-[60] shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Header korpe */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-yellow-50">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🛒 Vaša Korpa ({items.length})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-yellow-200 rounded-full transition text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Lista proizvoda */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-6xl mb-4">🍯</span>
              <p className="text-lg">Vaša korpa je prazna.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 text-yellow-600 font-bold hover:underline"
              >
                Nastavi kupovinu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center">
                <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{item.title}</h4>
                  <p className="text-yellow-600 font-bold">{item.price} RSD</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.title, -1)}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="font-medium text-gray-900 w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.title, 1)}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(item.title)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                  title="Ukloni"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer korpe sa ukupnim iznosom */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 text-lg">Ukupno za plaćanje:</span>
              <span className="text-3xl font-bold text-gray-900">{cartTotal} RSD</span>
            </div>
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center bg-yellow-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-yellow-700 transition shadow-lg shadow-yellow-200"
            >
              Nastavi na plaćanje
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
