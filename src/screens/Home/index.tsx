import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import { getCategories } from '../../services';
import { ListCategories } from './components/ListCategories';
import { ListMenu } from './components/ListMenu';
import { SheetComponent } from './components/SheetComponent';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather, AntDesign } from '@expo/vector-icons';

export function Home(props) {

    const [categories, setCategories] = useState(null)
    const [itensCart, setItensCart] = useState([])
    const [itemBottomSheet, setItemBottomSheet] = useState()

    const sheetRef = useRef<BottomSheet>(null)
    const [isOpen, setIsOpen] = useState(false)

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

    const handlerSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index)
        setTimeout(() => {
            setIsOpen(true)
        }, 200)
    }, [isOpen])

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
        <GestureHandlerRootView className="flex-1 bg-neutral-200">
            <View className='bg-neutral-900 p-5 rounded-b-3xl'>
                <View className='absolute left-5 top-8'>
                    <Text className='text-white font-medium text-2xl'>
                        Waiter Connect
                    </Text>
                </View>
                <View className='absolute right-5 top-8'>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cart', itensCart)} activeOpacity={0.7} >
                        <View className='bg-lime-400 flex-row space-x-2 w-14 h-10 rounded-lg items-center justify-center'>
                            <Feather name="shopping-cart" size={23} color="black" />
                            {itensCart.length != 0 ?
                                <Text className='text-black text-lg font-bold'>
                                    {itensCart.length}
                                </Text>
                                : null}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.box} className='p-3 w-full rounded-xl mt-20 bg-neutral-600 items-center  flex-row'>
                    <View className='flex-row justify-start space-x-5 items-center'>
                        <AntDesign name="search1" size={24} color="#c0c0c0" />
                        <TextInput cursorColor={"#000"} className='flex w-3/4' placeholderTextColor={'#c0c0c0'} placeholder="Pesquise por algo gostoso..."
                            underlineColorAndroid="transparent" />
                    </View>
                </View>
            </View>
            <View className='mb-3'>
                <ListCategories data={categories} />
            </View>
            <ListMenu data={categories} handlerResult={itemHandler} handlerBottomResult={itemHandlerBottomSheet} />
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={HandlerBottomSheet}
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