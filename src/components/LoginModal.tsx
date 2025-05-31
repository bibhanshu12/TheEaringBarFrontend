import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { useLoginMutation } from '../store/services/authApi';
import { toast } from 'sonner';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await login({ email, password }).unwrap();
      if (result.msg === "LoggedIn Successful!") {
        toast.success("Login successful!");
        onSuccess();
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error('Login error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-gold-antique">Login Required</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gold-antique mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gold-light rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gold-antique mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gold-light rounded-md"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gold-antique hover:text-gold-bronze"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginModal;