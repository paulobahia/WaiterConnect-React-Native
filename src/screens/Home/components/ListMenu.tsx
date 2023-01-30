import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

export function ListMenu(props) {
    
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
                            <TouchableOpacity onPress={() => props.handlerResult(item)}>
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
                                            source={require('../../../assets/icons/coracao_off.png')} />
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
        <>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={props.data}
                renderItem={({ item }) =>
                (
                    <CardMenu data={item} />
                )}
                keyExtractor={item => item.id}
            />
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