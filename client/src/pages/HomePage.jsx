import React, { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const customerInfo = location.state?.customerInfo || {};


  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);


  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">ShopHub</h1>
          <div className='flex gap-8 w-30'>
          <button
            onClick={() => navigate('/cart', { state: { cart,customerInfo } })}
            className="relative p-2 text-gray-700 hover:text-gray-900"
          >
            
            <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button
                onClick={() => navigate('/signin')}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign in
              </button>
              </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Product Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;