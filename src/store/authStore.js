import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  orders: [],
  receipts: [],
  
  loginWithPhone: (phone, userData = {}) => {
    const user = {
      phone,
      name: userData.name || '',
      email: userData.email || '',
      createdAt: new Date().toISOString(),
    };
    set({ user, isAuthenticated: true });
  },
  
  updateUser: (userData) => set((state) => ({ 
    user: { ...state.user, ...userData } 
  })),
  
  logout: () => set({ user: null, isAuthenticated: false, orders: [], receipts: [] }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, { ...order, createdAt: new Date().toISOString() }]
  })),
  
  addReceipt: (receipt) => set((state) => ({
    receipts: [...state.receipts, { ...receipt, createdAt: new Date().toISOString() }]
  })),
}));

export default useAuthStore;
