import React, { useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios";

function CartPage() {
  const [cart, setCart] = React.useState([]);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = async (id, delta) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    await axiosInstance.post("/add-to-cart", {
      productId: id,
      quantity: delta,
    });
  };

  const removeFromCart = async (id) => {
    setCart(cart.filter((item) => item._id !== id));
    await axiosInstance.delete(`/cart/${id}`);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/cart");
        setCart(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-20" />
      <div className="fixed right-0 top-0 h-full w-full sm:w-full bg-white shadow-xl z-30 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 bg-gray-50 p-3 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-gray-600 text-sm">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-auto text-red-600 hover:text-red-800"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/checkout", { state: { cart } })}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
