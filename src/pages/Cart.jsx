import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from '../router/Router';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/currency';

function CartPage() {
  const { state, dispatch } = useStore();

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  // Prices are stored in INR now
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 4000 ? 0 : 800; // free shipping threshold in INR
  const total = subtotal + tax + shipping;

  if (state.cart.length === 0) {
    return (
      <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">🛒 Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map(item => (
              <div key={item.id} className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md flex gap-4 border border-gray-200 dark:border-gray-700`}>
                <Link to={`/product/${item.id}`} className="cursor-pointer hover:opacity-80 transition">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${item.id}`} className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
                    {item.title}
                  </Link>
                  <p className="text-blue-700 dark:text-blue-400 font-bold mt-2">{formatINR(item.price)}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 rounded px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={`${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} p-1 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={`${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'} p-1 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900 flex items-center gap-1 px-3 py-1 rounded cursor-pointer transition"
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{formatINR(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md h-fit sticky top-24 border border-gray-200 dark:border-gray-700`}>
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">{shipping === 0 ? '✓ FREE' : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span className="font-semibold">{formatINR(tax)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-700 dark:text-blue-400">{formatINR(total)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-sm text-center mb-4 text-gray-500 dark:text-gray-400">
                {`Add ${formatINR(Math.max(0, 4000 - subtotal))} more for FREE shipping!`}
              </p>
            )}

            <Link
              to="/checkout"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-lg font-bold hover:shadow-lg transition cursor-pointer"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;