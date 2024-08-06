import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import login from '../assets/login.png';
import axios from 'axios';
export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [status,setStatus]=useState('');
        
    const handleSubmit = async () => {
        const userDetails={
            email:email,
            password:password,
        }
        try {
            const response = await axios.post('http://192.168.0.102:5000/api/login', userDetails);
                if(response.status==200){
                    navigation.navigate('Home');
                }
        } catch (error) {
            setMessage('An error occurred.');
            console.log('Error:', error);
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
                <View className='flex-row justify-center -mb-8'>
                    <Image source={login} style={{ height: 200, width: 200 }} />
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
                                onChangeText={setEmail} // Use onChangeText
                            />
                            <Text className='text-gray-700 ml-4'>
                                Password
                            </Text>
                            <TextInput
                                className='p-4 bg-gray-100 text-gray-700 rounded-2xl'
                                secureTextEntry
                                placeholder='test@123'
                                value={password}
                                onChangeText={setPassword} // Use onChangeText
                            />
                            <TouchableOpacity
                                className='flex items-end mb-5'
                            >
                                <Text className='text-gray-700'>Forgot Password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className='bg-yellow-400 py-3 rounded-xl'
                                onPress={handleSubmit}
                            >
                                <Text className='font-xl font-bold text-center text-gray-700'>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View className='flex justify-center'>
                            <Text className='text-gray-700 py-5 flex text-center font-bold text-xl'>
                                Or
                            </Text>
                            <TouchableOpacity
                                className='bg-yellow-400 py-3 rounded-xl w-full'
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text className='font-xl font-bold text-center text-gray-700'>SignUp</Text>
                            </TouchableOpacity>
                        </View>
                        {message ? (
                            <Text className='text-center text-gray-700 mt-4'>{message}</Text>
                        ) : null}
                    </View>
                </SafeAreaView>
            </SafeAreaView>
        </View>
    );
}
