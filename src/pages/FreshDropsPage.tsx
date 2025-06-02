import React from 'react';
import { useGetFreshDropsQuery } from '../store/services/productsApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Loader2 } from 'lucide-react';

const FreshDropsPage = () => {
  const { data, isLoading, error } = useGetFreshDropsQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gold-antique">
              Fresh Drops
            </h1>
            <div className="w-24 h-1 bg-gold-antique mx-auto"></div>
            <p className="mt-4 text-gold-antique/80">
              Discover our latest arrivals, crafted with elegance and sophistication
            </p>
          </header>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-gold-antique" size={40} />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-gold-antique/70">
              Failed to load products. Please try again later.
            </div>
          ) : !data?.data?.length ? (
            <div className="text-center py-12 text-gold-antique/70">
              No new products available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreshDropsPage;