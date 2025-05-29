import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/features/productsSlice';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid } from 'swiper/modules';
import { Skeleton } from './ui/Skeleton';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { Product } from '@/models/type';

interface FeaturedCategoriesProps {
  title: string;
  subtitle?: string;
  products?:Product; // Replace with your Product type
  isLoading: boolean;
  error?: string;
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  title,
  subtitle = 'Discover our most exquisite pieces',
  products = [],
  isLoading,
  error
}) => {
  const dispatch = useAppDispatch();
  const { featuredItems, status, error: fetchError } = useAppSelector((state) => state.products);

//   console.log(products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (isLoading || status === 'loading') {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || status === 'failed') {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-red-500">Error loading products: {error || fetchError}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <div className="w-24 h-1 bg-gold-antique mx-auto"></div>
          <p className="mt-4 text-lg text-gold-antique/80">{subtitle}</p>
        </div>

        {/* Desktop and Tablet Swiper */}
        <div className="hidden md:block">
          <Swiper
            modules={[Navigation, Pagination, Grid]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerGroup={4}
            slidesPerView={4}
            grid={{
              rows: 1,
              fill: 'row'
            }}
            className="py-4"
            breakpoints={{
              // when window width is >= 768px (md)
              768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              // when window width is >= 1024px (lg)
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              }
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
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

export default FeaturedCategories;
