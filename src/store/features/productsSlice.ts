
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Remove the axios import since it's not being used

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  featured?: boolean;
  new?: boolean;
  rating?: number;
}

interface ProductsState {
  items: Product[];
  featuredItems: Product[];
  newArrivals: Product[];
  categories: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// In a real application, you'd fetch this from an API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // In a real app, this would be an API call
    // return (await axios.get('/api/products')).data;
    
    // For this demo, we'll return mock data
    return mockProducts;
  }
);

const initialState: ProductsState = {
  items: [],
  featuredItems: [],
  newArrivals: [],
  categories: [],
  status: 'idle',
  error: null
};

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Eternity Ring',
    description: 'Exquisite diamond ring featuring 24 round brilliant diamonds in a classic setting.',
    price: 2499,
    category: 'Rings',
    images: ['/images/diamond-ring-1.jpg', '/images/diamond-ring-2.jpg'],
    featured: true,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Pearl Necklace',
    description: 'Elegant freshwater pearl necklace with 18K gold clasp.',
    price: 899,
    category: 'Necklaces',
    images: ['/images/pearl-necklace-1.jpg', '/images/pearl-necklace-2.jpg'],
    featured: true,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Sapphire Earrings',
    description: 'Stunning sapphire and diamond drop earrings set in white gold.',
    price: 1299,
    category: 'Earrings',
    images: ['/images/sapphire-earrings-1.jpg', '/images/sapphire-earrings-2.jpg'],
    new: true,
    rating: 4.8
  },
  {
    id: '4',
    name: 'Gold Chain Bracelet',
    description: 'Classic 18K gold chain bracelet with lobster clasp.',
    price: 799,
    category: 'Bracelets',
    images: ['/images/gold-bracelet-1.jpg', '/images/gold-bracelet-2.jpg'],
    new: true,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Emerald Pendant',
    description: 'Brilliant emerald pendant with diamond halo on 18K gold chain.',
    price: 1499,
    category: 'Necklaces',
    images: ['/images/emerald-pendant-1.jpg', '/images/emerald-pendant-2.jpg'],
    featured: true,
    rating: 4.9
  },
  {
    id: '6',
    name: 'Ruby Cocktail Ring',
    description: 'Bold ruby cocktail ring surrounded by diamonds in rose gold setting.',
    price: 1899,
    category: 'Rings',
    images: ['/images/ruby-ring-1.jpg', '/images/ruby-ring-2.jpg'],
    new: true,
    rating: 4.7
  },
  {
    id: '7',
    name: 'Diamond Tennis Bracelet',
    description: 'Classic diamond tennis bracelet featuring 3ct of round brilliant diamonds.',
    price: 3699,
    category: 'Bracelets',
    images: ['/images/tennis-bracelet-1.jpg', '/images/tennis-bracelet-2.jpg'],
    featured: true,
    rating: 5.0
  },
  {
    id: '8',
    name: 'Gold Hoop Earrings',
    description: 'Elegant 14K gold hoop earrings, perfect for everyday wear.',
    price: 499,
    category: 'Earrings',
    images: ['/images/hoop-earrings-1.jpg', '/images/hoop-earrings-2.jpg'],
    new: true,
    rating: 4.5
  }
];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.featuredItems = action.payload.filter(product => product.featured);
        state.newArrivals = action.payload.filter(product => product.new);
        
        // Extract unique categories
        const categories = new Set<string>();
        action.payload.forEach(product => categories.add(product.category));
        state.categories = Array.from(categories);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export default productsSlice.reducer;
