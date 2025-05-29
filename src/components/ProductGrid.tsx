
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  // Mock product data
  const products = [
    {
      id: '1',
      name: 'Organic Cotton Relaxed Fit T-Shirt',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviews: 124,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f3f1"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><circle cx="200" cy="120" r="30" fill="%237C9082"/><text x="200" y="180" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Organic Cotton Tee</text><path d="M100,220 Q200,200 300,220" stroke="%23FF8A5C" stroke-width="3" fill="none"/></svg>',
      sustainabilityScore: 95,
      certifications: ['GOTS', 'Fair Trade', 'Carbon Neutral'],
      carbonFootprint: '2.1kg',
      isNew: true,
    },
    {
      id: '2',
      name: 'Bamboo Fiber Athletic Wear Set',
      price: 68.00,
      rating: 4.9,
      reviews: 89,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e8f0e9"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><circle cx="200" cy="120" r="30" fill="%23A3C3A7"/><text x="200" y="180" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Bamboo Athletic Set</text><path d="M100,220 Q200,200 300,220" stroke="%2381A4CD" stroke-width="3" fill="none"/></svg>',
      sustainabilityScore: 88,
      certifications: ['OEKO-TEX', 'Cradle to Cradle'],
      carbonFootprint: '3.4kg',
      isBestseller: true,
    },
    {
      id: '3',
      name: 'Recycled Plastic Water Bottle - 750ml',
      price: 15.50,
      originalPrice: 22.00,
      rating: 4.6,
      reviews: 256,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f2f0ed"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><rect x="170" y="80" width="60" height="120" fill="%2381A4CD" rx="8"/><circle cx="200" cy="90" r="8" fill="%23ffffff"/><text x="200" y="230" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Recycled Bottle</text></svg>',
      sustainabilityScore: 92,
      certifications: ['100% Recycled', 'BPA Free'],
      carbonFootprint: '0.8kg',
    },
    {
      id: '4',
      name: 'Solar-Powered Portable Charger',
      price: 45.99,
      rating: 4.7,
      reviews: 178,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23fefefe"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><rect x="120" y="90" width="160" height="100" fill="%23000000" rx="8"/><rect x="140" y="110" width="120" height="60" fill="%232C5530" rx="4"/><circle cx="200" cy="140" r="10" fill="%23FF8A5C"/><text x="200" y="220" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Solar Charger</text></svg>',
      sustainabilityScore: 85,
      certifications: ['Energy Star', 'RoHS'],
      carbonFootprint: '5.2kg',
      isNew: true,
    },
    {
      id: '5',
      name: 'Upcycled Denim Messenger Bag',
      price: 89.00,
      rating: 4.8,
      reviews: 67,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f3f1"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><rect x="100" y="100" width="200" height="120" fill="%238B7355" rx="8"/><rect x="120" y="120" width="160" height="20" fill="%23654F3D"/><circle cx="150" cy="160" r="6" fill="%23FF8A5C"/><text x="200" y="240" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Upcycled Bag</text></svg>',
      sustainabilityScore: 90,
      certifications: ['Upcycled', 'Vegan'],
      carbonFootprint: '1.9kg',
      isBestseller: true,
    },
    {
      id: '6',
      name: 'Biodegradable Phone Case - iPhone',
      price: 32.99,
      rating: 4.5,
      reviews: 203,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e8f0e9"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><rect x="150" y="80" width="100" height="140" fill="%237C9082" rx="12"/><circle cx="200" cy="100" r="8" fill="%23000000"/><rect x="160" y="200" width="80" height="4" fill="%23000000" rx="2"/><text x="200" y="240" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Bio Phone Case</text></svg>',
      sustainabilityScore: 87,
      certifications: ['Compostable', 'Plant-Based'],
      carbonFootprint: '0.6kg',
    }
  ];

  return (
    <section className="py-16 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-forest-700 mb-4">
            Featured Eco Products
          </h2>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Discover our curated collection of sustainable products that make a positive impact on the planet
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-sage-500 hover:bg-sage-600 text-white font-semibold py-3 px-8 rounded-btn shadow-eco hover-lift transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
