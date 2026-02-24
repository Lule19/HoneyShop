import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/app/data/products';
import AddToCartButton from '@/app/components/AddToCartButton';
import { Metadata } from 'next';

// Dinamički generišemo SEO naslov za svaki proizvod
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  
  if (!product) {
    return { title: 'Proizvod nije pronađen' };
  }

  return {
    title: `${product.title} | Pčelinjak Petrović`,
    description: product.shortDescription,
  };
}

// Ova funkcija generiše statičke putanje za sve proizvode prilikom build-a
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  // Pronađi slične proizvode (sve osim trenutnog, uzmi prva 2)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 2);

  return (
    <div className="bg-white min-h-screen pb-20 pt-20"> {/* pt-20 zbog fiksnog headera */}
      
      {/* Breadcrumb navigacija */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-gray-500 flex gap-2">
            <Link href="/" className="hover:text-yellow-600">Početna</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{product.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Leva strana - Slika */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-yellow-50 aspect-square md:aspect-auto md:h-[600px] border border-yellow-100">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm text-yellow-800 font-bold text-sm tracking-widest border border-white">
                    {product.type.toUpperCase()}
                </div>
            </div>

            {/* Desna strana - Detalji */}
            <div className="flex flex-col justify-center h-full pt-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{product.title}</h1>
                <div className="text-3xl font-bold text-yellow-600 mb-6">{product.price} RSD <span className="text-lg text-gray-400 font-normal">/ {product.unit}</span></div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-8 border-b border-yellow-100 pb-8">
                    {product.description}
                </p>

                <div className="grid gap-6 mb-8">
                    <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                        <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                            <span>✨</span> Lekovita svojstva
                        </h3>
                        <ul className="space-y-2">
                            {product.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-700">
                                    <span className="text-green-500 font-bold mt-1">✓</span>
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mb-8 text-gray-700">
                   <strong className="text-gray-900">Preporučena upotreba:</strong> {product.usage}
                </div>

                {/* Komponenta za dodavanje u korpu (Klijentska) */}
                <AddToCartButton product={{ 
                    title: product.title, 
                    price: product.price.toString(), 
                    image: product.image 
                }} />
            </div>
        </div>

        {/* Sekcija Slični Proizvodi */}
        <div className="mt-32">
            <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">Možda će vas zanimati i...</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((related) => (
                    <div key={related.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-yellow-100 group">
                        <Link href={`/proizvod/${related.id}`}>
                            <div className="h-64 relative bg-yellow-50 overflow-hidden cursor-pointer">
                                <Image 
                                    src={related.image} 
                                    alt={related.title}
                                    fill
                                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
                                />
                            </div>
                        </Link>
                        <div className="p-6">
                            <h4 className="font-bold text-lg text-gray-800 mb-2">{related.title}</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-yellow-600 font-bold">{related.price} RSD</span>
                                <Link href={`/proizvod/${related.id}`} className="text-sm font-semibold text-gray-500 hover:text-yellow-600">
                                    Pogledaj detalje →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
