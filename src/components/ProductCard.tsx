
import React, { useState } from 'react';
import { Heart, Star, Leaf, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div 
      className="group bg-white rounded-eco shadow-eco hover:shadow-eco-lg transition-all duration-300 overflow-hidden hover-lift cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-coral text-white font-medium">New</Badge>
          )}
          {isBestseller && (
            <Badge className="bg-sky text-white font-medium">Bestseller</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
        }`}>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white shadow-eco rounded-full w-10 h-10 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isLiked ? 'fill-coral text-coral' : 'text-gray-600'
              }`} 
            />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white shadow-eco rounded-full w-10 h-10 p-0"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Sustainability Score */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
            <Leaf className="h-4 w-4 text-forest-500" />
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getSustainabilityColor(sustainabilityScore)}`}></div>
              <span className="text-sm font-medium text-forest-600">
                {getSustainabilityText(sustainabilityScore)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
          <div className="text-xs text-sage-600 font-medium">
            {carbonFootprint} CO2
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-outfit font-semibold text-forest-700 line-clamp-2 leading-snug">
          {name}
        </h3>

        {/* Certifications */}
        <div className="flex flex-wrap gap-1">
          {certifications.slice(0, 2).map((cert, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs text-sage-600 border-sage-200"
            >
              {cert}
            </Badge>
          ))}
          {certifications.length > 2 && (
            <Badge variant="outline" className="text-xs text-sage-600 border-sage-200">
              +{certifications.length - 2}
            </Badge>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-outfit font-bold text-forest-700">
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
            className="bg-sage-500 hover:bg-sage-600 text-white rounded-btn font-medium transition-all duration-200 hover-scale"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
