import { useParams, useLocation } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../store/services/categoriesApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Skeleton } from '../components/ui/Skeleton';
import { formatPrice } from '../utils/formatPrice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.images[0]?.imageUrl || '/placeholder.jpg'} 
            alt={product.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
          {product.stock <= 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gold-antique">
              ₹{formatPrice(product.price)}
            </span>
            
            <div className="flex gap-1">
              {product.colors.map(colorData => (
                <div
                  key={colorData.color.id}
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: colorData.color.hexCode }}
                  title={colorData.color.name}
                />
              ))}
            </div>
          </div>

          <button 
            className={`mt-4 w-full py-2 rounded-md transition-colors duration-300 ${
              product.stock > 0 
                ? 'bg-gold-antique hover:bg-gold-antique/90 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </Link>
    </div>
  );
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const selectedCategory = location.state?.category;

  const { data: productsData, isLoading, error } = useGetProductsByCategoryQuery(
    categoryId ?? 'skip',
    {
      skip: !categoryId,
    }
  );

  // Use the category name from the passed state, or fall back to finding it in products
  const categoryName = selectedCategory?.name || productsData?.data?.[0]?.categories?.find(
    cat => cat.categoryId.toString() === categoryId
  )?.category?.name || 'Products';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-custom">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gold-antique capitalize">
              {categoryName}
            </h1>
            <div className="w-24 h-1 bg-gold-antique mx-auto"></div>
            <p className="mt-4 text-gold-antique/80">
              Discover our exquisite collection designed with elegance and crafted with precision.
            </p>
          </header>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2,3,4].map((i) => (
                <div key={i} className="h-96">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-500">
                Error loading products. Please try again later.
              </p>
            </div>
          ) : productsData?.data?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsData.data.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gold-antique/80">
                No products found in this category. Please check back later. 
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
