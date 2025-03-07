import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Props } from '../navigation/props';

const products = [
  { id: '1', name: 'Nevermind', price: 50, image: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/1403878/tumblr_mv5ld2SrCM1sm0jo0o1_500.0.gif' },
  { id: '2', name: 'Twin Fantasy', price: 30, image: 'https://64.media.tumblr.com/021dc545fb83372f2ec19c0c841cf6c1/tumblr_p68f78fk761rtb1bvo1_1280.gif' },
  { id: '3', name: 'Beatopia', price: 20, image: 'https://i.scdn.co/image/ab67616d0000b273384d10f967c2b914de7e2713' },
  { id: '4', name: 'Requiem', price: 40, image: 'https://images.genius.com/77b0d1b460d9ba4d1388aad0722a8188.300x300x1.png' },
  { id: '5', name: 'Thats The Spirit', price: 25, image: 'https://cdn-images.dzcdn.net/images/cover/dd6af81a0d098fdd32e824fd43f2635d/0x1900-000000-80-0-0.jpg' },
  { id: '6', name: 'Puberty 2', price: 27, image: 'https://f4.bcbits.com/img/a0571397198_65' },
  { id: '7', name: 'Too Much of A Good Thing', price: 10, image: 'https://cdn-images.dzcdn.net/images/cover/e91f16eb6855a3aa4a314a573d7916f0/1900x1900-000000-80-0-0.jpg' },
  { id: '8', name: 'Lost in Japan', price: 5, image: 'https://media3.giphy.com/media/229vavgf9g4QQfyXKT/giphy.gif?cid=6c09b952aqn4c67uf7i6pxybkq8nr3shkljgh1nejg1l2pux&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g' },
  { id: '9', name: 'GNX', price: 12, image: 'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58' },
  { id: '10', name: 'Farewell Wanderlust', price: 17, image: 'https://i.scdn.co/image/ab67616d0000b27378918dd6dc11c62e60d489e3' },
];

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [cart, setCart] = useState<any[]>(route.params?.cart || []);
  const [totalCheckedOut, setTotalCheckedOut] = useState<number>(
    route.params?.totalCheckedOut || 0
  );

  useEffect(() => {
    if (route.params?.cart !== undefined) {
      setCart(route.params.cart);
    }
    if (route.params?.totalCheckedOut !== undefined) {
      setTotalCheckedOut(route.params.totalCheckedOut);
    }
  }, [route.params]);

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <Text style={styles.checkedOutText}>
          Total Checked Out: {totalCheckedOut}
        </Text>
      </View>
      
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.cardImage} 
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPrice}>${item.price}</Text>
              <Pressable 
                style={styles.cardButton} 
                onPress={() => addToCart(item)}
              >
                <Text style={styles.cardButtonText}>Add to Cart</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      
      <Pressable 
        style={styles.cartButton} 
        onPress={() => navigation.navigate('Cart', { 
          cart, 
          totalCheckedOut 
        })}
      >
        <Text style={styles.buttonText}>
          Go to Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#191724', 
    paddingBottom: 80 // Space for cart button
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e0def4',
  },
  checkedOutText: {
    fontSize: 16,
    color: '#908caa',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20
  },
  listContent: {
    paddingBottom: 20
  },
  productCard: {
    width: '48%',
    backgroundColor: '#2a273f',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#393552'
  },
  cardContent: {
    padding: 15
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e0def4',
    marginBottom: 8
  },
  cardPrice: {
    fontSize: 16,
    color: '#9ccfd8',
    marginBottom: 15
  },
  cardButton: {
    backgroundColor: '#eb6f92',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  cardButtonText: {
    color: '#e0def4',
    fontWeight: '600'
  },
  cartButton: { 
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    padding: 18,
    backgroundColor: '#31748f',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
  },
  buttonText: { 
    color: '#e0def4', 
    fontWeight: '700',
    fontSize: 16 
  }
});

export default HomeScreen;