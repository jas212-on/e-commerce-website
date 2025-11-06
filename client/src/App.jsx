import { useState } from 'react'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import CheckOutPage from './pages/CheckOutPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReceiptPage from './pages/ReceiptPage';
import SignInPage from './pages/SignInPage';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/checkout' element={<CheckOutPage />} />
        <Route path='/receipt' element={<ReceiptPage />} />
        <Route path='/signin' element={<SignInPage />} />
      </Routes>
    </Router>
  )
}

export default App
