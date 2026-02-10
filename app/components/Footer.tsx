import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-yellow-900 bg-honeycomb-footer text-white mt-12 rounded-t-3xl border-t-8 border-yellow-500 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Prva kolona - O nama i Kontakt */}
          <div className="flex flex-col space-y-8">
            <div>
              <h5 className="font-bold text-2xl mb-4 text-yellow-400">Pčelinjak Petrović</h5>
              <p className="text-yellow-100/90 leading-relaxed text-base">
                Tradicija duga 50 godina. Proizvodimo najkvalitetniji domaći med u Šumadiji. 
                Takođe, naš pčelinjak se jednom godišnje seli u ravni Banat, prateći najbolju pašu za naše pčele.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold text-xl mb-4 text-yellow-400">Kontakt Informacije</h5>
               <ul className="space-y-4 text-yellow-100/90 text-base">
                <li className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <span>Selo Gornja Trnava, Topola</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">📧</span>
                  <a href="mailto:info@pcelinjak-petrovic.rs" className="hover:text-yellow-300 transition">info@pcelinjak-petrovic.rs</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">📞</span>
                  <a href="tel:+381600926196" className="hover:text-yellow-300 transition">+381 60 0 926 196</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Druga kolona - Mreže i Brzi linkovi - CENTRIRANO */}
          <div className="flex flex-col items-center text-center">
             <h5 className="font-bold text-xl mb-6 text-yellow-400">Povežite se sa nama</h5>
             <div className="flex gap-4 mb-8">
                {/* Instagram */}
                <a href="#" className="transform hover:scale-110 transition duration-300">
                  <div className="w-12 h-12 bg-gradient-to-tr from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-xl">
                    IG
                  </div>
                </a>
                {/* Facebook */}
                <a href="#" className="transform hover:scale-110 transition duration-300">
                  <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-xl">
                    FB
                  </div>
                </a>
                {/* TikTok */}
                <a href="#" className="transform hover:scale-110 transition duration-300">
                  <div className="w-12 h-12 bg-gradient-to-tr from-gray-900 to-black rounded-full flex items-center justify-center shadow-lg text-white font-bold text-xs border border-gray-600">
                    TT
                  </div>
                </a>
             </div>
             <p className="text-yellow-100/600 text-sm italic max-w-xs">
               "Pratite naše dnevne priče iz pčelinjaka i saznajte zanimljivosti o svetu pčela."
             </p>
          </div>

           {/* Treća kolona - Mapa (Interaktivna i veća) */}
           <div className="w-full h-80 rounded-2xl overflow-hidden border-4 border-yellow-600/30 shadow-2xl relative bg-yellow-800 transform hover:shadow-yellow-500/20 transition duration-500">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1182.8723462690368!2d20.764869515245735!3d44.1813749330223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ssr!2srs!4v1770520562660!5m2!1ssr!2srs" 
                className="absolute inset-0 w-full h-full" 
                style={{ border: 0 }}
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokacija pčelinjaka na mapi"
             >
             </iframe>
           </div>
        </div>

        {/* Donji deo footera - Copyright */}
        <div className="border-t border-yellow-800/50 mt-12 pt-8 text-center bg-black/10 -mx-6 mb-[-3rem] pb-8 rounded-b-lg">
          <p className="text-yellow-100/60 text-base">© 2026 Pčelinjak Petrović. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
