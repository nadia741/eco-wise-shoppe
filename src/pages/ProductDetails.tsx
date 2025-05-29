import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, Truck, Shield, Recycle, RotateCcw, Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import OrderSuccessMessage from '@/components/OrderSuccessMessage';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [show360View, setShow360View] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Mock product data
  const product = {
    id: id,
    name: "Eco-Friendly Bamboo Water Bottle",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 156,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop"
    ],
    description: "Made from sustainable bamboo, this water bottle is perfect for eco-conscious individuals. Features double-wall insulation and leak-proof design with a sleek modern aesthetic.",
    features: [
      "100% sustainable bamboo construction",
      "Double-wall insulation keeps drinks cold for 24hrs",
      "Leak-proof design with secure cap",
      "BPA-free and food-grade materials",
      "Lightweight and durable",
      "Easy-grip ergonomic design"
    ],
    sustainability: {
      carbonSaved: "2.5kg CO₂",
      recyclable: true,
      sustainabilityScore: 9.2
    },
    reviewsList: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amazing quality! Love that it's eco-friendly and keeps my drinks cold all day.",
        date: "2024-01-15",
        verified: true
      },
      {
        id: 2,
        name: "Mike Chen",
        rating: 4,
        comment: "Great bottle, very sturdy. The bamboo finish looks beautiful.",
        date: "2024-01-10",
        verified: true
      }
    ]
  };

  const handleAddToCart = async () => {
    // Check if user is signed in (mock check)
    const isSignedIn = false; // This would come from your auth context
    
    if (!isSignedIn) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add items to your cart.",
        duration: 4000,
      });
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate cart animation
    const button = document.querySelector('.add-to-cart-main');
    if (button) {
      button.classList.add('cart-fly-animation');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsAddingToCart(false);
    
    toast({
      title: "Added to Cart! 🛒✨",
      description: `${quantity} x ${product.name} added successfully. Flying to your cart!`,
      duration: 4000,
    });

    // Remove animation class
    setTimeout(() => {
      if (button) {
        button.classList.remove('cart-fly-animation');
      }
    }, 1000);
  };

  const handleBuyNow = () => {
    const isSignedIn = false;
    
    if (!isSignedIn) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to proceed with your order.",
        duration: 4000,
      });
      navigate('/login');
      return;
    }

    // Mock successful order
    setShowOrderSuccess(true);
  };

  const handle360View = () => {
    setShow360View(!show360View);
    toast({
      title: show360View ? "360° View Disabled" : "360° View Enabled",
      description: show360View ? "Back to normal view" : "Drag to rotate the product",
      duration: 2000,
    });
  };

  const relatedProducts = [
    {
      id: "2",
      name: "Organic Cotton Tote Bag",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      rating: 4.6
    },
    {
      id: "3",
      name: "Bamboo Cutlery Set",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
      rating: 4.7
    }
  ];

  if (showOrderSuccess) {
    return (
      <OrderSuccessMessage 
        orderNumber="GW-2024-001"
        customerName="Eco Friend"
        onContinueShopping={() => setShowOrderSuccess(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-xl shadow-eco overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  show360View ? 'scale-110 product-rotate' : ''
                }`}
              />
              
              {/* 360° View Toggle */}
              <Button
                onClick={handle360View}
                className={`absolute top-4 right-4 rounded-full w-12 h-12 p-0 transition-all duration-300 ${
                  show360View ? 'bg-forest-600 text-white view-360-active' : 'bg-white/90 text-forest-600'
                }`}
              >
                <RotateCcw className={`h-5 w-5 ${show360View ? 'animate-spin' : ''}`} />
              </Button>

              {show360View && (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm font-medium text-forest-700">360° View Active</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedImage === index ? 'ring-2 ring-forest-500 shadow-lg' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-outfit font-bold text-forest-700 mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="ml-2 text-forest-600 font-medium">({product.reviews} reviews)</span>
                </div>
                {product.inStock && <Badge className="bg-forest-100 text-forest-700">✅ In Stock</Badge>}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-forest-700">${product.price}</span>
              <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
              <Badge className="bg-coral-100 text-coral-700 text-lg px-3 py-1">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            </div>

            {/* Sustainability Metrics */}
            <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
              <h3 className="font-semibold text-forest-700 mb-4 flex items-center text-lg">
                <Recycle className="h-6 w-6 mr-3 text-forest-600" />
                Environmental Impact
              </h3>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="font-bold text-forest-700 text-xl">{product.sustainability.carbonSaved}</div>
                  <div className="text-sage-600 text-sm">Carbon Saved</div>
                </div>
                <div>
                  <div className="font-bold text-forest-700 text-xl">{product.sustainability.sustainabilityScore}/10</div>
                  <div className="text-sage-600 text-sm">Eco Score</div>
                </div>
                <div>
                  <div className="font-bold text-forest-700 text-xl">✓ 100%</div>
                  <div className="text-sage-600 text-sm">Recyclable</div>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-forest-700">Quantity:</span>
              <div className="flex items-center border border-sage-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-none border-r"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-none border-l"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button 
                  className={`add-to-cart-main flex-1 bg-forest-700 hover:bg-forest-800 text-lg py-6 transition-all duration-300 ${
                    isAddingToCart ? 'animate-pulse' : 'hover:shadow-lg'
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  <ShoppingCart className={`h-5 w-5 mr-2 ${isAddingToCart ? 'animate-bounce' : ''}`} />
                  {isAddingToCart ? 'Adding to Cart...' : `Add ${quantity} to Cart`}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={`border-sage-300 hover:bg-sage-50 w-16 h-16 transition-all duration-300 ${
                    isLiked ? 'bg-coral-50 border-coral-300' : ''
                  }`}
                  onClick={() => {
                    setIsLiked(!isLiked);
                    toast({
                      title: isLiked ? "Removed from Wishlist" : "Added to Wishlist",
                      description: isLiked ? "💔 Item removed" : "❤️ Item saved for later",
                      duration: 2000,
                    });
                  }}
                >
                  <Heart className={`h-6 w-6 transition-all duration-300 ${
                    isLiked ? 'fill-coral text-coral heart-bounce' : 'text-sage-600'
                  }`} />
                </Button>
              </div>
              
              <Button 
                className="w-full bg-tree-600 hover:bg-tree-700 text-white text-lg py-6"
                onClick={handleBuyNow}
              >
                Buy Now - Express Checkout
              </Button>
              
              <div className="flex items-center gap-6 text-sm text-sage-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Free shipping on orders $25+
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  30-day return policy
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-forest-700 mb-4 text-lg">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-forest-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-forest-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-forest-700 mb-3 text-lg">Description</h3>
              <p className="text-forest-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-outfit font-bold text-forest-700 mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviewsList.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-6 shadow-eco">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-forest-700">{review.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-forest-700">{review.name}</div>
                      {review.verified && (
                        <div className="text-xs text-sage-600">✓ Verified Purchase</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-forest-600 mb-2">{review.comment}</p>
                <div className="text-sm text-sage-500">{new Date(review.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-outfit font-bold text-forest-700 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-xl shadow-eco overflow-hidden hover:shadow-eco-lg transition-all duration-300 hover-lift">
                <div className="aspect-square overflow-hidden">
                  <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-forest-700 mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-forest-700">${relatedProduct.price}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-sage-600 ml-1">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
