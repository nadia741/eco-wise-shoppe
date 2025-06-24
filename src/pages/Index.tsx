
import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import TestimonialsSection from '@/components/TestimonialsSection';
import SustainabilityMetrics from '@/components/SustainabilityMetrics';
import ImpactSection from '@/components/ImpactSection';
import EcoRecommendations from '@/components/EcoRecommendations';
import RealTimeImpactTracker from '@/components/RealTimeImpactTracker';
import CommunityEcoChallenges from '@/components/CommunityEcoChallenges';
import CarbonOffsetMarketplace from '@/components/CarbonOffsetMarketplace';
import SustainabilityCalculator from '@/components/SustainabilityCalculator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <HeroSlider />
      <CategoryGrid />
      <FeaturedProducts />
      
      {/* New Eco Features Section */}
      <section className="py-16 bg-gradient-to-br from-sage-50 to-tree-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-outfit font-bold text-forest-700 mb-4">
              Advanced Eco Features
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Discover AI-powered recommendations, track your real-time impact, join community challenges, and more
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <EcoRecommendations />
            <RealTimeImpactTracker />
          </div>
          
          <div className="mb-8">
            <CommunityEcoChallenges />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CarbonOffsetMarketplace />
            <SustainabilityCalculator />
          </div>
        </div>
      </section>

      <ImpactSection />
      <TestimonialsSection />
      <SustainabilityMetrics />
      <Footer />
    </div>
  );
};

export default Index;
