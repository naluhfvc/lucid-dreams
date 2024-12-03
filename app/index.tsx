import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from "./app/home/Home";
import { FontAwesome } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: true,
            }}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
