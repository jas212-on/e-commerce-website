import React from 'react'
import { Mail, Lock, ShoppingCart, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function SignInPage() {
    const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInData, setSignInData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

    const handleSignIn = (e) => {
    e.preventDefault();
    setIsSignedIn(true);
    setCustomerInfo({ ...customerInfo, email: signInData.email });
    setCurrentPage('shop');
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setSignInData({ email: '', password: '' });
    setCart([]);
    setCurrentPage('signin');
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="inline-block bg-blue-600 text-white p-3 rounded-full mb-4">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">ShopHub</h1>
              <p className="text-gray-600">Sign in to start shopping</p>
            </div>

            <form className="space-y-5">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={signInData.name}
                    onChange={(e) => setSignInData({ ...signInData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                onClick={()=>navigate("/",{state:{signInData}})}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </form>

          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Demo: Use any email and password to sign in
          </p>
        </div>
      </div>
  )
}

export default SignInPage