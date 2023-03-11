import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';

export function ListMenu(props) {

    const CardMenu = ({ data }) =>
    (
        <>
            <View className='px-3 py-2'>
                <View className='flex-row mt-3 space-x-3 items-center'>
                    <Text className='text-base font-semibold'>{data.name}</Text>
                    <View className='w-full border-neutral-300 mt-1 border-b' />
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={data.products}
                    numColumns={2}
                    renderItem={({ item }) =>
                    (
                        <>
                            <TouchableOpacity className='flex-1 mx-2' onPress={() => props.handlerBottomResult(item)}>
                                <View className='mt-5 flex-1 bg-white rounded-2xl'>
                                    <Text className='font-semibold text-center my-2 text-black text-sm'>{item.name}</Text>
                                    <View className='items-center mt-1'>
                                        <Image
                                            style={{ width: 80, height: 80 }}
                                            source={{
                                                uri: `http://192.168.15.200:3000/uploads/${item.imagePath}`
                                            }} />
                                    </View>
                                    <View className='justify-between mt-1 items-center flex-row'>
                                        <Text className='font-medium ml-3 text-base'>R$ {item.price},00</Text>
                                        <TouchableOpacity onPress={() => props.handlerResult(item)} className='bg-neutral-900 p-3 rounded-tl-2xl rounded-br-2xl'>
                                            <AntDesign name="plus" size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>
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
