import { View, Text, Button, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { produtos } from '../../data/produtos';
import { useCart } from '../context/cartcontext';
import { useRef } from 'react';

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams();
  const { cart, addToCart } = useCart();
  const inputRef = useRef<TextInput>(null);

  const produto = produtos.find(p => p.id === id);

  const item = cart.find(item => item.id === id);
  const quantidade = item ? item.quantidade : 0;

  if (!produto) return <Text>Produto não encontrado</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{produto.nome}</Text>
      <Text>Preço: R$ {produto.preco}</Text>


      <TextInput
        ref={inputRef}
        value={String("Quantidade no carrinho: " + quantidade)}
        editable={false}
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />

      <Button
        title="Adicionar ao carrinho"
        onPress={() => {
          addToCart(produto);
          inputRef.current?.focus();
        }}
      />
    </View>
  );
}