'use client';

import { useState } from 'react';
import { ShoppingCart, Leaf, Heart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const products = [
  {
    id: 1,
    name: 'Organic Beeswax Wraps Set',
    price: 24.99,
    category: 'Kitchen',
    image: 'https://images.pexels.com/photos/6942024/pexels-photo-6942024.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Set of 3 reusable food wraps in assorted sizes',
    impact: 'Saves 1000+ plastic bags per set',
    stock: 45,
  },
  {
    id: 2,
    name: 'Bamboo Utensil Travel Kit',
    price: 18.50,
    category: 'Kitchen',
    image: 'https://images.pexels.com/photos/4505168/pexels-photo-4505168.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Complete cutlery set in organic cotton pouch',
    impact: 'Eliminates single-use plastic utensils',
    stock: 32,
  },
  {
    id: 3,
    name: 'Solid Shampoo Bar - Lavender',
    price: 16.00,
    category: 'Personal Care',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Zero-waste hair care, lasts 80+ washes',
    impact: 'Replaces 3 plastic shampoo bottles',
    stock: 67,
  },
  {
    id: 4,
    name: 'Recycled Canvas Tote Bag',
    price: 28.00,
    category: 'Accessories',
    image: 'https://images.pexels.com/photos/4210783/pexels-photo-4210783.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Large capacity tote from recycled materials',
    impact: 'Made from 12 recycled plastic bottles',
    stock: 28,
  },
  {
    id: 5,
    name: 'Natural Soap Bar Collection',
    price: 22.00,
    category: 'Personal Care',
    image: 'https://images.pexels.com/photos/4612010/pexels-photo-4612010.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Set of 4 artisan soaps with essential oils',
    impact: 'Palm oil-free, biodegradable ingredients',
    stock: 51,
  },
  {
    id: 6,
    name: 'Stainless Steel Water Bottle',
    price: 32.99,
    category: 'Drinkware',
    image: 'https://images.pexels.com/photos/4173179/pexels-photo-4173179.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Insulated bottle keeps drinks cold for 24h',
    impact: 'Replaces 200+ single-use bottles yearly',
    stock: 40,
  },
  {
    id: 7,
    name: 'Organic Cotton Produce Bags',
    price: 19.99,
    category: 'Kitchen',
    image: 'https://images.pexels.com/photos/6994962/pexels-photo-6994962.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Set of 5 mesh bags in various sizes',
    impact: 'Zero-waste grocery shopping solution',
    stock: 38,
  },
  {
    id: 8,
    name: 'Bamboo Toothbrush Set',
    price: 14.50,
    category: 'Personal Care',
    image: 'https://images.pexels.com/photos/4465128/pexels-photo-4465128.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Pack of 4 biodegradable toothbrushes',
    impact: 'Biodegradable handle, BPA-free bristles',
    stock: 72,
  },
];

const categories = ['All', 'Kitchen', 'Personal Care', 'Accessories', 'Drinkware'];

export default function Home() {
  const [cart, setCart] = useState<Array<{ id: number; quantity: number }>>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-900">Terra Collective</h1>
                <p className="text-xs text-stone-600">Sustainable Living</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#shop" className="text-sm font-medium text-stone-700 hover:text-emerald-600 transition-colors">
                Shop
              </a>
              <a href="#about" className="text-sm font-medium text-stone-700 hover:text-emerald-600 transition-colors">
                About
              </a>
              <a href="#impact" className="text-sm font-medium text-stone-700 hover:text-emerald-600 transition-colors">
                Our Impact
              </a>
              <a href="#contact" className="text-sm font-medium text-stone-700 hover:text-emerald-600 transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex relative">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-2 border-t border-stone-200">
              <a href="#shop" className="block px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md">
                Shop
              </a>
              <a href="#about" className="block px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md">
                About
              </a>
              <a href="#impact" className="block px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md">
                Our Impact
              </a>
              <a href="#contact" className="block px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md">
                Contact
              </a>
            </nav>
          )}
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-emerald-50 via-stone-50 to-teal-50 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                Zero Waste • Ethically Sourced
              </Badge>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight">
                Live Sustainably,
                <span className="text-emerald-600"> Choose Wisely</span>
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                Discover our curated collection of eco-friendly home goods crafted by independent makers
                committed to protecting our planet. Every purchase makes a positive impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Shop Collection
                </Button>
                <Button size="lg" variant="outline" className="border-stone-300">
                  Learn Our Story
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div>
                  <p className="text-2xl font-bold text-emerald-600">10K+</p>
                  <p className="text-sm text-stone-600">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">100%</p>
                  <p className="text-sm text-stone-600">Plastic-Free</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">50+</p>
                  <p className="text-sm text-stone-600">Local Makers</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/6928266/pexels-photo-6928266.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Sustainable products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="shop" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h3 className="text-3xl font-bold text-stone-900 mb-2">Our Products</h3>
            <p className="text-stone-600">Thoughtfully curated essentials for sustainable living</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-white border-stone-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={
                    selectedCategory === category
                      ? 'bg-emerald-600 hover:bg-emerald-700 whitespace-nowrap'
                      : 'border-stone-300 whitespace-nowrap'
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-stone-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(product.id)
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-stone-600'
                      }`}
                    />
                  </Button>
                  {product.stock < 30 && (
                    <Badge className="absolute top-2 left-2 bg-amber-500 text-white">
                      Low Stock
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4 space-y-2">
                  <Badge variant="outline" className="text-xs border-emerald-600 text-emerald-700">
                    {product.category}
                  </Badge>
                  <h4 className="font-semibold text-stone-900 line-clamp-1">{product.name}</h4>
                  <p className="text-sm text-stone-600 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    <Leaf className="h-3 w-3" />
                    <span className="line-clamp-1">{product.impact}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="text-xl font-bold text-stone-900">${product.price}</span>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-stone-600 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <section id="impact" className="bg-emerald-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl font-bold">Our Collective Impact</h3>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Together, we're making a difference. Here's what our community has achieved so far.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">2.5M+</div>
              <div className="text-emerald-100">Plastic Items Eliminated</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">15K+</div>
              <div className="text-emerald-100">Trees Planted</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">98%</div>
              <div className="text-emerald-100">Carbon Neutral Shipping</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">50+</div>
              <div className="text-emerald-100">Independent Makers Supported</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-stone-900">100% Sustainable</h4>
              <p className="text-stone-600">
                Every product is carefully vetted to ensure minimal environmental impact and maximum quality.
              </p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-stone-900">Ethically Made</h4>
              <p className="text-stone-600">
                We partner with makers who prioritize fair wages, safe working conditions, and local communities.
              </p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-stone-900">Carbon Neutral</h4>
              <p className="text-stone-600">
                All orders ship carbon-neutral using recycled packaging materials and eco-friendly carriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {cartItemCount > 0 && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl p-6 border border-stone-200 max-w-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900">Cart Summary</h4>
              <Badge className="bg-emerald-600">{cartItemCount} items</Badge>
            </div>
            <div className="space-y-2">
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.id);
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-600">
                      {product?.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-stone-900">
                      ${((product?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-stone-200 pt-4 flex items-center justify-between">
              <span className="font-bold text-lg text-stone-900">Total:</span>
              <span className="font-bold text-xl text-emerald-600">${cartTotal.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Checkout
            </Button>
          </div>
        </div>
      )}

      <footer className="bg-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-emerald-600 p-2 rounded-lg">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">Terra Collective</span>
              </div>
              <p className="text-stone-400 text-sm">
                Curating sustainable products for conscious living. Better for you, better for the planet.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Shop</h5>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Gift Sets
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">About</h5>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Our Makers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-12 pt-8 text-center text-sm text-stone-400">
            <p>&copy; 2025 Terra Collective. All rights reserved. Made with care for the planet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
