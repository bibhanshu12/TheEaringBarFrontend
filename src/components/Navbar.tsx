import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { ShoppingCart, ChevronDown, Menu, X, Search, Package } from 'lucide-react';
import { useGetAllCategoriesQuery } from '../store/services/categoriesApi';
import { useGetCartQuery } from '../store/services/cartApi';
import { useDebounce } from '../hooks/debounceHook';
import { SearchResults } from './searchComponent';

const Navbar = () => {
  const { data: cartData } = useGetCartQuery();
  const cartItemsCount = cartData?.getCartItems?.length || 0;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  // Update the searchInput constant to include onSearch prop
  const searchInput = (
    <form onSubmit={handleSearchSubmit} className="relative">
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for jewelry..." 
        className="w-full p-2 border border-gold-antique rounded-md focus:outline-none focus:ring-1 focus:ring-gold-bronze"
      />
      <button 
        type="button"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gold-antique hover:text-gold-bronze"
        onClick={() => setSearchTerm('')}
      >
        {searchTerm ? <X size={18} /> : <Search size={18} />}
      </button>
      
      {/* Search Results Dropdown */}
      {isSearchOpen && searchTerm && !isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg mt-1 z-50">
          <SearchResults 
            searchTerm={debouncedSearchTerm}
            onSearch={(term) => {
              navigate(`/search?q=${encodeURIComponent(term)}`);
              setIsSearchOpen(false);
              setSearchTerm('');
            }}
            onClose={() => {
              setIsSearchOpen(false);
              setSearchTerm('');
            }}
          />
        </div>
      )}
    </form>
  );

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent  '}`}>
      <div className="container-custom">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          {/* Left - Search Icon */}
          <div className="flex-1 flex pt-5 justify-start">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gold-antique hover:text-gold-bronze transition-colors"
            >
              <Search size={30} />
            </button>
          </div>

          {/* Center - Logo */}
          <div className="flex-2 flex justify-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold gold-gradient-text">THE EARRING BAR</h1>
            </Link>
          </div>

          {/* Right - Cart and Orders */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <Link 
              to="/orders" 
              className="text-gold-antique hover:text-gold-bronze transition-colors"
            >
              <Package size={24} />
            </Link>
            <Link to="/cart" className="text-gold-antique hover:text-gold-bronze transition-colors relative">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-standard text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItemsCount}
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
          {/* <Link to="/gift-boxes" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">
            Gift Boxes
          </Link> */}
          {/* <Link to="/couple-sets" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">
            Couple Sets
          </Link> */}
        </nav>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button 
          className="md:hidden absolute top-4 left-4 text-gold-antique"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            if (!isMobileMenuOpen) {
              setIsSearchOpen(false);
            }
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 z-30 animate-fade-in">
            {searchInput}
          </div>
        )}
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white animate-fade-in overflow-y-auto">
            <div className="container-custom py-6">
              {/* Mobile Header */}
              <div className="flex justify-between items-center mb-8">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <h1 className="text-2xl font-bold gold-gradient-text">THE EARING BAR</h1>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gold-antique hover:text-gold-bronze"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
                {searchInput}
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col">
                <Link 
                  to="/" 
                  className="py-3 border-b border-gold-antique/10 text-gold-antique hover:text-gold-bronze"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                {/* Categories Section */}
                <div className="py-3 border-b border-gold-antique/10">
                  <div className="flex items-center justify-between text-gold-antique mb-2">
                    <span>Categories</span>
                    <ChevronDown size={16} />
                  </div>
                  <div className="pl-4 space-y-2 mt-2">
                    {isCategoriesLoading ? (
                      <div className="text-sm text-gray-500">Loading...</div>
                    ) : categoriesData?.data?.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="block py-2 text-gold-antique/80 hover:text-gold-bronze"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Main Navigation Items */}
                <Link 
                  to="/products" 
                  className="py-3 border-b border-gold-antique/10 text-gold-antique hover:text-gold-bronze"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Jewellery
                </Link>
                <Link 
                  to="/fresh-drops" 
                  className="py-3 border-b border-gold-antique/10 text-gold-antique hover:text-gold-bronze"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Fresh Drops
                </Link>
                <Link 
                  to="/gift-boxes" 
                  className="py-3 border-b border-gold-antique/10 text-gold-antique hover:text-gold-bronze"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gift Boxes
                </Link>
                <Link 
                  to="/couple-sets" 
                  className="py-3 border-b border-gold-antique/10 text-gold-antique hover:text-gold-bronze"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Couple Sets
                </Link>

                {/* Cart Link for Mobile */}
                <Link 
                  to="/cart" 
                  className="mt-4 flex items-center justify-between py-3 px-4 bg-gold-light rounded-md text-gold-antique hover:bg-gold-light/80"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <ShoppingCart size={20} className="mr-2" />
                    Cart
                  </span>
                  {cartItemsCount > 0 && (
                    <span className="bg-gold-standard text-black text-xs px-2 py-1 rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
