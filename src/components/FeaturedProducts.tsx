
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/features/productsSlice';
import ProductCard from './ProductCard';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedProducts = () => {
  const dispatch = useAppDispatch();
  const { featuredItems, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <p>Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'failed') {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-red-500">Error loading products: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collections</h2>
          <div className="w-24 h-1 bg-gold-antique mx-auto"></div>
          <p className="mt-4 text-lg text-gold-antique/80">Discover our most exquisite pieces</p>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            className="pb-10"
          >
            {featuredItems.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
