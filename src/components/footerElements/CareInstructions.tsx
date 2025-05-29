import React from 'react';

const CareInstructions = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Jewelry Care Guide</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">General Care Tips</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Store each piece separately in a soft pouch or box</li>
              <li>Keep jewelry away from chemicals, including perfumes and lotions</li>
              <li>Remove jewelry before swimming, showering, or exercising</li>
              <li>Clean regularly with a soft, dry cloth</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Material-Specific Care</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Silver Jewelry</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Use a silver polishing cloth to maintain shine</li>
                  <li>Store in an anti-tarnish bag</li>
                  <li>Avoid exposure to water and humidity</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Gold Jewelry</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Clean with mild soap and warm water</li>
                  <li>Pat dry thoroughly after cleaning</li>
                  <li>Store in a soft-lined jewelry box</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CareInstructions;