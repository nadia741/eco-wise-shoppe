
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, Truck, Shield, Recycle } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();

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
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect fill='%23A3C3A7' width='400' height='400'/><circle cx='200' cy='200' r='80' fill='%23ffffff'/><text x='200' y='210' text-anchor='middle' fill='%23A3C3A7' font-size='20'>Bamboo Bottle</text></svg>",
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect fill='%237C9082' width='400' height='400'/><circle cx='200' cy='200' r='80' fill='%23ffffff'/><text x='200' y='210' text-anchor='middle' fill='%237C9082' font-size='20'>Side View</text></svg>",
    ],
    description: "Made from sustainable bamboo, this water bottle is perfect for eco-conscious individuals. Features double-wall insulation and leak-proof design.",
    features: [
      "100% sustainable bamboo construction",
      "Double-wall insulation keeps drinks cold for 24hrs",
      "Leak-proof design with secure cap",
      "BPA-free and food-grade materials",
      "Lightweight and durable"
    ],
    sustainability: {
      carbonSaved: "2.5kg CO₂",
      recyclable: true,
      sustainabilityScore: 9.2
    }
  };

  const relatedProducts = [
    {
      id: "2",
      name: "Organic Cotton Tote Bag",
      price: 18.99,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect fill='%23F5F5F0' width='300' height='300'/><rect x='50' y='80' width='200' height='140' fill='%23A3C3A7'/><text x='150' y='155' text-anchor='middle' fill='%23ffffff' font-size='16'>Cotton Bag</text></svg>",
      rating: 4.6
    },
    {
      id: "3",
      name: "Bamboo Cutlery Set",
      price: 15.99,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect fill='%238B7355' width='300' height='300'/><circle cx='150' cy='150' r='60' fill='%23ffffff'/><text x='150' y='155' text-anchor='middle' fill='%238B7355' font-size='14'>Cutlery</text></svg>",
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-eco shadow-eco overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-transparent hover:border-sage-300 cursor-pointer">
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-outfit font-bold text-forest-700 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="ml-2 text-forest-600">({product.reviews} reviews)</span>
                </div>
                {product.inStock && <Badge className="bg-sage-100 text-sage-700">In Stock</Badge>}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-forest-700">${product.price}</span>
              <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
              <Badge className="bg-coral-100 text-coral-700">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
            </div>

            {/* Sustainability Metrics */}
            <div className="bg-sage-50 rounded-eco p-4">
              <h3 className="font-semibold text-forest-700 mb-3 flex items-center">
                <Recycle className="h-5 w-5 mr-2" />
                Environmental Impact
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-forest-700">{product.sustainability.carbonSaved}</div>
                  <div className="text-sage-600">Carbon Saved</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-forest-700">{product.sustainability.sustainabilityScore}/10</div>
                  <div className="text-sage-600">Eco Score</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-sage-700">✓ 100%</div>
                  <div className="text-sage-600">Recyclable</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-forest-700 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-forest-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-forest-700 mb-3">Description</h3>
              <p className="text-forest-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button className="flex-1 bg-forest-700 hover:bg-forest-800">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="border-sage-300 hover:bg-sage-50">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-sage-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  Free shipping on orders $25+
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  30-day return policy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-outfit font-bold text-forest-700 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-eco shadow-eco overflow-hidden hover:shadow-eco-lg transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
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
