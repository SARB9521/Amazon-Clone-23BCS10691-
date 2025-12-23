import React from 'react';
import { useStore } from '../context/StoreContext';

function Footer() {
  const { state } = useStore();
  
  return (
    <footer className={`${state.darkMode ? 'bg-gray-900' : 'bg-linear-to-r from-blue-900 to-blue-800'} text-white py-12 mt-auto border-t border-blue-700`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 text-lg">About Us</h3>
            <ul className="space-y-2 text-sm text-blue-100 hover:text-white">
              <li className="cursor-pointer hover:translate-x-1 transition">Our Story</li>
              <li className="cursor-pointer hover:translate-x-1 transition">Careers</li>
              <li className="cursor-pointer hover:translate-x-1 transition">Press Center</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">Customer Service</h3>
            <ul className="space-y-2 text-sm text-blue-100 hover:text-white">
              <li className="cursor-pointer hover:translate-x-1 transition">Help Center</li>
              <li className="cursor-pointer hover:translate-x-1 transition">Returns</li>
              <li className="cursor-pointer hover:translate-x-1 transition">Shipping Info</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">Shop</h3>
            <ul className="space-y-2 text-sm text-blue-100 hover:text-white">
              <li className="cursor-pointer hover:translate-x-1 transition">Electronics</li>
              <li className="cursor-pointer hover:translate-x-1 transition">Furniture</li>
              <li className="cursor-pointer hover:translate-x-1 transition">Sports</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-lg">Connect With Us</h3>
            <ul className="space-y-2 text-sm text-blue-100 hover:text-white">
              <li className="cursor-pointer hover:translate-x-1 transition">📘 Facebook</li>
              <li className="cursor-pointer hover:translate-x-1 transition">𝕏 Twitter</li>
              <li className="cursor-pointer hover:translate-x-1 transition">📷 Instagram</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-700 pt-8 text-center text-sm text-blue-200">
          <p>&copy; 2025 AmazonClone. All rights reserved. Built with React & Tailwind CSS 🚀</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;