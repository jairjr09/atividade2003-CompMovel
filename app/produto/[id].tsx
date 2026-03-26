import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useCart } from '../../context/cartcontext';
import { produtos } from '../../data/produtos';

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams();
  const { cart, addToCart } = useCart();
  const inputRef = useRef<TextInput>(null);

  const produto = produtos.find(p => p.id === id);

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

  const item = cart.find(item => item.id === id);
  const quantidade = item ? item.quantidade : 0;

  if (!produto) return <Text>Produto não encontrado</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {getEmoji(produto.nome)} {produto.nome}
      </Text>

      <Text style={styles.price}>💰 R$ {produto.preco}</Text>

      <TextInput
        ref={inputRef}
        value={`Quantidade no carrinho: ${quantidade}`}
        editable={false}
        style={styles.input}
      />

      <View style={styles.button}>
        <Button
          title="➕ Adicionar ao carrinho"
          onPress={() => {
            addToCart(produto);
            inputRef.current?.focus();
          }}
        />
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 15,
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});