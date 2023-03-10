import React, { useCallback, useContext, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, Search, Profile, Order, Cart, SignIn, WaiterSelection, Categories } from '../screens/index'
import { TabBar } from '../components/TabBar';
import { useAuth } from '../context/index';;

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
                name="Order"
                component={Order} />
            <Tabs.Screen
                name="Search"
                component={Search} />
            <Tabs.Screen
                name="Profile"
                component={Profile} />
        </Tabs.Navigator >
    )
}

function SignInStack() {
    const { authAccountData } = useAuth()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {authAccountData ? <Stack.Screen name='Waiter Selection' component={WaiterSelection} /> : <Stack.Screen name='Sign in' component={SignIn} />}
        </Stack.Navigator>
    )
}

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={TabsNavigation} />
            <Stack.Screen name='Categories' component={Categories} />
            <Stack.Screen name='Cart' component={Cart} />
        </Stack.Navigator>
    )
}

export function Router() {
    const { authWaiterData } = useAuth()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {authWaiterData ? <Stack.Screen name='AuthStack' component={AuthStack} /> : <Stack.Screen name='Sign in Stack' component={SignInStack} />}
        </Stack.Navigator>
    );
}