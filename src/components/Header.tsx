
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, Leaf, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-eco border-b border-sage-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-scale transition-all duration-300">
            <div className={`p-2 rounded-eco transition-all duration-300 ${
              isScrolled ? 'bg-sage-500' : 'bg-sage-500/90 backdrop-blur-sm'
            }`}>
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className={`text-2xl font-outfit font-bold transition-colors duration-300 ${
              isScrolled ? 'text-forest-700' : 'text-white'
            }`}>
              GreenWise
            </span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/products" className={`font-medium transition-colors duration-300 hover:text-sage-500 ${
              isScrolled ? 'text-forest-600' : 'text-white/90'
            }`}>
              Products
            </Link>
            <Link to="/products" className={`font-medium transition-colors duration-300 hover:text-sage-500 ${
              isScrolled ? 'text-forest-600' : 'text-white/90'
            }`}>
              Categories
            </Link>
            <Link to="/about" className={`font-medium transition-colors duration-300 hover:text-sage-500 ${
              isScrolled ? 'text-forest-600' : 'text-white/90'
            }`}>
              Sustainability
            </Link>
            <Link to="/blog" className={`font-medium transition-colors duration-300 hover:text-sage-500 ${
              isScrolled ? 'text-forest-600' : 'text-white/90'
            }`}>
              Blog
            </Link>
            <Link to="/about" className={`font-medium transition-colors duration-300 hover:text-sage-500 ${
              isScrolled ? 'text-forest-600' : 'text-white/90'
            }`}>
              About
            </Link>
          </nav>

          {/* Search Bar */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${
            searchExpanded ? 'w-80' : 'w-64'
          }`}>
            <div className="relative w-full">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${
                isScrolled ? 'text-sage-400' : 'text-sage-300'
              }`} />
              <Input
                type="text"
                placeholder="Search eco-friendly products..."
                className={`pl-10 pr-4 py-2 border-sage-200 focus:border-sage-400 rounded-btn transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-white/90 text-forest-700' 
                    : 'bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 border-white/30'
                }`}
                onFocus={() => setSearchExpanded(true)}
                onBlur={() => setSearchExpanded(false)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search Toggle */}
            <Button 
              variant="ghost" 
              size="sm"
              className={`md:hidden transition-colors duration-300 ${
                isScrolled ? 'text-forest-600 hover:text-sage-500' : 'text-white hover:text-sage-200'
              }`}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="sm"
              className={`hidden sm:flex transition-colors duration-300 ${
                isScrolled ? 'text-forest-600 hover:text-sage-500' : 'text-white hover:text-sage-200'
              }`}
            >
              <Heart className="h-5 w-5" />
            </Button>

            {/* Shopping Cart */}
            <Link to="/cart">
              <Button 
                variant="ghost" 
                size="sm"
                className={`relative transition-colors duration-300 ${
                  isScrolled ? 'text-forest-600 hover:text-sage-500' : 'text-white hover:text-sage-200'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  2
                </span>
              </Button>
            </Link>

            {/* User Account */}
            <Link to="/login">
              <Button 
                variant="ghost" 
                size="sm"
                className={`transition-colors duration-300 ${
                  isScrolled ? 'text-forest-600 hover:text-sage-500' : 'text-white hover:text-sage-200'
                }`}
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm"
              className={`lg:hidden transition-colors duration-300 ${
                isScrolled ? 'text-forest-600 hover:text-sage-500' : 'text-white hover:text-sage-200'
              }`}
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      <div className={`md:hidden border-t transition-all duration-300 ${
        isScrolled 
          ? 'border-sage-100 bg-white/95' 
          : 'border-white/20 bg-white/10 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isScrolled ? 'text-sage-400' : 'text-white/70'
            }`} />
            <Input
              type="text"
              placeholder="Search products..."
              className={`pl-10 pr-4 py-2 w-full rounded-btn transition-all duration-300 ${
                isScrolled 
                  ? 'bg-white border-sage-200 text-forest-700' 
                  : 'bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 border-white/30'
              }`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
