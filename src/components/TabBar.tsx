import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

export function TabBar({ navigation }) {

    return (
        <>
            <View className='h-28 absolute items-center justify-center left-1 bottom-0'>
                <View className='bg-slate-900 flex-row w-11/12 rounded-3xl items-center justify-around h-3/5'>
                    <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                        <View className='w-11 h-11 justify-center items-center rounded-full'>
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={require('../assets/icons/home.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <View className='w-11 h-11 justify-center items-center rounded-full'>
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={require('../assets/icons/time.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Tables')}>
                        <View className='w-11 h-11 justify-center items-center rounded-full'>
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={require('../assets/icons/round-table.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <View className='w-11 h-11 justify-center items-center rounded-full'>
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={require('../assets/icons/user.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
