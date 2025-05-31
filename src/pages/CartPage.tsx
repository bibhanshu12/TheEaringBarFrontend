import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Trash, ShoppingCart, Loader2 } from 'lucide-react';
import { useGetCartQuery, useDeleteCartItemMutation } from '../store/services/cartApi';
import { useCartProducts } from '../hooks/useCartProducts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import type {EnrichedCartItem} from "../hooks/useCartProducts"
import { useState } from 'react';
import {AddressSelectionDialog} from '../components/AddressSelectionDialog';

const CartPage = () => {
  const { data: cartData, isLoading: isCartLoading, refetch } = useGetCartQuery();
  const [deleteCartItem, { isLoading: isDeleting }] = useDeleteCartItemMutation();
  const cartItems = cartData?.getCartItems || [];
  const { enrichedCartItems, isLoading: isProductsLoading, totalAmount } = useCartProducts(cartItems);
  const [showAddressSelection, setShowAddressSelection] = useState(false);

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await deleteCartItem(cartItemId).unwrap();
      toast.success('Item removed from cart');
      refetch(); // Refresh cart data
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleAddressSelect = (addressId: string) => {
    // Handle the selected address and proceed with checkout
    console.log('Selected address:', addressId);
    // Add your checkout logic here
  };

  if (isCartLoading || isProductsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-4 flex items-center justify-center">
          <Loader2 className="animate-spin text-gold-antique" size={40} />
        </main>
        <Footer />
      </div>
    );
  }

  const CartItemCard = ({ item }: { item: EnrichedCartItem }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex gap-4">
        <div className="w-24 h-24 flex-shrink-0">
          {item.productDetails?.images?.[0] && (
            <img 
              src={item.productDetails.images[0].imageUrl} 
              alt={item.productDetails.name}
              className="w-full h-full object-cover rounded"
            />
          )}
        </div>
        <div className="flex-grow">
          <Link 
            to={`/product/${item.productId}`}
            className="text-gold-antique hover:text-gold-bronze"
          >
            <h3 className="font-medium">{item.productDetails?.name}</h3>
          </Link>
          <p className="text-sm text-gold-antique/70 mt-1">
            Stock: {item.productDetails?.stock}
          </p>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-gold-bronze font-medium">
                ${item.productDetails?.price.toFixed(2)}
              </p>
              <p className="text-sm text-gold-antique/70">
                Qty: {item.quantity}
              </p>
            </div>
            <div>
              <p className="text-gold-antique font-bold">
                ${(item.productDetails?.price * item.quantity).toFixed(2)}
              </p>
              <button 
                onClick={() => handleRemoveItem(item.id)}
                disabled={isDeleting}
                className="text-red-500 hover:text-red-700 disabled:opacity-50 mt-2"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-gold-antique">Your Shopping Cart</h1>
          
          {enrichedCartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={64} className="text-gold-bronze opacity-50 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-4 text-gold-antique">Your cart is empty</h2>
              <p className="text-gold-antique/70 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/products" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                {/* Mobile View */}
                <div className="lg:hidden">
                  {enrichedCartItems.map((item) => (
                    <CartItemCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gold-pale/30 text-gold-antique">
                      <tr>
                        <th className="py-3 px-4 text-left">Product</th>
                        <th className="py-3 px-4 text-center">Price</th>
                        <th className="py-3 px-4 text-center">Quantity</th>
                        <th className="py-3 px-4 text-center">Total</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrichedCartItems.map((item) => (
                        <tr key={item.id} className="border-b border-gold-light">
                          <td className="py-4 px-4">
                            <Link 
                              to={`/product/${item.productId}`} 
                              className="text-gold-antique hover:text-gold-bronze"
                            >
                              <div className="flex items-center space-x-4">
                                {item.productDetails?.images?.[0] && (
                                  <img 
                                    src={item.productDetails.images[0].imageUrl} 
                                    alt={item.productDetails.name}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <div>
                                  <h3 className="font-medium">{item.productDetails?.name}</h3>
                                  <p className="text-sm text-gold-antique/70">
                                    Stock: {item.productDetails?.stock}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td className="py-4 px-4 text-center">
                            ${item.productDetails?.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {item.quantity}
                          </td>
                          <td className="py-4 px-4 text-center">
                            ${(item.productDetails?.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={isDeleting}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50"
                            >
                              <Trash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-4 border-t border-gold-light flex justify-between">
                    <Link to="/products" className="text-gold-bronze hover:text-gold-antique">
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                <div className="mt-4">
                  <Link to="/products" className="text-gold-bronze hover:text-gold-antique">
                    Continue Shopping
                  </Link>
                </div>
              </div>

              <div className="col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4 text-gold-antique">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gold-antique/80">
                      <span>Total Items</span>
                      <span>{enrichedCartItems.length}</span>
                    </div>
                    <div className="space-y-2">
                      {enrichedCartItems.map(item => (
                        <div key={item.id} className="flex justify-between text-sm text-gold-antique/70">
                          <span className="truncate mr-2">
                            {item.productDetails?.name} (x{item.quantity})
                          </span>
                          <span className="flex-shrink-0">
                            ${(item.productDetails?.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gold-light pt-3 flex justify-between text-gold-antique font-bold">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowAddressSelection(true)}
                    className="btn-primary w-full"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <AddressSelectionDialog
        isOpen={showAddressSelection}
        onClose={() => setShowAddressSelection(false)}
        onAddressSelect={handleAddressSelect}
      />
    </div>
  );
};

export default CartPage;
