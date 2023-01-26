import React from 'react';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, Tables, Profile, Search } from '../screens/index'
import { TabBar } from '../components/TabBar';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNavigation() {
    return (
        <Tabs.Navigator tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tabs.Screen
                name="Menu"
                component={Home} />
            <Tabs.Screen
                name="Search"
                component={Search} />
            <Tabs.Screen
                name="Tables"
                component={Tables} />
            <Tabs.Screen
                name="Profile"
                component={Profile} />
        </Tabs.Navigator >
    )
}

export function Router() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={TabsNavigation} />
        </Stack.Navigator>
    );
}