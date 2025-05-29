import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { ShoppingCart, ChevronDown, Menu, X, Search } from 'lucide-react';
import { useGetAllCategoriesQuery } from '../store/services/categoriesApi';

const Navbar = () => {
  const { totalItems } = useAppSelector((state) => state.cart);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Fetch categories
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-custom">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          {/* Left - Search Icon */}
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gold-antique hover:text-gold-bronze transition-colors"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Center - Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold gold-gradient-text">THE EARING BAR</h1>
            </Link>
          </div>

          {/* Right - Cart */}
          <div className="flex-1 flex justify-end">
            <Link to="/cart" className="text-gold-antique hover:text-gold-bronze transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-standard text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6 py-2">
          <Link to="/" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">
            Home
          </Link>
          
          {/* Dynamic Categories Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gold-antique hover:text-gold-bronze font-medium transition-colors">
              Category <ChevronDown size={16} className="ml-1" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {isCategoriesLoading ? (
                <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
              ) : categoriesData?.data?.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="block px-4 py-2 text-sm text-gold-antique hover:bg-gold-light transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/products" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">
            All Jewellery
          </Link>
          <Link to="/fresh-drops" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">
            Fresh Drops
          </Link>
          <Link to="/gift-boxes" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">
            Gift Boxes
          </Link>
          <Link to="/couple-sets" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">
            Couple Sets
          </Link>
        </nav>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button 
          className="md:hidden absolute top-4 left-4 text-gold-antique"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 z-30 animate-fade-in">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for jewelry..." 
                className="w-full p-2 border border-gold-antique rounded-md focus:outline-none focus:ring-1 focus:ring-gold-bronze"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gold-antique hover:text-gold-bronze">
                <Search size={18} />
              </button>
            </div>
          </div>
        )}
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white animate-fade-in">
            <div className="container-custom py-6">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold gold-gradient-text">GOLD LUXE EMPORIUM</h1>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gold-antique"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                <Link to="/" className="text-xl text-gold-antique hover:text-gold-bronze font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                
                {/* Dynamic Categories in Mobile Menu */}
                <div>
                  <h3 className="text-xl text-gold-antique mb-2 font-medium">Categories</h3>
                  <div className="pl-4 flex flex-col space-y-2">
                    {isCategoriesLoading ? (
                      <div className="text-gray-500">Loading...</div>
                    ) : categoriesData?.data?.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="text-gold-antique hover:text-gold-bronze transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link to="/collections" className="text-xl text-gold-antique hover:text-gold-bronze font-medium" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
                <Link to="/about" className="text-xl text-gold-antique hover:text-gold-bronze font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link to="/contact" className="text-xl text-gold-antique hover:text-gold-bronze font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
