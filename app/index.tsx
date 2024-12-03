import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from "./home/HomeScreen";
import { FontAwesome } from "@expo/vector-icons";
import { MyDreamsScreen } from "./myDreams/MyDreamsScreen";

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
                component={HomeScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="MyDreams"
                component={MyDreamsScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FontAwesome name="cloud" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
