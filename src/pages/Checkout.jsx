import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from '../router/Router';
import { formatINR } from '../utils/currency';

function CheckoutPage() {
  const { state, dispatch } = useStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Prices are stored in INR now
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.01;
  const shipping = subtotal > 4000 ? 0 : 400; // INR
  const total = subtotal + tax + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.cart.length === 0 && !orderPlaced) {
    return (
      <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-2xl text-center max-w-md border border-gray-200 dark:border-gray-700`}>
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className={`mb-2 font-semibold ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Thank you for your order!
          </p>
          <p className={`mb-6 text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            You will receive a confirmation email shortly.
          </p>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg inline-block cursor-pointer transition font-semibold">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">💳 Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700`}>
              <h2 className="text-xl font-bold mb-6 border-b border-gray-300 dark:border-gray-600 pb-4">📍 Shipping Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="123 Main Street"
                  className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Mumbai"
                    className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Maharashtra"
                    className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">PIN Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    placeholder="400001"
                    className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-6 mt-8 border-b border-gray-300 dark:border-gray-600 pb-4">💳 Payment Information</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Expiry Date *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                    className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                    className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition cursor-pointer active:scale-95"
              >
                🛒 Place Order
              </button>
            </form>
          </div>

          <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md h-fit sticky top-24 border border-gray-200 dark:border-gray-700`}>
            <h2 className="text-xl font-bold mb-4">📦 Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {state.cart.map(item => (
                <div key={item.id} className="flex gap-3 border-b border-gray-200 dark:border-gray-600 pb-3">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold line-clamp-2">{item.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">{formatINR(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-300 dark:border-gray-600 pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="font-semibold">{shipping === 0 ? '✓ FREE' : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%)</span>
                <span className="font-semibold">{formatINR(tax)}</span>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-700 dark:text-blue-400">{formatINR(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;