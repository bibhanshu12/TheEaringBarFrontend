import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../store/features/cartSlice';
import { useAppDispatch } from '../store/hooks';
import { Product } from '../store/features/productsSlice';
import { ShoppingCart, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    }));
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleViewProduct}
      className="group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Badges */}
      {product.featured && (
        <span className="absolute top-3 left-3 z-10 bg-gold-standard text-black text-xs px-2 py-1 rounded-sm font-semibold">
          Featured
        </span>
      )}
      {product.new && (
        <span className="absolute top-3 left-3 z-10 bg-gold-bronze text-white text-xs px-2 py-1 rounded-sm font-semibold">
          New
        </span>
      )}
      
      {/* Product Image */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={product.images?.[0]?.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Quick actions overlay */}
      <div className="absolute inset-0 bg-black/0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 group-hover:bg-black/20 transition-all duration-300">
        <button 
          onClick={handleAddToCart}
          className="bg-gold-standard hover:bg-gold-harvest text-black rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          aria-label="Add to cart"
        >
          <ShoppingCart size={20} />
        </button>
        <button 
          onClick={handleViewProduct}
          className="bg-white hover:bg-gold-light text-gold-antique rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          aria-label="View details"
        >
          <Eye size={20} />
        </button>
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-gold-antique group-hover:text-gold-bronze transition-colors">
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl text-gold-bronze">
            रू.<span className="font-bold">{product.price.toLocaleString()}</span>
          </span>
          
          {product.rating && (
            <div className="flex items-center">
              <Star className="text-gold-standard fill-gold-standard" size={14} />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2 px-4 bg-gold-antique text-white rounded-md hover:bg-gold-bronze transition-colors duration-300 flex items-center justify-center gap-2"
          disabled={!product.stock}
        >
          <ShoppingCart size={16} />
          {product.stock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
