import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import NearMe from "./screens/NearMe";
import ViewAll from "./screens/ViewAll";
import Saved from "./screens/Saved";

import { Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "NearMe") {
              iconName = focused ? "location" : "location-pin";
            } else if (route.name === "ViewAll") {
              iconName = "grid";
            } else if (route.name === "Saved") {
              iconName = "box";
            }

            // You can return any component that you like here!
            return <Entypo name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="NearMe" component={NearMe} />
        <Tab.Screen name="ViewAll" component={ViewAll} />
        <Tab.Screen name="Saved" component={Saved} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
