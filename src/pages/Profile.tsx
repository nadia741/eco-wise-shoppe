import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Package, 
  TrendingUp, 
  BarChart3, 
  Award, 
  ShoppingBag,
  Leaf,
  Droplets,
  TreePine,
  Star
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Order History');

  const profileData = {
    name: "Eco Enthusiast",
    email: "hellonadia321@gmail.com",
    memberSince: "2023",
    sustainabilityScore: 87,
    goldMember: true,
    loyaltyPoints: 1450
  };

  const statsData = [
    {
      icon: <Package className="h-8 w-8 text-tree-600" />,
      value: "3",
      label: "Total Orders"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-tree-600" />,
      value: "$314.19",
      label: "Total Spent"
    },
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      value: "11.1kg",
      label: "CO₂ Saved"
    },
    {
      icon: <TreePine className="h-8 w-8 text-forest-600" />,
      value: "6",
      label: "Trees Planted"
    }
  ];

  const orderHistory = [
    {
      id: "#GW001234",
      date: "1/15/2024",
      items: [
        { name: "Bamboo Water Bottle", quantity: 1, price: 24.99 },
        { name: "Organic Cotton Tote Bag", quantity: 2, price: 65.00 }
      ],
      total: 89.99,
      status: "delivered",
      impact: { co2: "3.2kg", trees: 2 }
    },
    {
      id: "#GW001235",
      date: "1/8/2024",
      items: [
        { name: "Solar Power Bank", quantity: 1, price: 79.99 },
        { name: "Reusable Food Wraps", quantity: 3, price: 76.77 }
      ],
      total: 156.76,
      status: "delivered",
      impact: { co2: "5.8kg", trees: 3 }
    },
    {
      id: "#GW001236",
      date: "1/2/2024",
      items: [
        { name: "Bamboo Toothbrush Set", quantity: 1, price: 18.99 },
        { name: "Eco-Friendly Cleaners", quantity: 2, price: 48.46 }
      ],
      total: 67.45,
      status: "shipped",
      impact: { co2: "2.1kg", trees: 1 }
    }
  ];

  const tabs = ['Order History', 'Environmental Impact', 'Statistics', 'Certifications'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50/30 to-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        {/* Profile Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-tree-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                <User className="h-12 w-12" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">87%</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-outfit font-bold text-forest-700">
                  {profileData.name}
                </h1>
                {profileData.goldMember && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    <Star className="h-3 w-3 mr-1" />
                    Gold Member
                  </Badge>
                )}
              </div>
              <p className="text-sage-600 mb-2">{profileData.email}</p>
              <div className="flex items-center gap-4 text-sm text-sage-500">
                <span>⭐ {profileData.loyaltyPoints} Points</span>
                <span>Member since {profileData.memberSince}</span>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-forest-700">Sustainability Score</span>
                  <span className="text-2xl font-bold text-tree-600">{profileData.sustainabilityScore}%</span>
                </div>
                <div className="w-full bg-sage-100 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-tree-500 to-forest-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${profileData.sustainabilityScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-sage-200 hover:shadow-lg transition-all duration-300 animate-fade-in-scale">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-outfit font-bold text-forest-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-sage-600 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-tree-600 hover:bg-tree-700 text-white shadow-lg" 
                  : "text-sage-600 hover:bg-tree-50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Order History Tab */}
        {activeTab === 'Order History' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="h-6 w-6 text-forest-700" />
              <h2 className="text-2xl font-outfit font-bold text-forest-700">Order History</h2>
            </div>
            
            {orderHistory.map((order, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-sage-200 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-forest-700 text-lg">
                        Order {order.id}
                      </CardTitle>
                      <p className="text-sage-500 text-sm">{order.date}</p>
                    </div>
                    <Badge 
                      className={`${
                        order.status === 'delivered' 
                          ? 'bg-tree-100 text-tree-700 border-tree-300' 
                          : 'bg-blue-100 text-blue-700 border-blue-300'
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-forest-700">{item.name}</span>
                          <span className="text-sage-500 ml-2">(x{item.quantity})</span>
                        </div>
                        <span className="font-semibold text-forest-700">${item.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-sage-200 mb-4">
                    <span className="font-bold text-forest-700 text-lg">Total: ${order.total}</span>
                    <Button variant="outline" size="sm" className="border-tree-300 text-tree-600 hover:bg-tree-50">
                      View Details
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm bg-tree-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <span>{order.impact.co2} CO₂ saved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TreePine className="h-4 w-4 text-forest-600" />
                      <span>{order.impact.trees} trees planted</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'Order History' && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-outfit font-bold text-forest-700 mb-4">
              {activeTab} Coming Soon
            </h3>
            <p className="text-sage-600">
              We're working on bringing you detailed {activeTab.toLowerCase()} insights.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
