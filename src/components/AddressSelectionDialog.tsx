import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useGetAddressesQuery, useDeleteAddressMutation } from '../store/services/addressApi';
import { AddressFormDialog } from './AddressFormDialog';
import { PlusCircle, Loader2, Trash, Edit } from 'lucide-react';
import { toast } from 'sonner';
import type { Address } from '../store/services/addressApi';
import { useNavigate } from 'react-router-dom';
import { usePlaceOrderMutation } from '../store/services/orderApi';

interface AddressSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (addressId: string) => void;
}

export const AddressSelectionDialog: React.FC<AddressSelectionDialogProps> = ({
  isOpen,
  onClose,
  onAddressSelect,
}) => {
  const navigate = useNavigate();
  const { data: addressResponse, isLoading, error, refetch } = useGetAddressesQuery();
  const [deleteAddress] = useDeleteAddressMutation();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();

  const addresses = addressResponse?.allAddress ?? [];

  const handleDelete = async (addressId: string) => {
    try {
      await deleteAddress(addressId).unwrap();
      toast.success('Address deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const handleContinue = async () => {
    if (selectedAddressId) {
      try {
        await placeOrder({ addressId: selectedAddressId }).unwrap();
        toast.success('Order placed successfully!');
        onAddressSelect(selectedAddressId);
        onClose();
        navigate('/orders'); // Redirect to orders page
      } catch (error: any) {
        toast.error(error?.data?.msg || 'Failed to place order');
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Select Delivery Address</DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-gold-antique" size={40} />
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No addresses found</p>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="btn-primary inline-flex items-center"
                >
                  <PlusCircle className="mr-2" size={20} />
                  Add New Address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border rounded-lg ${
                      selectedAddressId === address.id
                        ? 'border-gold-antique bg-gold-pale/10'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between">
                      <div
                        className="flex-grow cursor-pointer"
                        onClick={() => setSelectedAddressId(address.id)}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            checked={selectedAddressId === address.id}
                            onChange={() => setSelectedAddressId(address.id)}
                            className="mt-1 mr-3"
                          />
                          <div>
                            <p className="text-sm text-gray-600">{address.label}</p>
                            <p className="text-sm text-gray-600">{address.street}</p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p className="text-sm text-gray-600">{address.country}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <button
                          onClick={() => setEditingAddress(address)}
                          className="p-1 text-gray-500 hover:text-gold-antique"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="p-1 text-gray-500 hover:text-red-500"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-gold-bronze hover:text-gold-antique inline-flex items-center"
                  >
                    <PlusCircle className="mr-2" size={20} />
                    Add New Address
                  </button>
                  <button
                    onClick={handleContinue}
                    disabled={!selectedAddressId || isPlacingOrder}
                    className="btn-primary disabled:opacity-50 inline-flex items-center"
                  >
                    {isPlacingOrder ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={16} />
                        Placing Order...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AddressFormDialog
        isOpen={showAddressForm || !!editingAddress}
        onClose={() => {
          setShowAddressForm(false);
          setEditingAddress(null);
        }}
        onSuccess={() => {
          setShowAddressForm(false);
          setEditingAddress(null);
          refetch();
        }}
        editingAddress={editingAddress}
      />
    </>
  );
};