import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

export function Cart(props) {
    const [listCart, setListCart] = useState([])
    const itensCart = props.route.params

    useEffect(() => {
        var listCart = itensCart.reduce((a, b) => {
            var i = a.findIndex(x => x.id === b.id)
            return i === -1 ? a.push({ id: b.id, name: b.name, price: b.price, imagePath: b.imagePath, ingredients: b.ingredients, quantity: 1 }) : a[i].quantity++, a
        }, [])
        setListCart(listCart)
    }, []);

    return (
        <>
            <View className='flex-1 items-center justify-center'>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Text className='mt-5 font-bold'>
                        Home
                    </Text>
                </TouchableOpacity>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={listCart}
                    renderItem={({ item }) =>
                    (
                        <>
                            <View className='flex items-center justify-center'>
                                <View className='flex-row'>
                                    <Text> Name: {item.name} </Text>
                                    <Text> Quantidade: {item.quantity} </Text>
                                    <Text> Preço: R$ {item.price},00 </Text>
                                </View>
                            </View>
                        </>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    );
}