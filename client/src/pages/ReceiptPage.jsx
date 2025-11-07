import React from 'react'
import { useLocation, useNavigate } from "react-router";
import { Check } from 'lucide-react';

function ReceiptPage() {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.cart || [];
    const customerInfo = location.state?.customerInfo || {};

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">Order Confirmation</h1>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-6 flex items-start gap-3">
            <div className="bg-green-600 rounded-full p-1 shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Order Placed Successfully!</h3>
              <p className="text-green-700 text-sm mt-1">
                A confirmation email has been sent to {customerInfo.email}
              </p>
            </div>
          </div>

          {/* Receipt */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">ShopHub</h2>
              <p className="text-gray-600">Thank you for your purchase!</p>
            </div>

            <div className="border-t border-b border-gray-200 py-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-mono font-semibold">101</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span>{currentDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Customer:</span>
                <span>{customerInfo.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email:</span>
                <span>{customerInfo.email}</span>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-8"
            >
              Go to home Page
            </button>
          </div>
        </div>
      </div>
    );
}

export default ReceiptPage