import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pčelinjak Petrović - Prirodni med iz Gornje Trnave",
  description: "Prodaja 100% prirodnog domaćeg meda. Bagremov, Livadski, Suncokretov i Šumski med direktno iz košnice na vaš sto. Dostava na adresu.",
  icons: {
    icon: [
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐝</text></svg>", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <CartSidebar />

          <main className="container mx-auto px-4 min-h-screen pt-32 pb-12">
            {children}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}