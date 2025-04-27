
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Rings',
    image: '/images/category-rings.jpg',
    path: '/category/rings'
  },
  {
    id: 2,
    name: 'Necklaces',
    image: '/images/category-necklaces.jpg',
    path: '/category/necklaces'
  },
  {
    id: 3,
    name: 'Earrings',
    image: '/images/category-earrings.jpg',
    path: '/category/earrings'
  },
  {
    id: 4,
    name: 'Bracelets',
    image: '/images/category-bracelets.jpg',
    path: '/category/bracelets'
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gold-pale/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <div className="w-24 h-1 bg-gold-antique mx-auto"></div>
          <p className="mt-4 text-lg text-gold-antique/80">Explore our stunning collections</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.path}
              className="group relative overflow-hidden rounded-lg shadow-lg h-80 block"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 group-hover:bg-gold-standard/90 py-3 px-8 transition-colors duration-500">
                  <h3 className="text-xl font-bold text-gold-antique group-hover:text-black">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
