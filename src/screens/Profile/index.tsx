import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context';

export function Profile() {
    const { singOutAccount, singOutWaiter } = useAuth()

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} className={'space-y-16'}>
            <TouchableOpacity onPress={singOutWaiter}>
                <Text>Sair do Usuario</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={singOutAccount}>
                <Text>Sair da Conta</Text>
            </TouchableOpacity>
        </View>
    );
}