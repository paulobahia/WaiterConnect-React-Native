import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { getCategories } from '../../services';


export function Home(props: any) {

    return (
        <View className="flex-1 bg-pink-100 justify-center">
            <View className='justify-center p-5 space-y-5'>
                <View className='bg-slate-50 p-5 space-x-5 flex-row rounded-xl'>
                    <Image
                        className='rounded-xl'
                        style={{ width: 120, height: 120 }}
                        source={require('../../assets/hot_roll.jpeg')} />
                    <View className='justify-between'>
                        <Text>Hot Roll</Text>
                        <Text>R$ 5,20</Text>
                    </View>
                </View>
                <View className='bg-slate-50 p-5 space-x-5 flex-row rounded-xl'>
                    <Image
                        className='rounded-xl'
                        style={{ width: 120, height: 120 }}
                        source={require('../../assets/hot_roll.jpeg')} />
                    <View className='justify-between'>
                        <Text>Hot Roll</Text>
                        <Text>R$ 5,20</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}