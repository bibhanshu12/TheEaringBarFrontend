import React from 'react';
import { useGetOrdersQuery, useDeleteOrderMutation, useUpdateOrderStatusMutation } from '../store/services/orderApi';
import { Loader2, ShoppingBag, Package, Calendar, IndianRupee, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    PAID: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    REFUNDED: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status as keyof typeof statusColors]}`}>
      {status}
    </span>
  );
};

const OrdersPage = () => {
  const { data, isLoading, error } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleCancelOrder = async (orderId: string, status: string) => {
    try {
      // For PENDING orders, use delete
      if (status === 'PENDING') {
        await deleteOrder(orderId).unwrap();
        toast.success('Order deleted successfully');
      } else {
        // For other statuses, update to CANCELLED
        await updateOrderStatus({ orderId, status: 'CANCELLED' }).unwrap();
        toast.success('Order cancelled successfully');
      }
    } catch (error: any) {
      toast.error(error?.data?.msg || 'Failed to cancel order');
    }
  };

  if (isLoading) {
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-4 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Error loading orders</h3>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 text-gold-antique">Your Orders</h1>
          
          {data?.orders.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto h-12 w-12 text-gold-bronze opacity-50" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-sm text-gray-500">Start shopping to place your first order!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {data?.orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Package className="text-gold-antique" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium">{order.id}</p>
                      </div>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-gold-antique" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">
                          {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <IndianRupee className="text-gold-antique" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-medium">₹{order.finalAmount.toFixed(2)}</p>
                      </div>
                    </div>

                    {order.discountAmount && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="text-green-500" size={20} />
                        <div>
                          <p className="text-sm text-gray-500">Discount Applied</p>
                          <p className="font-medium text-green-600">
                            -₹{order.discountAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {order.status !== 'CANCELLED' && order.status !== 'REFUNDED' && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleCancelOrder(order.id, order.status)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        {order.status === 'PENDING' ? 'Delete Order' : 'Cancel Order'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrdersPage;