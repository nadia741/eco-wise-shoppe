
import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import FeaturedProducts from '@/components/FeaturedProducts';
import TestimonialsSection from '@/components/TestimonialsSection';
import SustainabilityMetrics from '@/components/SustainabilityMetrics';
import ImpactSection from '@/components/ImpactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <HeroSlider />
      <FeaturedProducts />
      <ImpactSection />
      <TestimonialsSection />
      <SustainabilityMetrics />
      <Footer />
    </div>
  );
};

export default Index;
