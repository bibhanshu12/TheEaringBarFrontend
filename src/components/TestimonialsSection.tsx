
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Anjali Karn',
    testimonial: 'The quality of the diamond ring I purchased exceeded all my expectations. The craftsmanship is superb and the customer service was exceptional.',
    rating: 5,
    image: '/images/testimonial-1.jpg',
    product: 'Diamond Eternity Ring'
  },
  {
    id: 2,
    name: 'Rahul Karn',
    testimonial: "I bought a necklace for my wife's anniversary and she absolutely loved it. The packaging was elegant and the delivery was surprisingly fast.",
    rating: 5,
    image: '/images/testimonial-2.jpg',
    product: 'Pearl Necklace'
  },
  {
    id: 3,
    name: 'Pryanshi Karn',
    testimonial: 'Gold Luxe Emporium has become my go-to jewelry store. Their designs are unique and the prices are reasonable for the quality you receive.',
    rating: 4,
    image: '/images/testimonial-3.jpg',
    product: 'Sapphire Earrings'
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gold-pale/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Testimonials</h2>
          <div className="w-24 h-1 bg-gold-antique mx-auto"></div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gold-antique">{testimonial.name}</h4>
                    <p className="text-sm text-gold-bronze">{testimonial.product}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`${i < testimonial.rating ? 'text-gold-standard fill-gold-standard' : 'text-gray-300'}`}
                      size={16}
                    />
                  ))}
                </div>
                
                <blockquote className="text-gold-antique/80 flex-grow">
                  "{testimonial.testimonial}"
                </blockquote>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
