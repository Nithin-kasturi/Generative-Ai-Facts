import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
export default function App() {
  const Stack=createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Login' options={{headerShown:false}} component={LoginScreen}/>
        <Stack.Screen name='SignUp' options={{headerShown:false}} component={SignUpScreen}/>
        <Stack.Screen name='Home' options={{headerShown:false}} component={HomeScreen}/>
        <Stack.Screen name='Welcome' options={{headerShown:false}} component={WelcomeScreen}/>
        
        </Stack.Navigator>
      </NavigationContainer>
      
    );
}

