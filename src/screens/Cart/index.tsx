import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';


export function Cart(props) {
    const [listCart, setListCart] = useState([])
    const [totalCart, setTotalCart] = useState(0)
    const [isScan, setIsScan] = useState(false)
    const [isQR, setIsQR] = useState(true)
    const { handleCountCart, itensCart } = props.route.params

    useEffect(() => {
        var listCart = itensCart.reduce((a, b) => {
            var i = a.findIndex(x => x.id === b.id)
            return i === -1 ? a.push({ id: b.id, name: b.name, price: b.price, imagePath: b.imagePath, ingredients: b.ingredients, quantity: 1 }) : a[i].quantity++, a
        }, [])
        setListCart(listCart)
    }, []);

    useEffect(() => {
        var totalCart = listCart.reduce((prevVal, currentVal) => {
            return prevVal + currentVal.price * currentVal.quantity
        }, 0)
        setTotalCart(totalCart)
    }, [listCart])

    const handlerItemOfCart = (item_id, type) => {

        switch (type) {

            case 'increment':
                setListCart(listCart => listCart.map((item) => item_id === item.id ? { ...item, quantity: item.quantity + 1 } : item))
                handleCountCart(item_id, "Add")
                break;

            case 'decrement':
                setListCart(listCart => listCart.map((item) => item_id === item.id ? { ...item, quantity: item.quantity - 1 } : item))
                handleCountCart(item_id, "Remove")
                break;

            case 'remove':
                setListCart(listCart.filter(item => item.id !== item_id))
                handleCountCart(item_id, "Remove")
                break;

            default:
                break;
        }

    }

    const CartList = ({ data }) => {
        return (
            <View className='pt-4 w-full items-center flex-row rounded-xl'>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                        uri: `http://192.168.15.200:3000/uploads/${data.imagePath}`
                    }} />
                <View className='flex-row justify-between items-center w-5/6'>
                    <View className='w-32'>
                        <Text numberOfLines={1} className='font-bold ml-3 text-white text-base'>{data.name}</Text>
                    </View>
                    <View className=''>
                        <Text className='text-white font-extralight text-sm'>
                            R$ {data?.price * data.quantity}
                        </Text>
                    </View>
                    <View className='flex-row items-center space-x-3'>
                        {data.quantity > 1 ? <View className='bg-gray-400 p-1 rounded-full'>
                            <TouchableOpacity onPress={() => handlerItemOfCart(data.id, 'decrement')}>
                                <AntDesign name="minus" size={12} color='white' />
                            </TouchableOpacity>
                        </View> :
                            <View className='bg-neutral-800 p-1 rounded-full'>
                                <TouchableOpacity onPress={() => handlerItemOfCart(data.id, 'decrement')}>
                                    <AntDesign name="minus" size={12} color='gray' />
                                </TouchableOpacity>
                            </View>}
                        <Text className='text-red-400 font-normal text-sm'>
                            {data.quantity}
                        </Text>
                        <View className='bg-gray-400 p-1 rounded-full'>
                            <TouchableOpacity onPress={() => handlerItemOfCart(data.id, 'increment')}>
                                <AntDesign name="plus" size={12} color="white" />
                            </TouchableOpacity>
                        </View>
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
            <View className='flex-1'>
                <View className='flex-1 w-full items-center justify-center bg-neutral-50'>
                    <View className='flex-row items-center p-2 rounded-md cursor-pointer '>
                        <TouchableOpacity onPress={() => setIsQR(true)}>
                            {isQR ? <Text className='px-4 py-2 rounded-l-md shadow-inner bg-gray-700  text-gray-100'>Código QR</Text> :
                                <Text className='px-4 py-2 rounded-l-md shadow-inner bg-gray-400  text-gray-100'>Código QR</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsQR(false)}>
                            {!isQR ? <Text className='px-4 py-2 rounded-r-md  text-gray-100 bg-gray-700'>Nº da Mesa</Text> :
                                <Text className='px-4 py-2 rounded-r-md  text-gray-100 bg-gray-400'>Nº da Mesa</Text>}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Lottie
                            style={{ height: 250 }}
                            autoPlay={true}
                            source={require('../../assets/lotties/scan_qrcode.json')}
                        />
                    </TouchableOpacity>
                    <Text className='text-gray-700 font-light text-xs'>Aguardando ser escaneado para identificação da mesa</Text>
                </View>
                <View className='flex-1 w-full p-3 bg-neutral-900'>
                    <View className='mt-6 flex-row items-center justify-between'>
                        <Text className='text-white text-base font-semibold'>Seu pedido</Text>
                        {isScan ? <TouchableOpacity className='border-gray-500 border flex-row rounded-md items-center'>
                            <Text className='text-gray-300 font-light text-xs px-2 py-1'>
                                Enviar pedido
                            </Text>
                            <Ionicons name="arrow-forward" style={{ marginRight: 4 }} size={20} color="white" />
                        </TouchableOpacity> : <TouchableOpacity disabled className='border-gray-600 border flex-row rounded-md items-center'>
                            <Text className='text-gray-500 font-light text-xs px-2 py-1'>
                                Enviar pedido
                            </Text>
                            <Ionicons name="arrow-forward" style={{ marginRight: 4 }} size={20} color="gray" />
                        </TouchableOpacity>}
                    </View>
                    <FlatList
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
                </View>
            </View>
        </>
    );
}