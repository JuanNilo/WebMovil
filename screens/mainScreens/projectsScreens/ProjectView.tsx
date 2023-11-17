import React, { useCallback, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet,ScrollView } from 'react-native';
import KeyboardWrapper from '../../../components/keyboardWrapper';
import giraStyles, { ButtonText, Line, PageTitle, SubTitle } from '../../../components/style';
import { Colors } from '../../../components/style';
import { Octicons } from "@expo/vector-icons";
const {purple, yellow,brand,red, darkLight} = Colors;
import  Constants  from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;
import { lorelei } from '@dicebear/collection';
import { createAvatar } from "@dicebear/core";
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


const ProjectView = ({navigation}) => {
  const [nameMembers, setNameMembers] = useState([]);
  const [emailMembers, setEmailMembers] = useState([]);
  const [nameTeams, setNameTeams] = useState([]);
  const [idTeams, setIdTeams] = useState([]);
  
  const fetchTeamsData = async () => {
    try {
      const id_project = await AsyncStorage.getItem('id_project');
      const response = await axios.post(`http://10.0.2.2:4000/api/in/teams/project/${id_project}`);
      const teamData = response.data;
      console.log(teamData);
      setIdTeams(teamData.ids);
      setNameTeams(teamData.names);
    } catch (error) {
      console.error('Error al recuperar los datos de equipos:', error);
    }
  };

  const fetchMembersData = async () => {
    try {
      const id_project = await AsyncStorage.getItem('id_project');
      const response = await axios.post(`http://10.0.2.2:3002/api/on/members/${id_project}`);
      const memberData = response.data;
      console.log(memberData);
      setEmailMembers(memberData.email);
    } catch (error) {
      console.error('Error al recuperar los datos de miembros:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
        fetchTeamsData();
        fetchMembersData();
    }, [])
    );

  

  return (
    <KeyboardWrapper>
        <ScrollView style={{padding:10, paddingEnd: 20, flex:1, height:"100%", paddingTop: StatusBarHeight + 40 }}>
            <View style={styles.container}>
    
            <PageTitle style={{color:purple, fontSize:42}}>Proyecto 1</PageTitle>
            <Line/>
            <SubTitle>Miembros del proyecto:</SubTitle>
            <View>

            {emailMembers.map((email , index) => {
                return (
                   
                    <View key={index} style={styles.memberContainer}>
                        <SvgXml xml={createAvatar(lorelei, { seed: email }).toString()} style={styles.logo} />

                        <View style={{flexDirection:'column', alignItems:'flex-start', width:'55%'}}>
                          <Text style={styles.memberName}>{email}</Text>
                        </View>
                        <Octicons name="x" style={styles.boton} size={30} color="white"/>
                    </View>
                )
            })}
            {/* Boton agregar miembro */}
            <ButtonText onPress={ () => navigation.navigate('AddMemberProject')} style={styles.botonContainer}>
              <Text style={{color:'black', textAlign:'center'}}>
                Añadir miembro
              </Text>
              </ButtonText>
            
            </View>
            <Line/>
            <View style={{paddingVertical: 20, width: '100%'}}>
            <SubTitle>Equipos del projecto</SubTitle>
            {nameTeams.map((name, index) => {
                return (
                    <ButtonText onPress={() => navigation.navigate('Team')} key={index} style={styles.projectContainer}>
                      <View style={{flexDirection:'column', alignItems:'flex-start', width:'70%'}}>
                        <Text style={styles.projectName}>{name}</Text>
                      </View>
                        <View style={{height:50, alignItems:'flex-end', justifyContent:'center'}}>

                        <Octicons  name="x" style={styles.boton} size={30} color="white"/>
                        </View>
                    </ButtonText>
                )
            })}
            
            <ButtonText style={styles.botonContainer} onPress= {() => navigation.navigate('CreateTeam')}>
              <Text style={{color:'black', textAlign:'center'}}>
                Crear equipo
              </Text>
              </ButtonText>
            </View>
        </View>
        </ScrollView>
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 2,
  },
  memberRole: {
    fontSize: 18,
  },
  projectContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 3,
  },
  botonContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 3,
    color: 'black',
    textAlign: 'center',
  },
  projectName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 16,
  },
  boton : {
    backgroundColor: red,
    width:40, 
    padding: 2, 
    paddingLeft: 11,
    borderRadius:10,
    marginHorizontal: 10,
  }
});

export default ProjectView;
