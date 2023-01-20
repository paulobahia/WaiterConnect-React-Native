import React from 'react';
import { View, Text } from 'react-native';
import { Drawer } from '../components/Drawer';

export function Home() {

    return (
        <View className="flex-1 bg-white">
            <Drawer />
        </View>
    );
}