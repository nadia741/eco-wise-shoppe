
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, Heart, Settings, Award } from 'lucide-react';

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "January 2024",
    totalOrders: 12,
    carbonSaved: "45.2kg CO₂",
    ecoScore: 8.7
  };

  const orders = [
    {
      id: "#ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: "$89.97",
      items: 3
    },
    {
      id: "#ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: "$24.99",
      items: 1
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-eco shadow-eco p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-sage-200 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-sage-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-outfit font-bold text-forest-700">{user.name}</h1>
                <p className="text-sage-600">{user.email}</p>
                <p className="text-sm text-sage-500">Member since {user.joinDate}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-forest-700">{user.ecoScore}/10</div>
                <div className="text-sm text-sage-600">Eco Score</div>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-eco shadow-eco p-6 text-center">
              <Package className="h-8 w-8 text-sage-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-forest-700">{user.totalOrders}</div>
              <div className="text-sage-600">Total Orders</div>
            </div>
            <div className="bg-white rounded-eco shadow-eco p-6 text-center">
              <Award className="h-8 w-8 text-sage-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-forest-700">{user.carbonSaved}</div>
              <div className="text-sage-600">Carbon Saved</div>
            </div>
            <div className="bg-white rounded-eco shadow-eco p-6 text-center">
              <Heart className="h-8 w-8 text-sage-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-forest-700">15</div>
              <div className="text-sage-600">Wishlist Items</div>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="bg-white rounded-eco shadow-eco p-6">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="mt-6">
                <h3 className="text-lg font-semibold text-forest-700 mb-4">Order History</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-sage-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-forest-700">{order.id}</span>
                          <span className="text-sage-600 ml-4">{order.date}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Delivered' ? 'bg-sage-100 text-sage-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-sage-600">{order.items} items</span>
                        <span className="font-semibold text-forest-700">{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <h3 className="text-lg font-semibold text-forest-700 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john@example.com" />
                  </div>
                  <Button className="bg-forest-700 hover:bg-forest-800">
                    Save Changes
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="impact" className="mt-6">
                <h3 className="text-lg font-semibold text-forest-700 mb-4">Environmental Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-sage-50 rounded-lg p-4">
                    <h4 className="font-semibold text-forest-700 mb-2">Carbon Footprint Reduction</h4>
                    <div className="text-3xl font-bold text-sage-700">{user.carbonSaved}</div>
                    <p className="text-sm text-sage-600">Equivalent to planting 12 trees</p>
                  </div>
                  <div className="bg-sage-50 rounded-lg p-4">
                    <h4 className="font-semibold text-forest-700 mb-2">Sustainable Purchases</h4>
                    <div className="text-3xl font-bold text-sage-700">95%</div>
                    <p className="text-sm text-sage-600">Of your purchases are eco-certified</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
