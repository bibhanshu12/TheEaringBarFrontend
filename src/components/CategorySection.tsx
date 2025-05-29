import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllCategoriesQuery, useGetProductsByCategoryQuery } from '../store/services/categoriesApi';
import { Skeleton } from './ui/Skeleton';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/category/${category.id}`, {
      state: { category }
    });
  };

  // Fetch products for this category
  const { data: productsData } = useGetProductsByCategoryQuery(category.id.toString());
  
  // Get the first product's first image
  const categoryImage = productsData?.data?.[0]?.images?.[0]?.imageUrl;

  return (
    <Link 
      onClick={handleClick}
      to={`/category/${category.id}`}
      className="group relative overflow-hidden rounded-lg shadow-lg h-80 block"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ 
          backgroundImage: `url(${categoryImage || '/images/default-category.jpg'})` 
        }}
      />
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 group-hover:bg-gold-standard/90 py-3 px-8 transition-colors duration-500">
          <h3 className="text-xl font-bold text-gold-antique group-hover:text-black">
            {category.name}
          </h3>
          {productsData?.data?.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {productsData.data.length} Products
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

const CategorySection = () => {
  const { data: categoriesData, isLoading, error } = useGetAllCategoriesQuery();
  const firstFourCategories = categoriesData?.data?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-gold-pale/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-lg overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gold-pale/30">
        <div className="container-custom text-center text-red-500">
          <p>Failed to load categories. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gold-pale/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <div className="w-24 h-1 bg-gold-antique mx-auto"></div>
          <p className="mt-4 text-lg text-gold-antique/80">Explore our stunning collections</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {firstFourCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
