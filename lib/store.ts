import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  isBusinessOnly?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  
  // UI State
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  
  // Business Auth
  isBusinessLoggedIn: boolean;
  businessEmail: string;
  loginBusiness: (email: string) => void;
  logoutBusiness: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      
      addToCart: (product) => {
        const existingItem = get().cart.find(item => item.id === product.id);
        if (existingItem) {
          set({
            cart: get().cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity: 1 }]
          });
        }
      },
      
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.id !== productId)
        });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => set({ cart: [] }),
      
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
      
      // UI state
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      
      // Business auth
      isBusinessLoggedIn: false,
      businessEmail: '',
      loginBusiness: (email) => set({ isBusinessLoggedIn: true, businessEmail: email }),
      logoutBusiness: () => set({ isBusinessLoggedIn: false, businessEmail: '' }),
    }),
    {
      name: 'merini-store',
      partialize: (state) => ({
        cart: state.cart,
        isBusinessLoggedIn: state.isBusinessLoggedIn,
        businessEmail: state.businessEmail,
      }),
    }
  )
);