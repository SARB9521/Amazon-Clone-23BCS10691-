import React, { createContext, useContext, useReducer, useEffect } from 'react';

const StoreContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false
};

function storeReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'LOGIN':
      return { ...state, user: action.payload };
    
    case 'LOGOUT':
      return { ...state, user: null };
    
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}