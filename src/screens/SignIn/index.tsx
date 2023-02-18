import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

export function SignIn({ navigation }) {

    const teste = () => {
        console.log("Opa")
    }

    return (
        <View className='flex w-full h-full'>
            <View className='bg-neutral-50 w-full h-1/2'>
                <View style={{ borderBottomRightRadius: 50 }} className='bg-cyan-800 space-y-5 w-full h-full items-center justify-center'>
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={require('../../assets/logo.png')} />
                    <Text className='font-bold text-white text-2xl text-center'> Welcome Back! </Text>
                </View>
            </View>
            <View className='bg-cyan-800 w-full h-1/2'>
                <View style={{ borderTopLeftRadius: 50 }} className='bg-neutral-50 flex justify-center w-full h-full'>
                    <View className='mb-3 sp p-10 space-y-7 items-start'>
                        <View className='w-full'>
                            <Text className='text-black font-semibold text-sm'>E-mail</Text>
                            <View className='mt-2 border-b-2 border-b-gray-300'>
                                <TextInput cursorColor={"#000"} placeholderTextColor={'#c0c0c0'} className='font-bold text-sm' placeholder="email@gmail.com.br" />
                            </View>
                        </View>
                        <View className='w-full'>
                            <Text className='text-black font-semibold text-sm'>Senha</Text>
                            <View className='mt-2 border-b-2 border-b-gray-300'>
                                <TextInput onFocus={teste} secureTextEntry={true} cursorColor={"#000"} placeholderTextColor={'#c0c0c0'} className='font-bold text-sm' placeholder="********" />
                            </View>
                        </View>
                        <View className='flex-row space-x-10'>
                            <View className='flex-row items-center space-x-3'>
                                <View className='bg-slate-300 w-5 h-5'>

                                </View>
                                <Text>
                                    Lembre de mim
                                </Text>
                            </View>
                                <Text className='' >
                                    Esqueceu a senha ?
                                </Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} className='w-full hidden justify-center h-16 rounded-xl bg-cyan-600'>
                            <Text className='text-center text-white text-lg font-extrabold '>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}