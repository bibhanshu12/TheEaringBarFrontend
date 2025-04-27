
import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { fetchProducts } from '../store/features/productsSlice';

import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Index = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSlider />
        <CategorySection />
        <FeaturedProducts />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
