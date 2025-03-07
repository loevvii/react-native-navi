import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Props } from '../navigation/props';

const CartScreen: React.FC<Props> = ({ navigation, route }) => {
  const [cart, setCart] = useState<any[]>(route.params?.cart || []);
  const totalCheckedOut = route.params?.totalCheckedOut || 0;

  useEffect(() => {
    navigation.setParams({ cart });
  }, [cart]);

  const updateQuantity = (id: string, change: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(item.quantity + change, 0) } 
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productText}>{item.name}</Text>
              <Text style={styles.productPrice}>
                ${item.price * item.quantity}
              </Text>
            </View>
            <View style={styles.quantityControls}>
              <Pressable 
                style={styles.quantityButton} 
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text style={styles.buttonText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <Pressable 
                style={styles.quantityButton} 
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text style={styles.buttonText}>+</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <Text style={styles.totalText}>Total: ${totalPrice}</Text>
      <Pressable 
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Checkout', { 
          cart, 
          totalCheckedOut 
        })}
      >
        <Text style={styles.buttonText}>Proceed to Checkout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 20, 
      backgroundColor: '#191724' // Rose Pine background
    },
    cartItem: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      marginBottom: 15 
    },
    productImage: { 
      width: 60, 
      height: 60, 
      marginRight: 15,
      borderRadius: 8
    },
    productInfo: { 
      flex: 1 
    },
    productText: { 
      fontSize: 16,
      color: '#e0def4' // Light text
    },
    productPrice: { 
      fontSize: 16, 
      fontWeight: 'bold',
      color: '#9ccfd8' // Foam accent
    },
    quantityControls: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      marginLeft: 15 
    },
    quantityButton: { 
      backgroundColor: '#232136', // Darker background
      padding: 8, 
      borderRadius: 5 
    },
    quantityText: { 
      marginHorizontal: 10, 
      fontSize: 16,
      color: '#e0def4' // Light text
    },
    totalText: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      textAlign: 'right', 
      marginBottom: 20,
      color: '#f6c177' // Gold accent
    },
    checkoutButton: { 
      backgroundColor: '#eb6f92', // Rose accent
      padding: 15, 
      alignItems: 'center', 
      borderRadius: 10 
    },
    buttonText: { 
      color: '#fff', 
      fontWeight: 'bold' 
    }
  });

export default CartScreen;