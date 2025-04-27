
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/features/cartSlice';
import { Trash, ShoppingCart } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { items, totalItems, totalAmount } = useAppSelector((state) => state.cart);
  
  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-gold-antique">Your Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={64} className="text-gold-bronze opacity-50 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4 text-gold-antique">Your cart is empty</h2>
              <p className="text-gold-antique/70 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gold-pale/30 text-gold-antique">
                      <tr>
                        <th className="py-3 px-4 text-left">Product</th>
                        <th className="py-3 px-4 text-center">Quantity</th>
                        <th className="py-3 px-4 text-right">Price</th>
                        <th className="py-3 px-4 text-right">Total</th>
                        <th className="py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b border-gold-light">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded"
                              />
                              <Link to={`/product/${item.id}`} className="ml-4 text-gold-antique hover:text-gold-bronze">
                                {item.name}
                              </Link>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <button 
                                onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                className="px-2 py-1 border border-gold-antique text-gold-antique rounded-l-md"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 text-center py-1 border-t border-b border-gold-antique text-gold-antique"
                              />
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 border border-gold-antique text-gold-antique rounded-r-md"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right text-gold-bronze font-semibold">
                            ${item.price.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right text-gold-bronze font-semibold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-4 border-t border-gold-light flex justify-between">
                    <button 
                      onClick={handleClearCart}
                      className="text-sm text-red-500 hover:text-red-700 flex items-center"
                    >
                      <Trash size={16} className="mr-1" /> Clear Cart
                    </button>
                    <Link to="/" className="text-gold-bronze hover:text-gold-antique">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gold-antique">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gold-antique/80">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">${totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gold-antique/80">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-gold-antique/80">
                      <span>Tax</span>
                      <span>${(totalAmount * 0.07).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gold-light pt-3 flex justify-between text-gold-antique font-bold">
                      <span>Total</span>
                      <span>${(totalAmount + totalAmount * 0.07).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button className="btn-primary w-full mb-4">
                    Proceed to Checkout
                  </button>
                  
                  <div className="text-center text-gold-antique/70 text-sm">
                    <p>We accept</p>
                    <div className="flex justify-center space-x-2 mt-2">
                      <div className="w-10 h-6 bg-blue-700 rounded"></div>
                      <div className="w-10 h-6 bg-red-600 rounded"></div>
                      <div className="w-10 h-6 bg-gray-800 rounded"></div>
                      <div className="w-10 h-6 bg-yellow-500 rounded"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                  <h3 className="font-semibold mb-2 text-gold-antique">Have a promo code?</h3>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Enter code" 
                      className="flex-grow px-3 py-2 border border-gold-light rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold-bronze"
                    />
                    <button className="bg-gold-bronze hover:bg-gold-antique text-white px-4 py-2 rounded-r-md transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
