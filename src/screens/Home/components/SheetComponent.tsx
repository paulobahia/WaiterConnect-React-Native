import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export function SheetComponent({ item, handlerResult }) {

    const [countItens, setCoutItens] = useState(1)

    const increment = () => {
        setCoutItens(countItens + 1)
    }

    const decrement = () => {
        setCoutItens(countItens - 1)
    }

    const handlerResultCart = (item) => {
        for (var i = 0; i < countItens; i++) {
            handlerResult(item)
        }
        setCoutItens(1)
    }

    return (
        <View className='flex h-full'>
            <View className='bg-neutral-50 w-full h-3/5 flex items-center justify-center'>
                <Image
                    style={{ width: '100%', height: '90%' }}
                    source={{
                        uri: `http://192.168.15.200:3000/uploads/${item?.imagePath}`
                    }} />
            </View>
            <View className='items-start p-5'>
                <Text numberOfLines={1} adjustsFontSizeToFit={true} className='font-medium w-full text-4xl'>
                    {item?.name}
                </Text>
                <Text className='font-normal text-gray-300 text-sm'>
                    230 g
                </Text>
                <View className='my-3'>
                    <Text className='text-lg font-medium'>
                        Ingredientes
                    </Text>
                    <ScrollView className='py-2 h-20 max-h-20'>
                        <Text className='text-xs text-gray-500 text-ellipsis font-normal'>
                            {item?.ingredients}
                            Proteína de Ervilha, Mandioquinha, Cebola, Levedura Nutricional (Nutritional Yeast Puravida), Sal Rosa do Himalaia, Tomate, Alho.
                        </Text>
                    </ScrollView>
                </View>
                <View className='w-full justify-between flex-row'>
                    <View className='bg-gray-200 rounded-xl flex items-center justify-center w-1/3 h-14'>
                        <View className='flex-row items-center space-x-6'>
                            <TouchableOpacity onPress={decrement} disabled={countItens == 1}>
                                <AntDesign name="minus" size={20} color={countItens == 1 ? '#b8bfc2' : 'black'} />
                            </TouchableOpacity>
                            <Text className='text-lg font-medium'>
                                {countItens}
                            </Text>
                            <TouchableOpacity onPress={increment}>
                                <AntDesign name="plus" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => handlerResultCart(item)} className='bg-neutral-900 flex justify-center rounded-xl w-3/5 h-14'>
                        <View className='flex-row justify-around'>
                            <Text className='text-white font-medium text-base'>
                                Adicionar
                            </Text>
                            <Text className='text-white font-medium text-base'>
                                R$ {item?.price}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
