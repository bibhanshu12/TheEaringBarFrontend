import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAddAddressMutation, useUpdateAddressMutation } from '../store/services/addressApi';
import type { AddressFormData } from '../store/services/addressApi';

interface AddressFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  editingAddress?: Address | null;
}

interface ExtendedAddressFormData extends Omit<AddressFormData, 'label'> {
  fullName: string;
  whatsappNumber: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export const AddressFormDialog: React.FC<AddressFormDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editingAddress
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ExtendedAddressFormData>({
    defaultValues: editingAddress ? {
      fullName: editingAddress.label?.split('|')[0]?.trim() || '',
      whatsappNumber: editingAddress.label?.split('|')[1]?.trim() || '',
      street: editingAddress.street,
      city: editingAddress.city,
      state: editingAddress.state,
      zipCode: editingAddress.zipCode,
      country: editingAddress.country,
    } : {}
  });

  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ExtendedAddressFormData) => {
    setIsSubmitting(true);
    try {
      // Combine name and WhatsApp number for label
      const addressData: AddressFormData = {
        street: data.street,
        zipCode: data.zipCode,
        city: data.city,
        country: data.country,
        state: data.state,
        label: `${data.fullName} | ${data.whatsappNumber}`
      };

      if (editingAddress) {
        await updateAddress({
          addressId: editingAddress.id,
          addressData
        }).unwrap();
        toast.success('Address updated successfully');
      } else {
        await addAddress(addressData).unwrap();
        toast.success('Address added successfully');
      }
      
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error(editingAddress ? 'Failed to update address' : 'Failed to add address');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                {...register("fullName", { required: "Full name is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-antique"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
              <input
                {...register("whatsappNumber", { 
                  required: "WhatsApp number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit number"
                  }
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-antique"
                placeholder="Enter WhatsApp number"
                type="tel"
                maxLength={10}
              />
              {errors.whatsappNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Street Address</label>
            <input
              {...register("street", { required: "Street address is required" })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-antique"
              placeholder="Enter your street address"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                {...register("city", { required: "City is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-antique"
                placeholder="Enter city"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                {...register("state", { required: "State is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-antique"
                placeholder="Enter state"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code</label>
              <input
                {...register("zipCode", { 
                  required: "ZIP code is required",
                  maxLength: { value: 10, message: "ZIP code cannot exceed 10 characters" }
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-antique"
                placeholder="Enter ZIP code"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                {...register("country", { required: "Country is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-antique"
                placeholder="Enter country"
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : (editingAddress ? 'Update Address' : 'Add Address')}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};