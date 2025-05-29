
import React from 'react';
import { Leaf, Droplet, Recycle, Sun } from 'lucide-react';

const SustainabilityMetrics = () => {
  const metrics = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Carbon Neutral',
      value: '2.5M kg',
      description: 'CO2 emissions saved',
      color: 'forest',
      bgPattern: 'bg-forest-50',
    },
    {
      icon: <Droplet className="h-8 w-8" />,
      title: 'Water Saved',
      value: '150M L',
      description: 'Through eco-friendly production',
      color: 'sky',
      bgPattern: 'bg-sky/10',
    },
    {
      icon: <Recycle className="h-8 w-8" />,
      title: 'Materials Recycled',
      value: '89%',
      description: 'Of packaging is recyclable',
      color: 'sage',
      bgPattern: 'bg-sage-50',
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: 'Renewable Energy',
      value: '100%',
      description: 'Our operations run on clean energy',
      color: 'coral',
      bgPattern: 'bg-coral/10',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-forest-700 mb-4">
            Our Environmental Impact
          </h2>
          <p className="text-lg text-sage-600 max-w-3xl mx-auto">
            Every purchase you make contributes to a more sustainable future. Here's the positive impact we're creating together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-eco shadow-eco hover:shadow-eco-lg transition-all duration-300 overflow-hidden group hover-lift"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${metric.bgPattern} opacity-50`}></div>
              
              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110 ${
                  metric.color === 'forest' ? 'bg-forest-500 text-white' :
                  metric.color === 'sky' ? 'bg-sky text-white' :
                  metric.color === 'sage' ? 'bg-sage-500 text-white' :
                  'bg-coral text-white'
                }`}>
                  {metric.icon}
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span className="text-3xl font-outfit font-bold text-forest-700">
                    {metric.value}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-outfit font-semibold text-forest-600 mb-2">
                  {metric.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-sage-600">
                  {metric.description}
                </p>

                {/* Animated Border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sage-400 to-forest-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-sage-500 text-white rounded-eco p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-outfit font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-sage-100 mb-6">
              Join our community of eco-conscious consumers and start your sustainable shopping journey today.
            </p>
            <button className="bg-white text-sage-500 hover:bg-cream-100 font-semibold py-3 px-8 rounded-btn transition-colors duration-300">
              Start Shopping Sustainably
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityMetrics;
