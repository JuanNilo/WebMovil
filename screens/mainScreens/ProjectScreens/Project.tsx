import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { ButtonText, Colors, Line } from '../../../components/style';

const { purple } = Colors;
import  Constants  from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;

import KeyboardWrapper from '../../../components/keyboardWrapper';
import { PageTitle, SubTitle } from '../../../components/style';

const Project = () => {
  const [projectName, setProjectName] = useState('Projecto 1');
  const [projectDescription, setProjectDescription] = useState(' Descripción del proyecto 1');
  const [taskList, setTaskList] = useState([
    { id: 1, name: 'Task 1', description: 'Description 1', status: 'To Do', assignedTo: 'nilo@mail.com' },
    { id: 2, name: 'Task 2', description: 'Description 2', status: 'In Progress', assignedTo: 'nacho@mail.com' },
  ]);

  const addTask = () => {
    // Implement the logic to add a new task to the task list
  };
  

  return (
    <KeyboardWrapper>
    <ScrollView style={{padding:10, paddingEnd: 20, flex:1, height:"100%", paddingTop: StatusBarHeight + 50 }}>
    <View >
      
      <PageTitle style={{color: purple}}> {projectName}</PageTitle>

      <Text style={{fontWeight: 'bold', fontSize: 18}}>Project Description:</Text>
      <Text style={{fontSize: 20}}>{projectDescription}</Text>
      <Line/>
      <View style={{flexDirection: 'row', gap: 20, marginVertical: 10}}>
        <SubTitle>Task List:</SubTitle>
        <ButtonText style={styles.botonContainer}  onPress={addTask} >Añadir tarea</ButtonText>
      </View>

      {taskList.map((task) => ( 
        <View key={task.id} style={styles.projectContainer}>
            <Text>{task.name}</Text>
            <Text>{task.status}</Text>
            <Text>{task.assignedTo}</Text>
            {/* add logic to show description task */}
            
            
        </View>
      ))}
      </View>
      <Line/>
      {/* Contenido de tarea */}
         <View style={styles.taskDetail}>
            <Text>{taskList[0].name}</Text>
            <Text>{taskList[0].description}</Text>
            <Text>{taskList[0].status}</Text>
            <Text>{taskList[0].assignedTo}</Text>
            
            </View>
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
})
export default Project;
