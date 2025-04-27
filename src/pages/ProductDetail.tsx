
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/features/cartSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Star, ShoppingCart, Heart } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items: products } = useAppSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-4">
          <div className="container mx-auto text-center py-16">
            <h2 className="text-2xl font-semibold">Product not found</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                className="rounded-lg overflow-hidden"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={image} 
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-96 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="product-thumbs"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="cursor-pointer rounded-md overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            {/* Product Info */}
            <div className="lg:pl-8">
              {product.new && (
                <span className="inline-block bg-gold-bronze text-white text-xs px-2 py-1 rounded-sm font-semibold mb-2">
                  New Arrival
                </span>
              )}
              
              <h1 className="text-3xl font-bold text-gold-antique mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                {product.rating && (
                  <>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`${i < Math.floor(product.rating) ? 'text-gold-standard fill-gold-standard' : 'text-gray-300'}`}
                          size={16}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gold-antique/70">({product.rating})</span>
                  </>
                )}
              </div>
              
              <div className="text-2xl font-bold text-gold-bronze mb-6">
                ${product.price.toLocaleString()}
              </div>
              
              <p className="text-gold-antique/80 mb-6">
                {product.description}
              </p>
              
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gold-antique mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1 border border-gold-antique text-gold-antique rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center py-1 border-t border-b border-gold-antique text-gold-antique"
                  />
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-3 py-1 border border-gold-antique text-gold-antique rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  className="btn-primary flex items-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </button>
                <button className="btn-secondary flex items-center">
                  <Heart size={18} className="mr-2" />
                  Wishlist
                </button>
              </div>
              
              <div className="border-t border-gold-antique/30 pt-6">
                <div className="flex flex-wrap gap-y-4">
                  <div className="w-full md:w-1/2">
                    <h4 className="font-semibold text-gold-antique mb-1">Materials</h4>
                    <p className="text-gold-antique/70 text-sm">18K Gold, Diamonds</p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h4 className="font-semibold text-gold-antique mb-1">Dimensions</h4>
                    <p className="text-gold-antique/70 text-sm">Width: 5mm</p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h4 className="font-semibold text-gold-antique mb-1">SKU</h4>
                    <p className="text-gold-antique/70 text-sm">JW-{product.id}-GLE</p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h4 className="font-semibold text-gold-antique mb-1">Category</h4>
                    <p className="text-gold-antique/70 text-sm">{product.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
