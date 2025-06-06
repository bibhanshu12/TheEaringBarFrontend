import React, { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
// import { fetchProducts } from '../store/features/productsSlice';
import { useNavigate } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../store/services/categoriesApi';

// import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
// import Footer from '../components/Footer';
import FeaturedCategories from '../components/FeaturedCategories';
// import BottomNav from '../components/BottomNav';

const Index = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products for different categories
  const { 
    data: latestProducts, 
    isLoading: isLatestLoading, 
    error: latestError 
  } = useGetProductsByCategoryQuery('3'); // Latest category

  const { 
    data: favouriteProducts, 
    isLoading: isFavouriteLoading, 
    error: favouriteError 
  } = useGetProductsByCategoryQuery('2'); // Favourite category

  // console.log(favouriteProducts?.data)
  useEffect(() => {
    // dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    navigate(`/category/${category.id}`, {
      state: { category }
    });
  };

  return (
    <>
      <section className="relative">
        <HeroSlider />
      </section>

      <div className="mt-16 space-y-16">
        <CategorySection />
        
        <div className="pt-8">
          <FeaturedCategories
            title="Latest Collections"
            subtitle="Explore our newest arrivals"
            products={latestProducts?.data || []}
            isLoading={isLatestLoading}
          />
        </div>

        <div className="pt-4">
          <FeaturedCategories
            title="Customer Favourites"
            subtitle="Our most loved pieces"
            products={favouriteProducts?.data || []}
            isLoading={isFavouriteLoading}
          />
        </div>

        <TestimonialsSection />
        <NewsletterSection />
      </div>
    </>
  );
};

export default Index;
