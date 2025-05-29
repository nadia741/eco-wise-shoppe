
import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronDown, Leaf, Recycle, Globe, Heart, Rabbit } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const ProductCatalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);

  // Enhanced product data with more categories and details
  const allProducts = [
    {
      id: '1',
      name: 'Organic Cotton Relaxed Fit T-Shirt',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      sustainabilityScore: 95,
      certifications: ['GOTS', 'Fair Trade', 'Carbon Neutral'],
      carbonFootprint: '2.1kg',
      category: 'Clothing',
      isNew: true,
      description: 'Soft, breathable organic cotton t-shirt made from sustainably sourced materials.',
    },
    {
      id: '2',
      name: 'Bamboo Fiber Athletic Wear Set',
      price: 68.00,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1506629905138-c3d9db2cd4b0?w=400&h=400&fit=crop',
      sustainabilityScore: 88,
      certifications: ['OEKO-TEX', 'Cradle to Cradle'],
      carbonFootprint: '3.4kg',
      category: 'Clothing',
      isBestseller: true,
      description: 'Moisture-wicking bamboo athletic wear for eco-conscious fitness enthusiasts.',
    },
    {
      id: '3',
      name: 'Recycled Plastic Water Bottle - 750ml',
      price: 15.50,
      originalPrice: 22.00,
      rating: 4.6,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
      sustainabilityScore: 92,
      certifications: ['100% Recycled', 'BPA Free'],
      carbonFootprint: '0.8kg',
      category: 'Drinkware',
      description: 'Durable water bottle made from 100% recycled ocean plastic.',
    },
    {
      id: '4',
      name: 'Organic Dog Toy Set',
      price: 32.99,
      rating: 4.7,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
      sustainabilityScore: 85,
      certifications: ['Organic', 'Non-Toxic'],
      carbonFootprint: '1.2kg',
      category: 'Pet Care',
      description: 'Safe, organic toys for your furry friends made from natural hemp.',
    },
    {
      id: '5',
      name: 'Bamboo Kitchen Utensil Set',
      price: 28.00,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      sustainabilityScore: 90,
      certifications: ['FSC Certified', 'Plastic-Free'],
      carbonFootprint: '1.5kg',
      category: 'Home & Garden',
      description: 'Complete bamboo kitchen set including spatulas, spoons, and tongs.',
    },
    {
      id: '6',
      name: 'Natural Shampoo Bar',
      price: 18.99,
      rating: 4.5,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      sustainabilityScore: 87,
      certifications: ['Cruelty-Free', 'Vegan'],
      carbonFootprint: '0.3kg',
      category: 'Personal Care',
      description: 'Zero-waste shampoo bar with natural ingredients for healthy hair.',
    },
    {
      id: '7',
      name: 'Upcycled Canvas Tote Bag',
      price: 35.00,
      rating: 4.6,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      sustainabilityScore: 88,
      certifications: ['Upcycled', 'Fair Trade'],
      carbonFootprint: '2.1kg',
      category: 'Bags',
      description: 'Stylish tote bag made from upcycled canvas with reinforced handles.',
    },
    {
      id: '8',
      name: 'Organic Baby Care Kit',
      price: 45.99,
      rating: 4.9,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
      sustainabilityScore: 95,
      certifications: ['Organic', 'Hypoallergenic'],
      carbonFootprint: '1.8kg',
      category: 'Child Care',
      isNew: true,
      description: 'Complete organic baby care set with lotions, soaps, and toys.',
    }
  ];

  const categories = [
    { name: 'Clothing', icon: '👕', count: 2 },
    { name: 'Bags', icon: '👜', count: 1 },
    { name: 'Drinkware', icon: '🥤', count: 1 },
    { name: 'Pet Care', icon: '🐕', count: 1 },
    { name: 'Home & Garden', icon: '🏡', count: 1 },
    { name: 'Personal Care', icon: '🧴', count: 1 },
    { name: 'Child Care', icon: '👶', count: 1 }
  ];

  const quickFilters = [
    { name: 'Organic', icon: <Leaf className="h-4 w-4" />, key: 'Organic' },
    { name: 'Plastic-Free', icon: <Recycle className="h-4 w-4" />, key: 'Plastic-Free' },
    { name: 'Fair Trade', icon: <Globe className="h-4 w-4" />, key: 'Fair Trade' },
    { name: 'Cruelty-Free', icon: <Rabbit className="h-4 w-4" />, key: 'Cruelty-Free' },
    { name: 'Carbon Neutral', icon: <Globe className="h-4 w-4" />, key: 'Carbon Neutral' }
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesCertifications = selectedCertifications.length === 0 || 
                                 selectedCertifications.some(cert => product.certifications.includes(cert));
    
    return matchesSearch && matchesPrice && matchesCategory && matchesCertifications;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleCertificationChange = (certification: string, checked: boolean) => {
    if (checked) {
      setSelectedCertifications([...selectedCertifications, certification]);
    } else {
      setSelectedCertifications(selectedCertifications.filter(c => c !== certification));
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Enhanced Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-outfit font-bold text-forest-700 mb-4">
            Sustainable Products Marketplace
          </h1>
          <p className="text-lg text-sage-600 max-w-3xl mx-auto mb-6">
            Discover eco-friendly products that make a positive impact on our planet
          </p>
          
          {/* Smart Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-400" />
              <Input
                type="text"
                placeholder="Search for... soaps, clothes, bags, toys, home decor"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-sage-200 focus:border-forest-500 rounded-xl"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {quickFilters.map((filter) => (
              <Button
                key={filter.key}
                variant={selectedCertifications.includes(filter.key) ? "default" : "outline"}
                onClick={() => handleCertificationChange(filter.key, !selectedCertifications.includes(filter.key))}
                className="bg-forest-600 hover:bg-forest-700 text-white border-forest-600"
              >
                {filter.icon}
                <span className="ml-2">{filter.name}</span>
              </Button>
            ))}
          </div>

          {/* Category Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => handleCategoryChange(category.name, !selectedCategories.includes(category.name))}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedCategories.includes(category.name)
                    ? 'border-forest-500 bg-forest-50 shadow-md'
                    : 'border-sage-200 bg-white hover:border-sage-300'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-forest-700 text-sm">{category.name}</div>
                <div className="text-xs text-sage-500">{category.count} items</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 shadow-eco sticky top-24">
              <h3 className="font-semibold text-forest-700 mb-6 text-lg">Refine Your Search</h3>
              
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-medium text-forest-600 mb-4 flex items-center">
                  💰 Price Range
                </h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  step={5}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-sage-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-medium text-forest-600 mb-4 flex items-center">
                  📂 Categories
                </h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.name} className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                      />
                      <span className="text-sm text-forest-600 flex-1">{category.icon} {category.name}</span>
                      <Badge variant="outline" className="text-xs">{category.count}</Badge>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-8">
                <h4 className="font-medium text-forest-600 mb-4 flex items-center">
                  🏆 Certifications
                </h4>
                <div className="space-y-3">
                  {quickFilters.map((filter) => (
                    <label key={filter.key} className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox
                        checked={selectedCertifications.includes(filter.key)}
                        onCheckedChange={(checked) => handleCertificationChange(filter.key, checked as boolean)}
                      />
                      <span className="text-sm text-forest-600 flex items-center">
                        {filter.icon}
                        <span className="ml-2">{filter.name}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full border-forest-600 text-forest-600 hover:bg-forest-50"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedCertifications([]);
                  setPriceRange([0, 200]);
                  setSearchQuery('');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="bg-white rounded-xl p-4 shadow-eco mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    className="lg:hidden border-forest-600 text-forest-600"
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
                      <SelectItem value="eco-score">Best Eco Score</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="flex border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none bg-forest-600 hover:bg-forest-700"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-none bg-forest-600 hover:bg-forest-700"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-sage-100">
                <p className="text-sm text-sage-600">
                  Showing {filteredProducts.length} of {allProducts.length} eco-friendly products
                </p>
                {(selectedCategories.length > 0 || selectedCertifications.length > 0) && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCategories.map(category => (
                      <Badge key={category} variant="secondary" className="bg-forest-100 text-forest-700">
                        {category}
                        <button 
                          onClick={() => handleCategoryChange(category, false)}
                          className="ml-2 hover:text-forest-900"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedCertifications.map(cert => (
                      <Badge key={cert} variant="secondary" className="bg-sage-100 text-sage-700">
                        {cert}
                        <button 
                          onClick={() => handleCertificationChange(cert, false)}
                          className="ml-2 hover:text-sage-900"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-forest-700 mb-2">No products found</h3>
                <p className="text-sage-600 mb-6">Try adjusting your filters or search terms</p>
                <Button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedCertifications([]);
                    setPriceRange([0, 200]);
                    setSearchQuery('');
                  }}
                  className="bg-forest-600 hover:bg-forest-700"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 text-center">
                <Button variant="outline" className="mr-4 border-forest-600 text-forest-600">
                  Previous
                </Button>
                <Button variant="outline" className="border-forest-600 text-forest-600">
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductCatalog;
