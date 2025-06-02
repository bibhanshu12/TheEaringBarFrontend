import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Return = () => {
  return (
    <div className="min-h-screen mt-28 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
        

          {/* Return Policy Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
            <img 
              src="/images/EaringBarLogo.jpg" 
              alt="Mithila Ornaments Logo" 
              className="h-32 max-w-2xl mx-auto  mb-4 rounded-lg "
            />
            {/* <img 
              src="/images/returnpolicy.jpg" 
              alt="The Earring Bar Header" 
              className="w-full max-w-2xl mx-auto mb-6 rounded-lg shadow-md"
            /> */}
          </div>
            <h1 className="text-4xl font-bold text-gold-antique text-center mb-6">
              Return Policy
            </h1>
            
            <div className="space-y-6">
              <div className="border-b border-gold-pale pb-6">
                <h2 className="text-2xl font-semibold text-gold-bronze mb-4">
                  Damage or Defective Items Only
                </h2>
                <ul className="list-disc pl-6 space-y-3 text-gold-antique/80">
                  <li>Contact us within two days of receiving your order</li>
                  <li>Unboxing video is compulsory for all returns</li>
                  <li>Mind change returns are not applicable</li>
                  <li>Original packaging must be intact</li>
                  <li>Item must be unworn and in original condition</li>
                </ul>
              </div>

              <div className="border-b border-gold-pale pb-6">
                <h2 className="text-2xl font-semibold text-gold-bronze mb-4">
                  Important Notes
                </h2>
                <div className="bg-gold-pale/10 p-4 rounded-md">
                  <p className="text-gold-antique/90 font-medium">
                    Note: Unboxing video is compulsory for return or refund.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gold-bronze mb-4">
                  Return Process
                </h2>
                <ol className="list-decimal pl-6 space-y-3 text-gold-antique/80">
                  <li>Email your return request to mithilaornaments@gmail.com</li>
                  <li>Message us at our whatsapp Number</li>
                  <li>Include your order number and unboxing video</li>
                  <li>Wait for our team to review your request</li>
                  <li>Follow the return shipping instructions provided</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="text-center space-y-4">
            <p className="text-gold-antique/70">
              For more information about deliveries, please WhatsApp us.
            </p>
            {/* <Link 
              to="/shipping" 
              className="text-gold-antique hover:text-gold-bronze underline decoration-dotted"
            >
              Shipping Information Page
            </Link> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Return;