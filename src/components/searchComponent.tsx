import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IndianRupee, Loader2 } from 'lucide-react';
import { useSearchProductsQuery } from '../store/services/productsApi';

interface SearchResultsProps {
  searchTerm: string;
  onClose: () => void;
  onSearch: (term: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  searchTerm, 
  onClose,
  onSearch 
}) => {
  const navigate = useNavigate();
  const { data, isLoading } = useSearchProductsQuery(searchTerm, {
    skip: searchTerm.length < 2,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.length >= 2) {
      e.preventDefault();
      onSearch(searchTerm);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  if (!searchTerm || searchTerm.length < 2) {
    return (
      <div className="p-4 text-center text-gold-antique/70">
        Type at least 2 characters to search...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="animate-spin text-gold-antique" size={24} />
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="p-4 text-center text-gold-antique/70">
        No products found for "{searchTerm}"
      </div>
    );
  }

  return (
    <div className="max-h-[60vh] overflow-y-auto" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {data?.data?.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            onClick={onClose}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gold-pale/10 transition-colors"
          >
            <div className="flex-grow">
              <h3 className="text-gold-antique font-medium">{product.name}</h3>
              <p className="text-sm text-gold-antique/70 line-clamp-1">
                {product.description}
              </p>
              <div className="flex items-center mt-1 text-gold-bronze">
                <IndianRupee size={14} />
                <span>{product.price.toFixed(2)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};