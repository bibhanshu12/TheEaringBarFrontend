import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, Category, ProductImage } from '@/models/type';

interface ProductsState {
  items: Product[];
  featuredItems: Product[];
  newArrivals: Product[];
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Eternity Ring',
    description: 'Exquisite diamond ring featuring 24 round brilliant diamonds in a classic setting.',
    price: 2499,
    stock: 10,
    categories: [
      {
        id: '1',
        name: 'Rings',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    images: [
      {
        id: '1',
        imageUrl: '/images/diamond-ring-1.jpg',
        publicId: 'diamond-ring-1',
        isDefault: true,
        productId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        imageUrl: '/images/diamond-ring-2.jpg',
        publicId: 'diamond-ring-2',
        isDefault: false,
        productId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    colors: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Pearl Necklace',
    description: 'Elegant freshwater pearl necklace with 18K gold clasp.',
    price: 899,
    stock: 15,
    categories: [
      {
        id: '2',
        name: 'Necklaces',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    images: [
      {
        id: '3',
        imageUrl: '/images/pearl-necklace-1.jpg',
        publicId: 'pearl-necklace-1',
        isDefault: true,
        productId: '2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        imageUrl: '/images/pearl-necklace-2.jpg',
        publicId: 'pearl-necklace-2',
        isDefault: false,
        productId: '2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    colors: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Sapphire Earrings',
    description: 'Stunning sapphire and diamond drop earrings set in white gold.',
    price: 1299,
    stock: 8,
    categories: [
      {
        id: '3',
        name: 'Earrings',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    images: [
      {
        id: '5',
        imageUrl: '/images/sapphire-earrings-1.jpg',
        publicId: 'sapphire-earrings-1',
        isDefault: true,
        productId: '3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '6',
        imageUrl: '/images/sapphire-earrings-2.jpg',
        publicId: 'sapphire-earrings-2',
        isDefault: false,
        productId: '3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    colors: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
 
];

const initialState: ProductsState = {
  items: [],
  featuredItems: [],
  newArrivals: [],
  categories: [],
  status: 'idle',
  error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return mockProducts;
  }
);

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
        
        // Since we no longer have featured/new flags, let's use creation date
        const now = new Date();
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        
        // Get latest products as featured items
        state.featuredItems = action.payload
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 4);
        
        // Get products created in the last 30 days as new arrivals
        state.newArrivals = action.payload
          .filter(product => new Date(product.createdAt) > thirtyDaysAgo)
          .slice(0, 4);
        
        // Extract unique categories
        const uniqueCategories = new Map<string, Category>();
        action.payload.forEach(product => {
          product.categories.forEach(category => {
            if (!uniqueCategories.has(category.id)) {
              uniqueCategories.set(category.id, category);
            }
          });
        });
        state.categories = Array.from(uniqueCategories.values());
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export default productsSlice.reducer;
