import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../components/store/cartSlice";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const Cart = () => {
  const [activeCart, SetactiveCart] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Handle Remove from Cart
  const handleRemoveFromCart = (id, name) => {
    dispatch(removeFromCart(id));
    toast.error(`${name} removed from cart`, {
      duration: 3000,
      position: "top-right",
    });
  };

  // Handle Increase Quantity
  const handleIncreaseQuantity = (id, name) => {
    dispatch(increaseQuantity(id));
    // toast.success(`Increased quantity of ${name}`, {
    //   duration: 2000,
    //   position: "top-right",
    // });
  };

  // Handle Decrease Quantity
  const handleDecreaseQuantity = (id, name) => {
    dispatch(decreaseQuantity(id));
    // toast.success(`Decreased quantity of ${name}`, {
    //   duration: 1000,
    //   position: "top-center",
    // });
  };

  return (
    <div className="container mx-auto p-4">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Your cart is empty</p>
          <Link to="/shop" className="btn btn-primary mt-4">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200">
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="hover">
                  <td className="flex items-center space-x-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleDecreaseQuantity(item.id, item.name)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleIncreaseQuantity(item.id, item.name)}
                        disabled={item.quantity >= 5}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleRemoveFromCart(item.id, item.name)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-between">
            <h3 className="text-xl font-bold">
              Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
            </h3>
            <button
              onClick={() => navigate("/checkout")}
              className="btn btn-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
