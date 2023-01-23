import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { getCategories } from '../services';

export function Drawer1() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        Allcategories()
    }, []);

    async function Allcategories() {
        getCategories()
            .then((response) => setUser(response.data))
            .catch((err) => {
                console.error("ops! ocorrreu um erro" + err);
            });
        console.log(user)
    }

    return (
        <>
            <View className='flex justify-start items-start h-full w-full bg-gray-800 flex-col'>
                <View className='flex-row justify-start space-x-3 p-4 items-center'>
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../assets/logo.png')} />
                    <Text className='text-xl text-white'>Waiter App</Text>
                </View>
                <View className='w-full border-gray-600 border-b' />
                <View className="flex-row p-4 justify-between items-center w-full">
                    <View className="flex-row justify-center items-center space-x-2">
                        <View>
                            <Image
                                style={{ width: 35, height: 35 }}
                                source={require('../assets/avatar.png')} />
                        </View>
                        <View className="flex justify-start flex-col items-start">
                            <Text className="cursor-pointer text-sm leading-5 text-white">Paulo Henrique</Text>
                            <Text className="cursor-pointer text-xs leading-3 text-gray-300">Garçom</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Feather name="settings" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <View className='w-full h-1/2 border-gray-600'>
                    <Text className='text-sm font-semibold leading-normal text-start ml-2 my-2 text-white'>
                        Categorias
                    </Text>
                    <Text>
                    </Text>
                    <ScrollView showsVerticalScrollIndicator={false} className='p-3 space-y-3 text-white'>
                        {/* <FlatList /> */}
                    </ScrollView>
                </View>
            </View>

        </>
    );
}
