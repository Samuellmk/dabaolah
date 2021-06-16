import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import NearMe from "./screens/NearMe";
import ViewAll from "./screens/ViewAll";
import Saved from "./screens/Saved";
import Settings from "./screens/Settings";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "NearMe") {
              iconName = focused ? "location" : "location-outline";
            } else if (route.name === "ViewAll") {
              iconName = focused ? "grid" : "grid-outline";
            }
            // else if (route.name === "Saved") {
            //   iconName = focused ? "bookmark" : "bookmark-outline";
            else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          labelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tab.Screen name="NearMe" component={NearMe} />
        <Tab.Screen name="ViewAll" component={ViewAll} />
        {/* <Tab.Screen name="Saved" component={Saved} /> */}
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
