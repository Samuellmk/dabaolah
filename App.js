import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import NearMe from "./screens/NearMe";
import ViewAll from "./screens/ViewAll";
import Saved from "./screens/Saved";
import Settings from "./screens/Settings";
import Details from "./screens/Details";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const CustomTabButton = (props) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, { borderTopColor: "#FE8B33", borderTopWidth: 2 }]
        : props.style
    }
  />
);

const NearMeStack = createStackNavigator();

function NearMeStackScreen() {
  return (
    <NearMeStack.Navigator>
      <NearMeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <NearMeStack.Screen
        options={{ headerShown: false }}
        name="NearMe"
        component={NearMe}
      />
    </NearMeStack.Navigator>
  );
}

const ViewAllStack = createStackNavigator();

function ViewAllStackScreen() {
  return (
      <ViewAllStack.Navigator mode="modal" headerMode = "none">
        <ViewAllStack.Screen 
          name="ViewAll" 
          component={ViewAll} 
          options={{ headerShown: false }}
        />
        <ViewAllStack.Screen 
          name="Details" 
          component={Details}
        />
      </ViewAllStack.Navigator>
  );
}

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
            } else if (route.name === "Saved") {
              iconName = focused ? "bookmark" : "bookmark-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#fbaf03",
          inactiveTintColor: "gray",
          labelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tab.Screen
          name="NearMe"
          component={NearMeStackScreen}
          options={{
            tabBarButton: CustomTabButton,
          }}
        />
        <Tab.Screen
          name="ViewAll"
          component={ViewAllStackScreen}
          options={{
            tabBarButton: CustomTabButton,
          }}
        />
        <Tab.Screen 
          name="Saved" 
          component={Saved} 
          options={{
          tabBarButton: CustomTabButton,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarButton: CustomTabButton,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
