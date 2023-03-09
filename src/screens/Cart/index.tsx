import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';
import Toast from 'react-native-toast-message';

import Scanner from '../../components/Scanner';
import { createOrderID, createOrders } from '../../services';
import { getUserId } from '../../utils/methods';
import socket from '../../utils/socket';

export function Cart(props) {

    const [listCart, setListCart] = useState([])
    // const [totalCart, setTotalCart] = useState(0)
    const [isScaned, setIsScaned] = useState(false)
    const [isQRValue, setIsQrValue] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { handleCountCart, itensCart, clearCart } = props.route.params

    useEffect(() => {
        var listCart = itensCart.reduce((a, b) => {
            var i = a.findIndex(x => x.id === b.id)
            return i === -1 ? a.push({ id: b.id, name: b.name, price: b.price, imagePath: b.imagePath, ingredients: b.ingredients, quantity: 1 }) : a[i].quantity++, a
        }, [])
        setListCart(listCart)
    }, []);

    // useEffect(() => {
    //     var totalCart = listCart.reduce((prevVal, currentVal) => {
    //         return prevVal + currentVal.price * currentVal.quantity
    //     }, 0)
    //     setTotalCart(totalCart)
    // }, [])

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

    const onChangeHandler = () => {
        socket.emit('createdMessage', listCart)
    }

    const scanAgain = () => {
        setIsQrValue("")
        setIsScaned(false)
        setModalVisible(true)
    }

    const onCodeScanned = (data) => {
        setIsScaned(true)
        setIsQrValue(data)
        setModalVisible(false);
    };

    async function createOrder() {
        var orderResponse = ''
        let userId

        userId = await getUserId()

        let dataOrderId = {
            userId,
            tableId: isQRValue
        }
        setIsLoading(true)
        await createOrderID(dataOrderId)
            .then((response) => {
                orderResponse = response.data
            })
            .catch((err) => {
                setIsLoading(false)
                console.error(err.response.data);
            });

        listCart.forEach(element => {
            if (element != undefined) {
                let dataOrder = {
                    quantity: element.quantity,
                    productsId: element.id,
                    orderId: orderResponse.id
                }
                createOrders(dataOrder)
                    .then((response) => {
                        return response.data
                    })
                    .catch((err) => {
                        setIsLoading(false)
                        console.error(err.response.data);
                    });
            }

            onChangeHandler()
            setListCart([])
            clearCart()
            setIsLoading(false)
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Pedido enviado para a cozinha 👨‍🍳'
            });
            props.navigation.navigate('Menu')
        });
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
            <>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className='flex-1 justify-center items-center bg-gray-200'>
                        <Scanner onCodeScanned={onCodeScanned} />
                        <Lottie
                            autoSize
                            style={{ position: 'absolute' }}
                            autoPlay
                            source={require('../../assets/lotties/scanning-qr-code.json')}
                        />
                        <TouchableOpacity className='bg-neutral-900 p-3 rounded-full bottom-10 left-10 absolute'>
                            <Ionicons name="flashlight" size={40} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)} className='bg-neutral-900 p-3 rounded-full flex bottom-10 items-center justify-center right-10 absolute'>
                            <Ionicons name="close" size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </>
            <View className='flex-1'>
                {isScaned ? <View className='flex-1 w-full items-center justify-end bg-neutral-50'>
                    <View className='absolute h-full items-center justify-center'>
                        <Image
                            style={{ width: 300, height: 300 }}
                            source={require('../../assets/icons/round-table.png')} />
                        <Text className='text-white absolute font-extrabold text-base'>10</Text>
                    </View>
                    <TouchableOpacity onPress={scanAgain}>
                        <Text className='px-4 py-2 mb-5 rounded-md font-normal text-center text-xs bg-gray-300 mt-5 text-neutral-7c00'>Scannear novamente</Text>
                    </TouchableOpacity>
                </View> : <View className='flex-1 w-full items-center justify-center bg-neutral-50'>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Lottie
                            style={{ height: 250 }}
                            autoPlay={true}
                            source={require('../../assets/lotties/scan_qrcode.json')}
                        />
                    </TouchableOpacity>
                    <Text className='text-gray-700 font-light text-xs'>Aguardando ser escaneado para identificação da mesa</Text>
                </View>}
                <View className='flex-1 w-full p-3 bg-neutral-900'>
                    <View className='mt-6 flex-row items-center justify-between'>
                        <Text className='text-white text-base font-semibold'>Seu pedido</Text>
                        {isScaned && listCart.length != 0 ? <TouchableOpacity onPress={() => createOrder()} className='border-gray-500 border flex-row rounded-md items-center'>
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
                    {!isLoading ? <FlatList
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
                    /> : <View className='flex-1 w-full p-3 justify-center items-center bg-neutral-900'>
                        <View className='bg-white rounded-full p-2'>
                            <Lottie
                                style={{ height: 180 }}
                                autoPlay={true}
                                source={require('../../assets/lotties/loading.json')}
                            />
                        </View>
                    </View>}
                </View>
            </View>
        </>
    );
}