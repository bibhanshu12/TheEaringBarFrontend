import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How do I track my order?",
      answer: "You can track your order using the tracking number provided in your shipping confirmation email. Simply click on the tracking link or visit our order tracking page."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and wallet payments through secure payment gateways."
    },
    {
      question: "Are your products authentic?",
      answer: "Yes, all our jewelry pieces are handcrafted by certified Mithila artisans. Each piece comes with a certificate of authenticity."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping times and costs vary by location."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in their original packaging. Returns are free for domestic orders."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-medium">{item.question}</span>
                <span className="ml-6">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;