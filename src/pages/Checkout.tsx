
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Truck, Shield, Leaf } from 'lucide-react';

const Checkout = () => {
  const orderItems = [
    {
      id: "1",
      name: "Eco-Friendly Bamboo Water Bottle",
      price: 24.99,
      quantity: 2,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23A3C3A7' width='100' height='100'/><circle cx='50' cy='50' r='25' fill='%23ffffff'/></svg>"
    },
    {
      id: "2",
      name: "Organic Cotton Tote Bag",
      price: 18.99,
      quantity: 1,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%237C9082' width='100' height='100'/><circle cx='50' cy='50' r='25' fill='%23ffffff'/></svg>"
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-forest-700 text-white rounded-full flex items-center justify-center text-sm">1</div>
                <span className="ml-2 text-forest-700 font-medium">Shipping</span>
              </div>
              <div className="w-16 h-1 bg-forest-700"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-sage-300 text-white rounded-full flex items-center justify-center text-sm">2</div>
                <span className="ml-2 text-sage-600">Payment</span>
              </div>
              <div className="w-16 h-1 bg-sage-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-sage-200 text-sage-400 rounded-full flex items-center justify-center text-sm">3</div>
                <span className="ml-2 text-sage-400">Review</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-eco shadow-eco p-6">
                <h2 className="text-2xl font-outfit font-bold text-forest-700 mb-6">Checkout</h2>
                
                <Tabs defaultValue="shipping" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="shipping" className="mt-6">
                    <form className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-forest-700 mb-4">Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div className="mt-4">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="123 Main Street" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="New York" />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="NY" />
                          </div>
                          <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" placeholder="10001" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="billing-same" />
                        <Label htmlFor="billing-same">Billing address same as shipping</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="save-info" />
                        <Label htmlFor="save-info">Save this information for next time</Label>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="payment" className="mt-6">
                    <form className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-forest-700 mb-4">Payment Method</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="credit-card" name="payment" className="text-forest-700" defaultChecked />
                            <Label htmlFor="credit-card" className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Credit Card
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-6">
              {/* Environmental Impact */}
              <div className="bg-sage-50 rounded-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-4 flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  Your Impact
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sage-700">4.3kg CO₂</div>
                  <div className="text-sm text-sage-600">Carbon footprint reduced</div>
                  <div className="text-xs text-sage-500 mt-2">
                    🌱 Equivalent to planting 1 tree
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-eco shadow-eco p-6">
                <h3 className="font-semibold text-forest-700 mb-4">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-forest-700 text-sm">{item.name}</div>
                        <div className="text-xs text-sage-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-sage-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-600">Shipping</span>
                    <span className="text-sage-700">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sage-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-sage-100 pt-2">
                    <span className="text-forest-700">Total</span>
                    <span className="text-forest-700">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-forest-700 hover:bg-forest-800">
                  Complete Order
                </Button>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-sage-500">
                  <div className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure checkout
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-3 w-3 mr-1" />
                    Free returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
