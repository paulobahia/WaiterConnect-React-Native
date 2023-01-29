import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, SectionList } from 'react-native';
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
            <View className='p-1'>
                <View className='flex-row mt-3 space-x-3 items-center'>
                    <Text className='text-base font-semibold'>{data.name}</Text>
                    <View className='w-full border-neutral-300 mt-1 border-b' />
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={data.products}
                    renderItem={({ item }) =>
                    (
                        <>
                            <TouchableOpacity>
                                <View className='mt-5 shadow-red-600 shadow-2xl space-x-3 p-4 w-full flex-row bg-white rounded-xl'>
                                    <Image
                                        style={{ width: 80, height: 80 }}
                                        source={{
                                            uri: `http://192.168.15.200:3000/uploads/${item.imagePath}`
                                        }} />
                                    <View className='justify-between'>
                                        <View className='space-y-1'>
                                            <Text className='font-normal text-black text-sm'>{item.name}</Text>
                                            <Text className='font-normal text-gray-500 text-xs'>{item.description}</Text>
                                        </View>
                                        <Text className='font-bold text-base'>R$ {item.price},00</Text>
                                    </View>
                                    <TouchableOpacity className='absolute m-3 right-0'>
                                        <Image
                                            style={{ width: 22, height: 22 }}
                                            source={require('../../assets/icons/coracao_off.png')} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    )

    return (
        <View className="flex-1 p-5 bg-neutral-100">
            <View className='flex-row items-center justify-between'>
                <TouchableOpacity>
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={require('../../assets/icons/menu.png')} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} className='absolute right-0'>
                    <View className='bg-black p-4 items-center rounded-tr-xl rounded-tl-xl rounded-br-3xl rounded-bl-2xl justify-center'>
                        <Image
                            style={{ width: 22, height: 22 }}
                            source={require('../../assets/icons/cart.png')} />
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
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={categories}
                    renderItem={({ item }) =>
                    (
                        <CardCategories data={item} />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={categories}
                renderItem={({ item }) =>
                (
                    <CardMenu data={item} />
                )}
                keyExtractor={item => item.id}
            />
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