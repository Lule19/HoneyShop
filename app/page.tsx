import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Sekcija */}
      <section className=" text-center py-24 bg-gradient-to-b from-yellow-100 to-white rounded-3xl mt-4 px-4">
        <h2 className="text-5xl md:text-7xl font-bold text-yellow-900 mb-6 tracking-tight">
          Prirodni med <br/> iz netaknute prirode
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Pravi, sirovi med direktno iz košnice na vaš sto. 
          Bez aditiva, bez prevara. Samo čista priroda u tegli.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="#proizvodi"
            className="bg-yellow-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-700 transition shadow-lg shadow-yellow-200 inline-block"
          >
            Poruči odmah
          </Link>
          <Link 
            href="/o-nama"
            className="bg-white text-yellow-700 border-2 border-yellow-100 px-8 py-4 rounded-full text-lg font-bold hover:border-yellow-300 transition inline-block"
          >
            Saznaj više
          </Link>
        </div>
      </section>

      {/* Sekcija Proizvoda */}
      <section id="proizvodi" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Naša Ponuda</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            Pažljivo birane vrste meda, sakupljene sa netaknutih pašnjaka i šuma.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price.toString()}
              type={product.type}
              image={product.image}
            />
          ))}
        </div>
      </section>

      {/* Video / Drone Sekcija - Grid Prikaz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4">
        {/* Video 1: Pčelinjak */}
        <section className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
             <div className="absolute inset-0 bg-yellow-950">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2s]"
                  poster="/images/placeholder.jpg" 
                >
                    <source src="/videos/pcelinjak2-dron.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
             </div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                <span className="text-yellow-300 font-bold tracking-widest uppercase mb-2 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Gornja Trnava</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
                   Pčelinjak
                </h3>
                <p className="text-gray-200 text-sm max-w-xs drop-shadow-md hidden md:block">
                  Naše košnice u srcu prirode.
                </p>
             </div>
        </section>

        {/* Video 2: Priroda / Paša (Placeholder) */}
        <section className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
             <div className="absolute inset-0 bg-green-950">
               
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2s]"
                  poster="/images/placeholder.jpg" 
                >
                    <source src="/videos/pcelinjak-dron.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
             </div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                <span className="text-green-300 font-bold tracking-widest uppercase mb-2 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Mokrin</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
                   Suncokretova Paša
                </h3>
                <p className="text-gray-200 text-sm max-w-xs drop-shadow-md hidden md:block">
                   Gde pčele sakupljaju najslađi nektar.
                </p>
             </div>
        </section>
      </div>

      {/* Features Sekcija */}
      <section className="bg-yellow-50 py-16 rounded-3xl">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🏔️</div>
              <h4 className="text-xl font-bold text-gray-900">100% Prirodno</h4>
              <p className="text-gray-600">
                Pčele skupljaju med na dve velike paše, na netaknutim predelima ciste prirode u Gornjoj Trnavi i Mokrinu.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🚚</div>
              <h4 className="text-xl font-bold text-gray-900">Brza Dostava</h4>
              <p className="text-gray-600">
                Danas poručite, sutra je med na vašem stolu. Besplatna dostava preko 5000 RSD.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🛡️</div>
              <h4 className="text-xl font-bold text-gray-900">Garancija Kvaliteta</h4>
              <p className="text-gray-600">
                Svaka tegla je testirana i odobrena. Ako niste zadovoljni, vraćamo novac.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / Edukacija Sekcija */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-yellow-600 font-bold uppercase tracking-wider text-sm">Blog</span>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Iz Pčelarskog Dnevnika</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            Saznajte više o svetu pčela, proizvodnji meda i kako da prepoznate pravi kvalitet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Članak 1 */}
          <Link href="/blog/kako-prepoznati-pravi-med" className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group block">
            <div className="h-48 bg-yellow-100 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 scale-110 group-hover:scale-125 transition-transform duration-500">🍯</div>
            </div>
            <div className="p-6">
              <div className="text-sm text-yellow-600 font-bold mb-2">SAVETI</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition">Kako prepoznati pravi med?</h4>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                Tržište je preplavljeno lažnim medom. Naučite jednostavne trikove kako da uz pomoć čaše vode ili kašike prepoznate 100% prirodni proizvod.
              </p>
              <div className="text-yellow-700 font-semibold text-sm flex items-center gap-1">
                Pročitaj više <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          {/* Članak 2 */}
          <Link href="/blog/kristalizacija-meda-dobar-ili-los-znak" className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group block">
            <div className="h-48 bg-orange-100 relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 scale-110 group-hover:scale-125 transition-transform duration-500">🧊</div>
            </div>
            <div className="p-6">
              <div className="text-sm text-yellow-600 font-bold mb-2">EDUKACIJA</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition">Kristalizacija: Dobar ili loš znak?</h4>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                Mnogi misle da se med pokvario kada se "ušećeri". Istina je potpuno suprotna - to je jedini siguran dokaz da je med pravi!
              </p>
              <div className="text-yellow-700 font-semibold text-sm flex items-center gap-1">
                Pročitaj više <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          {/* Članak 3 */}
          <Link href="/blog/zasto-selimo-pcele-u-banat" className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition group block">
            <div className="h-48 bg-green-100 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 scale-110 group-hover:scale-125 transition-transform duration-500">🚛</div>
            </div>
            <div className="p-6">
              <div className="text-sm text-yellow-600 font-bold mb-2">NAŠA PRIČA</div>
              <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition">Zašto selimo pčele u Banat?</h4>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                Tragajući za najboljom suncokretovom pašom, svakog leta selimo naše košnice. Saznajte kako izgleda nomadski život pčelara.
              </p>
              <div className="text-yellow-700 font-semibold text-sm flex items-center gap-1">
                Pročitaj više <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}