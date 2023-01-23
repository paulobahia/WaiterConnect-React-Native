import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getCategories } from '../../services';


export function Home(props: any) {
    const [user, setUser] = useState(null)

    // useEffect(() => {
    //     Allcategories()
    // }, []);

    // function Allcategories() {
    //     getCategories()
    //         .then((response) => setUser(response))
    //         .catch((err) => {
    //             console.error("ops! ocorrreu um erro" + err);
    //         });
    //     console.log(user)
    // }


    return (
        <View className="flex-1 justify-center">
            <View className='justify-center absolute'>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <Text>Teste</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}