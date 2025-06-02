import { Link, useLocation } from 'react-router-dom';
import { Package, ShoppingBag, Sparkles } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gold-pale md:hidden z-40">
      <div className="flex items-center justify-around py-2">
        <Link 
          to="/products" 
          className={`flex flex-col items-center p-2 ${
            location.pathname === '/products' 
              ? 'text-gold-bronze' 
              : 'text-gold-antique'
          }`}
        >
          <ShoppingBag size={24} />
          <span className="text-xs mt-1">All Jewellery</span>
        </Link>

        <Link 
          to="/orders" 
          className={`flex flex-col items-center p-2 ${
            location.pathname === '/orders' 
              ? 'text-gold-bronze' 
              : 'text-gold-antique'
          }`}
        >
          <Package size={24} />
          <span className="text-xs mt-1">Orders</span>
        </Link>

        <Link 
          to="/fresh-drops" 
          className={`flex flex-col items-center p-2 ${
            location.pathname === '/fresh-drops' 
              ? 'text-gold-bronze' 
              : 'text-gold-antique'
          }`}
        >
          <Sparkles size={24} />
          <span className="text-xs mt-1">Fresh Drops</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;