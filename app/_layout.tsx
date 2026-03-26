import { Stack } from 'expo-router';
import { CartProvider } from '../context/cartcontext';

export default function Layout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen
          name="produto/[id]"
          options={{ title: 'Detalhes do Produto' }}
        />
      </Stack>
    </CartProvider>
  );
}