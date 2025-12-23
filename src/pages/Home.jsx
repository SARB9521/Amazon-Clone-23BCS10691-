import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { formatINR } from '../utils/currency';
import { PRODUCTS } from '../data/products';

function Homepage() {
  const { state } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const maxPrice = Math.max(...PRODUCTS.map(p => p.price));
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [minRating, setMinRating] = useState(0);

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = product.rating >= minRating;
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="bg-linear-to-r from-blue-700 via-blue-600 to-blue-800 py-16 px-4 text-white text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to AmazonClone</h1>
        <p className="text-xl">Discover amazing products at great prices</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          <aside className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md h-fit`}>
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className={`w-full px-3 py-2 border rounded cursor-text ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-3 py-2 border rounded cursor-pointer ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className={`w-full px-3 py-2 border rounded cursor-pointer ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
              >
                <option value={0}>All Ratings</option>
                <option value={4}>4★ & above</option>
                <option value={4.5}>4.5★ & above</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Price Range: {formatINR(priceRange[0])} - {formatINR(priceRange[1])}
              </label>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full"
              />
            </div>
          </aside>

          <div className="md:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                {filteredProducts.length} Products Found
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;