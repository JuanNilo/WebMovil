import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ButtonText, Colors, Line } from '../../../components/style';
import { tasks } from "../../../components/data/task.json";
const { purple } = Colors;
import  Constants  from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;

import KeyboardWrapper from '../../../components/keyboardWrapper';
import { PageTitle, SubTitle } from '../../../components/style';

const Team = ({navigation, route}) => {
  const { name } = route.params;
  const [teamName, setTeamName] = useState(name);
  const [teamDescription, setTeamDescription] = useState(' Descripción del equipo 1');
  const [taskList, setTaskList] = useState(tasks);

  const addTask = () => {
    navigation.navigate('CreateTask');
  };
  

  return (
    <KeyboardWrapper>
    <ScrollView style={{padding:10, paddingEnd: 20, flex:1, height:"100%", paddingTop: StatusBarHeight + 50 }}>
    <View >
      
      <PageTitle style={{color: 'black'}}> {teamName}</PageTitle>

      <Text style={{fontWeight: 'bold', fontSize: 18}}>Team Description:</Text>
      <Text style={{fontSize: 20}}>{teamDescription}</Text>
      <Line/>
      <View style={{flexDirection: 'row', gap: 20, marginVertical: 10}}>
        <SubTitle>Task List:</SubTitle>
        <ButtonText style={styles.botonContainer}  onPress={addTask} >Añadir tarea</ButtonText>
      </View>

      {taskList.map((item) => ( 
        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('TaskView', {item})}>
        <View key={item.id} style={styles.projectContainer}>
            <Text>{item.nombre}</Text>
            <Text>{item.estado}</Text>
            <Text>{item.estado}</Text>
            {/* add logic to show description task */}
            
            
        </View>
        </TouchableOpacity>
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
})
export default Team;
