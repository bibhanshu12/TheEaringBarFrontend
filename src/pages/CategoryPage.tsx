
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { items: products, categories } = useAppSelector((state) => state.products);
  
  // Filter products by category
  const categoryProducts = categoryName
    ? products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase())
    : [];
    
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gold-antique capitalize">
              {categoryName || 'All Products'}
            </h1>
            <div className="w-24 h-1 bg-gold-antique mx-auto"></div>
            <p className="mt-4 text-gold-antique/80">
              Discover our exquisite collection of {categoryName?.toLowerCase()} designed with elegance and crafted with precision.
            </p>
          </header>
          
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gold-antique/80">
                No products found in this category. Please check back later.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
