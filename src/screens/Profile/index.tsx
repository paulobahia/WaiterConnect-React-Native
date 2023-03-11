import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuth } from '../../context';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export function Profile(props) {
    const { singOutAccount, singOutWaiter } = useAuth()

    return (
        <>
            <View className='flex bg-neutral-900 p-5 rounded-b-3xl'>
                <View className='flex-row items-center justify-between'>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    <Text className='text-white font-medium text-lg'>Meu Perfil</Text>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons name="arrow-back" size={25} color="#171717" />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView className='flex-1 p-5'>
                <View className='space-y-3'>
                    <View className='border border-neutral-200 items-center justify-between flex-row p-3 w-full rounded-xl'>
                        <View className='flex-row items-center'>
                            <Image
                                className='inline-block h-14 w-14 rounded-full ring-2 ring-white'
                                source={{
                                    uri: `https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`
                                }} />
                            <View className='flex ml-3'>
                                <Text className='font-bold'>Lucas Oliveira</Text>
                                <Text className='font-extralight text-xs'>Garçom</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons name="keyboard-arrow-right" size={32} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className='bg-neutral-200 items-center justify-between flex-row p-3 w-full rounded-xl'>
                        <View className='flex-row items-center space-x-2'>
                            <FontAwesome name="bookmark" size={22} color="black" />
                            <Text className='font-normal text-xs'>Itens salvos</Text>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className='bg-neutral-200 items-center justify-between flex-row p-3 w-full rounded-xl'>
                        <View className='flex-row items-center space-x-2'>
                            <FontAwesome name="credit-card-alt" size={20} color="black" />
                            <Text className='font-normal text-xs'>Pedidos e pagamentos</Text>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className='w-full border-neutral-300 border-b' />
                    <Text className='font-extralight text-xs'>Configurações e preferência</Text>
                    <View className='bg-neutral-200 items-center justify-between flex-row p-3 w-full rounded-xl'>
                        <View className='flex-row items-center space-x-2'>
                            <FontAwesome name="gear" size={22} color="black" />
                            <Text className='font-normal text-xs'>Configurações</Text>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className='bg-neutral-200 items-center justify-between flex-row p-3 w-full rounded-xl'>
                        <View className='flex-row items-center space-x-2'>
                            <MaterialIcons name="lock" size={22} color="black" />
                            <Text className='font-normal text-xs'>Segurança</Text>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className='bg-neutral-200 items-center justify-between flex-row p-3 w-full rounded-xl'>
                        <View className='flex-row items-center space-x-2'>
                            <Ionicons name="moon" size={22} color="black" />
                            <Text className='font-normal text-xs'>Dark Mode</Text>
                        </View>
                        <TouchableOpacity>
                            {/* <MaterialIcons name="keyboard-arrow-right" size={30} color="black" /> */}
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View className='w-full border-neutral-300 border-b' />
                    <Text className='font-extralight text-xs'>Suporte</Text>
                    <View className='bg-neutral-200 items-center justify-between flex-row p-3 w-full rounded-xl'>
                        <View className='flex-row items-center space-x-2'>
                            <Ionicons name="flag" size={22} color="black" />
                            <Text className='font-normal text-xs'>Reportar um bug</Text>
                        </View>
                        <TouchableOpacity>
                            <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className='px-2 py-3'>
                        <TouchableOpacity className='flex-row space-x-2 items-center'>
                            <Ionicons style={{ transform: [{ rotate: '180deg' }], }} name="exit-outline" size={30} color="red" />
                            <Text className='text-red-600 font-normal text-sm'>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} className={'space-y-16'}>
        //     {/* <TouchableOpacity onPress={singOutWaiter}>
        //         <Text>Sair do Usuario</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity onPress={singOutAccount}>
        //         <Text>Sair da Conta</Text>
        //     </TouchableOpacity> */}
        // </View>
    );
}