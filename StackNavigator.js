import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { View, Text } from "react-native";
import React from "react";
import Home from "./src/screens/HomeScreen";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Category from "./src/screens/CategoryScreen";
// import MyOrder from "./src/screens/MyOrderScreen";
import Account from "./src/screens/AccountScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import About from "./src/screens/AboutScreen";
import DetailProductScreen from "./src/screens/DetailProductScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import MyCart from "./src/screens/MyCartScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import AddressScreem from "./src/screens/AddressScreem";
import InformationScreen from "./src/screens/InformationScreen";
import MyOrderScreen from "./src/screens/MyOrderScreen";
import NameScreen from "./src/screens/NameScreen";
import PhoneScreen from "./src/screens/PhoneScreen";
import DetailOrderScreen from "./src/screens/DetailOrderScreen";
import OrderSuccessScreen from "./src/screens/OrderSuccessScreen";
// import DrawerCartComponent from "./src/components/DrawerCartComponent/DrawerCartComponent";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

const focusedLabelStyle = {
  color: "#4dab96",
  fontSize: 12,
};

const unfocusedLabelStyle = {
  color: "black",
  fontSize: 12,
};
const StackNavigator = () => {
  const BottomTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="home-sharp" size={24} color="#4dab96" />
              ) : (
                <Ionicons name="home-outline" size={24} color="black" />
              ),
            tabBarLabel: ({ focused }) => (
              <Text style={focused ? focusedLabelStyle : unfocusedLabelStyle}>
                Home
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            tabBarLabel: "Category",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="appstore1" size={24} color="#4dab96" />
              ) : (
                <AntDesign name="appstore-o" size={24} color="black" />
              ),
            tabBarLabel: ({ focused }) => (
              <Text style={focused ? focusedLabelStyle : unfocusedLabelStyle}>
                Category
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={MyCart}
          options={{
            tabBarLabel: "Cart",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="cart-sharp" size={24} color="#4dab96" />
              ) : (
                <Ionicons name="cart-outline" size={24} color="black" />
              ),

            tabBarLabel: ({ focused }) => (
              <Text style={focused ? focusedLabelStyle : unfocusedLabelStyle}>
                Cart
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: "Account",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person-sharp" size={24} color="#4dab96" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
            tabBarLabel: ({ focused }) => (
              <Text style={focused ? focusedLabelStyle : unfocusedLabelStyle}>
                Account
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Detail" component={DetailProductScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Order" component={MyOrderScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        <Stack.Screen name="DetailOrder" component={DetailOrderScreen} />
        <Stack.Screen name="Information" component={InformationScreen} />
        <Stack.Screen name="Address" component={AddressScreem} />
        <Stack.Screen name="Name" component={NameScreen} />
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      {/* <Drawer.Navigator>
        <Drawer.Screen name="DrawerCart" component={DrawerCartComponent} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default StackNavigator;
