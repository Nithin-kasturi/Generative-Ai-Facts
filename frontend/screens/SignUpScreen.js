import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import signup from '../assets/signup.png';
import axios from 'axios';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status,setStatus]=useState('');
    const handleSubmit = async () => {
        const userDetails = {
            email: email,
            password: password,
        };

        if (email && password) {
            try {
                const response = await axios.post('http://192.168.0.102:5000/api/register', userDetails);
                if(response.status==201){
                    navigation.navigate('Login');
                }
            } catch (error) {
                // Log error message and response if available
                console.error('Error Message:', error.message);
                if (error.response) {
                    console.error('Error Response Data:', error.response.data);
                }
            }
        }
    };

    return (
        <View className='flex-1 bg-white' style={{ backgroundColor: '#9999ff' }}>
            <SafeAreaView className='flex'>
                <View className='flex-row justify-start'>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className='bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4'
                    >
                        <ArrowLeftIcon size='20' color='black' />
                    </TouchableOpacity>
                </View>
                <View className='flex-row justify-center'>
                    <Image source={signup} style={{ height: 200, width: 200 }} />
                </View>
                <SafeAreaView className='h-full'>
                    <View className='flex-1 bg-white px-8 pt-8' style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                        <View className='form space-y-2'>
                            <Text className='text-gray-700 ml-4'>
                                Email Address
                            </Text>
                            <TextInput
                                className='p-4 bg-gray-100 text-gray-700 rounded-2xl'
                                placeholder='jessy@gmail.com'
                                value={email}
                                onChangeText={setEmail}
                            />
                            <Text className='text-gray-700 ml-4'>
                                Password
                            </Text>
                            <TextInput
                                className='p-4 bg-gray-100 text-gray-700 rounded-2xl'
                                secureTextEntry
                                placeholder='test@123'
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                className='bg-yellow-400 py-3 rounded-xl'
                                onPress={handleSubmit}
                            >
                                <Text className='font-xl font-bold text-center text-gray-700'>SignUp</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='flex justify-center'>
                            <Text className='text-gray-700 py-5 flex text-center font-bold text-xl'>
                                Or
                            </Text>
                            <TouchableOpacity
                                className='bg-yellow-400 py-3 rounded-xl w-full'
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text className='font-xl font-bold text-center text-gray-700'>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </SafeAreaView>
        </View>
    );
}
