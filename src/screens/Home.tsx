import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Button } from 'react-native';

export function Home() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Details"
            />
        </View>
    );
}