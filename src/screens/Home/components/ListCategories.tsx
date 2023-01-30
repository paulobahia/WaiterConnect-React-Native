import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export function ListCategories(categories) {

    const CardCategories = ({ data }) =>
    (
        <View className='p-5 items-center'>
            <View style={styles.box} className='bg-white w-14 h-14 justify-center rounded-full'>
                <TouchableOpacity activeOpacity={0.2}>
                    <Text className='text-center text-xl'>{data.icon}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={categories.data}
                renderItem={({ item }) =>
                (
                    <CardCategories data={item} />
                )}
                keyExtractor={item => item.id}
            />
        </>
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