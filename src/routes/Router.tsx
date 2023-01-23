import React from 'react';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Drawer1 } from '../components/Drawer1';
import { Home, Details, AddButton, Profile, Search } from '../screens/index'

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNavigation(navigation: any) {
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
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="search" color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                // Botão invisível 
                name="AddButton"
                component={AddButton}
                listeners={{ tabPress: e => { e.preventDefault() } }}
                options={{
                    tabBarShowLabel: false, tabBarIcon: ({ color, size }) => (
                        <AddButton />
                    )
                }}
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
    )
}

function DrawerNavigation() {
    return (
        <Drawer.Navigator drawerContent={props => <Drawer1 />} screenOptions={{ headerShown: false }}>
            <Drawer.Screen name='TabsNavigation' component={TabsNavigation} />
        </Drawer.Navigator>
    )
}

export function Router() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Drawer' component={DrawerNavigation} />
        </Stack.Navigator>
    );
}