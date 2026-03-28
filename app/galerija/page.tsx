import fs from 'fs';
import path from 'path';
import { GalleryClient } from './GalleryClient';

export const metadata = {
  title: 'Galerija - Pčelinjak Petrović',
  description: 'Pogledajte fotografije iz našeg pčelinjaka.',
};

export default function GalerijaPage() {
  const imagesDir = path.join(process.cwd(), 'public', 'galerija');
  let images: string[] = [];

  try {
    const files = fs.readdirSync(imagesDir);
    images = files.filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
  } catch (error) {
    console.error("Greška pri čitanju foldera galerija:", error);
  }

  return (
    <div className="min-h-screen bg-yellow-50/30 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-900 mb-4 font-serif relative inline-block left-1/2 -translate-x-1/2">
          Galerija
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        </h1>
        <p className="text-center text-yellow-800/80 mb-12 max-w-2xl mx-auto text-lg">
          Zavirite u naš svet pčelarstva. Pogledajte kako nastaje naš prirodni med i ostali pčelinji proizvodi direktno iz netaknute prirode.
        </p>
        
        <GalleryClient images={images} />
      </div>
    </div>
  );
}

