import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import home from '../assets/home.png';
import axios from 'axios';
import TypeWriter from 'react-native-typewriter'
export default function HomeScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const searchDetails = { search };
        try {
            const response = await axios.post('http://192.168.0.102:5000/api/search', searchDetails);
            const paragraph = response.data.data.slice(1).toString();
            setData(paragraph);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleClear = () => {
        setData([]);
        setSearch('');
    };

    return (
        <View className='flex-1 bg-white' style={{ backgroundColor: '#9999ff' }}>
            <SafeAreaView className='flex'>
                <View className='flex-row justify-between mt-2'>
                <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className='bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4'
                    >
                        <ArrowLeftIcon size='20' color='black' />
                    </TouchableOpacity><TouchableOpacity
                        onPress={()=>navigation.navigate('Welcome')}
                        className='bg-yellow-400 p-2 rounded-2xl ml-4'
                    >
                        <Text>Logout</Text>
                        {/* <ArrowLeftIcon size='20' color='black' /> */}
                    </TouchableOpacity>
                </View>
                
                <View className='flex-row justify-center -mb-8'>
                    <Image source={home} style={{ height: 100, width: 200 }} />
                </View>
                <SafeAreaView className='h-full'>
                    <View className='flex-1 bg-white px-8 pt-8' style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                        <View className='form space-y-2'>
                            <Text className='text-gray-700 ml-4'>
                                Search Item
                            </Text>
                            <TextInput
                                className='p-4 bg-gray-100 text-gray-700 rounded-2xl'
                                placeholder='What are you looking for?'
                                value={search}
                                onChangeText={setSearch}
                            />
                            <View className='flex-row justify-between'>
                                {data.length > 0 && (
                                    <TouchableOpacity
                                        className='bg-yellow-400 py-3 rounded-xl w-full'
                                        onPress={handleClear}
                                    >
                                        <Text className='font-xl font-bold text-center text-gray-700'>Clear</Text>
                                    </TouchableOpacity>
                                )}
                                {data.length === 0 && (
                                    <TouchableOpacity
                                        className='bg-yellow-400 py-3 rounded-xl w-full'
                                        onPress={handleSubmit}
                                    >
                                        <Text className='font-xl font-bold text-center text-gray-700'>Search</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <ScrollView className='mt-5'>
                            {data.length > 0 ? (
                                <ScrollView className='flex-1 h-96 bg-gray-100 rounded-xl pl-2 pr-2'>
                                    <TypeWriter typing={10} >
                                        {data}
                                    </TypeWriter>
                                </ScrollView>
                            ) : (
                                <Text className='text-gray-500'></Text>
                            )}
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </SafeAreaView>
        </View>
    );
}
