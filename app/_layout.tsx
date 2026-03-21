import { Stack } from 'expo-router';
import { CartProvider } from './context/cartcontext';

export default function Layout() {
  return (
    <CartProvider>
      <Stack />
    </CartProvider>
  );
}