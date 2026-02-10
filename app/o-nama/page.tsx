import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section sa slikom */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image
          src="/images/pcelinjak-bg.jpg"
          alt="Naš pčelinjak u prirodi"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center shadow-text">
            Tradicija koja traje
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-4xl">
        {/* Uvodna priča */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-yellow-800 mb-6">O Našem Pčelinjaku</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Pčelinjak Petrović nastao je iz ljubavi prema prirodi i pčelama koja se prenosi generacijama. 
            Smešteni smo na obroncima netaknute prirode, daleko od industrijskih zagađenja i prometnih saobraćajnica. 
            Naše košnice su naš ponos, a svaka tegla meda rezultat je posvećenosti i poštovanja prema ovim vrednim insektima.
          </p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </section>

        {/* Grid sa detaljima */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Prirodno i Netaknuto</h3>
            <p className="text-gray-600">
              Verujemo da najbolji med nastaje kada se ne mešamo previše u posao pčela. 
              Naš proces proizvodnje je u potpunosti tradicionalan – od sakupljanja nektara 
              do vrcanja i punjenja u tegle. Nema zagrevanja, nema aditiva, nema kompromisa.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span> 100% prirodan med
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span> Sertifikovano poreklo
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="text-green-500 font-bold">✓</span> Tradicionalna receptura
              </li>
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition duration-500">
             <Image 
               src="/images/pcelar.jpg"
               alt="Pčelar na radu u pčelinjaku"
               fill
               className="object-cover hover:scale-105 transition-transform duration-700"
             />
          </div>
        </section>

        {/* Misija */}
        <section className="bg-yellow-50 p-10 rounded-3xl text-center border border-yellow-100">
          <h3 className="text-2xl font-bold text-yellow-900 mb-4">Naša Misija</h3>
          <p className="text-gray-700 text-lg italic">
            "Sačuvati zdravlje pčela i doneti čistoću prirode na vaš sto, kap po kap."
          </p>
        </section>
      </div>
    </div>
  );
}
