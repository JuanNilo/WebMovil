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
import { ENDPOINT_MS_PROJECT } from '@env';
import { ENDPOINT_MS_TEAM } from '@env';

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
  const [teamDeleteIndex, setTeamDeleteIndex] = useState(0);
  const [deleteTeamId, setDeleteTeamId] = useState(-1);
  const [deleteMemberEmail, setDeleteMemberEmail] = useState('');
  // Modal
  const [modalVisible, setModalVisible] = useState(false);

  const [modalTeamVisible, setModalTeamVisible] = useState(false);

  const [modalMemberVisible, setModalMemberVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleCancelDelete = () => {
    setModalVisible(false);
    setModalTeamVisible(false);
    setModalMemberVisible(false);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 3;
  const totalMembers = emailMembers.length;

  const maxPage = Math.ceil(totalMembers / membersPerPage);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = emailMembers.slice(indexOfFirstMember, indexOfLastMember);

  const handleChangePage = (page: number, action: string) => {
    if (action === 'next' && currentPage < maxPage) {
      setCurrentPage(currentPage + page);
    } else if (action === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1); // Corregido para restar la página en lugar de sumarla
    }
  };

  // Paginacion de team
  const [currentTeamPage, setCurrentTeamPage] = useState(1);
  const teamsPerPage = 3;
  const totalTeams = nameTeams.length;

  const maxPageTeam = Math.ceil(totalTeams / teamsPerPage);

  const indexOfLastTeam = currentTeamPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = nameTeams.slice(indexOfFirstTeam, indexOfLastTeam);


  const handleTeamPageChange = (page: number, direction: string) => {
    if (direction === 'next' && currentTeamPage < maxPageTeam) {
      setCurrentTeamPage(currentTeamPage + page);
    } else if (direction === 'prev' && currentTeamPage > 1) {
      setCurrentTeamPage(currentTeamPage - 1);
    }
  };
  const deleteTeam = async (id_team: number) => {
    setModalVisible(false);
    console.log(id_team);
    try{
      const id = id_team.toString();
      console.log(id);
      const response = await axios.delete(`${ENDPOINT_MS_TEAM}/middle/delete-team/${id}`);
      fetchTeamsData();
      console.log(response);
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

    const response = await axios.put(`${ENDPOINT_MS_PROJECT}/project/${id_project}`, updatedData);
    if (response.status === 200) {
      console.log('Nombre del proyecto actualizado con éxito');
      setEditMode(!editMode);
    } else {
      console.error('Error al actualizar el nombre del proyecto. Estado de la respuesta:', response.status);
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
      const response = await axios.get(`${ENDPOINT_MS_TEAM}/teams/project/${id_project}`);
      const teamData = response.data;
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
      const response = await axios.get(`${ENDPOINT_MS_PROJECT}/members/members/${id_project}`);
      const memberData = response.data;
      setEmailMembers(memberData.emails);
      console.log(emailMembers);
    } catch (error) {
      console.error('Error al recuperar los datos de miembros:', error);
    }
  }

  const handleTeamNavigation = (index: number, name:string) => {
    const idTeam = idTeams[index];
    const id_project = idTeams[index];
    navigation.navigate('Team', {idTeam, name, nameProject});
  }

  useFocusEffect(
    useCallback(() => {
        fetchTeamsData();
        fetchMembersData();
    }, [])
    );


    // Eliminar projecto
  const handleDeleteProject = async () => {
    setModalVisible(true);
  }

  const handleDeleteMember = async (email: string) => {
    setModalMemberVisible(true);
  }

  const handleDeleteProjectConfirm = async () => {
    try {
      const id_project = await AsyncStorage.getItem('id_project');
      const response = await axios.delete(`${ENDPOINT_MS_PROJECT}/middle/delete-proyect/${id_project}`);
      console.log('id_project', id_project);
      fetchMembersData();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  }

  const handleDeleteMemberConfirm = async () => {
    try {
      const email = deleteMemberEmail.toString();
      console.log(email);
      setModalMemberVisible(false);
  
      const id = await AsyncStorage.getItem('id_project');
      if (id !== null && id !== '') {
        console.log(id);
  
        const response = await axios.delete(`${ENDPOINT_MS_PROJECT}/members/member-project/${email}/${id}`);
        console.log('id_member', id);
        
        fetchMembersData();
      }
    } catch (error) {
      console.log('Error al eliminar el miembro:', error);
    }
  };

  const handleDeleteTeamConfirm = async () => {
    setModalTeamVisible(false);

    try{
      const id = deleteTeamId
      console.log(id);
      const response = await axios.delete(`${ENDPOINT_MS_TEAM}/middle/delete-team/${id}`);
      fetchTeamsData();
      console.log(response);
    }catch (e: any){
        setError(true);
        setErrorMessage(e?.response?.data?.message);
        console.log({error: e?.response?.data?.message});
    }
  }

  const handleDeleteTeamId = (id: number) => {
    setDeleteTeamId(id);
    setModalTeamVisible(true);
  }

  const handleDeleteMemeberEmail = (email: string) => {
    setDeleteMemberEmail(email);
    setModalMemberVisible(true);
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
                  <TouchableOpacity onPress={() => editProjectName(editingName)}>
                    <AntDesign name="checkcircleo" style={{marginTop: 5}} size={30} color="black" />
                  </TouchableOpacity>
                  
                  </View>
                )
                 :
                (
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                  <PageTitle style={{color:'black', fontSize:42}}>{editingName}</PageTitle>
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
            <View >

            
          
              <View style={{paddingVertical: 10, height: 180, overflow: 'hidden'}}>

              {currentMembers.map((email, index) => (
                <View key={index} style={styles.memberContainer}>
                  <View style={[styles.memberList, { flexDirection: 'column', alignItems: 'flex-start', width: '85%' }]}>
                    <Text style={styles.memberName}>{email}</Text>
                  </View>
                  {adminAviable && email !== userEmail ? 
                    <TouchableOpacity onPress={() => handleDeleteMemeberEmail(email)} >

                      <Octicons name="x" style={styles.boton} size={30} color="white" /> 
                    </TouchableOpacity>
                    : null}
                </View>
              ))}

              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <TouchableOpacity onPress={() => handleChangePage(-1, 'prev')} >
                  <Octicons name="chevron-left" style={{width:40, padding: 2, paddingLeft: 5}} size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChangePage(1, 'next')}>
                  <Octicons name="chevron-right" style={{width:40, padding: 2, paddingLeft: 5}} size={30} color="black" />
                </TouchableOpacity>
              </View>
              

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
            <View style={{flexDirection: 'row', gap: 10}}> 

            <SubTitle>Equipos del proyecto</SubTitle>
            
              <TouchableOpacity style={{backgroundColor:'white', borderRadius: 40}} onPress= {() => navigation.navigate('CreateTeam')}>
                <AntDesign name="plus" style={{marginTop: 10, paddingHorizontal: 10}} size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{height: 250}}>


            {currentTeams.map((name, index) => {
              return (
                <View key={name} style={{ flexDirection: "row" }}>
                  <ButtonText
                    onPress={() => handleTeamNavigation(index, name)}
                    key={index}
                    style={[
                      styles.projectContainer,
                      adminAviable ? { width: "85%" } : { width: "100%" },
                    ]}
                  >
                    <View
                      style={{ flexDirection: "column", alignItems: "flex-start", width: "70%" }}
                    >
                      <Text style={styles.projectName}>{name}</Text>
                    </View>
                  </ButtonText>
                  {adminAviable ? (
                    <TouchableOpacity
                      style={{ height: 50, alignItems: "flex-end", justifyContent: "center" }}
                      onPress={() => handleDeleteTeamId(idTeams[index])}
                    >
                      <Octicons name="x" style={styles.boton} size={30} color="white" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              );
            })}

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 0 }}>
              <TouchableOpacity onPress={() => handleTeamPageChange(-1, "prev")}>
                <Octicons
                  name="chevron-left"
                  style={{ width: 40, padding: 2, paddingLeft: 5 }}
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTeamPageChange(1, "next")}>
                <Octicons
                  name="chevron-right"
                  style={{ width: 40, padding: 2, paddingLeft: 5 }}
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            </View>
            
            </View>
            {/* Eliminar proyecto */}
            {
              adminAviable ?

              <ButtonText style={[styles.botonContainer, {backgroundColor:'red', borderColor:'red'}]} onPress= {() => handleDeleteProject()}>
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
                                                    >
                                                    <ButtonText onPress={() =>  handleDeleteProjectConfirm()} style={{fontSize:20, fontWeight:'bold', color: 'white', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}>
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

                                {/* Modal eliminar equipo */}
                                <Modal
                                    animationType="slide"
                                    onDismiss={() => console.log("Modal closed")}
                                    onShow={() => console.log("Modal showed")}
                                    transparent
                                    visible={modalTeamVisible}
                                >

                                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems:'center'}}>
                                        <TouchableOpacity style={{height: '50%', width:'100%'}} onPress={() => setModalTeamVisible(false)}/>
                                        <View style={{height: '50%', width:'95%', backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                                            <View style={{flexDirection:'row', alignItems:'flex-end',backgroundColor: 'transparent', justifyContent:'flex-end', padding:15}}>
                                                <ButtonText  onPress={() => setModalTeamVisible(false)}> 
                                                    <Octicons style={{width:40, padding: 2, paddingLeft: 9}} name={"x"} size={35} color={'black'} />
                                                </ButtonText>
                                            </View>
                                            <View style={{flexDirection:'row', alignItems:'center',backgroundColor: 'transparent', justifyContent:'center', padding:15}}>
                                                <Text style={{fontSize: 20, fontWeight:'bold', color: 'black', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}>
                                                    ¿Está seguro que desea eliminar el equipo?
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row', alignItems:'center',backgroundColor: 'transparent', justifyContent:'center', padding:15}}>
                                                {/* Eliminar */}
                                                <TouchableOpacity
                                                    style={{backgroundColor: 'red' ,alignItems: 'center',height:50, width:125, borderRadius: 5, justifyContent: 'center', marginHorizontal: 5}}
                                                    >
                                                    <ButtonText onPress={() =>  handleDeleteTeamConfirm()} style={{fontSize:20, fontWeight:'bold', color: 'white', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}>
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
                                 {/* Modal eliminar miembro */}
                                 <Modal
                                    animationType="slide"
                                    onDismiss={() => console.log("Modal closed")}
                                    onShow={() => console.log("Modal showed")}
                                    transparent
                                    visible={modalMemberVisible}
                                >

                                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems:'center'}}>
                                        <TouchableOpacity style={{height: '50%', width:'100%'}} onPress={() => setModalMemberVisible(false)}/>
                                        <View style={{height: '50%', width:'95%', backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                                            <View style={{flexDirection:'row', alignItems:'flex-end',backgroundColor: 'transparent', justifyContent:'flex-end', padding:15}}>
                                                <ButtonText  onPress={() => setModalMemberVisible(false)}> 
                                                    <Octicons style={{width:40, padding: 2, paddingLeft: 9}} name={"x"} size={35} color={'black'} />
                                                </ButtonText>
                                            </View>
                                            <View style={{flexDirection:'row', alignItems:'center',backgroundColor: 'transparent', justifyContent:'center', padding:15}}>
                                                <Text style={{fontSize: 20, fontWeight:'bold', color: 'black', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}>
                                                    ¿Está seguro que desea eliminar al mimbro del proyecto
                                                </Text>
                                            </View>
                                            <View style={{flexDirection:'row', alignItems:'center',backgroundColor: 'transparent', justifyContent:'center', padding:15}}>
                                                {/* Eliminar */}
                                                <TouchableOpacity
                                                    style={{backgroundColor: 'red' ,alignItems: 'center',height:50, width:125, borderRadius: 5, justifyContent: 'center', marginHorizontal: 5}}
                                                    >
                                                    <ButtonText onPress={() =>  handleDeleteMemberConfirm()} style={{fontSize:20, fontWeight:'bold', color: 'white', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}>
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
},
memberList: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  marginVertical: 5,
},
});

export default ProjectView;
