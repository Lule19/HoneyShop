"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Definišemo kako izgleda jedan proizvod u korpi
export interface CartItem {
  id: string; // Koristićemo naziv kao ID za sada
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// Šta sve korpa može da radi i koje podatke ima
interface CartContextType {
  items: CartItem[];
  addToCart: (product: { title: string; price: string; image: string }) => void;
  removeFromCart: (title: string) => void;
  updateQuantity: (title: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. Učitaj korpu iz LocalStorage-a kada se sajt učita
  useEffect(() => {
    const savedCart = localStorage.getItem('med-shop-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Greška pri učitavanju korpe:', error);
      }
    }
  }, []);

  // 2. Svaki put kad se promeni sadržaj korpe, sačuvaj u LocalStorage
  useEffect(() => {
    localStorage.setItem('med-shop-cart', JSON.stringify(items));
  }, [items]);

  // Funkcija za dodavanje
  const addToCart = (product: { title: string; price: string; image: string }) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.title === product.title);
      // Pretvaramo "1200 RSD" u broj 1200
      const priceNumber = parseInt(product.price.toString().replace(/\D/g, '')) || 0;

      if (existingItem) {
        // Ako već postoji, samo povećaj količinu
        return currentItems.map(item =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Ako ne postoji, dodaj novi
      return [...currentItems, { 
        id: product.title,
        title: product.title, 
        price: priceNumber, 
        image: product.image, 
        quantity: 1 
      }];
    });
    setIsCartOpen(true); // Automatski otvori korpu kad se doda nešto
  };

  // Izbacivanje iz korpe
  const removeFromCart = (title: string) => {
    setItems(currentItems => currentItems.filter(item => item.title !== title));
  };

  // Promena količine (+/-)
  const updateQuantity = (title: string, delta: number) => {
    setItems(currentItems => currentItems.map(item => {
      if (item.title === title) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0)); // Ako padne na 0, brišemo ga
  };

  // Računanje ukupnog
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      cartTotal, 
      cartCount,
      isCartOpen,
      setIsCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook da lako koristimo korpu bilo gde
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
