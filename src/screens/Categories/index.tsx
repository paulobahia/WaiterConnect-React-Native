import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export function Categories(props) {
    const { route } = props
    return (
        <>
            <View className='flex bg-neutral-900 items-center justify-between flex-row p-5 rounded-b-3xl'>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="white" />
                </TouchableOpacity>
                <Text className='text-white font-medium text-lg'>{route.params.name}</Text>
                <Ionicons name="arrow-back" size={25} color="#171717" />
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                data={route.params.products}
                renderItem={({ item }) =>
                (
                    <TouchableOpacity className='flex-1 px-4' onPress={() => props.handlerBottomResult(item)}>
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
                )}
                keyExtractor={item => item.id}
            />
        </>
    );
}