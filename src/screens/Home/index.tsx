import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getCategories } from '../../services';

export function Home() {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        getCategories()
            .then((response) => setCategories(response.data))
            .catch((err) => {
                console.error("ops! ocorrreu um erro" + err);
            });
    }, []);

    const CardCategories = ({ data }) =>
    (
        <View className='p-5 items-center'>
            <View style={styles.box} className='bg-white w-14 h-14 justify-center rounded-full'>
                <TouchableOpacity activeOpacity={0.2}>
                    <Text className='text-center text-xl'>{data.icon}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const CardMenu = ({ data }) =>
    (
        <>
            <View className='p-5 items-start'>
                <Text className='text-base font-semibold'>{data.name}</Text>
                {/* <FlatList
                    className='mt-2'
                    data={data.products}
                    renderItem={({ item }) =>
                    (
                        <Text>{item.name}</Text>
                    )}
                    keyExtractor={item => item.id}
                /> */}
            </View>
        </>
    )

    return (
        <View className="flex-1 p-5 bg-slate-50">
            <View>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center'>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('../../assets/logo.png')} />
                        <Text className='text-xl font-extrabold'>
                            Connect Waiter
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                        <View className='bg-black p-4 items-center rounded-tr-xl rounded-tl-xl rounded-br-3xl rounded-bl-2xl justify-center'>
                            <Image
                                style={{ width: 22, height: 22 }}
                                source={require('../../assets/icons/cart.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.box} className='p-3 space-x-3 w-full rounded-full mt-10 bg-white items-center justify-start flex-row'>
                    <Image
                        className='ml-2'
                        style={{ width: 22, height: 22 }}
                        source={require('../../assets/icons/search.png')} />
                    <TextInput cursorColor={"#000"} className='flex w-2/3' placeholder="Pesquisar"
                        underlineColorAndroid="transparent" />
                </View>
                <FlatList
                    className='mt-2'
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={categories}
                    renderItem={({ item }) =>
                    (
                        <CardCategories data={item} />
                    )}
                    keyExtractor={item => item.id}
                />
                <FlatList
                    className='mt-2'
                    data={categories}
                    renderItem={({ item }) =>
                    (
                        <CardMenu data={item} />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
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