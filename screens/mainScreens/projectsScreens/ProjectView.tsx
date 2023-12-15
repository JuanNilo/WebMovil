import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet,ScrollView, TextInput } from 'react-native';
import KeyboardWrapper from '../../../components/keyboardWrapper';
import giraStyles, { ButtonText, Line, PageTitle, SubTitle, StyledButton } from '../../../components/style';
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
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import {AntDesign} from '@expo/vector-icons';

const ProjectView = ({navigation, route}) => {
  const { name } = route.params;

  const fetchUserData = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('email');
      setUserEmail(userEmail);
    } catch (error) {
      console.error('Error al recuperar los datos del usuario:', error);
    }
  }

  useEffect(() => {
    fetchUserData();
  });

  const [adminAviable, setAdminAviable] = useState(true);
  const [userEmail, setUserEmail] = useState('' as string);
  const [nameProject, setNameProject] = useState(name);
  const [emailMembers, setEmailMembers] = useState([]);
  const [nameTeams, setNameTeams] = useState([]);
  const [idTeams, setIdTeams] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingName, setEditingName] = useState(nameProject);
  const [teamDeleteName, setTeamDeleteName] = useState('');

  // Modal
  const [modalVisible, setModalVisible] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const handleCancelDelete = () => {
    setModalVisible(false);
  }

  const deleteTeam = async () => {
    setModalVisible(false);
    console.log(teamDeleteName)
    try{

        // Logica eliminar equipo
    }catch (e: any){
        setError(true);
        setErrorMessage(e?.response?.data?.message);
        console.log({error: e?.response?.data?.message});
    }
}
const editProjectName = async (newName: string) => {
  try {
    const id_project = await AsyncStorage.getItem('id_project');
    
    const updatedData = {
      name: newName
    };

    const response = await axios.put(`http://10.0.2.2:3002/api/on/project/${id_project}`, updatedData);
    if (response.status === 200) {
      console.log('Nombre del equipo actualizado con éxito');
    } else {
      console.error('Error al actualizar el nombre del equipo. Estado de la respuesta:', response.status);
    }
    }catch (e: any){
      setError(true);
      setErrorMessage(e?.response?.data?.message);
      console.log({error: e?.response?.data?.message});
  }
};
 
  
  const fetchTeamsData = async () => {
    try {
      const id_project = await AsyncStorage.getItem('id_project');
      const response = await axios.get(`http://10.0.2.2:4000/api/in/teams/project/${id_project}`);
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
      console.log(id_project);
      const response = await axios.get(`http://10.0.2.2:3002/api/on/members/members/${id_project}`);
      const memberData = response.data;
      setEmailMembers(memberData.emails);
      console.log(emailMembers);
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

  const handleDeleteTeam = (teamName: string) => {
    setTeamDeleteName(teamName);
    setModalVisible(true);
  }

  const handleNameChange = (text: string) => {
    setEditingName(text);
  }

  return (
    <KeyboardWrapper>
        <ScrollView style={{padding:10, paddingEnd: 20, flex:1, height:"100%", paddingTop: StatusBarHeight + 40 }}>
            <View style={styles.container}>
            
              {
                editMode ?
                (
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>

                  <TextInput
                    style={{color:'black', fontSize: 42, fontWeight:'bold', textAlign: 'center',  padding: 10}}
                    onChangeText={handleNameChange}
                    value={editingName}
                    placeholder="Nuevo Nombre"
                    placeholderTextColor={'black'}
                  />
                  <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                    <AntDesign name="checkcircleo" style={{marginTop: 5}} size={30} color="black" />
                  </TouchableOpacity>
                  
                  </View>
                )
                 :
                (
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                  <PageTitle style={{color:'black', fontSize:42}}>{nameProject}</PageTitle>
                  {
                    adminAviable ?
                    (
                      <TouchableOpacity
                      style={{paddingTop: 5}}
                    onPress={() => setEditMode(!editMode) }>
                    <Octicons style={styles.iconStyle} name={"pencil"} size={30} color={'black'} />
                  </TouchableOpacity>
                    )
                    : null
                  }
                  

            </View>
                )
              }
              

            <Line/>
            <Text style={styles.SubTitle}>Miembros del proyecto:</Text>
            <View>

            {emailMembers.map((email , index) => (
               
                   
                    <View key={index} style={styles.memberContainer}>
                        <SvgXml xml={createAvatar(lorelei, { seed: email }).toString()} style={styles.logo} />

                        <View style={{flexDirection:'column', alignItems:'flex-start', width:'65%'}}>
                          <Text style={styles.memberName}>{email}</Text>
                        </View>
                        {
                          adminAviable && email !== userEmail ?
                          <Octicons name="x" style={styles.boton} size={30} color="white"/>
                          : null
                        }
                    </View>)
                
            )}
            {/* Boton agregar miembro */}
            <ButtonText onPress={ () => navigation.navigate('AddMemberProject', {nameProject})} style={styles.botonContainer}>
              <Text style={{color:'black', textAlign:'center'}}>
                Añadir miembro
              </Text>
              </ButtonText>
            
            </View>
            <Line/>
            <View style={{paddingVertical: 20, width: '100%'}}>

              {/* Equipos del proyecto */}
            <SubTitle>Equipos del proyecto</SubTitle>
            <ButtonText style={styles.botonContainer} onPress= {() => navigation.navigate('CreateTeam')}>
              <Text style={{color:'black', textAlign:'center'}}>
                Crear equipo
              </Text>
              </ButtonText>
            {nameTeams.map((name, index) => {
                return (
                  <View key={name} style={{flexDirection:"row"}}>

                    <ButtonText onPress={() => navigation.navigate('Team', {name})} key={index} style={[styles.projectContainer, adminAviable ? {width: '85%'} : {width:'100%'}]}>
                      <View style={{flexDirection:'column', alignItems:'flex-start', width:'70%'}}>
                        <Text style={styles.projectName}>{name}</Text>
                      </View>
                    </ButtonText>
                    {
                      adminAviable ?
                      (
                        <View style={{height:50, alignItems:'flex-end', justifyContent:'center'}}>

                        <Octicons  name="x" style={styles.boton} size={30} color="white"/>
                        </View>
                      ) : null
                    }
                        
                  </View>
                )
            })}
            
            </View>
            {/* Eliminar proyecto */}
            {
              adminAviable ?

              <ButtonText style={[styles.botonContainer, {backgroundColor:'red', borderColor:'red'}]} onPress= {() => handleDeleteTeam(nameProject)}>
                <Text style={{color:'white', textAlign:'center'}}>
                  Eliminar proyecto
                </Text>
                </ButtonText>
              : null
            }

            {/* Modal de eliminar */}
            <Modal
                                    animationType="slide"
                                    onDismiss={() => console.log("Modal closed")}
                                    onShow={() => console.log("Modal showed")}
                                    transparent
                                    visible={modalVisible}
                                >

                                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems:'center'}}>
                                        <TouchableOpacity style={{height: '50%', width:'100%'}} onPress={() => setModalVisible(false)}/>
                                        <View style={{height: '50%', width:'95%', backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                                            <View style={{flexDirection:'row', alignItems:'flex-end',backgroundColor: 'transparent', justifyContent:'flex-end', padding:15}}>
                                                <ButtonText  onPress={() => setModalVisible(false)}> 
                                                    <Octicons style={{width:40, padding: 2, paddingLeft: 9}} name={"x"} size={35} color={'black'} />
                                                </ButtonText>
                                            </View>
                                            <View style={{flexDirection:'row', alignItems:'center',backgroundColor: 'transparent', justifyContent:'center', padding:15}}>
                                                <Text style={{fontSize: 20, fontWeight:'bold', color: 'black', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}>
                                                    ¿Está seguro que desea eliminar el proyecto?
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row', alignItems:'center',backgroundColor: 'transparent', justifyContent:'center', padding:15}}>
                                                {/* Eliminar */}
                                                <TouchableOpacity
                                                    style={{backgroundColor: 'red' ,alignItems: 'center',height:50, width:125, borderRadius: 5, justifyContent: 'center', marginHorizontal: 5}}
                                                    onPress={() => deleteTeam()}>
                                                    <ButtonText style={{fontSize:20, fontWeight:'bold', color: 'white', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}>
                                                        Si
                                                    </ButtonText>
                                                </TouchableOpacity>
                                                {/* Cancelar */}
                                                <TouchableOpacity
                                                    style={{backgroundColor: 'white', justifyContent:'center', borderColor: 'black', borderWidth:2,height:50, width:125,borderRadius: 5, alignItems:'center',marginHorizontal:5}}
                                                    onPress={() => handleCancelDelete()}>
                                                    <ButtonText style={{fontSize:20, fontWeight:'bold', color: 'black', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}>
                                                        No
                                                    </ButtonText>
                                                </TouchableOpacity>
                                            </View>    
                                        </View>
                                    </View>
                                </Modal>
        </View>
        </ScrollView>
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 22,
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
    padding: 6,
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
  },
  SubTitle:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    width:'20%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
},
iconStyle:{
  width:35, 
  padding: 2, 
  paddingLeft: 5
}
});

export default ProjectView;
