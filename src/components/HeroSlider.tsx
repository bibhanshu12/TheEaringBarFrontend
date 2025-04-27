
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroSlides = [
  {
    id: 1,
    title: 'Elegant Diamond Collection',
    subtitle: 'Timeless beauty for every occasion',
    image: '/images/hero-1.jpg',
    cta: 'Explore Collection',
    path: '/collections/diamond'
  },
  {
    id: 2,
    title: 'Royal Gold Treasures',
    subtitle: 'Handcrafted with precision and care',
    image: '/images/hero-2.jpg',
    cta: 'View Jewelry',
    path: '/category/gold'
  },
  {
    id: 3,
    title: 'Wedding Season Special',
    subtitle: 'Celebrate your love with our exclusive collection',
    image: '/images/hero-3.jpg',
    cta: 'Shop Now',
    path: '/collections/wedding'
  },
];

const HeroSlider = () => {
  return (
    <section className="w-full h-screen relative overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                <div className="container mx-auto max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90">
                    {slide.subtitle}
                  </p>
                  <a 
                    href={slide.path}
                    className="btn-primary inline-block"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
