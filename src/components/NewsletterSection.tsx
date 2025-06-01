import React, { useState } from 'react';
import { toast } from 'sonner';
import { useDoNewsLetterMailMutation } from '../store/services/orderApi';
import { Loader2 } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [doNewsLetterMail, { isLoading: isSubscribing }] = useDoNewsLetterMailMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await doNewsLetterMail({ email }).unwrap();
      toast.success("Successfully subscribed to newsletter!");
      setEmail('');
    } catch (error) {
      toast.error(error?.data?.message || "Failed to subscribe to newsletter");
    }
  };

  return (
    <section className="py-16 gold-gradient text-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-8">Get exclusive offers, new arrivals, and insider-only discounts</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow p-3 rounded-md border border-gold-light focus:outline-none focus:ring-2 focus:ring-gold-light text-gold-antique"
              required
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              className={`btn-primary flex items-center justify-center min-w-[120px] ${
                isSubscribing ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubscribing ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Subscribing...
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          <p className="mt-4 text-sm opacity-80">
            We respect your privacy and will never share your email
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
