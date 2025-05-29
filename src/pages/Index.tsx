
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import SustainabilityMetrics from '@/components/SustainabilityMetrics';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <Hero />
      <ProductGrid />
      <SustainabilityMetrics />
      <Footer />
    </div>
  );
};

export default Index;
