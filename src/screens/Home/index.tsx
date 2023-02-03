import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import { getCategories } from '../../services';
import { ListCategories } from './components/ListCategories';
import { ListMenu } from './components/ListMenu';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function Home(props) {

    const [categories, setCategories] = useState(null)
    const [itensCart, setItensCart] = useState([])
    const [itemBottomSheet, setItemBottomSheet] = useState()

    const sheetRef = useRef<BottomSheet>(null)
    const [isOpen, setIsOpen] = useState(false)

    const snapPoints = ['50%', '90%']

    useEffect(() => {
        getCategories()
            .then((response) => setCategories(response.data))
            .catch((err) => {
                console.error("Erro: " + err);
            });
    }, []);

    const handlerSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index)
        setTimeout(() => {
            setIsOpen(true)
        }, 200)
    }, [])

    const itemHandler = (item) => {
        setItensCart(prevItensCart => [...prevItensCart, item])
    }

    const itemHandlerBottomSheet = (item) => {
        setItemBottomSheet(item)
        handlerSnapPress(0)
        setTimeout(() => {
            props.ChangeSheet(true)
        }, 50)
    }

    function HandlerBottomSheet() {
        props.ChangeSheet(false)
        setIsOpen(false)
    }

    return (
        <GestureHandlerRootView className="flex-1 p-5 bg-neutral-100">
            <View className='flex-row items-center justify-between'>
                <TouchableOpacity>
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={require('../../assets/icons/menu.png')} />
                </TouchableOpacity>
                <View className='ml-3'>
                    <TouchableOpacity>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={require('../../assets/icons/menu.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cart', itensCart)} activeOpacity={0.7} className='absolute right-0'>
                        <View className='bg-slate-900 p-4 items-center rounded-tr-xl rounded-tl-xl rounded-br-3xl rounded-bl-2xl justify-center'>
                            <Image
                                style={{ width: 22, height: 22 }}
                                source={require('../../assets/icons/cart.png')} />
                            {itensCart.length != 0 ? <View className='bg-red-600 w-6 h-6 left-9 bottom-9 absolute items-center justify-center  rounded-full'>
                                <Text className='text-white text-xs font-bold'>
                                    {itensCart.length}
                                </Text>
                            </View> : null}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text className='text-center'>
                </Text>
            </View>
            <View style={styles.box} className='p-3 w-full rounded-full mt-8 mb-3 bg-white items-center justify-evenly flex-row'>
                <View className='flex-row justify-start items-center space-x-3'>
                    <Image
                        style={{ width: 22, height: 22 }}
                        source={require('../../assets/icons/search.png')} />
                    <TextInput cursorColor={"#000"} className='flex w-3/4' placeholder="Pesquisar"
                        underlineColorAndroid="transparent" />
                </View>

            </View>
            <View>
                <ListCategories data={categories} />
            </View>
            <ListMenu data={categories} handlerResult={itemHandler} handlerBottomResult={itemHandlerBottomSheet} />
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={HandlerBottomSheet}
                index={-1}
            >
                <BottomSheetView>
                    <View className='flex items-center justify-center'>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{
                                uri: `http://192.168.15.200:3000/uploads/${itemBottomSheet?.imagePath}`
                            }} />
                        <Text>
                            {itemBottomSheet?.name}
                        </Text>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    box: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
});