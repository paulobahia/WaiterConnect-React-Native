import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import { getCategories } from '../../services';
import { ListCategories } from './components/ListCategories';
import { ListMenu } from './components/ListMenu';
import { SheetComponent } from './components/SheetComponent';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

export function Home(props) {

    const [categories, setCategories] = useState(null)
    const [itensCart, setItensCart] = useState([])
    const [itemBottomSheet, setItemBottomSheet] = useState()
    const isFocused = useIsFocused();

    const sheetRef = useRef<BottomSheet>(null)

    const snapPoints = ['90%']

    useEffect(() => {
        getCategories()
            .then((response) => {
                let Categories = response.data
                Categories.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
                setCategories(Categories)
            })
            .catch((err) => {
                console.error("Erro: " + err);
            });
    }, []);

    useEffect(() => {
        isFocused
    }, [isFocused])

    const handlerSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index)
    }, [])

    const itemHandler = (item) => {
        setItensCart(prevItensCart => [...prevItensCart, item])
    }

    const clearCart = () => {
        setItensCart([])
    }

    const itemHandlerBottomSheet = (item) => {
        props.ChangeSheet(true)
        setItemBottomSheet(item)
        setTimeout(() => {
            handlerSnapPress(0)
        }, 10)
    }

    function handleCountCart(item_id, type) {

        let indexItem = itensCart.findIndex(item => item.id === item_id)
        let findItem = itensCart.find(item => item.id === item_id)
        let prevItens = itensCart

        switch (type) {

            case 'Add':
                prevItens.push(findItem)
                setItensCart(prevItens)
                break;

            case 'Remove':
                itensCart.splice(indexItem, 1)
                break;

            default:
                break;
        }

    }

    return (
        <GestureHandlerRootView className="flex-1 bg-neutral-200">
            <View className='bg-neutral-900 p-5 rounded-b-3xl'>
                <View className='absolute left-5 top-8'>
                    <Text className='text-white font-medium text-2xl'>
                        Waiter Connect
                    </Text>
                </View>
                <View className='absolute right-5 top-8'>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cart', { itensCart: itensCart, handleCountCart, clearCart })} activeOpacity={0.7} >
                        <View className='bg-white flex-row space-x-2 w-14 h-10 rounded-lg items-center justify-center'>
                            <Feather name="shopping-cart" size={23} color="black" />
                            {itensCart.length != 0 ?
                                <Text className='text-black text-lg font-bold'>
                                    {itensCart.length}
                                </Text>
                                : null}
                        </View>
                    </TouchableOpacity>
                </View>
                <View className='py-2 rounded-xl mt-20 items-center flex-row justify-between '>
                    <View className='flex-row space-x-3'>
                        <AntDesign name="search1" size={25} color="#c0c0c0" />
                        <TextInput cursorColor={"#000"} placeholderTextColor={'#c0c0c0'} className="text-white" placeholder="Pesquise por algo gostoso..."
                            underlineColorAndroid="transparent" />
                    </View>
                </View>
            </View>
            <View className='mb-2'>
                <ListCategories data={categories} />
            </View>
            <ListMenu data={categories} handlerResult={itemHandler} handlerBottomResult={itemHandlerBottomSheet} />
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={() => props.ChangeSheet(false)}
                index={-1}
                style={{ borderRadius: 30, overflow: 'hidden' }}
            >
                <BottomSheetView>
                    <SheetComponent handlerResult={itemHandler} item={itemBottomSheet} />
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}
