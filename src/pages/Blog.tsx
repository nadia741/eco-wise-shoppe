
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, User, Clock } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const posts = [
    {
      id: "1",
      title: "10 Simple Ways to Reduce Your Carbon Footprint at Home",
      excerpt: "Discover practical, everyday changes that can significantly reduce your environmental impact without compromising your lifestyle.",
      author: "Sarah Green",
      date: "January 15, 2024",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop&auto=format",
      readTime: "5 min read"
    },
    {
      id: "2",
      title: "The Complete Guide to Sustainable Fashion in 2024",
      excerpt: "Everything you need to know about building an eco-friendly wardrobe that looks great and supports ethical brands.",
      author: "Mike Chen",
      date: "January 12, 2024",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop&auto=format",
      readTime: "8 min read"
    },
    {
      id: "3",
      title: "Zero Waste Kitchen: Transform Your Cooking Space",
      excerpt: "Learn how to minimize food waste, choose sustainable kitchen tools, and create delicious meals with minimal environmental impact.",
      author: "Emily Davis",
      date: "January 10, 2024",
      category: "Kitchen",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop&auto=format",
      readTime: "6 min read"
    },
    {
      id: "4",
      title: "Plastic-Free Living: A Beginner's Complete Guide",
      excerpt: "Start your plastic-free journey with these actionable tips and sustainable alternatives for everyday items.",
      author: "Alex Rivera",
      date: "January 8, 2024",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1569163139851-1de1c0ce4313?w=500&h=300&fit=crop&auto=format",
      readTime: "7 min read"
    },
    {
      id: "5",
      title: "Sustainable Baby Care: Safe Products for Your Little One",
      excerpt: "Navigate the world of eco-friendly baby products with our comprehensive guide to safe, sustainable childcare essentials.",
      author: "Dr. Jessica Park",
      date: "January 5, 2024",
      category: "Baby Care",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=300&fit=crop&auto=format",
      readTime: "9 min read"
    },
    {
      id: "6",
      title: "Green Technology: Solar Solutions for Modern Homes",
      excerpt: "Explore the latest in solar technology and how renewable energy can power your sustainable lifestyle.",
      author: "Thomas Wright",
      date: "January 3, 2024",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=300&fit=crop&auto=format",
      readTime: "10 min read"
    }
  ];

  const categories = ["All", "Sustainability", "Fashion", "Kitchen", "Lifestyle", "Baby Care", "Technology"];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50/30 to-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        {/* Enhanced Blog Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-tree-100 text-tree-700 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-tree-500 rounded-full animate-pulse"></span>
            Sustainable Living Blog
          </div>
          <h1 className="text-5xl font-outfit font-bold text-forest-700 mb-6">
            Learn, Inspire,
            <span className="block text-tree-600">Make a Difference</span>
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Discover expert tips, inspiring stories, and practical guides for living a more sustainable lifestyle
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-tree-100">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-4 h-5 w-5 text-sage-400" />
                <Input 
                  placeholder="Search articles, tips, and guides..." 
                  className="pl-12 py-4 text-lg border-sage-200 focus:border-tree-400 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-tree-600 hover:bg-tree-700 px-8 py-4 rounded-xl font-semibold shadow-lg md:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    category === selectedCategory 
                      ? "bg-tree-600 hover:bg-tree-700 text-white shadow-lg" 
                      : "border-tree-200 text-tree-600 hover:bg-tree-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Blog Posts Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article 
                key={post.id} 
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-tree-100 animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 bg-tree-100 text-tree-700 text-sm rounded-full font-semibold">
                      {post.category}
                    </span>
                    <div className="flex items-center text-sage-500 text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-outfit font-bold text-forest-700 mb-4 line-clamp-2 group-hover:text-tree-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-sage-600 mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-sage-500 mb-6 pb-4 border-b border-sage-100">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-tree-600 hover:text-tree-700 font-semibold transition-colors group"
                  >
                    Read Full Article
                    <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button 
              variant="outline" 
              className="border-tree-300 hover:bg-tree-50 text-tree-600 px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              Load More Articles
            </Button>
          </div>
        </div>

        {/* Enhanced Newsletter Signup */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-gradient-to-r from-tree-600 to-forest-600 rounded-3xl p-12 text-white text-center shadow-2xl">
            <h3 className="text-3xl font-outfit font-bold mb-4">
              Join Our Eco-Conscious Community
            </h3>
            <p className="text-tree-100 mb-8 text-lg max-w-2xl mx-auto">
              Get weekly sustainability tips, exclusive eco-product recommendations, and inspiring stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input 
                placeholder="Enter your email address" 
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-tree-100 backdrop-blur-sm rounded-xl py-4"
              />
              <Button className="bg-white text-tree-600 hover:bg-cream-50 font-semibold px-8 py-4 rounded-xl shadow-lg">
                Subscribe
              </Button>
            </div>
            <p className="text-tree-100 text-sm mt-4">
              Join 10,000+ eco-warriors already subscribed. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
