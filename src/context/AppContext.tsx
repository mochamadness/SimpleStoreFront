import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, User, UserRole } from '../types/Product';
import { saveProducts, initializeProductData } from '../data/products';

interface AppContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  user: User | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize products from localStorage or sample data
    const initialProducts = initializeProductData();
    setProducts(initialProducts);

    // Check for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addProduct = (product: Product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  const login = (email: string, role: UserRole) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: email.split('@')[0]
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <AppContext.Provider value={{
      products,
      setProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      user,
      login,
      logout,
      isAdmin
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};