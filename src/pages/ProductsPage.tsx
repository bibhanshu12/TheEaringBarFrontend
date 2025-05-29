import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Skeleton } from '../components/ui/Skeleton';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: Array<{ imageUrl: string }>;
  rating?: number;
  stock: number;
}

interface ProductResponse {
  msg: string;
  data: Product[];
  total: number;
  page: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<ProductResponse>('http://localhost:3000/api/allproducts');
        setProducts(response.data.data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gold-antique">
              Our Collection
            </h1>
            <div className="w-24 h-1 bg-gold-antique mx-auto"></div>
            <p className="mt-4 text-gold-antique/80">
              Discover our complete collection of exquisite jewelry
            </p>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-96">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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

export default ProductsPage;