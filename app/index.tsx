import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { produtos } from '../data/produtos';
import { useCart } from './context/cartcontext';

export default function Home() {
  const router = useRouter();
  const { cart, total } = useCart();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Produtos</Text>

      {produtos.map(produto => (
        <TouchableOpacity
          key={produto.id}
          onPress={() => router.push(`/produto/${produto.id}`)}
        >
          <Text>
            {produto.nome} - R$ {produto.preco}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={{ marginTop: 20, fontSize: 20 }}>Carrinho</Text>

      {cart.length === 0 ? (
        <Text>Vazio</Text>
      ) : (
        cart.map(item => (
          <Text key={item.id}>
            {item.nome} x {item.quantidade}
          </Text>
        ))
      )}

      <Text>Total: R$ {total}</Text>
    </View>
  );
}