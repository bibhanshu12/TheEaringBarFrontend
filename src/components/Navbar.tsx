
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { ShoppingCart, ChevronDown, Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const { totalItems } = useAppSelector((state) => state.cart);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        <div className="flex items-center justify-between">
          {/* Mobile Menu Icon */}
          <button 
            className="md:hidden text-gold-antique"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold gold-gradient-text">THE EARING BAR</h1>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">Home</Link>
            <div className="relative group">
              <button className="flex items-center text-gold-antique hover:text-gold-bronze font-medium transition-colors">
                Jewelry <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/category/rings" className="block px-4 py-2 text-sm text-gold-antique hover:bg-gold-light">Rings</Link>
                <Link to="/category/necklaces" className="block px-4 py-2 text-sm text-gold-antique hover:bg-gold-light">Necklaces</Link>
                <Link to="/category/earrings" className="block px-4 py-2 text-sm text-gold-antique hover:bg-gold-light">Earrings</Link>
                <Link to="/category/bracelets" className="block px-4 py-2 text-sm text-gold-antique hover:bg-gold-light">Bracelets</Link>
              </div>
            </div>
            <Link to="/collections" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">Collections</Link>
            <Link to="/about" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">About</Link>
            <Link to="/contact" className="text-gold-antique hover:text-gold-bronze font-medium transition-colors">Contact</Link>
          </nav>
          
          {/* Right Menu/Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gold-antique hover:text-gold-bronze transition-colors"
            >
              <Search size={20} />
            </button>
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
                <Link to="/" className="text-xl text-gold-antique hover:text-gold-bronze font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <div>
                  <h3 className="text-xl text-gold-antique mb-2 font-medium">Jewelry</h3>
                  <div className="pl-4 flex flex-col space-y-2">
                    <Link to="/category/rings" className="text-gold-antique hover:text-gold-bronze" onClick={() => setIsMobileMenuOpen(false)}>Rings</Link>
                    <Link to="/category/necklaces" className="text-gold-antique hover:text-gold-bronze" onClick={() => setIsMobileMenuOpen(false)}>Necklaces</Link>
                    <Link to="/category/earrings" className="text-gold-antique hover:text-gold-bronze" onClick={() => setIsMobileMenuOpen(false)}>Earrings</Link>
                    <Link to="/category/bracelets" className="text-gold-antique hover:text-gold-bronze" onClick={() => setIsMobileMenuOpen(false)}>Bracelets</Link>
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
