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
import EditMail from '../screens/mainScreens/editorScreens/EditMail';
const Stack = createNativeStackNavigator();


// Team
import CreateTeam from '../screens/mainScreens/teamScreens/CreateTeam';
import DeleteTeam from '../screens/mainScreens/teamScreens/DeleteTeam';
import EditTeam from '../screens/mainScreens/teamScreens/EditTeam';
import ViewTeams from '../screens/mainScreens/teamScreens/ViewTeams';
import TeamView from '../screens/mainScreens/teamScreens/TeamView';
import Project from '../screens/mainScreens/ProjectScreens/Project';

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
                <Stack.Screen options={{headerTintColor: purple}} name='EditMail' component={EditMail}/>
                <Stack.Screen options={{headerTintColor: purple}} name='CreateTeam' component={CreateTeam}/>
                <Stack.Screen options={{headerTintColor: purple}} name='DeleteTeam' component={DeleteTeam}/>
                <Stack.Screen options={{headerTintColor: purple}} name='EditTeam' component={EditTeam}/>
                <Stack.Screen options={{headerTintColor: purple}} name='ViewTeams' component={ViewTeams}/>
                <Stack.Screen options={{headerTintColor: purple}} name='TeamView' component={TeamView}/>
                <Stack.Screen options={{headerTintColor: purple}} name='Project' component={Project}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;