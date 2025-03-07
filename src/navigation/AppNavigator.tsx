import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Pressable, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#191724', // Rose Pine background
            },
            headerTitleStyle: {
              color: '#e0def4', // Light text
            },
            headerShadowVisible: true,
            headerShadowColor: '#232136', // Darker shadow
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen} 
            options={({ navigation }) => ({
              title: '     Your Cart',
              headerLeft: () => (
                <Pressable 
                  style={{ marginLeft: 15 }}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: '#9ccfd8', fontSize: 16 }}>Back</Text>
                </Pressable>
              )
            })}
          />
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen} 
            options={({ navigation }) => ({
              title: 'Checkout',
              headerLeft: () => (
                <Pressable 
                  style={{ marginLeft: 15 }}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={{ color: '#9ccfd8', fontSize: 16 }}>Back</Text>
                </Pressable>
              )
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default AppNavigator;