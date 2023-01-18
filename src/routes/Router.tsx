import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Notifications } from '../screens/Notifications';
import { Details } from '../screens/Details';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Notifications" component={Notifications} />
        </Drawer.Navigator>
    );
}
export function Router() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Drawer" component={DrawerNavigation} />
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    );
}