import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchProductsQuery } from '../store/services/productsApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard  from '../components/ProductCard';
import { Loader2 } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data, isLoading } = useSearchProductsQuery(query);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold text-gold-antique mb-6">
            Search Results for "{query}"
          </h1>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-gold-antique" size={40} />
            </div>
          ) : !data?.data?.length ? (
            <div className="text-center py-12">
              <p className="text-lg text-gold-antique/70">
                No products found for "{query}"
              </p>
              <p className="mt-2 text-sm text-gold-antique/50">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

export default SearchPage;