
import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import ProductGrid from '@/components/ProductGrid';
import TestimonialsSection from '@/components/TestimonialsSection';
import SustainabilityMetrics from '@/components/SustainabilityMetrics';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <HeroSlider />
      <ProductGrid />
      <TestimonialsSection />
      <SustainabilityMetrics />
      <Footer />
    </div>
  );
};

export default Index;
