
import React, { useState } from 'react';
import { Heart, Star, Leaf, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  sustainabilityScore: number;
  certifications: string[];
  carbonFootprint: string;
  isNew?: boolean;
  isBestseller?: boolean;
  description?: string;
  category?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  sustainabilityScore,
  certifications,
  carbonFootprint,
  isNew = false,
  isBestseller = false,
  description = "",
  category = "",
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  const { addToCart, addToWishlist, wishlistItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isInWishlist = wishlistItems.some(item => item.id === id);

  const getSustainabilityColor = (score: number) => {
    if (score >= 90) return 'bg-tree-500';
    if (score >= 70) return 'bg-forest-500';
    return 'bg-sage-500';
  };

  const getSustainabilityText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Fair';
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Sign Up Required",
        description: "Please sign up or sign in to add items to your cart.",
        duration: 3000,
      });
      navigate('/signup');
      return;
    }
    
    setIsAddingToCart(true);
    
    // Create flying animation element
    const cartButton = e.currentTarget as HTMLElement;
    const rect = cartButton.getBoundingClientRect();
    
    // Create flying product element
    const flyingElement = document.createElement('div');
    flyingElement.className = 'fixed z-[9999] pointer-events-none';
    flyingElement.style.left = `${rect.left}px`;
    flyingElement.style.top = `${rect.top}px`;
    flyingElement.style.width = '60px';
    flyingElement.style.height = '60px';
    flyingElement.innerHTML = `
      <div class="w-15 h-15 bg-tree-600 rounded-lg flex items-center justify-center text-white shadow-2xl">
        <img src="${image}" alt="${name}" class="w-12 h-12 object-cover rounded-lg" />
      </div>
    `;
    
    document.body.appendChild(flyingElement);
    
    // Animate to cart (top right)
    setTimeout(() => {
      flyingElement.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      flyingElement.style.transform = 'translate(500px, -300px) scale(0.2) rotate(360deg)';
      flyingElement.style.opacity = '0';
    }, 100);
    
    // Remove element after animation
    setTimeout(() => {
      document.body.removeChild(flyingElement);
    }, 1600);

    // Add to cart
    addToCart({ id, name, price, image });

    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Sign Up Required",
        description: "Please sign up or sign in to add items to your wishlist.",
        duration: 3000,
      });
      navigate('/signup');
      return;
    }

    if (!isInWishlist) {
      addToWishlist({ id, name, price, image });
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-3 cursor-pointer border border-sage-100 hover:border-tree-300 animate-fade-in-scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
      data-product-id={id}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-72 bg-gradient-to-br from-sage-50 to-tree-50">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-gradient-to-r from-tree-500 to-tree-600 text-white font-semibold px-3 py-1 shadow-lg animate-pulse">
              ✨ New
            </Badge>
          )}
          {isBestseller && (
            <Badge className="bg-gradient-to-r from-coral to-orange-500 text-white font-semibold px-3 py-1 shadow-lg">
              🔥 Bestseller
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`absolute top-4 right-4 flex flex-col gap-3 transition-all duration-500 ${
          isHovered ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-6'
        }`}>
          <Button
            size="sm"
            variant="secondary"
            className={`bg-white/95 hover:bg-white shadow-xl rounded-full w-12 h-12 p-0 backdrop-blur-sm border border-white/50 hover:scale-110 transition-all duration-300 ${
              isInWishlist ? 'bg-red-50' : ''
            }`}
            onClick={handleWishlist}
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                isInWishlist ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600 hover:text-red-500'
              }`} 
            />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/95 hover:bg-white shadow-xl rounded-full w-12 h-12 p-0 backdrop-blur-sm border border-white/50 hover:scale-110 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
          >
            <Eye className="h-5 w-5 text-gray-600 hover:text-tree-600 transition-colors" />
          </Button>
        </div>

        {/* Sustainability Score */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl border border-white/50">
            <Leaf className="h-4 w-4 text-tree-500" />
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getSustainabilityColor(sustainabilityScore)} animate-pulse`}></div>
              <span className="text-sm font-semibold text-forest-700">
                {getSustainabilityText(sustainabilityScore)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Rating and Carbon Footprint */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 transition-colors duration-200 ${
                    i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">({reviews})</span>
          </div>
          <div className="text-xs text-tree-600 font-semibold bg-tree-50 px-3 py-1 rounded-full border border-tree-200">
            {carbonFootprint}
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-outfit font-bold text-forest-700 line-clamp-2 leading-tight text-lg hover:text-tree-600 transition-colors">
          {name}
        </h3>

        {/* Category */}
        {category && (
          <div className="text-sm text-sage-600 font-medium">
            {category}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-sage-600 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Certifications */}
        <div className="flex flex-wrap gap-2">
          {certifications.slice(0, 2).map((cert, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs text-tree-600 border-tree-200 bg-tree-50 hover:bg-tree-100 transition-colors"
            >
              {cert}
            </Badge>
          ))}
          {certifications.length > 2 && (
            <Badge variant="outline" className="text-xs text-tree-600 border-tree-200 bg-tree-50">
              +{certifications.length - 2} more
            </Badge>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-sage-100">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-outfit font-bold text-forest-700">
              ${price}
            </span>
            {originalPrice && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 line-through">
                  ${originalPrice}
                </span>
                <span className="text-xs text-tree-600 font-semibold">
                  Save ${(originalPrice - price).toFixed(2)}
                </span>
              </div>
            )}
          </div>
          <Button 
            size="sm"
            className={`bg-gradient-to-r from-tree-600 to-tree-700 hover:from-tree-700 hover:to-tree-800 text-white rounded-xl font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
              isAddingToCart ? 'animate-pulse scale-95' : ''
            }`}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className={`h-4 w-4 mr-2 ${isAddingToCart ? 'animate-bounce' : ''}`} />
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
