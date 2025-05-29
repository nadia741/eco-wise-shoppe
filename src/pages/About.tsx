
import React from 'react';
import { Leaf, Users, Award, Target, Heart, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Green",
      role: "CEO & Founder",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'><circle cx='75' cy='75' r='75' fill='%237C9082'/><circle cx='75' cy='60' r='25' fill='%23ffffff'/><path d='M30,120 Q75,100 120,120 L120,150 L30,150 Z' fill='%23ffffff'/></svg>",
      bio: "Environmental scientist turned entrepreneur with 10+ years of sustainability experience."
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'><circle cx='75' cy='75' r='75' fill='%238B7355'/><circle cx='75' cy='60' r='25' fill='%23ffffff'/><path d='M30,120 Q75,100 120,120 L120,150 L30,150 Z' fill='%23ffffff'/></svg>",
      bio: "Tech innovator focused on building scalable platforms for environmental impact."
    },
    {
      name: "Emily Davis",
      role: "Head of Sustainability",
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'><circle cx='75' cy='75' r='75' fill='%23A3C3A7'/><circle cx='75' cy='60' r='25' fill='%23ffffff'/><path d='M30,120 Q75,100 120,120 L120,150 L30,150 Z' fill='%23ffffff'/></svg>",
      bio: "Sustainability expert ensuring all our products meet the highest eco standards."
    }
  ];

  const achievements = [
    { icon: Users, number: "50,000+", label: "Happy Customers" },
    { icon: Leaf, number: "2.5M kg", label: "CO2 Saved" },
    { icon: Award, number: "15+", label: "Sustainability Awards" },
    { icon: Globe, number: "25", label: "Countries Served" }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-sage-500 to-forest-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-outfit font-bold mb-6">
              About GreenWise
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make sustainable living accessible, affordable, and rewarding for everyone.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-outfit font-bold text-forest-700 mb-6">Our Mission</h2>
                <p className="text-lg text-sage-600 mb-6">
                  At GreenWise, we believe that every purchase is a vote for the kind of world we want to live in. 
                  That's why we've created a platform that makes it easy to find and purchase products that are 
                  good for you and good for the planet.
                </p>
                <p className="text-lg text-sage-600">
                  We rigorously vet every product in our catalog to ensure it meets our high standards for 
                  sustainability, quality, and ethical production.
                </p>
              </div>
              <div className="bg-sage-100 rounded-eco p-8 text-center">
                <Target className="h-16 w-16 text-sage-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-forest-700 mb-2">Our Goal</h3>
                <p className="text-sage-600">
                  To save 10 million kg of CO2 by 2025 through sustainable commerce
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-outfit font-bold text-forest-700 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-sage-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-forest-700 mb-2">Sustainability First</h3>
                <p className="text-sage-600">
                  Every decision we make is evaluated through the lens of environmental impact.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-coral rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-forest-700 mb-2">Transparency</h3>
                <p className="text-sage-600">
                  We believe in complete transparency about our products' origins and impact.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-sky rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-forest-700 mb-2">Community</h3>
                <p className="text-sage-600">
                  Building a community of conscious consumers making a positive impact together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-outfit font-bold text-forest-700 text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-forest-700 mb-1">{member.name}</h3>
                  <p className="text-sage-500 font-medium mb-3">{member.role}</p>
                  <p className="text-sage-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-forest-500 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-outfit font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <achievement.icon className="h-12 w-12 mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">{achievement.number}</div>
                  <div className="text-cream-200">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-outfit font-bold text-forest-700 mb-6">Get In Touch</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold text-forest-700 mb-2">Visit Us</h3>
                <p className="text-sage-600">
                  123 Green Street<br />
                  Portland, OR 97201<br />
                  United States
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-forest-700 mb-2">Contact</h3>
                <p className="text-sage-600">
                  hello@greenwise.com<br />
                  (555) 123-4567<br />
                  Mon-Fri 9AM-6PM PST
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-forest-700 mb-2">Business Hours</h3>
                <p className="text-sage-600">
                  Monday - Friday: 9AM - 6PM<br />
                  Saturday: 10AM - 4PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
