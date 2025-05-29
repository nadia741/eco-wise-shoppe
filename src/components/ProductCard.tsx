
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
    if (score >= 90) return 'bg-forest-500';
    if (score >= 70) return 'bg-sage-500';
    return 'bg-earth-500';
  };

  const getSustainabilityText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Fair';
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate cart animation
    const button = document.querySelector(`[data-product-id="${id}"] .add-to-cart-btn`);
    if (button) {
      button.classList.add('animate-bounce');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    setIsAddingToCart(false);
    
    toast({
      title: "Added to Cart! 🛒",
      description: `${name} has been added to your cart successfully.`,
      duration: 3000,
    });

    // Remove animation class
    setTimeout(() => {
      if (button) {
        button.classList.remove('animate-bounce');
      }
    }, 500);
  };

  const handle360View = () => {
    setShow360View(!show360View);
    toast({
      title: "360° View",
      description: show360View ? "Exiting 360° view" : "Viewing product in 360°",
      duration: 2000,
    });
  };

  return (
    <div 
      className="group bg-white rounded-xl shadow-eco hover:shadow-eco-lg transition-all duration-500 overflow-hidden hover-lift cursor-pointer animate-fade-in-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-product-id={id}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img 
          src={image} 
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            show360View ? 'scale-110 rotate-12' : 'group-hover:scale-110'
          }`}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-coral text-white font-medium animate-pulse">New ✨</Badge>
          )}
          {isBestseller && (
            <Badge className="bg-sky text-white font-medium">Bestseller 🔥</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-500 ${
          isHovered ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
        }`}>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/95 hover:bg-white shadow-eco rounded-full w-10 h-10 p-0 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
              toast({
                title: isLiked ? "Removed from Wishlist" : "Added to Wishlist",
                description: isLiked ? "💔 Item removed" : "❤️ Item saved for later",
                duration: 2000,
              });
            }}
          >
            <Heart 
              className={`h-4 w-4 transition-all duration-300 ${
                isLiked ? 'fill-coral text-coral scale-110' : 'text-gray-600'
              }`} 
            />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/95 hover:bg-white shadow-eco rounded-full w-10 h-10 p-0 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              handle360View();
            }}
          >
            <RotateCcw className={`h-4 w-4 text-gray-600 transition-transform duration-500 ${
              show360View ? 'rotate-180' : ''
            }`} />
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/95 hover:bg-white shadow-eco rounded-full w-10 h-10 p-0 backdrop-blur-sm"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Sustainability Score */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-eco">
            <Leaf className="h-4 w-4 text-forest-500" />
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getSustainabilityColor(sustainabilityScore)}`}></div>
              <span className="text-sm font-medium text-forest-600">
                {getSustainabilityText(sustainabilityScore)}
              </span>
            </div>
          </div>
        </div>

        {/* 360° View Indicator */}
        {show360View && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-forest-700">360° View Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
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
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
          <div className="text-xs text-sage-600 font-medium bg-sage-50 px-2 py-1 rounded-full">
            {carbonFootprint} CO₂
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-outfit font-semibold text-forest-700 line-clamp-2 leading-snug text-lg">
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-sage-600 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Certifications */}
        <div className="flex flex-wrap gap-1">
          {certifications.slice(0, 2).map((cert, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs text-sage-600 border-sage-200 bg-sage-50"
            >
              {cert}
            </Badge>
          ))}
          {certifications.length > 2 && (
            <Badge variant="outline" className="text-xs text-sage-600 border-sage-200 bg-sage-50">
              +{certifications.length - 2}
            </Badge>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-outfit font-bold text-forest-700">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <Button 
            size="sm"
            className={`add-to-cart-btn bg-forest-600 hover:bg-forest-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              isAddingToCart ? 'animate-pulse' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={isAddingToCart}
          >
            <ShoppingCart className={`h-4 w-4 mr-1 ${isAddingToCart ? 'animate-spin' : ''}`} />
            {isAddingToCart ? 'Adding...' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
