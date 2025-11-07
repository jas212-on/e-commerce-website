import { useState } from 'react'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import CheckOutPage from './pages/CheckOutPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReceiptPage from './pages/ReceiptPage';
import MyOrdersPage from './pages/MyOrdersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/checkout' element={<CheckOutPage />} />
        <Route path='/receipt/:id' element={<ReceiptPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
      </Routes>
    </Router>
  )
}

export default App
