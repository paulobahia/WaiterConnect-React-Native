import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function ListCategories(categories) {

    const navigation = useNavigation()

    const CardCategories = ({ data }) =>
    (
        <View className='pt-5 ml-5 items-center'>
            <View className='bg-white p-2 justify-center rounded-xl'>
                <TouchableOpacity onPress={() => navigation.navigate('Categories', data)} className='flex-row items-center space-x-2 justify-center' activeOpacity={0.2}>
                    <Text className='text-center text-xl'>{data.icon}</Text>
                    <Text className='mr-2'>{data.name}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View>
            <View className='px-5 pt-5 flex-row justify-between items-center'>
                <Text className='font-bold text-lg'>Categorias</Text>
            </View>
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
        </View>
    );
}
