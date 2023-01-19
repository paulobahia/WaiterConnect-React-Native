import React from 'react';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { Search } from '../screens/Search';
import { Details } from '../screens/Details';
import { Profile } from '../screens/Profile';
import { FakeBtn } from '../screens/FakeBtn';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export function Router() {
    return (
        <Tabs.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tabs.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    )
                }} />
            <Tabs.Screen
                // Botão invisível 
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="search" color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="FakeBtn"
                component={FakeBtn}
                listeners={{ tabPress: e => { e.preventDefault() } }}
                options={{ tabBarShowLabel: false, tabBarIconStyle: { display: "none" } }}
            />
            <Tabs.Screen
                name="Details"
                component={Details}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="table-chair" color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" color={color} size={size} />
                    )
                }}
            />
        </Tabs.Navigator>
    );
}