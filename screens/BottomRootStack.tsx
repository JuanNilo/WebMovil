import * as React from 'react';
import {View, Text} from 'react-native'
import { Colors } from '../components/style';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

// Screens
import User from './mainScreens/User';
import Home from './mainScreens/Home';
import Team from './mainScreens/Team';

// Screen names
const homeName = "Home";
const userName = "User";
const teamName = "Team";
const editData = "EditData"

const Tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

// Aditional Screens

import EditData from './mainScreens/editorScreens/EditData';


const { brand, purple, yellow, red, darkLight} = Colors

export default function BottomRootStack(){
    return(
        
            <Tab.Navigator
                
                initialRouteName={teamName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if(rn === homeName){
                            iconName = focused ? 'home':'home-outline'
                        }else if (rn === userName ){
                            iconName = focused ? 'person' : 'person-outline'
                        }else if (rn === teamName ){
                            iconName = focused ? 'terminal' : 'terminal-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                    tabBarActiveTintColor: purple,
                    tabBarInactiveTintColor: darkLight,
                    tabBarLabelStyle: {paddingBottom: 10, fontSize: 10},
                    tabBarStyle: {padding:10, height:70},
                    headerStyle: {
                        backgroundColor: 'transparent'
                    },
                    headerTintColor: brand,
                    headerTransparent: true,
                    headerTitle: '',
                })}
            >
                <Tab.Screen name={homeName} component={Home} />
                <Tab.Screen name={teamName} component={Team} />
                <Tab.Screen name={userName} component={User} />
            </Tab.Navigator>
        
    )
}