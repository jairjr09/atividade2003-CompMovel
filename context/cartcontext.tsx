import { createContext, useContext, useState, useCallback, useMemo } from 'react';

type Produto = {
  id: string;
  nome: string;
  preco: number;
};

type CartItem = Produto & { quantidade: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (produto: Produto) => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((produto: Produto) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === produto.id);

      if (existing) {
        return prev.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...prev, { ...produto, quantidade: 1 }];
    });
  }, []);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve estar dentro do provider');
  return context;
};