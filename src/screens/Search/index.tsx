import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import socket from '../../utils/socket';

export function Search() {

    const [isPica, setIsPica] = useState('Jorgeeee')

    const onChangeHandler = () => {
        socket.emit('createdMessage', "Mensagem WebSocket")
    }   

    return (
        <View className='flex-1 justify-center items-center'>
            <TouchableOpacity onPress={onChangeHandler}>
                <Text>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}
