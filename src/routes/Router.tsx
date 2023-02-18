import React, { useCallback, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, Tables, Profile, Waiting, Cart, SignIn } from '../screens/index'
import { TabBar } from '../components/TabBar';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();


function TabsNavigation() {

    const [isOpen, setIsOpen] = useState(false)

    const HandlerSheet = useCallback((item) => {
        setIsOpen(item)
    }, [isOpen])

    return (
        <Tabs.Navigator tabBar={props => <TabBar BottomSheet={isOpen} {...props} />} screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tabs.Screen
                name="Menu"
                children={props => <Home {...props} ChangeSheet={HandlerSheet} />}
            />
            <Tabs.Screen
                name="Waiting"
                component={Waiting} />
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
            <Stack.Screen name='Sign in' component={SignIn} />
            <Stack.Screen name='Home' component={TabsNavigation} />
            <Stack.Screen name='Cart' component={Cart} />
        </Stack.Navigator>
    );
}