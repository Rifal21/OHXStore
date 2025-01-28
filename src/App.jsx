import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import FloatingCart from "./components/FloatingCart";
import OrderPage from "./pages/OrderPage";
import MyTransaction from "./pages/MyTransaction";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/my-transaction" element={<MyTransaction />} />
        </Routes>
        <FloatingCart />
      </Router>
    </CartProvider>
  );
}

export default App;
