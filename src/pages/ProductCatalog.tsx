import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const ProductCatalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Mock products data - expanded from ProductGrid
  const allProducts = [
    {
      id: '1',
      name: 'Organic Cotton Relaxed Fit T-Shirt',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviews: 124,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f3f1"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><circle cx="200" cy="120" r="30" fill="%237C9082"/><text x="200" y="180" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Organic Cotton Tee</text></svg>',
      sustainabilityScore: 95,
      certifications: ['GOTS', 'Fair Trade', 'Carbon Neutral'],
      carbonFootprint: '2.1kg',
      category: 'Clothing',
      isNew: true,
    },
    {
      id: '2',
      name: 'Bamboo Fiber Athletic Wear Set',
      price: 68.00,
      rating: 4.9,
      reviews: 89,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e8f0e9"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><circle cx="200" cy="120" r="30" fill="%23A3C3A7"/><text x="200" y="180" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Bamboo Athletic Set</text></svg>',
      sustainabilityScore: 88,
      certifications: ['OEKO-TEX', 'Cradle to Cradle'],
      carbonFootprint: '3.4kg',
      category: 'Clothing',
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
      category: 'Drinkware',
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
      category: 'Electronics',
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
      category: 'Bags',
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
      category: 'Electronics',
    },
    {
      id: '7',
      name: 'Recycled Aluminum Water Bottle',
      price: 18.99,
      rating: 4.7,
      reviews: 89,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e8f0e9"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><rect x="170" y="80" width="60" height="120" fill="%2381A4CD" rx="8"/><circle cx="200" cy="90" r="8" fill="%23ffffff"/><text x="200" y="230" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Aluminum Bottle</text></svg>',
      sustainabilityScore: 90,
      certifications: ['100% Recycled', 'BPA Free'],
      carbonFootprint: '1.2kg',
      category: 'Drinkware',
    },
    {
      id: '8',
      name: 'Hemp Canvas Backpack',
      price: 75.00,
      rating: 4.6,
      reviews: 156,
      image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f2f0ed"/><rect x="50" y="50" width="300" height="200" fill="%23ffffff" rx="12"/><rect x="120" y="80" width="160" height="140" fill="%238B7355" rx="8"/><rect x="140" y="100" width="120" height="20" fill="%23654F3D"/><text x="200" y="240" text-anchor="middle" fill="%232C5530" font-family="Arial" font-size="14">Hemp Backpack</text></svg>',
      sustainabilityScore: 88,
      certifications: ['Hemp Fiber', 'Durable'],
      carbonFootprint: '4.5kg',
      category: 'Bags',
      isBestseller: true,
    }
  ];

  const categories = ['Clothing', 'Bags', 'Drinkware', 'Electronics', 'Home & Garden', 'Personal Care'];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-outfit font-bold text-forest-700 mb-2">Sustainable Products</h1>
          <p className="text-sage-600">Discover our eco-friendly collection of verified sustainable products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-eco p-6 shadow-eco sticky top-24">
              <h3 className="font-semibold text-forest-700 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-forest-600 mb-2">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  step={5}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-sage-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-forest-600 mb-2">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <span className="text-sm text-forest-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 200]);
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="bg-white rounded-eco p-4 shadow-eco mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>

                  {/* Sort */}
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="flex border rounded-btn overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-sage-100">
                <p className="text-sm text-sage-600">
                  Showing {filteredProducts.length} of {allProducts.length} products
                </p>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 text-center">
              <Button variant="outline" className="mr-4">Previous</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductCatalog;
