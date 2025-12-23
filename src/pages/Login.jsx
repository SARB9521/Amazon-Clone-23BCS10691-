import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from '../router/Router';

function LoginPage() {
  const { state, dispatch } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Mock login
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = storedUsers.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        dispatch({ type: 'LOGIN', payload: { name: user.name, email: user.email } });
        window.location.hash = '/';
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Mock signup
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = storedUsers.find(u => u.email === formData.email);
      
      if (userExists) {
        alert('User already exists');
      } else {
        storedUsers.push(formData);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        dispatch({ type: 'LOGIN', payload: { name: formData.name, email: formData.email } });
        window.location.hash = '/';
      }
    }
  };

  if (state.user) {
    return (
      <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg text-center max-w-md`}>
          <h2 className="text-2xl font-bold mb-4">Already Logged In</h2>
          <p className="mb-6">Welcome back, {state.user.name}!</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} flex items-center justify-center py-12 px-4`}>
    <div className={`${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg w-full max-w-md`}>
    <h2 className="text-3xl font-bold mb-6 text-center">
      {isLogin ? 'Sign In' : 'Sign Up'}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required={!isLogin}
            className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 border rounded ${state.darkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'}`}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        {isLogin ? 'Sign In' : 'Sign Up'}
      </button>
    </form>

    <div className="mt-6 text-center">
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-600 hover:underline"
      >
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
      </button>
    </div>
  </div>
</div>
);
}
export default LoginPage;