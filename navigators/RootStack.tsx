import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '../components/style';

const {primary, purple, terceary} = Colors;

// Screens
import Login from './../screens/Login';
import SignUp from './../screens/SignUps';
import Welcome from './../screens/welcome';
import Initial from './../screens/Initial'
import PasswordRecovery from '../screens/PasswordRecovery';
import PasswordChange from '../screens/PasswordChange';
import EditData from '../screens/mainScreens/editorScreens/EditData';
import EditPassword from '../screens/mainScreens/editorScreens/EditPassword';
const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: terceary,
                    headerTransparent: true,
                    headerTitle: '',
                    
                }}
                initialRouteName='Initial'
            >
                <Stack.Screen name='Initial' component={Initial}/> 
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='SignUp' component={SignUp}/>
                <Stack.Screen name='PasswordRecovery' component={PasswordRecovery}/>
                <Stack.Screen name='PasswordChange' component={PasswordChange}/>
                <Stack.Screen options={{headerTintColor: purple}} name='Welcome' component={Welcome}/>
                <Stack.Screen options={{headerTintColor: purple}} name='EditData' component={EditData}/>
                <Stack.Screen options={{headerTintColor: purple}} name='EditPassword' component={EditPassword}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;