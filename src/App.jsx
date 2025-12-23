import { StoreProvider } from './context/StoreContext';
import { Router, Route } from './router/Router';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import LoginPage from './pages/Login';

function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Router>
            <Route path="/" component={Homepage} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/login" component={LoginPage} />
          </Router>
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;