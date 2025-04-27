
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
