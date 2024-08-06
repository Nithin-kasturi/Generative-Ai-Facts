import { View, Text ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import high from '../assets/Character 1.png'
import { useNavigation } from '@react-navigation/native'
import TypeWriter from 'react-native-typewriter'
export default function WelcomeScreen() {
  const navigation=useNavigation();
  return (
    <SafeAreaView className='flex-1' style={{backgroundColor:'#9999ff'}}>
      <View className='flex-1 flex justify-around my-4'>
        <TypeWriter typing={1}  className='text-white text-4xl text-center'
        >Facts generator..</TypeWriter>
        <View className='flex-row justify-center'>
          <Image source={high}
          style={{width:350, height:400}}
          />
        </View>
        <View className='space-y-4'>
          <TouchableOpacity
          onPress={()=>navigation.navigate('SignUp')}
          className='py-3 bg-yellow-400 mx-7 rounded-xl'>
            <Text className='text-xl font-bold text-center text-gray-700'>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-center'>
          <Text className='text-white font-semibold'>Already have an account?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text className='font-semibold text-yellow-400'>
              Log In  
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}