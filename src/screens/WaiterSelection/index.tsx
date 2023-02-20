import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode'
import Carousel from 'react-native-snap-carousel';

import { getAccountsByWaiter } from '../../services';
import { TextInput } from 'react-native-gesture-handler';
import { AuthAccountData, useAuth } from '../../context';

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = SLIDER_WIDTH * 0.88

export function WaiterSelection(props) {

    interface tokenData {
        id: string
    }

    const [isWaiters, setIsWaiters] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [isWaiter, setIsWaiter] = useState([])
    const { signInWaiter, authAccountData } = useAuth()

    useEffect(() => {

        if (authAccountData) {
            let token: tokenData = jwtDecode(authAccountData.token)
            getAccountsByWaiter(token.id)
                .then((response) => {
                    setIsWaiters(response.data)
                })
                .catch((err) => {
                    console.error(err.response.data);
                });
        }

    }, []);

    function openWaiterModal(item) {
        setModalVisible(true)
        setIsWaiter(item)
    }

    function authWaiter() {

        signInWaiter(isWaiter?.cpf, "12345678")
            .then((response) => {
                props.navigation.navigate("AuthStack")
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    }

    const CardCategories = ({ item, index }) =>
    (
        <View className='items-center justify-around flex-1'>
            <View className='bg-white shadow-2xl rounded-2xl w-80 h-2/4' key={index}>
                <View className='flex-1 items-center justify-start mt-10'>
                    <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://img.freepik.com/icones-gratis/garcom_318-198105.jpg' }} />
                </View>
                <View className='flex-1 items-center justify-between'>
                    <Text className='text-xl font-extrabold'>{item.name}</Text>
                    <TouchableOpacity onPress={() => openWaiterModal(item)} className='bg-slate-800 w-16 h-16 items-center justify-center rounded-full mb-8'>
                        <Ionicons name="arrow-forward" size={23} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )


    return (
        <>
            <View className='flex bg-neutral-900 p-5 rounded-b-3xl'>
                <View className='flex-row justify-start space-x-20 items-center'>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons name="arrow-back" size={23} color="white" />
                    </TouchableOpacity>
                    <Text className='text-white font-medium text-lg'>Selecione sua conta</Text>
                </View>
            </View>
            <View className='flex-1 items-center justify-center px-10'>

                <Carousel
                    layout={'stack'}
                    data={isWaiters}
                    renderItem={CardCategories}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    useScrollView={true}
                />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View className='flex w-full h-full justify-center items-center mt-6'>
                        <View style={styles.modalView} className='m-6 bg-white rounded-2xl w-3/4 justify-between items-center shadow-2xl p-9'>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} className='bg-emerald-900 absolute -right-3 -top-3 rounded-full p-1'>
                                <Ionicons name="close" size={25} color="white" />
                            </TouchableOpacity>
                            <Text className='text-base font-bold'>Informe sua senha</Text>
                            <View className='w-full'>
                                <View className='flex-row space-x-3 mt-5'>
                                    <FontAwesome name="user" size={20} color="black" />
                                    <Text className='font-semibold'>{isWaiter?.name}</Text>
                                </View>
                                <TextInput secureTextEntry={true} cursorColor={"#000"} placeholderTextColor={'#c0c0c0'} className='font-bold mt-5 text-sm' placeholder="Senha" />
                            </View>
                            <View className='w-full items-end mt-2'>
                                <TouchableOpacity onPress={authWaiter}>
                                    <Text className='text-black'>
                                        Entrar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    modalView: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});