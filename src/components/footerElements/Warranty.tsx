import React from 'react';

const Warranty = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Warranty Information</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Warranty Coverage</h2>
            <div className="prose text-gray-600">
              <p>All our jewelry comes with a 1-year limited warranty that covers:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Manufacturing defects</li>
                <li>Material defects</li>
                <li>Structural integrity issues</li>
                <li>Stone setting problems</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Warranty Terms</h2>
            <div className="prose text-gray-600">
              <p>The warranty does not cover:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Normal wear and tear</li>
                <li>Accidental damage</li>
                <li>Loss or theft</li>
                <li>Damage from improper care</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Claim Process</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>Contact our customer service team</li>
              <li>Provide proof of purchase</li>
              <li>Describe the issue with your jewelry</li>
              <li>Ship the item back to us (we'll provide a shipping label)</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Warranty;