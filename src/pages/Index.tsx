
import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import TestimonialsSection from '@/components/TestimonialsSection';
import SustainabilityMetrics from '@/components/SustainabilityMetrics';
import ImpactSection from '@/components/ImpactSection';
import ProductSources from '@/components/ProductSources';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <HeroSlider />
      <CategoryGrid />
      <FeaturedProducts />
      
      {/* Product Sources Section */}
      <ProductSources />

      <ImpactSection />
      <TestimonialsSection />
      <SustainabilityMetrics />
      <Footer />
    </div>
  );
};

export default Index;
