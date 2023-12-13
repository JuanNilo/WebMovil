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


// Project
import CreateProject from '../screens/mainScreens/projectsScreens/CreateProject';
import DeleteTeam from '../screens/mainScreens/projectsScreens/DeleteTeam';
import EditProject from '../screens/mainScreens/projectsScreens/EditProject';
import ViewTeams from '../screens/mainScreens/projectsScreens/ViewProjects';
import ProjectView from '../screens/mainScreens/projectsScreens/ProjectView';
import AddMemberProject from '../screens/mainScreens/projectsScreens/AddMemberProject';

// Team
import Team from '../screens/mainScreens/teamsScreens/Team';
import CreateTeam from '../screens/mainScreens/teamsScreens/CreateTeam';

// Task
import CreateTask from '../screens/mainScreens/taskScreens/CreateTask';
import TaskView from '../screens/mainScreens/taskScreens/TaskView';
import ListTaskView from '../screens/mainScreens/taskScreens/ListTaskView';
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
                <Stack.Screen options={{headerTintColor: purple}} name='CreateProject' component={CreateProject}/>
                <Stack.Screen options={{headerTintColor: purple}} name='DeleteTeam' component={DeleteTeam}/>
                <Stack.Screen options={{headerTintColor: purple}} name='EditProject' component={EditProject}/>
                <Stack.Screen options={{headerTintColor: purple}} name='ViewTeams' component={ViewTeams}/>
                <Stack.Screen options={{headerTintColor: purple}} name='ProjectView' component={ProjectView}/>
                <Stack.Screen options={{headerTintColor: purple}} name='Team' component={Team}/>
                <Stack.Screen options={{headerTintColor: purple}} name='AddMemberProject' component={AddMemberProject}/>
                <Stack.Screen options={{headerTintColor: purple}} name='CreateTeam' component={CreateTeam}/>
                <Stack.Screen options={{headerTintColor: purple}} name='CreateTask' component={CreateTask}/>
                <Stack.Screen options={{headerTintColor: purple}} name='TaskView' component={TaskView}/>
                <Stack.Screen options={{headerTintColor: purple}} name='ListTaskView' component={ListTaskView}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;