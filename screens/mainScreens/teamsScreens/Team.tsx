import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ButtonText, Colors, Line } from '../../../components/style';
import { tasks } from "../../../components/data/task.json";
const { purple } = Colors;
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import  Constants  from "expo-constants";
import {AntDesign} from '@expo/vector-icons';
const StatusBarHeight = Constants.statusBarHeight;

import KeyboardWrapper from '../../../components/keyboardWrapper';
import { PageTitle, SubTitle } from '../../../components/style';


interface Task {
  id: number,
  name: string,
  description: string,
  state: string,
  id_team: number,
  initial_date: string,
  final_date: string,
  email: string,
}

const Team = ({navigation, route}) => {
  const { idTeam, name, nameProject } = route.params;
  const [teamName, setTeamName] = useState(name);
  const [taskList, setTaskList] = useState([] as Task[] );
  const [members, setMembers] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [filteredTasks, setFilteredTasks] = useState(taskList  as Task[]);
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:4000/api/in/members/members/${idTeam}`);
      const members = response.data;
      console.log('members', members.emails);
      setMembers(members.emails);
    } catch (error) {
      console.error('Error al recuperar los datos del usuario:', error);
    }
  };

  const addTask = () => {
    navigation.navigate('CreateTask', {idTeam, teamName, nameProject});
  };
  
  const editTeamName = async (newName: string) => {
    try {
      const updatedData = {
        name: newName,
      };
      const id_team = idTeam.toString();
      const response = await axios.put(`http://10.0.2.2:4000/api/in/teams/${id_team}`, updatedData);
      if(response.status === 200){
        setEditMode(!editMode);
      }else{
        console.log('Error al actualizar el nombre del proyecto');
      }
    } catch (error) {
      console.error('Error al actualizar el nombre del proyecto:', error);
    }
  }

  const fetchTaskData = async () => {
    try {
      const id_team = idTeam.toString();
      const response = await axios.get(`http://10.0.2.2:1000/api/ts/tasks/task-idTeam/${id_team}`);
      const taskData = response.data;
      setFilteredTasks(taskData);
      setTaskList(taskData);
    } catch (error) {
      console.error('Error al recuperar los datos de las tareas:', error);
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await axios.delete(`http://10.0.2.2:1000/api/ts/tasks/delete-task/${id}`);
      console.log('idTask', id);
      fetchTaskData();
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        fetchTeamMembers();
        fetchTaskData();
    });
    return unsubscribe;
  }
    , [navigation]);


const handleFilterTask = (taskState: string) => {
  if(taskState === 'todas') {
    setFilteredTasks(taskList);
    return;
  }else{
    const filterTask = taskList.filter(task => task.state === taskState);
    setFilteredTasks(filterTask);
    console.log('filteredTasks', filteredTasks);
  }
};
    
  return (
    <KeyboardWrapper>
    <ScrollView style={{padding:10, paddingEnd: 20, flex:1, height:"100%", paddingTop: StatusBarHeight + 50 }}>
    <View >
      {/* Nombre del equipo */}
      {
        editMode ? (
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TextInput
              style={{fontSize: 35, fontWeight: 'bold', textAlign: 'center', padding: 10, paddingLeft: 18}}
              onChangeText={setTeamName}
              value={teamName}
            />
            <TouchableOpacity onPress={() => editTeamName(teamName)}>
                    <AntDesign name="checkcircleo" style={{marginTop: 5}} size={30} color="black" />
                  </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <PageTitle style={{color: 'black', fontWeight:'bold'}}> {teamName}</PageTitle>
            
            <TouchableOpacity
                      style={{paddingTop: 5}}
                    onPress={() => setEditMode(!editMode) }>
                    <Octicons style={styles.iconStyle} name={"pencil"} size={30} color={'black'} />
                  </TouchableOpacity>
          </View>
        )
      }
      <Line/>
      {/* Lista de miembros */}
      <View style={{flexDirection: 'row', gap: 20, marginVertical: 10}}>
        <SubTitle>Miembros:</SubTitle>
        <ButtonText style={styles.botonContainer}  onPress={() => navigation.navigate('AddMemberTeam',{idTeam, name})} >Añadir miembro</ButtonText>
      </View>
      {/* Scroll de miembros */}
      <ScrollView style={{height: 150, overflow: 'hidden', paddingBottom: 20}}>
      {members.map((item) => ( 
        <View key={item} style={styles.projectContainer}>
            <Text style={styles.mailMember}>{item}</Text>
            <TouchableOpacity onPress={()=> console.log('press')}>
            <AntDesign  name="delete" size={24} color="black" />

            </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
      
      <Line/>
      <View style={{flexDirection: 'row', gap: 20, marginVertical: 10}}>
        <SubTitle>Task List:</SubTitle>
        <ButtonText style={styles.botonContainer}  onPress={addTask} >Añadir tarea</ButtonText>
      </View>
      
        {/* Botones para filtrar las tareas por status */}
        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
          <ButtonText style={[styles.botonContainer, {width:90,alignItems:'center', justifyContent:'center',  backgroundColor:'#C2ABF6'}]} onPress={() => handleFilterTask('todas')} >Todas</ButtonText>
          <ButtonText style={[styles.botonContainer, {width:90,alignItems:'center', justifyContent:'center',  backgroundColor:'#ABD1F6'}]} onPress={() => handleFilterTask('pendiente')} >Pendientes</ButtonText>
          <ButtonText style={[styles.botonContainer, {width:90,alignItems:'center', justifyContent:'center',  backgroundColor:'#F6DCAB'}]} onPress={() => handleFilterTask('en progreso')} >En progreso</ButtonText>
          <ButtonText style={[styles.botonContainer, {width:90,alignItems:'center', justifyContent:'center',  backgroundColor:'#D5F6AB'}]} onPress={() => handleFilterTask('completada')} >Completadas</ButtonText>
        </View>

      {filteredTasks.map((item) => ( 
        <View key={item.id} style={{flexDirection: 'row', alignItems:'center', justifyContent:"space-between", maxWidth:'95%' }}>
          <TouchableOpacity onPress={() => navigation.navigate('TaskView', {item})}>
          <View key={item.id} style={[styles.projectContainer,{alignItems:'flex-start', height: 100, flexDirection: 'column',width:350}]}>
              <Text style={{fontSize:18, fontWeight: 'bold'}}>{item.name}</Text>
              <Text>{item.state}</Text>
              <Text style={{fontSize: 16}}>{item.email}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{width:'10%'}} onPress={() => handleDeleteTask(item.id)}>
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ))}
      </View>
      <Line/>

      </ScrollView>
    </KeyboardWrapper>

  )
};


const styles = StyleSheet.create({
    projectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    taskDetail: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        marginVertical: 20,
        borderColor: "black",
        borderWidth: 3,
        height: 200,
      },
    botonContainer: {
        backgroundColor: 'white',
        padding: 5,
        fontSize: 18,
        width: '50%',
        borderRadius: 10,
        marginBottom: 10,
        borderColor: "black",
        borderWidth: 2,
        color: 'black',
        textAlign: 'center',
      },
      mailMember: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      iconStyle:{
        width: 35,
        padding: 2,
      }
})
export default Team;
