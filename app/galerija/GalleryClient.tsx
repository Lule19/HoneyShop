"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface GalleryClientProps {
  images: string[];
}

export function GalleryClient({ images }: GalleryClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeModal = () => setSelectedIndex(null);

  const nextImage = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % images.length);
    }
  }, [images.length, selectedIndex]);

  const prevImage = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  }, [images.length, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    // Sprečavanje skrolovanja kada je modal otvoren
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, nextImage, prevImage]);

  if (images.length === 0) {
    return (
      <div className="text-center py-20 bg-white/50 rounded-3xl border border-yellow-200/50 shadow-sm">
        <p className="text-xl text-yellow-800/60 font-medium">Trenutno nema slika u galeriji.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 group bg-yellow-100/50 border border-yellow-200/50 cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={`/galerija/${img}`}
              alt={`Fotografija iz pčelinjaka ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            
            {/* Ikona za uvećanje/view */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/50 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity" onClick={closeModal}>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white z-[110] transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 md:left-8 text-white/50 hover:text-white z-[110] transition-colors p-2 md:p-4 bg-black/20 hover:bg-black/60 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 md:right-8 text-white/50 hover:text-white z-[110] transition-colors p-2 md:p-4 bg-black/20 hover:bg-black/60 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[85vh] m-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`/galerija/${images[selectedIndex]}`}
              alt={`Pčelinjak slika ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-white/70 tracking-widest font-serif text-sm bg-black/40 px-5 py-2 rounded-full backdrop-blur-sm shadow-lg border border-white/10">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
