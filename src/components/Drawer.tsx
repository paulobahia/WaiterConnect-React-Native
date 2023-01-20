import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import MenuDrawer from 'react-native-side-drawer'
import { View, Text, TouchableOpacity, Button } from 'react-native';
import useOrientation from '../hooks/useOrientation';

export function Drawer() {
    const [openDrawer, setOpenDrawer] = useState(false)
    const { isLandscape } = useOrientation()

    function changeMenu() {
        setOpenDrawer(!openDrawer)
    }

    function drawerContent() {
        return (
            <View className="bg-slate-400 items-center justify-center h-full">
                <TouchableOpacity onPress={changeMenu}>
                    <Text>Teste</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            {/* @ts-ignore */}
            <MenuDrawer
                open={openDrawer}
                position={'left'}
                drawerContent={drawerContent()}
                drawerPercentage={55}
                animationTime={350}
                overlay={true}
                opacity={0.8}
            >
                <View className="h-full w-10 static justify-center">
                    <View className='bg-zinc-300 rounded-r-lg '>
                    <TouchableOpacity onPress={changeMenu}>
                        <MaterialIcons name="keyboard-arrow-right" color='black' size={43} />
                    </TouchableOpacity>
                    </View>
                </View>
            </MenuDrawer>
        </>
    );
}
