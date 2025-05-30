import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronDown, Leaf, Recycle, Globe, Heart, Rabbit, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [sortBy, setSortBy] = useState('featured');

  // Enhanced product data with real images and detailed information
  const allProducts = [
    {
      id: '1',
      name: 'Organic Cotton Premium T-Shirt',
      price: 28.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 95,
      certifications: ['GOTS Certified', 'Fair Trade', 'Carbon Neutral'],
      carbonFootprint: '2.1kg CO₂ saved',
      category: 'Clothing',
      isNew: true,
      description: 'Ultra-soft organic cotton tee made from sustainably grown cotton. Perfect for everyday wear with a conscience.',
    },
    {
      id: '2',
      name: 'Bamboo Fiber Athletic Wear Set',
      price: 78.00,
      rating: 4.9,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1506629905138-c3d9db2cd4b0?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 88,
      certifications: ['OEKO-TEX Standard', 'Cradle to Cradle'],
      carbonFootprint: '3.4kg CO₂ saved',
      category: 'Clothing',
      isBestseller: true,
      description: 'Moisture-wicking bamboo fiber activewear that keeps you cool and comfortable during workouts.',
    },
    {
      id: '3',
      name: 'Insulated Stainless Steel Water Bottle',
      price: 32.50,
      originalPrice: 45.00,
      rating: 4.7,
      reviews: 512,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 92,
      certifications: ['BPA-Free', '100% Recyclable'],
      carbonFootprint: '0.8kg CO₂ saved',
      category: 'Drinkware',
      description: 'Double-wall vacuum insulation keeps drinks cold for 24hrs or hot for 12hrs. Made from premium stainless steel.',
    },
    {
      id: '4',
      name: 'Natural Hemp Rope Dog Toy',
      price: 16.99,
      rating: 4.6,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 85,
      certifications: ['100% Natural', 'Non-Toxic'],
      carbonFootprint: '0.5kg CO₂ saved',
      category: 'Pet Care',
      description: 'Durable hemp rope toy that\'s safe for pets and biodegradable. Hours of eco-friendly fun for your furry friend.',
    },
    {
      id: '5',
      name: 'Bamboo Kitchen Utensil Set',
      price: 34.00,
      rating: 4.8,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 90,
      certifications: ['FSC Certified', 'Plastic-Free'],
      carbonFootprint: '1.2kg CO₂ saved',
      category: 'Home & Garden',
      description: 'Complete 6-piece bamboo kitchen set including spatulas, spoons, and serving utensils. Naturally antimicrobial.',
    },
    {
      id: '6',
      name: 'Zero Waste Shampoo Bar',
      price: 14.99,
      rating: 4.5,
      reviews: 445,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 87,
      certifications: ['Cruelty-Free', 'Vegan', 'Plastic-Free'],
      carbonFootprint: '0.2kg CO₂ saved',
      category: 'Personal Care',
      description: 'Concentrated shampoo bar with natural ingredients. One bar equals 2-3 bottles of liquid shampoo.',
    },
    {
      id: '7',
      name: 'Recycled Canvas Weekend Tote',
      price: 42.00,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 88,
      certifications: ['Recycled Materials', 'Fair Trade'],
      carbonFootprint: '1.8kg CO₂ saved',
      category: 'Bags',
      description: 'Spacious tote bag made from recycled canvas with reinforced handles. Perfect for shopping or travel.',
    },
    {
      id: '8',
      name: 'Organic Baby Care Essential Kit',
      price: 52.99,
      rating: 4.9,
      reviews: 123,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop&auto=format',
      sustainabilityScore: 95,
      certifications: ['USDA Organic', 'Hypoallergenic'],
      carbonFootprint: '1.1kg CO₂ saved',
      category: 'Child Care',
      isNew: true,
      description: 'Complete organic baby care set with gentle lotions, soaps, and accessories. Safe for sensitive skin.',
    }
  ];

  const categories = [
    { name: 'Clothing', icon: '👕', count: 2, color: 'bg-tree-100 text-tree-700' },
    { name: 'Bags', icon: '👜', count: 1, color: 'bg-forest-100 text-forest-700' },
    { name: 'Drinkware', icon: '🥤', count: 1, color: 'bg-sage-100 text-sage-700' },
    { name: 'Pet Care', icon: '🐕', count: 1, color: 'bg-earth-100 text-earth-700' },
    { name: 'Home & Garden', icon: '🏡', count: 1, color: 'bg-tree-100 text-tree-700' },
    { name: 'Personal Care', icon: '🧴', count: 1, color: 'bg-forest-100 text-forest-700' },
    { name: 'Child Care', icon: '👶', count: 1, color: 'bg-sage-100 text-sage-700' }
  ];

  const quickFilters = [
    { name: 'Organic', icon: <Leaf className="h-4 w-4" />, key: 'Organic', color: 'bg-tree-600' },
    { name: 'Plastic-Free', icon: <Recycle className="h-4 w-4" />, key: 'Plastic-Free', color: 'bg-forest-600' },
    { name: 'Fair Trade', icon: <Globe className="h-4 w-4" />, key: 'Fair Trade', color: 'bg-tree-600' },
    { name: 'Cruelty-Free', icon: <Rabbit className="h-4 w-4" />, key: 'Cruelty-Free', color: 'bg-forest-600' },
    { name: 'Carbon Neutral', icon: <Globe className="h-4 w-4" />, key: 'Carbon Neutral', color: 'bg-tree-600' }
  ];

  // Enhanced filtering logic
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.certifications.some(cert => cert.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesCertifications = selectedCertifications.length === 0 || 
                                   selectedCertifications.some(cert => 
                                     product.certifications.some(productCert => productCert.includes(cert))
                                   );
      
      return matchesSearch && matchesPrice && matchesCategory && matchesCertifications;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'eco-score':
        filtered.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [searchQuery, priceRange, selectedCategories, selectedCertifications, sortBy]);

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

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedCertifications([]);
    setPriceRange([0, 200]);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Professional Hero Section */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-tree-600/5 via-forest-600/5 to-tree-600/5 rounded-3xl -z-10"></div>
          <div className="py-12">
            <div className="inline-flex items-center gap-2 bg-tree-100 text-tree-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <span className="w-2 h-2 bg-tree-500 rounded-full animate-pulse"></span>
              Sustainable Marketplace
            </div>
            <h1 className="text-5xl font-outfit font-bold text-forest-700 mb-6 leading-tight">
              Discover Eco-Friendly Products
              <span className="block text-tree-600 text-4xl">That Make a Difference</span>
            </h1>
            <p className="text-xl text-sage-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Shop consciously with our curated collection of sustainable products. Every purchase supports a healthier planet and ethical businesses.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-sage-400 group-focus-within:text-tree-600 transition-colors" />
                <Input
                  type="text"
                  placeholder="Search for sustainable products... organic soaps, bamboo clothing, eco-friendly bags"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-6 py-4 text-lg border-2 border-sage-200 focus:border-tree-500 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sage-400 hover:text-tree-600"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={selectedCertifications.some(cert => cert.includes(filter.key)) ? "default" : "outline"}
                  onClick={() => handleCertificationChange(filter.key, !selectedCertifications.some(cert => cert.includes(filter.key)))}
                  className={`${selectedCertifications.some(cert => cert.includes(filter.key)) ? filter.color + ' text-white hover:opacity-90' : 'border-tree-200 text-tree-700 hover:bg-tree-50'} transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105`}
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
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                    selectedCategories.includes(category.name)
                      ? 'border-tree-500 bg-tree-50 shadow-lg scale-105'
                      : 'border-sage-200 bg-white/80 hover:border-tree-300 backdrop-blur-sm'
                  }`}
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <div className="font-semibold text-forest-700 text-sm mb-1">{category.name}</div>
                  <div className="text-xs text-sage-500">{category.count} items</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-sage-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-forest-700 text-xl flex items-center">
                  <SlidersHorizontal className="h-6 w-6 mr-3 text-tree-600" />
                  Refine Search
                </h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-sage-600 hover:text-tree-600">
                  Clear All
                </Button>
              </div>
              
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold text-forest-600 mb-4 flex items-center text-lg">
                  💰 Price Range
                </h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  step={5}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-sage-600 font-medium">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-forest-600 mb-4 flex items-center text-lg">
                  📂 Categories
                </h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.name} className="flex items-center space-x-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
                        className="data-[state=checked]:bg-tree-600 data-[state=checked]:border-tree-600"
                      />
                      <span className="text-sm text-forest-600 flex-1 group-hover:text-tree-600 transition-colors">
                        {category.icon} {category.name}
                      </span>
                      <Badge variant="outline" className="text-xs border-sage-300 text-sage-600">{category.count}</Badge>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-8">
                <h4 className="font-semibold text-forest-600 mb-4 flex items-center text-lg">
                  🏆 Certifications
                </h4>
                <div className="space-y-3">
                  {quickFilters.map((filter) => (
                    <label key={filter.key} className="flex items-center space-x-3 cursor-pointer group">
                      <Checkbox
                        checked={selectedCertifications.some(cert => cert.includes(filter.key))}
                        onCheckedChange={(checked) => handleCertificationChange(filter.key, checked as boolean)}
                        className="data-[state=checked]:bg-tree-600 data-[state=checked]:border-tree-600"
                      />
                      <span className="text-sm text-forest-600 flex items-center group-hover:text-tree-600 transition-colors">
                        {filter.icon}
                        <span className="ml-2">{filter.name}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-sage-100 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    className="lg:hidden border-tree-600 text-tree-600 hover:bg-tree-50"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-52 border-sage-300 focus:border-tree-500">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">✨ Featured</SelectItem>
                      <SelectItem value="price-low">💰 Price: Low to High</SelectItem>
                      <SelectItem value="price-high">💰 Price: High to Low</SelectItem>
                      <SelectItem value="rating">⭐ Highest Rated</SelectItem>
                      <SelectItem value="newest">🆕 Newest</SelectItem>
                      <SelectItem value="eco-score">🌱 Best Eco Score</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="flex border border-sage-300 rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`rounded-none ${viewMode === 'grid' ? 'bg-tree-600 hover:bg-tree-700' : 'hover:bg-sage-50'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`rounded-none ${viewMode === 'list' ? 'bg-tree-600 hover:bg-tree-700' : 'hover:bg-sage-50'}`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results and Active Filters */}
              <div className="mt-6 pt-4 border-t border-sage-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-sage-600 font-medium">
                    Showing <span className="font-bold text-forest-700">{filteredProducts.length}</span> of {allProducts.length} sustainable products
                  </p>
                  {searchQuery && (
                    <Badge variant="secondary" className="bg-tree-100 text-tree-700">
                      Search: "{searchQuery}"
                    </Badge>
                  )}
                </div>
                {(selectedCategories.length > 0 || selectedCertifications.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(category => (
                      <Badge key={category} variant="secondary" className="bg-forest-100 text-forest-700 hover:bg-forest-200 transition-colors">
                        {category}
                        <button 
                          onClick={() => handleCategoryChange(category, false)}
                          className="ml-2 hover:text-forest-900 transition-colors"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedCertifications.map(cert => (
                      <Badge key={cert} variant="secondary" className="bg-sage-100 text-sage-700 hover:bg-sage-200 transition-colors">
                        {cert}
                        <button 
                          onClick={() => handleCertificationChange(cert, false)}
                          className="ml-2 hover:text-sage-900 transition-colors"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
            }>
              {filteredProducts.map((product, index) => (
                <Link key={product.id} to={`/products/${product.id}`} className="block">
                  <div 
                    className="animate-fade-in-up hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard {...product} />
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🌱</div>
                <h3 className="text-3xl font-outfit font-bold text-forest-700 mb-4">No products found</h3>
                <p className="text-sage-600 mb-8 text-lg max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <Button 
                  onClick={clearAllFilters}
                  className="bg-tree-600 hover:bg-tree-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Clear All Filters & Start Fresh
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 text-center">
                <div className="flex justify-center gap-4">
                  <Button variant="outline" className="border-tree-600 text-tree-600 hover:bg-tree-50 px-6 py-3">
                    ← Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="default" className="bg-tree-600 hover:bg-tree-700 w-10 h-10">1</Button>
                    <Button variant="outline" className="border-sage-300 text-sage-600 w-10 h-10">2</Button>
                    <Button variant="outline" className="border-sage-300 text-sage-600 w-10 h-10">3</Button>
                  </div>
                  <Button variant="outline" className="border-tree-600 text-tree-600 hover:bg-tree-50 px-6 py-3">
                    Next →
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="mt-20 bg-gradient-to-r from-tree-600 to-forest-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-outfit font-bold mb-8">Our Collective Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">2.5M+</div>
              <div className="text-tree-100">kg CO₂ Saved</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-tree-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">{allProducts.length}</div>
              <div className="text-tree-100">Eco Products</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-tree-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductCatalog;
