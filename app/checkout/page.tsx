"use client";

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, cartTotal, cartCount } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: formData,
          items: items,
          total: cartTotal
        }),
      });

      if (!response.ok) {
        throw new Error('Došlo je do greške prilikom slanja porudžbine.');
      }

      setSubmitStatus('success');
      // Opciono: Isprazni korpu ovde ili preusmeri
      // clearCart(); 
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && submitStatus !== 'success') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Vaša korpa je prazna</h1>
        <button 
          onClick={() => router.push('/')}
          className="bg-yellow-600 text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-700 transition"
        >
          Nazad na prodavnicu
        </button>
      </div>
    );
  }

  if (submitStatus === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hvala na porudžbini!</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Vaša porudžbina je uspešno primljena. Poslali smo vam potvrdu na email adresu 
          <span className="font-semibold text-gray-800"> {formData.email}</span>.
        </p>
        <div className="bg-yellow-50 p-6 rounded-lg max-w-md mx-auto mb-8 border border-yellow-100">
          <h3 className="font-bold text-yellow-800 mb-2">Šta se sada dešava?</h3>
          <p className="text-sm text-yellow-800/80">
            Naš tim će spakovati vaš med i poslati ga kurirskom službom. 
            Očekujte isporuku u roku od 2-3 radna dana. Plaćanje obavljate pouzećem kuriru.
          </p>
        </div>
        <button 
          onClick={() => {
             // Ovde bi trebalo isprazniti korpu u realnosti, ali za sad samo redirect
             // Da bi bilo potpuno, trebalo bi dodati clearCart u CartContext
             window.location.href = '/'; 
          }}
          className="bg-yellow-600 text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-700 transition"
        >
          Povratak na naslovnu
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Završite Kupovinu</h1>
      
      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
        {/* Forma za podatke */}
        <div className="flex-1">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm">1</span>
              Podaci za dostavu
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ime i Prezime</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                    placeholder="Petar Petrović"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Broj Telefona</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                    placeholder="061 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Adresa</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                  placeholder="petar@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ulica i Broj</label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                    placeholder="Bulevar Oslobođenja 12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poštanski Broj</label>
                  <input
                    required
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                    placeholder="21000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grad / Mesto</label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                  placeholder="Novi Sad"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Napomena za kurira (opciono)</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
                  placeholder="Npr. Zvono ne radi, ostavite kod komšije..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-yellow-600 text-white font-bold py-4 rounded-xl hover:bg-yellow-700 transition shadow-lg shadow-yellow-200 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Slanje porudžbine...
                  </>
                ) : (
                  <>
                    Potvrdi i Naruči
                  </>
                )}
              </button>
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center mt-2">Došlo je do greške. Molimo pokušajte ponovo.</p>
              )}
            </form>
          </div>
        </div>

        {/* Pregled porudžbine */}
        <div className="lg:w-[400px]">
          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Vaša Korpa</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                     <Image 
                       src={item.image} 
                       alt={item.title} 
                       fill 
                       className="object-cover"
                     />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.quantity} x {item.price} RSD</p>
                  </div>
                  <div className="font-medium text-gray-800">
                    {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Međuzbir</span>
                <span>{cartTotal} RSD</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Dostava</span>
                <span className="text-green-600 font-medium">Plaćanje pouzećem</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                <span>Ukupno</span>
                <span>{cartTotal} RSD</span>
              </div>
            </div>
            
            <div className="mt-8 bg-yellow-100 p-4 rounded-lg text-sm text-yellow-800 flex gap-3">
              <span className="text-2xl">🚛</span>
              <p>Besplatna dostava za porudžbine preko 5000 RSD! (Ovo je primer teksta)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
