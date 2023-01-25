import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Image, ScrollView } from 'react-native';
import { logo } from '../../assets/logo.png';

export function Home() {

    const FAKE_DATA = [
        {
            id: '1',
            name: 'Sushi',
            price: '5,20',
        },
        {
            id: '2',
            name: 'Hot Roll',
            price: '3,20',
        },
        {
            id: '3',
            name: 'Pizza',
            price: '1,50'
        },
        {
            id: '4',
            name: 'Refri',
            price: '9,90'
        },
        {
            id: '5',
            name: 'Arroz',
            price: '10,50'
        },
        {
            id: '6',
            name: 'Sorvete',
            price: '2,05'
        },
        {
            id: '7',
            name: 'Massa',
            price: '10,40'
        },
        {
            id: '8',
            name: 'Vinho',
            price: '1,90'
        },
        {
            id: '9',
            name: 'Cerveija',
            price: '15,00'
        },
        {
            id: '10',
            name: 'Hamburguer',
            price: '0,50'
        },
    ]


    const Cards = ({ data }) => (
        <TouchableOpacity activeOpacity={0.8}>
            <View className='bg-slate-100 shadow-xl shadow-slate-400 my-1.5 mx-4 p-3 m flex-row rounded-xl'>
                <Image
                    className='rounded-xl'
                    style={{ width: 100, height: 100 }}
                    source={require('../../assets/hot_roll.jpeg')} />
                <View className='items-center justify-between p-2'>
                    <Text className='text-lg font-extrabold'>{data.name}</Text>
                    <Text>R$ {data.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )


    return (
        <View className="flex justify-center">
            <View className='justify-center'>
                <FlatList
                    data={FAKE_DATA}
                    renderItem={({ item }) =>
                    (
                        <Cards data={item} />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}