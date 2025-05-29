
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-eco border-b border-sage-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-sage-500 p-2 rounded-eco">
              <Leaf className="h-6 w-6 text-cream-500" />
            </div>
            <span className="text-2xl font-outfit font-bold text-forest-500">
              GreenWise
            </span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-forest-500 hover:text-sage-500 transition-colors font-medium">
              Products
            </a>
            <a href="#" className="text-forest-500 hover:text-sage-500 transition-colors font-medium">
              Categories
            </a>
            <a href="#" className="text-forest-500 hover:text-sage-500 transition-colors font-medium">
              Sustainability
            </a>
            <a href="#" className="text-forest-500 hover:text-sage-500 transition-colors font-medium">
              Blog
            </a>
            <a href="#" className="text-forest-500 hover:text-sage-500 transition-colors font-medium">
              About
            </a>
          </nav>

          {/* Search Bar */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${
            searchExpanded ? 'w-80' : 'w-64'
          }`}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-400" />
              <Input
                type="text"
                placeholder="Search eco-friendly products..."
                className="pl-10 pr-4 py-2 bg-white/80 border-sage-200 focus:border-sage-400 rounded-btn"
                onFocus={() => setSearchExpanded(true)}
                onBlur={() => setSearchExpanded(false)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden text-forest-500 hover:text-sage-500"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Shopping Cart */}
            <Button 
              variant="ghost" 
              size="sm"
              className="relative text-forest-500 hover:text-sage-500"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>

            {/* User Account */}
            <Button 
              variant="ghost" 
              size="sm"
              className="text-forest-500 hover:text-sage-500"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm"
              className="lg:hidden text-forest-500 hover:text-sage-500"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
