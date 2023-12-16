import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import KeyboardWrapper from '../../components/keyboardWrapper';
import giraStyles, { PageTitle, SubTitle } from '../../components/style';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {tasks} from '../../components/data/task.json';
import  Constants  from "expo-constants";
import {AntDesign} from '@expo/vector-icons';
import TaskCard from './taskScreens/TaskCard';
import { useCallback, useEffect } from 'react';
import ProjectCard from './projectsScreens/ProjectCard';


interface userDataTypes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

interface teamDataTypes {
    name: string;
    id: string;
}

export default function Home({navigation}){
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [task, setTask] = useState([] as any[]);
    const [projectsIds, setProjectsIds] = useState([] as string[]);
    const [projectsNames, setProjectsNames] = useState([] as string[]);
    const [emailUser, setEmailUser] = useState('');
    
    const [teamsNames, setTeamsNames] = useState([] as string[]);
    const [teamsIds, setTeamsIds] = useState([] as string[]);

    const fetchUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const response = await axios.get(`http://10.0.2.2:3000/api/users/profile/${email}`);
      const userData : userDataTypes = response.data;
      setUserData(userData);
    } catch (error) {
      setError(true);
      setErrorMessage(error?.response?.data?.message);
      console.error('Error al recuperar los datos del usuario:', error);
    }
  };

  const fetchProjectData = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const response = await axios.get(`http://10.0.2.2:3002/api/on/middle/get-projects/${email}`);
      const projectData = response.data;
      setProjectsIds(projectData.ids);
      setProjectsNames(projectData.names);
      console.log('\n\n',projectData);
    } catch (error) {
      console.error('Error al recuperar los datos de proyectos:', error);
    }
  };

  const fetchTeamData = async () => {
    try {
        const email = await AsyncStorage.getItem('email');
        console.log(email);
        const response = await axios.get(`http://10.0.2.2:4000/api/in/middle/get-teams/${email}`);
        const teamsData = response.data;
        setTeamsNames(teamsData.names);
        setTeamsIds(teamsData.ids);
        console.log('====',teamsData);
        
    } catch (error) {
        console.error('Error al recuperar los datos de equipos:', error);
    }
  }

  const fetchTaskData = async () => {
    try {
        const email = emailUser;
        const response = await axios.get(`http://10.0.2.2:1000/api/ts/tasks/tasks-email/data=${email}`);
        const taskData = response.data;
        //console.log('=======taskData', taskData)
        setTask(taskData);
    } catch (error) {
        console.error('Error al recuperar los datos del usuario:', error);
    }
}

const emailUserStorage = async () => {
    const data = await AsyncStorage.getItem('email');
    if(data != null){
        setEmailUser(data);
        console.log('\n\n',emailUser);
    }
    
}

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        emailUserStorage();
        fetchUserData();
        fetchProjectData();
        fetchTeamData();
        fetchTaskData();
    });
    return unsubscribe;
  }
    , [navigation]);

  const idLocalStorage = async (id: number, name: string) => {
    await AsyncStorage.setItem('id_project', id.toString());
    navigation.navigate('ProjectView', {name});
}

const handleNavigationTeam = (name: string, index: number) => {
    navigation.navigate('Team', {idTeam: teamsIds[index], name});
}

  const StatusBarHeight = Constants.statusBarHeight;
    const route = useRoute();
    return(
            <KeyboardWrapper>
                <ScrollView >
                    <View style={{
                        paddingTop: 40 + StatusBarHeight, backgroundColor:'white'
                    }}>
                        <SubTitle style={{color: Colors.purple, marginHorizontal: 10}}>Bienvenido {userData.firstName}!</SubTitle>
                    </View>
                    <View style={{height: '100%', borderColor:'#808080', backgroundColor:'#B4B4FC',borderBottomWidth:2, borderTopWidth:2, paddingHorizontal: 10,paddingTop: 10, flex:1}}>
                        <TouchableOpacity onPress={() => navigation.navigate('ListTaskView')} style={{
                            height: 50,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <SubTitle style={{color: Colors.purple}}>Tareas</SubTitle>
                            <AntDesign name="caretright" size={30} color="black"/>
                        </TouchableOpacity>
                        {/* Slider de tareas en curso */}
                        <ScrollView horizontal={true} style={{height: 200}}>
                            {
                                task.length > 0 ?
                                (
                                    
                                    task.map((item, index) => {
                                        return(
                                            <View key={index}>
                                        {
                                            item.email == emailUser 
                                            ? (
                                                <TouchableOpacity onPress={() => navigation.navigate('TaskView', {item})}>
                                                <TaskCard   nombre={item.name} descripcion={item.description} estado={item.state}  />
                                                    </TouchableOpacity>
                                                ) : null
                                            }
                                    </View>
                                )
                            })
                            ) :
                            (
                                <Text style={{fontSize: 20, fontWeight:'bold'}}>No tienes tareas pipipi</Text>
                                )
                        }
                        </ScrollView>
                    </View>
                    {/* Slider de proyectos */}
                    <View style={{height: '100%', borderColor:'black', backgroundColor:'#FCF5B4',borderBottomWidth:2, borderTopWidth:2, paddingHorizontal: 10,paddingTop: 10, flex:1}}>
                        
                            <TouchableOpacity onPress={() => navigation.navigate('Projects')} style={{ 
                            height: 50,
                            alignItems: 'center',
                            flexDirection: 'row',
                             } }>
                                <SubTitle style={{color: Colors.purple}}>Proyectos</SubTitle>
                                <AntDesign name="caretright" size={30} color="black"/>
                            </TouchableOpacity>
                            <ScrollView horizontal={true} style={{height: 200}}>
                                {
                                    projectsNames.length > 0 ?
                                    (
                                    projectsNames.map((item, index) => {
                                        return(
                                            <View key={index}>
                                                <TouchableOpacity onPress={() => idLocalStorage(projectsIds[index], item)}>
                                                    <ProjectCard nombre={item}/>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                    ) ) : (
                                    <Text style={{fontSize: 18, fontWeight:'bold'}}>No perteneces a ningun proyecto</Text>
                                    )
                                }
                        </ScrollView>
                    </View>
                    {/* Slider de equipos */}
                    <View style={{height:'100%', borderColor:'black', borderBottomWidth: 2, paddingHorizontal:10, paddingTop:10, flex:1, backgroundColor:'#D5F6AB'}}>
                        <SubTitle style={{color: 'black'}}>Equipos</SubTitle>
                        <ScrollView horizontal={true} style={{height: 200}}>
                             {   
                                teamsNames.length > 0 ?
                                (
                                teamsNames.map((item, index) => {
                                    return(
                                        <View key={index}>
                                            <TouchableOpacity onPress={() => handleNavigationTeam(item, index)}>
                                                <ProjectCard nombre={item}/>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                                ) ) 
                                : 
                                (
                                    <View>
                                        <Text style={{fontSize: 18, fontWeight:'bold'}}>No perteneces a ningun equipo</Text>
                                    </View>
                                )
                            } 
                        </ScrollView>
                    </View>
                </ScrollView>
            </KeyboardWrapper>
    )
}