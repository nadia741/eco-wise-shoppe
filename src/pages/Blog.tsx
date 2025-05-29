
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, User } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: "1",
      title: "10 Ways to Reduce Your Carbon Footprint at Home",
      excerpt: "Simple changes you can make today to live more sustainably and help protect our planet for future generations.",
      author: "Sarah Green",
      date: "January 15, 2024",
      category: "Sustainability",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'><rect fill='%23A3C3A7' width='400' height='200'/><circle cx='200' cy='100' r='40' fill='%23ffffff'/><text x='200' y='105' text-anchor='middle' fill='%23A3C3A7' font-size='12'>Eco Home</text></svg>",
      readTime: "5 min read"
    },
    {
      id: "2",
      title: "The Rise of Sustainable Fashion: What You Need to Know",
      excerpt: "Explore the growing movement towards eco-friendly clothing and how you can build a sustainable wardrobe.",
      author: "Mike Chen",
      date: "January 12, 2024",
      category: "Fashion",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'><rect fill='%237C9082' width='400' height='200'/><circle cx='200' cy='100' r='40' fill='%23ffffff'/><text x='200' y='105' text-anchor='middle' fill='%237C9082' font-size='12'>Fashion</text></svg>",
      readTime: "7 min read"
    },
    {
      id: "3",
      title: "Zero Waste Kitchen: Tips for Reducing Food Waste",
      excerpt: "Learn practical strategies to minimize food waste and create a more sustainable kitchen environment.",
      author: "Emily Davis",
      date: "January 10, 2024",
      category: "Kitchen",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'><rect fill='%238B7355' width='400' height='200'/><circle cx='200' cy='100' r='40' fill='%23ffffff'/><text x='200' y='105' text-anchor='middle' fill='%238B7355' font-size='12'>Kitchen</text></svg>",
      readTime: "6 min read"
    }
  ];

  const categories = ["All", "Sustainability", "Fashion", "Kitchen", "Technology", "Lifestyle"];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-outfit font-bold text-forest-700 mb-4">
            Sustainable Living Blog
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Discover tips, insights, and inspiration for living a more sustainable lifestyle
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-sage-400" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10"
              />
            </div>
            <Button className="bg-forest-700 hover:bg-forest-800 md:w-auto">
              Search
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category === "All" ? "bg-forest-700 hover:bg-forest-800" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-eco shadow-eco overflow-hidden hover:shadow-eco-lg transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-sage-500">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-outfit font-bold text-forest-700 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-sage-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-sage-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className="text-sage-600 hover:text-forest-700 font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-sage-300 hover:bg-sage-50">
              Load More Articles
            </Button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto mt-16 bg-sage-50 rounded-eco p-8 text-center">
          <h3 className="text-2xl font-outfit font-bold text-forest-700 mb-4">
            Stay Updated
          </h3>
          <p className="text-sage-600 mb-6">
            Get the latest sustainability tips and eco-friendly product recommendations delivered to your inbox.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button className="bg-forest-700 hover:bg-forest-800">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
