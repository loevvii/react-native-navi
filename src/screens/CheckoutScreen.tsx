import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Props } from '../navigation/props';

const CheckoutScreen: React.FC<Props> = ({ navigation, route }) => {
  const { cart, totalCheckedOut } = route.params;
  const totalPrice = cart.reduce((sum: number, item: any) => 
    sum + item.price * item.quantity, 0
  );
  const totalItems = cart.reduce((sum: number, item: any) => 
    sum + item.quantity, 0
  );

  const handleCheckout = () => {
    Alert.alert(
      'Checkout Successful',
      'Thank you for your purchase!',
      [{
        text: 'OK',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ 
              name: 'Home',
              params: { 
                cart: [],
                totalCheckedOut: totalCheckedOut + totalItems
              }
            }]
          });
        }
      }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.checkoutItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              ${item.price} x {item.quantity} = ${item.price * item.quantity}
            </Text>
          </View>
        )}
      />
      <Text style={styles.totalText}>Total: ${totalPrice}</Text>
      <TouchableOpacity 
        style={styles.checkoutButton}
        onPress={handleCheckout}
      >
        <Text style={styles.buttonText}>Complete Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 20, 
      backgroundColor: '#191724' // Rose Pine background
    },
    title: { 
      fontSize: 24, 
      fontWeight: 'bold', 
      marginBottom: 20,
      color: '#e0def4' // Light text
    },
    checkoutItem: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginBottom: 10,
      padding: 15,
      backgroundColor: '#232136', // Darker surface
      borderRadius: 8
    },
    itemName: { 
      fontSize: 16,
      color: '#e0def4' // Light text
    },
    itemPrice: { 
      fontSize: 16, 
      color: '#9ccfd8' // Foam accent
    },
    totalText: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      textAlign: 'right', 
      marginVertical: 20,
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
      fontWeight: 'bold', 
      fontSize: 16 
    }
  });

export default CheckoutScreen;