import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useLoginMutation, useSignupMutation } from '../store/services/authApi';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAppDispatch } from '../store'; // Updated import
import { setCredentials } from '../store/authSlice';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const dispatch = useAppDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        const result = await login({
          email: formData.email,
          password: formData.password
        }).unwrap();

        if (result.msg === "LoggedIn Successful!" && result.user && result.token) {
          dispatch(setCredentials({ 
            user: result.user,
            token: result.token 
          }));
          toast.success("Login successful!");
          resetForm();
          onSuccess();
          onClose();
        }
      } else {
        const result = await signup({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        }).unwrap();

        if (result.msg === "User created successfully" && result.user && result.token) {
          dispatch(setCredentials({ 
            user: result.user,
            token: result.token 
          }));
          toast.success("Account created successfully!");
          resetForm();
          onSuccess();
          onClose();
        }
      }
    } catch (error) {
      const errorMessage = error.data?.msg || error.data?.message || 'Authentication failed';
      toast.error(errorMessage);
      
      if (error.data?.msg === "User already exist with the email!") {
        setIsLogin(true);
        setFormData(prev => ({
          ...prev,
          password: '' // Clear password for security
        }));
      }
    }
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gold-antique">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gold-antique mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gold-light rounded-md"
                    required={!isLogin}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gold-antique mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gold-light rounded-md"
                    required={!isLogin}
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gold-antique mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gold-light rounded-md"
                required
              />
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  resetForm();
                }}
                className="text-sm text-gold-bronze hover:text-gold-antique"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
              </button>
              
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 text-gold-antique hover:text-gold-bronze"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoginLoading || isSignupLoading}
                  className="btn-primary flex items-center"
                >
                  {(isLoginLoading || isSignupLoading) && (
                    <Loader2 className="animate-spin mr-2" size={16} />
                  )}
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;