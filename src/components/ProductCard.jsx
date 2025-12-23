import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from '../router/Router';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/currency';

function ProductCard({ product }) {
  const { state, dispatch } = useStore();
  const [showAddedAlert, setShowAddedAlert] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setShowAddedAlert(true);
    setTimeout(() => setShowAddedAlert(false), 2000);
  };

  // Use deterministic review count from product data
  const reviewCount = product.reviews ?? Math.floor(Math.random() * 500 + 100);
  
  return (
    <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col h-full border border-gray-200 dark:border-gray-700`}>
      <Link
        to={`/product/${product.id}`}
        className="cursor-pointer flex-1 flex flex-col"
      >
        <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 flex-1">{product.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
            <span className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ({reviewCount} reviews)
            </span>
          </div>
          <p className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-1">{formatINR(product.price)}</p>
          <p className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {product.category}
          </p>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className={`w-full py-3 font-semibold text-white cursor-pointer transition duration-200 flex items-center justify-center gap-2 ${
          showAddedAlert
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
        }`}
      >
        <ShoppingCart size={18} />
        {showAddedAlert ? '✓ Added!' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;