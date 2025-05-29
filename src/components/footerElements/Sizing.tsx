import React from 'react';

const SizingGuide = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Jewelry Sizing Guide</h1>
        
        <div className="space-y-8">
          {/* Ring Size Guide */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Ring Size Guide</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 border">US Size</th>
                    <th className="px-4 py-2 border">UK Size</th>
                    <th className="px-4 py-2 border">Diameter (mm)</th>
                    <th className="px-4 py-2 border">Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">5</td>
                    <td className="px-4 py-2 border">J</td>
                    <td className="px-4 py-2 border">15.7</td>
                    <td className="px-4 py-2 border">49.3</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">6</td>
                    <td className="px-4 py-2 border">L</td>
                    <td className="px-4 py-2 border">16.5</td>
                    <td className="px-4 py-2 border">51.9</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">7</td>
                    <td className="px-4 py-2 border">N</td>
                    <td className="px-4 py-2 border">17.3</td>
                    <td className="px-4 py-2 border">54.4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Measure */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Measure</h2>
            <div className="space-y-4">
              <p className="text-gray-600">To find your ring size:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Wrap a piece of string or paper around your finger</li>
                <li>Mark where the string meets</li>
                <li>Measure the length in millimeters</li>
                <li>Compare with our size chart above</li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SizingGuide;