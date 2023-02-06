import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export function Cart(props) {
    const [listCart, setListCart] = useState([])
    const [totalCart, setTotalCart] = useState(0)
    const itensCart = props.route.params

    useEffect(() => {
        var listCart = itensCart.reduce((a, b) => {
            var i = a.findIndex(x => x.id === b.id)
            return i === -1 ? a.push({ id: b.id, name: b.name, price: b.price, imagePath: b.imagePath, ingredients: b.ingredients, quantity: 1 }) : a[i].quantity++, a
        }, [])
        setListCart(listCart)
    }, []);

    useEffect(() => {
        var totalCart = itensCart.reduce((prevVal, currentVal) => {
            return prevVal + currentVal.price
        }, 0)
        setTotalCart(totalCart)
    }, [])

    console.log(listCart)

    const CartList = ({ data }) => {
        return (
            <View className='mt-5 shadow-2xl space-x-3 p-4 w-full flex-row bg-white rounded-xl'>
                <Image
                    style={{ width: 85, height: 85 }}
                    source={{
                        uri: `http://192.168.15.200:3000/uploads/${data.imagePath}`
                    }} />
                <View className='justify-between'>
                    <View className='space-y-1'>
                        <Text className='font-normal text-black text-sm'>{data.name}</Text>
                    </View>
                    <View className='items-center w-full space-x-28 flex-row'>
                        <View className='bg-gray-200 rounded-xl flex items-center w-1/3 justify-center h-10'>
                            <View className='flex-row items-center space-x-3'>
                                <TouchableOpacity >
                                    <AntDesign name="minus" size={20} color='black' />
                                </TouchableOpacity>
                                <Text className='text-lg font-medium'>
                                    {data.quantity}
                                </Text>
                                <TouchableOpacity >
                                    <AntDesign name="plus" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text className='text-black font-medium text-base'>
                            R$ {data?.price * data.quantity}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            <View className='flex bg-neutral-900 p-5 rounded-b-3xl'>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-white font-medium text-lg'>Pedidos</Text>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons name="ios-close-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='p-5 flex-1 bg-neutral-100'>
                {listCart.length != 0 ? <FlatList
                    style={{
                        flexGrow: 0,
                    }}
                    showsVerticalScrollIndicator={false}
                    data={listCart}
                    renderItem={({ item }) =>
                    (
                        <CartList data={item} />
                    )}
                    keyExtractor={item => item.id}
                />
                    : null}
            </View>
            <View className='px-4'>
                <View className='w-full border-neutral-400 border-b' />
            </View>
            <View className='px-10 py-5 bg-neutral-100 w-full'>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-xl font-medium'>
                        Total
                    </Text>
                    <Text className='text-xl font-medium'>
                        R$ {totalCart}
                    </Text>
                </View>
            </View>
            <View className='items-center bg-neutral-100 p-3 justify-center flex'>
                <TouchableOpacity className='bg-slate-900 p-4 flex-row w-11/12 rounded-3xl items-center justify-around'>
                    <Text className='text-lg text-white font-semibold'>
                        Fazer pedido
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    box: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
});