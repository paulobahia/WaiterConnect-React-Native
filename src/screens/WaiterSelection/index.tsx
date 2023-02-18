import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import jwtDecode from 'jwt-decode'
import Carousel from 'react-native-snap-carousel';

import { getAccountsByWaiter } from '../../services';

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = SLIDER_WIDTH * 0.88

export function WaiterSelection(props) {

    interface tokenData {
        id: string
    }

    const [isWaiters, setIsWaiters] = useState([])
    const Items = [
        {
            img: 'https://img.freepik.com/icones-gratis/garcom_318-198107.jpg'
        },
        {
            img: 'https://img.freepik.com/icones-gratis/avatar_318-198106.jpg'
        },
        {
            img: 'https://img.freepik.com/icones-gratis/garcom_318-198105.jpg'
        }
    ]

    useEffect(() => {

        let token: tokenData = jwtDecode(props.route.params.token)

        getAccountsByWaiter(token.id)
            .then((response) => {
                setIsWaiters(response.data)
            })
            .catch((err) => {
                console.error(err.response.data);
            });

    }, []);

    const CardCategories = ({ item, index }) =>
    (
        <View className='items-center justify-around flex-1'>
            <View className='bg-white shadow-2xl rounded-2xl w-80 h-2/4' key={index}>
                <View className='flex-1 items-center justify-start mt-10'>
                    <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://img.freepik.com/icones-gratis/garcom_318-198105.jpg' }} />
                </View>
                <View className='flex-1 items-center justify-between'>
                    <Text className='text-xl font-extrabold'>{item.name}</Text>
                    <TouchableOpacity onPress={() => console.log(item)} className='bg-slate-800 w-16 h-16 items-center justify-center rounded-full mb-8'>
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
            </View>
        </>
    );
}