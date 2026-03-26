import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/cartcontext';
import { produtos } from '../data/produtos';

export default function Home() {
  const router = useRouter();
  const { cart, total } = useCart();

  const getEmoji = (nome: string) => {
    switch (nome) {
      case 'Notebook':
        return '💻';
      case 'Mouse':
        return '🖱️';
      case 'Teclado':
        return '⌨️';
      default:
        return '📦';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍️ Produtos</Text>

      {produtos.map(produto => (
        <TouchableOpacity
          key={produto.id}
          style={styles.card}
          onPress={() => router.push(`/produto/${produto.id}`)}
        >
          <Text style={styles.cardText}>
            {getEmoji(produto.nome)} {produto.nome}
          </Text>
          <Text style={styles.price}>R$ {produto.preco}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.title}>🛒 Carrinho</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Carrinho vazio</Text>
      ) : (
        cart.map(item => (
          <Text key={item.id} style={styles.cartItem}>
            {item.nome} x {item.quantidade}
          </Text>
        ))
      )}

      <Text style={styles.total}>💰 Total: R$ {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    marginTop: 5,
    color: 'green',
  },
  empty: {
    color: 'gray',
    marginVertical: 5,
  },
  cartItem: {
    fontSize: 16,
    marginVertical: 2,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});