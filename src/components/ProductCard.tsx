
import React, { useState } from 'react';
import { Heart, Star, Leaf, Eye, ShoppingCart, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [show360View, setShow360View] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

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
    
    setIsAddingToCart(true);
    
    // Create flying animation element
    const cartButton = e.currentTarget as HTMLElement;
    const rect = cartButton.getBoundingClientRect();
    
    // Create flying product element
    const flyingElement = document.createElement('div');
    flyingElement.className = 'fixed z-[9999] pointer-events-none';
    flyingElement.style.left = `${rect.left}px`;
    flyingElement.style.top = `${rect.top}px`;
    flyingElement.style.width = '40px';
    flyingElement.style.height = '40px';
    flyingElement.innerHTML = `
      <div class="w-10 h-10 bg-tree-600 rounded-lg flex items-center justify-center text-white shadow-2xl animate-bounce">
        🛒
      </div>
    `;
    
    document.body.appendChild(flyingElement);
    
    // Animate to cart (top right)
    setTimeout(() => {
      flyingElement.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      flyingElement.style.transform = 'translate(400px, -200px) scale(0.3) rotate(180deg)';
      flyingElement.style.opacity = '0';
    }, 100);
    
    // Remove element after animation
    setTimeout(() => {
      document.body.removeChild(flyingElement);
    }, 1300);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsAddingToCart(false);
    
    toast({
      title: "🛒 Added to Cart!",
      description: `${name} is flying to your cart! ✨`,
      duration: 3000,
    });
  };

  const handle360View = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow360View(!show360View);
    toast({
      title: "360° Product View",
      description: show360View ? "Exiting 360° view" : "Viewing product in 360° - drag to rotate",
      duration: 2000,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "💔 Removed from Wishlist" : "❤️ Added to Wishlist",
      description: isLiked ? "Item removed from your wishlist" : "Item saved for later",
      duration: 2000,
    });
  };

  return (
    <div 
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 cursor-pointer border border-sage-100 hover:border-tree-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-product-id={id}
    >
      {/* Image Container with Enhanced Effects */}
      <div className="relative overflow-hidden h-72 bg-gradient-to-br from-sage-50 to-tree-50">
        <img 
          src={image} 
          alt={name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            show360View 
              ? 'scale-110 rotate-12 filter brightness-110' 
              : 'group-hover:scale-110 group-hover:brightness-105'
          }`}
        />
        
        {/* Enhanced Badges */}
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

        {/* Enhanced Action Buttons */}
        <div className={`absolute top-4 right-4 flex flex-col gap-3 transition-all duration-500 ${
          isHovered ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-6'
        }`}>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/95 hover:bg-white shadow-xl rounded-full w-12 h-12 p-0 backdrop-blur-sm border border-white/50 hover:scale-110 transition-all duration-300"
            onClick={handleWishlist}
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600 hover:text-red-500'
              }`} 
            />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/95 hover:bg-white shadow-xl rounded-full w-12 h-12 p-0 backdrop-blur-sm border border-white/50 hover:scale-110 transition-all duration-300"
            onClick={handle360View}
          >
            <RotateCcw className={`h-5 w-5 text-gray-600 hover:text-tree-600 transition-all duration-500 ${
              show360View ? 'rotate-180 text-tree-600' : ''
            }`} />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/95 hover:bg-white shadow-xl rounded-full w-12 h-12 p-0 backdrop-blur-sm border border-white/50 hover:scale-110 transition-all duration-300"
          >
            <Eye className="h-5 w-5 text-gray-600 hover:text-tree-600 transition-colors" />
          </Button>
        </div>

        {/* Enhanced Sustainability Score */}
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

        {/* 360° View Overlay */}
        {show360View && (
          <div className="absolute inset-0 bg-gradient-to-br from-tree-600/20 to-forest-600/20 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl border border-white/50">
              <span className="text-sm font-bold text-forest-700 flex items-center">
                <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                360° View Active
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Content Section */}
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
