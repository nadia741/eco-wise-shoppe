
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "Sustainable Fashion",
      description: "Discover our latest eco-friendly summer collection with organic materials",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'><rect width='800' height='400' fill='%23e8f0e9'/><rect x='100' y='100' width='600' height='200' fill='%23ffffff' rx='12'/><circle cx='400' cy='200' r='50' fill='%237C9082'/><text x='400' y='320' text-anchor='middle' fill='%232C5530' font-family='Arial' font-size='24'>Summer Collection</text></svg>",
      cta: "Shop Now",
      ctaLink: "/products"
    },
    {
      id: 2,
      title: "Limited Time Offer",
      subtitle: "50% Off Selected Items",
      description: "Save big on our eco-conscious products. Limited time only!",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'><rect width='800' height='400' fill='%23f2f0ed'/><rect x='100' y='100' width='600' height='200' fill='%23ffffff' rx='12'/><text x='400' y='180' text-anchor='middle' fill='%23FF8A5C' font-family='Arial' font-size='48' font-weight='bold'>50% OFF</text><text x='400' y='220' text-anchor='middle' fill='%232C5530' font-family='Arial' font-size='18'>Limited Time</text></svg>",
      cta: "Shop Sale",
      ctaLink: "/products?sale=true"
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Fresh & Sustainable",
      description: "Check out our newest additions to the sustainable product lineup",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'><rect width='800' height='400' fill='%23f0f3f1'/><rect x='100' y='100' width='600' height='200' fill='%23ffffff' rx='12'/><rect x='250' y='140' width='100' height='120' fill='%23A3C3A7' rx='8'/><rect x='450' y='140' width='100' height='120' fill='%238B7355' rx='8'/><text x='400' y='320' text-anchor='middle' fill='%232C5530' font-family='Arial' font-size='20'>New Arrivals</text></svg>",
      cta: "Explore",
      ctaLink: "/products?new=true"
    },
    {
      id: 4,
      title: "Eco-Friendly Living",
      subtitle: "Make a Difference",
      description: "Join the sustainable living movement with our certified eco products",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'><rect width='800' height='400' fill='%23e8f0e9'/><rect x='100' y='100' width='600' height='200' fill='%23ffffff' rx='12'/><circle cx='350' cy='200' r='25' fill='%23forest-500'/><circle cx='450' cy='200' r='25' fill='%23sage-500'/><path d='M375,200 Q400,180 425,200' stroke='%23FF8A5C' stroke-width='3' fill='none'/><text x='400' y='320' text-anchor='middle' fill='%232C5530' font-family='Arial' font-size='18'>Eco-Friendly Living</text></svg>",
      cta: "Learn More",
      ctaLink: "/about"
    },
    {
      id: 5,
      title: "Free Shipping",
      subtitle: "On Orders Over $75",
      description: "Get free shipping on all sustainable products with orders over $75",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'><rect width='800' height='400' fill='%23fefefe'/><rect x='100' y='100' width='600' height='200' fill='%23ffffff' rx='12'/><rect x='300' y='160' width='200' height='80' fill='%2381A4CD' rx='8'/><circle cx='330' cy='250' r='15' fill='%23000000'/><circle cx='470' cy='250' r='15' fill='%23000000'/><text x='400' y='320' text-anchor='middle' fill='%232C5530' font-family='Arial' font-size='18'>Free Shipping</text></svg>",
      cta: "Shop Now",
      ctaLink: "/products"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-to-r from-sage-100 to-cream-100">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="grid md:grid-cols-2 h-full items-center container mx-auto px-4">
              {/* Content */}
              <div className="space-y-6 z-10 relative">
                <div className="space-y-2">
                  <p className="text-sage-600 font-medium text-sm md:text-base">{slide.subtitle}</p>
                  <h1 className="text-3xl md:text-5xl font-outfit font-bold text-forest-700">{slide.title}</h1>
                  <p className="text-lg text-sage-600 max-w-md">{slide.description}</p>
                </div>
                <Button 
                  size="lg"
                  className="bg-sage-500 hover:bg-sage-600 text-white font-semibold px-8 py-4 rounded-btn shadow-eco-lg hover-lift"
                  onClick={() => window.location.href = slide.ctaLink}
                >
                  {slide.cta}
                </Button>
              </div>
              {/* Image */}
              <div className="hidden md:block">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-eco"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-forest-500 p-2 rounded-full shadow-eco transition-all z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-forest-500 p-2 rounded-full shadow-eco transition-all z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-sage-500' : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
