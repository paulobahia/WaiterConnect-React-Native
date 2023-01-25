import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Feather, Octicons } from "@expo/vector-icons";
import { getCategories } from '../services';
import { Switch } from 'react-native';

export function Drawer1() {
    const [user, setUser] = useState()
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        Allcategories()
    }, []);

    async function Allcategories() {
        getCategories()
            .then((response) => setUser(response.data))
            .catch((err) => {
                console.error("ops! ocorrreu um erro" + err);
            });
    }

    return (
        <>
            <View className='flex justify-start items-start h-full w-full bg-slate-100 flex-col'>
                <View className='flex-row justify-start space-x-3 p-5 items-center'>
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../assets/logo.png')} />
                    <Text className='text-xl text-black'>Waiter App</Text>
                </View>
                <Text className='text-xs mb-3 ml-2 opacity-60 text-start text-black'>
                    Categorias
                </Text>
                <View className='w-full border-gray-600 border-b' />
                <View className='h-4/6 border-gray-600 w-full'>
                    <FlatList
                        data={user}
                        renderItem={({ item }) =>
                        (
                            <>
                                <Text className='text-black font-bold p-3'>{item.name}</Text>
                            </>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View className='flex-1 p-4 space-y-5 w-full justify-end'>
                    <View className='flex-row p-3 justify-between items-center'>
                        <Octicons style={{ transform: [{ rotateY: '180deg' }] }} name="moon" size={25} color="#FFF" />
                        <Text className='text-black font-semibold text-base'>
                            Dark Mode
                        </Text>
                        <Octicons style={{ transform: [{ rotateY: '180deg' }] }} name="moon" size={25} color="#FFF" />
                    </View>
                    <View className='flex-row space-x-4'>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../assets/avatar.png')} />
                        <View>
                            <Text className='text-black text-sm'>
                                Paulo Henrique
                            </Text>
                            <Text className='text-xs opacity-60 text-start text-black'>
                                Garçom
                            </Text>
                        </View>
                        <View className='flex-1 justify-center mr-1 items-end'>
                            <TouchableOpacity>
                                <Feather name="settings" size={23} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}
