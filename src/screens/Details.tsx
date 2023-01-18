import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

export function Details() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Você esta na Details </Text>
        </View>
    );
}