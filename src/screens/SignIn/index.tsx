import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form'
import Lottie from 'lottie-react-native';
import { useAuth } from '../../context';

export function SignIn({ navigation }) {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { signInAccount } = useAuth()

    type FormData = {
        email: string;
        password: string;
    }

    useEffect(() => {

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const { control, handleSubmit } = useForm<FormData>()

    async function onSubmit(data: FormData) {
        setIsLoading(true)
        try {
            const AuthAccount = await signInAccount(data.email, data.password)
            navigation.navigate('Waiter Selection', AuthAccount.data)
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setIsLoading(false)
        }

        setIsLoading(false)
    }

    return (
        <View className='flex w-full h-full'>
            <View className='bg-neutral-50 w-full h-1/2'>
                <ImageBackground
                    className='flex items-center justify-center'
                    resizeMode="cover"
                    source={require('../../assets/background-login.jpg')}
                >
                    <View style={{ borderBottomRightRadius: 50 }} className='space-y-5 w-full h-full items-center justify-center'>
                        <Image
                            style={{ width: 150, height: 150 }}
                            source={require('../../assets/logo.png')} />
                        <Text className='font-bold text-white text-2xl text-center'> Welcome Back! </Text>
                    </View>
                </ImageBackground>
            </View>

            <View className='bg-cyan-800 w-full h-1/2'>
                <ImageBackground
                    className='flex items-center justify-center'
                    resizeMode="cover"
                    source={require('../../assets/background-login.jpg')}
                >
                    <View
                        style={{ borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
                        className='bg-neutral-50 flex justify-center w-full h-full'
                    >
                        <View className='mb-3 sp p-10 space-y-7 items-start'>
                            <View className='w-full'>
                                <Text className='text-black font-semibold text-sm'>E-mail</Text>
                                <View className='mt-2 border-b-2 border-b-gray-300'>
                                    <Controller
                                        control={control}
                                        name='email'
                                        render={({ field: { value, onChange } }) => (
                                            <TextInput autoCapitalize='none' cursorColor={"#000"} placeholderTextColor={'#c0c0c0'} className='font-bold text-sm' placeholder="seuemail@email.com" value={value} onChangeText={onChange} />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className='w-full'>
                                <Text className='text-black font-semibold text-sm'>Senha</Text>
                                <View className='mt-2 border-b-2 border-b-gray-300'>
                                    <Controller
                                        control={control}
                                        name='password'
                                        render={({ field: { value, onChange } }) => (
                                            <TextInput secureTextEntry={true} cursorColor={"#000"} placeholderTextColor={'#c4c4c4'} className='font-bold text-sm' placeholder="******" value={value} onChangeText={onChange} />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className='flex-row items-center space-x-16'>
                                <View className='flex-row items-center space-x-3'>
                                    <View className='bg-slate-300 w-5 h-5'>

                                    </View>
                                    <Text>
                                        Lembre de mim
                                    </Text>
                                </View>
                                <Text className='text-xs' >
                                    Esqueceu a senha ?
                                </Text>
                            </View>
                            <TouchableOpacity disabled={isLoading} onPress={handleSubmit(onSubmit)} style={isKeyboardVisible ? { display: 'none' } : null} className='w-full justify-center items-center h-16 rounded-xl bg-emerald-900'>
                                {!isLoading ? <Text className='text-center text-white text-lg font-extrabold '>
                                    Login
                                </Text> :
                                    <Lottie
                                        style={{ height: 150 }}
                                        autoPlay={true}
                                        source={require('../../assets/lotties/loading-food.json')}
                                    />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View >
    );
}