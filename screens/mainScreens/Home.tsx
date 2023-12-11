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

interface userDataTypes {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

export default function Home({navigation}){
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [task, setTask] = useState(tasks);

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
  useFocusEffect(() => {
    fetchUserData();
  });

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
                            {task.map((item, index) => {
                                return(
                                    <View key={index}>
                                        {
                                            item.estado != 'completada' 
                                            ? (
                                                <TouchableOpacity onPress={() => navigation.navigate('TaskView', {item})}>
                                                <TaskCard   nombre={item.nombre} descripcion={item.descripcion} estado={item.estado}  />
                                                    </TouchableOpacity>
                                                ) : null
                                            }
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                    {/* Slider de proyectos */}
                    <View style={{height: '100%', borderColor:'#808080', backgroundColor:'#FCF5B4',borderBottomWidth:2, borderTopWidth:2, paddingHorizontal: 10,paddingTop: 10, flex:1}}>
                        <ScrollView horizontal={true} style={{height: 200}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Projects')} style={{ 
                            height: 50,
                            alignItems: 'center',
                            flexDirection: 'row',
                             } }>
                                <SubTitle style={{color: Colors.purple}}>Proyectos</SubTitle>
                                <AntDesign name="caretright" size={30} color="black"/>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    <View style={giraStyles.container}>
                        
                    </View>
                </ScrollView>
            </KeyboardWrapper>
    )
}