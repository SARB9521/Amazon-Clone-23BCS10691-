import React, { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { Link } from '../router/Router';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/currency';
import { PRODUCTS } from '../data/products';

function ProductDetail({ params }) {
  const { state, dispatch } = useStore();
  const product = PRODUCTS.find(p => p.id === Number(params.id));
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) {
    return (
      <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/" className="text-blue-600 hover:underline">Return to Homepage</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline mb-4 inline-block font-semibold cursor-pointer">
          ← Back to Products
        </Link>

        {showSuccess && (
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg mb-4 animate-pulse shadow-lg flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span>Added to cart successfully!</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-96`}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700`}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-300 dark:border-gray-600">
              <div className="flex items-center gap-1 text-yellow-500 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded">
                <Star size={20} fill="currentColor" />
                <span className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">{product.rating}</span>
              </div>
              <span className={`text-sm font-medium ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ({product.reviews ?? Math.floor(Math.random() * 500 + 100)} ratings)
              </span>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price</p>
              <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">{formatINR(product.price)}</span>
            </div>

            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${state.darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                {product.category}
              </span>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-300 dark:border-gray-600">
              <h3 className="font-semibold mb-2 text-lg">Description</h3>
              <p className={`leading-relaxed ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-3">Quantity</label>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`${state.darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} p-2 rounded cursor-pointer transition`}
                >
                  <Minus size={20} />
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`${state.darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} p-2 rounded cursor-pointer transition`}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition cursor-pointer active:scale-95"
            >
              🛒 Add to Cart
            </button>

            <div className={`mt-6 p-4 rounded ${state.darkMode ? 'bg-green-900 text-green-100' : 'bg-green-50 text-green-900'} border border-green-300 dark:border-green-700`}>
              <p className="text-sm font-semibold mb-2">
                <strong>✓ Free Delivery</strong> on orders over ₹4000
              </p>
              <p className="text-sm font-semibold">
                <strong>✓ 30-Day Returns</strong> if you're not satisfied
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;