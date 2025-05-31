
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, Package, Heart, Settings, Award, Star, Trophy, Gift, Zap } from 'lucide-react';
import { useRewards } from '@/contexts/RewardsContext';
import EducationalResources from '@/components/EducationalResources';

const Profile = () => {
  const { points, tier, tierBenefits } = useRewards();
  
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "January 2024",
    totalOrders: 12,
    carbonSaved: "45.2kg CO₂",
    ecoScore: 8.7,
    treesPlanted: 11
  };

  const orders = [
    {
      id: "#ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: "$89.97",
      items: 3,
      carbonSaved: "5.2kg CO₂"
    },
    {
      id: "#ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: "$24.99",
      items: 1,
      carbonSaved: "2.5kg CO₂"
    }
  ];

  const rewardTiers = Object.entries(tierBenefits);
  const currentTierIndex = rewardTiers.findIndex(([tierName]) => tierName === tier);
  const nextTier = currentTierIndex < rewardTiers.length - 1 ? rewardTiers[currentTierIndex + 1] : null;
  const progressToNext = nextTier ? ((points - tierBenefits[tier].pointsRequired) / (nextTier[1].pointsRequired - tierBenefits[tier].pointsRequired)) * 100 : 100;

  const redeemableRewards = [
    { id: 1, name: "$5 Off Next Order", points: 500, description: "Save on your next purchase" },
    { id: 2, name: "Free Shipping", points: 200, description: "Free shipping on any order" },
    { id: 3, name: "Eco Gift Box", points: 1000, description: "Curated sustainable products" },
    { id: 4, name: "$25 Off Premium Items", points: 2500, description: "Discount on premium eco products" }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-forest-700 to-tree-600 rounded-eco shadow-eco p-8 mb-8 text-white animate-fade-in">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-outfit font-bold mb-2">{user.name}</h1>
                <p className="text-white/80 mb-1">{user.email}</p>
                <p className="text-sm text-white/60">Member since {user.joinDate}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Trophy className="h-4 w-4 mr-1" />
                    {tier} Member
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Star className="h-4 w-4 mr-1" />
                    {points} Points
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{user.ecoScore}/10</div>
                <div className="text-sm text-white/80">Eco Score</div>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-eco shadow-eco p-6 text-center animate-fade-in-scale hover-lift">
              <Package className="h-8 w-8 text-sage-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-forest-700">{user.totalOrders}</div>
              <div className="text-sage-600">Total Orders</div>
            </div>
            <div className="bg-white rounded-eco shadow-eco p-6 text-center animate-fade-in-scale hover-lift stagger-1">
              <Award className="h-8 w-8 text-sage-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-forest-700">{user.carbonSaved}</div>
              <div className="text-sage-600">Carbon Saved</div>
            </div>
            <div className="bg-white rounded-eco shadow-eco p-6 text-center animate-fade-in-scale hover-lift stagger-2">
              <Heart className="h-8 w-8 text-sage-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-forest-700">15</div>
              <div className="text-sage-600">Wishlist Items</div>
            </div>
            <div className="bg-white rounded-eco shadow-eco p-6 text-center animate-fade-in-scale hover-lift stagger-3">
              <Zap className="h-8 w-8 text-sage-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-forest-700">{user.treesPlanted}</div>
              <div className="text-sage-600">Trees Planted</div>
            </div>
          </div>

          {/* Rewards Progress */}
          <div className="bg-white rounded-eco shadow-eco p-6 mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-6 w-6 text-amber-500" />
              <h3 className="text-xl font-semibold text-forest-700">Rewards Progress</h3>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-forest-700 font-medium">{tier} Member</span>
              {nextTier && (
                <span className="text-sage-600 text-sm">
                  {nextTier[1].pointsRequired - points} points to {nextTier[0]}
                </span>
              )}
            </div>
            <Progress value={progressToNext} className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {rewardTiers.map(([tierName, benefits], index) => (
                <div 
                  key={tierName}
                  className={`p-4 rounded-lg border ${
                    tierName === tier 
                      ? 'border-forest-300 bg-forest-50' 
                      : index <= currentTierIndex 
                        ? 'border-sage-200 bg-sage-50' 
                        : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-forest-700">{tierName}</div>
                  <div className="text-sm text-sage-600 mb-2">{benefits.pointsRequired}+ points</div>
                  <div className="text-xs text-sage-500">
                    {benefits.benefits.slice(0, 2).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="bg-white rounded-eco shadow-eco p-6 animate-fade-in-up">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="education">Learn</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="mt-6">
                <h3 className="text-lg font-semibold text-forest-700 mb-4">Order History</h3>
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <div 
                      key={order.id} 
                      className="border border-sage-200 rounded-lg p-4 animate-fade-in-up hover-lift"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
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
                        <span className="text-sage-600">{order.items} items • {order.carbonSaved} saved</span>
                        <span className="font-semibold text-forest-700">{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rewards" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-forest-700">Available Rewards</h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-forest-700">{points} Points</div>
                      <div className="text-sm text-sage-600">Available to redeem</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {redeemableRewards.map((reward, index) => (
                      <div 
                        key={reward.id}
                        className="border border-sage-200 rounded-lg p-4 animate-fade-in-scale hover-lift"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-forest-700">{reward.name}</h4>
                          <div className="flex items-center text-amber-600">
                            <Gift className="h-4 w-4 mr-1" />
                            <span className="font-bold">{reward.points}</span>
                          </div>
                        </div>
                        <p className="text-sm text-sage-600 mb-3">{reward.description}</p>
                        <Button 
                          size="sm" 
                          className="w-full"
                          disabled={points < reward.points}
                          variant={points >= reward.points ? "default" : "outline"}
                        >
                          {points >= reward.points ? 'Redeem' : `Need ${reward.points - points} more points`}
                        </Button>
                      </div>
                    ))}
                  </div>
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

              <TabsContent value="education" className="mt-6">
                <EducationalResources />
              </TabsContent>
              
              <TabsContent value="impact" className="mt-6">
                <h3 className="text-lg font-semibold text-forest-700 mb-4">Environmental Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-sage-50 rounded-lg p-4">
                    <h4 className="font-semibold text-forest-700 mb-2">Carbon Footprint Reduction</h4>
                    <div className="text-3xl font-bold text-sage-700">{user.carbonSaved}</div>
                    <p className="text-sm text-sage-600">Equivalent to planting {user.treesPlanted} trees</p>
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
