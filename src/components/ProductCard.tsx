
import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/features/cartSlice';
import { useAppDispatch } from '../store/hooks';
import { Product } from '../store/features/productsSlice';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    }));
  };

  return (
    <div className="group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Badge */}
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
      <Link to={`/product/${product.id}`}>
        <div className="relative h-60 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      
      {/* Quick actions overlay */}
      <div className="absolute inset-0 bg-black/0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black/20 transition-all duration-300">
        <button 
          onClick={handleAddToCart}
          className="bg-gold-standard hover:bg-gold-harvest text-black rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-1 text-gold-antique hover:text-gold-bronze transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gold-bronze">
            ${product.price.toLocaleString()}
          </span>
          
          {product.rating && (
            <div className="flex items-center">
              <Star className="text-gold-standard fill-gold-standard" size={14} />
              <span className="ml-1 text-sm">{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
