import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export function TabBar({ navigation, BottomSheet }) {

    return (
        <>
            {!BottomSheet ? <View className='h-28 absolute items-center justify-center left-1 bottom-0'>
                <View className='bg-neutral-900 flex-row w-11/12 rounded-3xl items-center justify-around h-3/5'>
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
                                source={require('../assets/icons/search.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                        <View className='w-11 h-11 justify-center items-center rounded-full'>
                            <Image
                                style={{ width: 24, height: 24 }}
                                source={require('../assets/icons/order.png')} />
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
            </View> : null}
        </>
    );
}
