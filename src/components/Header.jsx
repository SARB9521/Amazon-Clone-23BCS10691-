import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from '../router/Router';
import { useStore } from '../context/StoreContext';

function Header() {
  const { state, dispatch } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={`sticky top-0 z-50 ${state.darkMode ? 'bg-gray-900' : 'bg-linear-to-r from-blue-600 to-blue-800'} text-white shadow-lg border-b border-blue-700`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-yellow-400 transition cursor-pointer">
            <ShoppingCart size={28} />
            <span className="hidden sm:inline">AmazonClone</span>
          </Link>

        
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              className="hover:text-yellow-400 transition cursor-pointer"
            >
              {state.darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {state.user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">👤 {state.user.name}</span>
                <button
                  onClick={() => dispatch({ type: 'LOGOUT' })}
                  className="text-sm hover:text-yellow-400 cursor-pointer transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition">
                <User size={20} />
                <span>Sign In</span>
              </Link>
            )}

            <Link to="/cart" className="flex items-center gap-2 hover:text-yellow-400 relative cursor-pointer transition">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </nav>

          <button
            className="md:hidden cursor-pointer hover:text-yellow-400 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-800">
            <div className="flex flex-col gap-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 rounded-l text-gray-900"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-r cursor-pointer transition">
                  <Search size={20} />
                </button>
              </div>
              
              <button
                onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
                className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition"
              >
                {state.darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{state.darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              {state.user ? (
                <>
                  <span className="font-semibold">👤 {state.user.name}</span>
                  <button
                    onClick={() => {
                      dispatch({ type: 'LOGOUT' });
                      setMobileMenuOpen(false);
                    }}
                    className="text-left hover:text-yellow-400 cursor-pointer transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition">
                  <User size={20} />
                  <span>Sign In</span>
                </Link>
              )}

              <Link to="/cart" className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition">
                <ShoppingCart size={20} />
                <span>Cart ({cartItemCount})</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;