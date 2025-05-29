
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, Truck } from 'lucide-react';

const Cart = () => {
  const cartItems = [
    {
      id: "1",
      name: "Eco-Friendly Bamboo Water Bottle",
      price: 24.99,
      quantity: 2,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect fill='%23A3C3A7' width='200' height='200'/><circle cx='100' cy='100' r='40' fill='%23ffffff'/><text x='100' y='105' text-anchor='middle' fill='%23A3C3A7' font-size='12'>Bottle</text></svg>",
      carbonSaved: "2.5kg CO₂"
    },
    {
      id: "2",
      name: "Organic Cotton Tote Bag",
      price: 18.99,
      quantity: 1,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect fill='%237C9082' width='200' height='200'/><circle cx='100' cy='100' r='40' fill='%23ffffff'/><text x='100' y='105' text-anchor='middle' fill='%237C9082' font-size='12'>Bag</text></svg>",
      carbonSaved: "1.8kg CO₂"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  const totalCarbonSaved = cartItems.reduce((sum, item) => {
    const carbon = parseFloat(item.carbonSaved.replace('kg CO₂', ''));
    return sum + (carbon * item.quantity);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-sage-300 mx-auto mb-6" />
            <h1 className="text-3xl font-outfit font-bold text-forest-700 mb-4">Your Cart is Empty</h1>
            <p className="text-sage-600 mb-8">Start shopping to build your sustainable lifestyle!</p>
            <Link to="/products">
              <Button className="bg-forest-700 hover:bg-forest-800">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-outfit font-bold text-forest-700 mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-eco shadow-eco p-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 pb-6 border-b border-sage-100 last:border-b-0 last:pb-0">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-forest-700 mb-1">{item.name}</h3>
                        <p className="text-sm text-sage-600 mb-2">Carbon saved: {item.carbonSaved} per item</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-sage-200 rounded-lg">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 text-sm">{item.quantity}</span>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <div className="font-semibold text-forest-700">${(item.price * item.quantity).toFixed(2)}</div>
                        <div className="text-sm text-sage-600">${item.price} each</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Continue Shopping */}
                <div className="mt-6 pt-6 border-t border-sage-100">
                  <Link to="/products">
                    <Button variant="outline" className="border-sage-300 hover:bg-sage-50">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              {/* Environmental Impact */}
              <div className="bg-sage-50 rounded-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-4 flex items-center">
                  🌱 Environmental Impact
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sage-700">{totalCarbonSaved.toFixed(1)}kg CO₂</div>
                  <div className="text-sm text-sage-600">Carbon footprint reduced</div>
                  <div className="text-xs text-sage-500 mt-2">
                    Equivalent to planting {Math.round(totalCarbonSaved / 4)} trees
                  </div>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="bg-white rounded-eco shadow-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-4">Promo Code</h3>
                <div className="flex gap-2">
                  <Input placeholder="Enter code" className="flex-1" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-white rounded-eco shadow-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sage-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sage-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-sm text-sage-500">
                      <Truck className="h-4 w-4 inline mr-1" />
                      Free shipping on orders over $50
                    </div>
                  )}
                  <div className="border-t border-sage-100 pt-3 flex justify-between text-lg font-bold">
                    <span className="text-forest-700">Total</span>
                    <span className="text-forest-700">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link to="/checkout" className="block mt-6">
                  <Button className="w-full bg-forest-700 hover:bg-forest-800">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
