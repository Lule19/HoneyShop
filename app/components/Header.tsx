"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efekat za promenu stila headera na skrol
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Zatvori meni kad se promeni ruta (klik na link)
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`fixed top-0 w-full z-50 transition-[padding] duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      {/* Background Layer - Separate from content for better performance */}
      <div 
        className={`absolute inset-0 -z-10 transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'bg-yellow-600 bg-honeycomb-header border-b border-transparent shadow-none' // Match overlay exactly
            : scrolled 
              ? 'bg-yellow-500 bg-honeycomb-header shadow-md border-b border-yellow-600' 
              : 'bg-transparent border-b border-yellow-600/40 backdrop-blur-[2px]'
        }`}
      />
      
      <div className="container mx-auto px-4 flex justify-between items-center relative z-50">
        <Link href="/" className="group z-50 relative" onClick={closeMobileMenu}>
           <h1 className={`text-2xl md:text-3xl font-bold flex flex-col leading-tight tracking-wide uppercase font-serif transition-colors duration-300 ease-in-out ${scrolled || mobileMenuOpen ? 'text-white' : 'text-yellow-900 group-hover:text-yellow-700'}`}>
              <span className="text-sm font-sans font-normal tracking-[0.3em] ml-1 opacity-80">Pčelinjak</span>
              Petrović
           </h1>
        </Link>
        <nav className="flex items-center gap-4 md:gap-8">
          {/* Desktop Menu */}
          <ul className={`hidden md:flex gap-8 font-medium text-lg transition-colors duration-300 ${scrolled ? 'text-yellow-50' : 'text-gray-800'}`}>
            <li>
              <Link href="/" className={`hover:text-white cursor-pointer transition relative group ${scrolled ? 'text-yellow-100' : 'hover:text-yellow-900 text-gray-800'}`}>
                Početna
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/#proizvodi" className={`hover:text-white cursor-pointer transition relative group ${scrolled ? 'text-yellow-100' : 'hover:text-yellow-900 text-gray-800'}`}>
                Prodavnica
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/o-nama" className={`hover:text-white cursor-pointer transition relative group ${scrolled ? 'text-yellow-100' : 'hover:text-yellow-900 text-gray-800'}`}>
                O nama
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
          
          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`relative p-3 rounded-full transition-all duration-300 group hover:scale-105 active:scale-95 cursor-pointer z-50 ${
              scrolled || mobileMenuOpen
                ? 'bg-white/20 text-white hover:bg-white/30' 
                : 'bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg shadow-yellow-200'
            }`}
          >
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button - Hamburger */}
          <button 
            className={`md:hidden p-2 z-50 focus:outline-none relative transition-colors duration-300 ${scrolled || mobileMenuOpen ? 'text-white' : 'text-yellow-900'}`}
            onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
             {mobileMenuOpen ? (
                // X icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
             ) : (
                // Hamburger icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
             )}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-yellow-600 bg-honeycomb-header z-[45] transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} pt-20`}> 
            <ul className="flex flex-col gap-8 text-center text-white text-2xl font-bold font-serif">
              <li>
                <Link href="/" onClick={closeMobileMenu} className="hover:text-yellow-200 transition">
                  Početna
                </Link>
              </li>
              <li>
                <Link href="/#proizvodi" onClick={closeMobileMenu} className="hover:text-yellow-200 transition">
                  Prodavnica
                </Link>
              </li>
               <li>
                <Link href="/o-nama" onClick={closeMobileMenu} className="hover:text-yellow-200 transition">
                  O nama
                </Link>
              </li>
            </ul>
        </div>
      </div>
    </header>
  );
}
