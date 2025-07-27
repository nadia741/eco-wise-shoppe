import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Package, 
  ShoppingBag,
  Heart
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Order History');
  const { cartItems, getCartTotal, wishlistItems, addToCart, removeFromWishlist } = useCart();

  // Calculate shopping-based stats (same as homepage)
  const totalOrders = cartItems.length > 0 ? Math.max(1, Math.floor(cartItems.length / 3)) : 0;
  const totalSpent = getCartTotal();

  const profileData = {
    name: "Eco Enthusiast",
    email: "hellonadia321@gmail.com",
    memberSince: "2023",
  };

  const statsData = [
    {
      icon: <Package className="h-8 w-8 text-tree-600" />,
      value: totalOrders.toString(),
      label: "Total Orders"
    }
  ];

  // Generate order history based on cart items
  const orderHistory = cartItems.length > 0 ? cartItems.map((item, index) => ({
    id: `#GW00${1234 + index}`,
    date: new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    items: [
      { name: item.name, quantity: item.quantity, price: item.price }
    ],
    total: item.price * item.quantity,
    status: index === 0 ? "shipped" : "delivered"
  })) : [];

  const tabs = ['Order History', 'Wishlist'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50/30 to-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        {/* Profile Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-tree-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
              <User className="h-12 w-12" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-outfit font-bold text-forest-700 mb-2">
                {profileData.name}
              </h1>
              <p className="text-sage-600 mb-2">{profileData.email}</p>
              <div className="flex items-center gap-4 text-sm text-sage-500">
                <span>Member since {profileData.memberSince}</span>
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
            
            {orderHistory.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="h-16 w-16 text-sage-300 mx-auto mb-4" />
                <h3 className="text-xl font-outfit font-bold text-forest-700 mb-2">No Orders Yet</h3>
                <p className="text-sage-600 mb-6">Start shopping to see your order history here!</p>
                <Button 
                  className="bg-tree-600 hover:bg-tree-700 text-white"
                  onClick={() => window.location.href = '/products'}
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              orderHistory.map((order, index) => (
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
                      <span className="font-bold text-forest-700 text-lg">Total: ${order.total.toFixed(2)}</span>
                      <Button variant="outline" size="sm" className="border-tree-300 text-tree-600 hover:bg-tree-50">
                        View Details
                      </Button>
                    </div>
                    
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'Wishlist' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-6 w-6 text-forest-700" />
              <h2 className="text-2xl font-outfit font-bold text-forest-700">My Wishlist</h2>
            </div>
            
            {/* Wishlist Items */}
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-sage-300 mx-auto mb-4" />
                <h3 className="text-xl font-outfit font-bold text-forest-700 mb-2">Your Wishlist is Empty</h3>
                <p className="text-sage-600 mb-6">Save products you love to your wishlist for easy access later!</p>
                <Button 
                  className="bg-tree-600 hover:bg-tree-700 text-white"
                  onClick={() => window.location.href = '/products'}
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="bg-white/90 backdrop-blur-sm border-sage-200 overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-outfit font-semibold text-forest-700 mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-tree-600 font-bold text-lg mb-4">
                        ${item.price}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          className="flex-1 bg-tree-600 hover:bg-tree-700 text-white"
                          onClick={() => {
                            addToCart(item);
                            removeFromWishlist(item.id);
                          }}
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-sage-300 text-sage-600 hover:bg-sage-50"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default Profile;
