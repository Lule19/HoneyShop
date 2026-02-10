import Link from "next/link";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <Link href="/" className="text-yellow-600 hover:underline mb-8 block">
        ← Nazad na početnu
      </Link>
      
      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Blog Post</span>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-8 capitalize">
        {slug.replace(/-/g, " ")}
      </h1>
      
      <div className="prose prose-lg prose-yellow mx-auto">
        <p className="lead text-xl text-gray-600 mb-8">
          Ovo je stranica za blog post: <span className="font-mono text-yellow-600">{slug}</span>.
          Ovde će se nalaziti kompletan tekst, slike i video materijal vezan za ovu temu.
        </p>
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 my-8">
          <h3 className="text-yellow-800 font-bold text-lg mb-2">Napomena</h3>
          <p className="text-yellow-700">
            Sadržaj je trenutno u pripremi. Uskoro očekujte detaljne priče iz našeg pčelinjaka!
          </p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}
