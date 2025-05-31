import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toast } from 'sonner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Star, ShoppingCart, Heart } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { useGetProductByIdQuery } from '../store/services/productsApi';
import { useGetColorByIdQuery } from '../store/services/colorsApi';
import { selectIsAuthenticated } from '../store/authSlice';
import { useAddToCartMutation } from '../store/services/cartApi';
import { useGetCartQuery } from '../store/services/cartApi';

interface Color {
  id: string;
  productId: string;
  colorId: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

const ColorButton: React.FC<{
  colorId: string;
  isSelected: boolean;
  onSelect: () => void;
  stock: number;
}> = ({ colorId, isSelected, onSelect, stock }) => {
  const { data: colorData, isLoading } = useGetColorByIdQuery(colorId);

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  const color = colorData?.data;

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={onSelect}
        className={`
          w-8 h-8 rounded-full border-2 transition-all duration-200
          ${isSelected ? 'border-gold-antique scale-110' : 'border-transparent scale-100'}
        `}
        style={{
          backgroundColor: color?.hexCode || '#000000',
          boxShadow: isSelected ? '0 0 0 2px rgba(255, 255, 255, 0.9)' : 'none'
        }}
        title={color?.name}
      >
        <span className="sr-only">Select {color?.name}</span>
      </button>
      {isSelected && (
        <span className="text-xs text-gold-antique/70">
          {color?.name}
        </span>
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [addToCartMutation] = useAddToCartMutation();
  const { data: cartData, refetch: refetchCart } = useGetCartQuery();

  const { 
    data: productData, 
    isLoading, 
    error 
  } = useGetProductByIdQuery(id || '');

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (!product) {
      toast.error("Product not found!");
      return;
    }

    if (!selectedColor && product.stock < quantity) {
      toast.error("Not enough stock available!");
      return;
    }

    try {
      const cartItem = {
        productId: product.id,
        colorId: selectedColor?.colorId,
        quantity: quantity
      };

      const response = await addToCartMutation(cartItem).unwrap();

      if (response.status === 200) {
        toast.success("Added to cart successfully!");
        refetchCart(); // Refresh cart data
      }
    } catch (error: any) {
      if (error.status === 401) {
        setShowAuthModal(true);
      } else {
        toast.error(error.data?.message || "Failed to add item to cart");
      }
      console.error('Add to cart error:', error);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    handleAddToCart();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-4">
          <div className="container mx-auto">
            <div className="animate-pulse">
              {/* Add loading skeleton here */}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !productData?.data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-4">
          <div className="container mx-auto text-center py-16">
            <h2 className="text-2xl font-semibold text-red-500">
              Product not found
            </h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const product = productData.data;

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
                      src={image.imageUrl} 
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
                        src={image.imageUrl} 
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
              
              {/* <div className="flex items-center mb-4">
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
              </div> */}
              
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
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gold-antique mb-2">
                    Available Colors
                  </label>
                  <div className="flex gap-4">
                    {product.colors.map((colorOption) => (
                      <ColorButton
                        key={colorOption.id}
                        colorId={colorOption.colorId}
                        isSelected={selectedColor?.id === colorOption.id}
                        onSelect={() => setSelectedColor(colorOption)}
                        stock={colorOption.stock}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="mt-2 text-sm text-gold-antique/70">
                      Available Stock: {selectedColor.stock}
                    </p>
                  )}
                </div>
              )}

              {/* Stock Information */}
              <div className="mb-4">
                <p className="text-sm text-gold-antique/70">
                  {selectedColor 
                    ? `Stock available for selected color: ${selectedColor.stock}`
                    : `Total stock available: ${product.stock}`
                  }
                </p>
              </div>
              
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={
                    (selectedColor && selectedColor.stock < quantity) || 
                    (!selectedColor && product.stock < quantity)
                  }
                  className={`btn-primary flex items-center ${
                    (selectedColor && selectedColor.stock < quantity) || 
                    (!selectedColor && product.stock < quantity)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {(selectedColor && selectedColor.stock < quantity) || 
                   (!selectedColor && product.stock < quantity)
                    ? 'Out of Stock'
                    : 'Add to Cart'
                  }
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
      
      {/* Move AuthModal outside the main content */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default ProductDetail;
