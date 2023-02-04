import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import { getCategories } from '../../services';
import { ListCategories } from './components/ListCategories';
import { ListMenu } from './components/ListMenu';

export function Home() {

    const [categories, setCategories] = useState(null)
    const [itensCart, setItensCart] = useState([])

    useEffect(() => {
        getCategories()
            .then((response) => setCategories(response.data))
            .catch((err) => {
                console.error("Erro: " + err);
            });
    }, []);

    const itemHandler = (item) => {
        setItensCart(prevItensCart => [...prevItensCart, item])
    }

    return (
        <>
            <View className="flex-1 p-5 bg-neutral-100">
                <View className='flex-row items-center justify-between'>
                    <TouchableOpacity>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={require('../../assets/icons/menu.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart', itensCart)} activeOpacity={0.7} className='absolute right-0'>
                        <View className='bg-slate-900 p-4 items-center rounded-tr-xl rounded-tl-xl rounded-br-3xl rounded-bl-2xl justify-center'>
                            <Image
                                style={{ width: 22, height: 22 }}
                                source={require('../../assets/icons/cart.png')} />
                            {itensCart.length != 0 ? <View className='bg-red-600 w-6 h-6 left-9 bottom-9 absolute items-center justify-center  rounded-full'>
                                <Text className='text-white text-xs font-bold'>
                                    {itensCart.length}
                                </Text>
                            </View> : null}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.box} className='p-3 w-full rounded-full mt-8 mb-3 bg-white items-center justify-evenly flex-row'>
                    <View className='flex-row justify-start items-center space-x-3'>
                        <Image
                            style={{ width: 22, height: 22 }}
                            source={require('../../assets/icons/search.png')} />
                        <TextInput cursorColor={"#000"} className='flex w-3/4' placeholder="Pesquisar"
                            underlineColorAndroid="transparent" />
                    </View>
                    <View className='ml-3'>
                        <TouchableOpacity>
                            <Image
                                style={{ width: 22, height: 22 }}
                                source={require('../../assets/icons/filter.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <ListCategories data={categories} />
                </View>
                <ListMenu data={categories} handlerResult={itemHandler} />
            </View >
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