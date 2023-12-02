import React, { useState, useEffect, useCallback } from "react";
import giraStyles, { ButtonText, StyledButton } from "../../../components/style";
import { View, ScrollView, Image, Text, TextInput, Modal, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from "expo-status-bar";
import {useFocusEffect} from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { PageTitle } from "../../../components/style";
import { Colors } from "../../../components/style";
import KeyboardWrapper from "../../../components/keyboardWrapper";

const { secondary, primary, brand, purple,red } = Colors

const { styleIcon, styleInnerContainer, styleContainer, styleDataUser,styleIconContainer, container, styleLabel, styleErrorMessage, styleErrorView, styleInput,styleLogo, styleList, styleTeamContainer } = giraStyles

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function ViewProjects({navigation}){
    const [projectsNames, setProjectsNames] = useState([]);
    const [projectsIds, setProjectsIds] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editingName, setEditingName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const habdleEdit = (index: number) => {
        setEditingIndex(index);
    }

    const handleNameChange = (value: string) => {
        setEditingName(value);
    }

    const editTeam = async (teamName: string) => {
        try{
            // Nacho juegue
            setEditingIndex(-1);
            setEditingName('');
        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
        }
    }

    const fetchProjectData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const response = await axios.post(`http://10.0.2.2:3002/api/on/middle/get-projects`,
        {
          email: email,
        }
        );
        const projectData = response.data;
        console.log(projectData);
        setProjectsIds(projectData.ids);
        setProjectsNames(projectData.names);
        
      } catch (error) {
        console.error('Error al recuperar los datos de equipos:', error);
      }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProjectData();
        }, [])
        );
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [teamDeleteName, setTeamDeleteName] = useState('');

    const handleDeleteTeam = (teamName: string) => {
        setTeamDeleteName(teamName);
        setModalVisible(true);
    }

    const handleCancelDelete = () => {
        setModalVisible(false);
        setTeamDeleteName('');
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

    const idLocalStorage = async (id: number) => {
        await AsyncStorage.setItem('id_project', id.toString());
        navigation.navigate('ProjectView');
    }
    
    useEffect(() => {
      fetchProjectData();
    }, []);
  
    return(
        <KeyboardWrapper>
            <ScrollView style={{
        flex: 1,
        height: '100%'}}>
                <StatusBar style="dark"/>
                <View style={styleInnerContainer} >
                    <View style={{width: '100%', height: '100%' }}>
                        {projectsNames.map((name, index) => (
                            <View key={index} style={styleContainer}>
                                {
                                    index === editingIndex ? (
                                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width:'100%'}}>
                                            <View style={styleTeamContainer}>

                                            <TextInput
                                                style={{fontSize:20, fontWeight:'bold', color: 'black', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}
                                                onChangeText={handleNameChange}
                                                value={editingName}
                                                placeholder="Nuevo Nombre"
                                                placeholderTextColor={purple}
                                                />
                                            </View>
                                            {/* Boton Guardar */}
                                            <StyledButton
                                                style={{backgroundColor: purple ,alignItems: 'center', justifyContent: 'center', marginHorizontal: 'auto'}}
                                                onPress={() => editTeam("equipo") }>
                                                <Octicons style={{width:40, padding: 2, paddingLeft: 6}} name={"check"} size={30} color={primary} />
                                            </StyledButton>
                                            {/* Boton Eliminar */}
                                            <StyledButton
                                                style={{backgroundColor: red, padding: 5, justifyContent:'center',alignItems:'center',marginHorizontal: 4}}
                                                    >
                                                <Octicons style={{width:40, padding: 2, paddingLeft: 9}} name={"x"} size={35} color={Colors.darkLight} />    
                                            </StyledButton>
                                        </View>
                                    ) : (
                                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                            <View style={styleTeamContainer}>
                                                <ButtonText style={{fontSize:20, fontWeight:'bold', color: 'black', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}
                                                    onPress={() => idLocalStorage(projectsIds[index]) }
                                                >
                                                    {name}
                                                </ButtonText>
                                                </View>
                                            <StyledButton
                                                style={{backgroundColor: purple ,alignItems: 'center', justifyContent: 'center', marginHorizontal: 'auto'}}
                                                onPress={() => habdleEdit(index) }>
                                                <Octicons style={{width:40, padding: 2, paddingLeft: 6}} name={"pencil"} size={30} color={primary} />
                                            </StyledButton>
                                            <StyledButton
                                                style={{backgroundColor: red, padding: 5, justifyContent:'center',alignItems:'center',marginHorizontal: 4}}
                                                    onPress={() =>  handleDeleteTeam(name)}>
                                                <Octicons style={{width:40, padding: 2, paddingLeft: 9}} name={"x"} size={35} color={primary} />
                                                    
                                                </StyledButton>
                                        </View>
                                    )
                                }
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
                                                    style={{backgroundColor: purple ,alignItems: 'center',height:50, width:125, borderRadius: 5, justifyContent: 'center', marginHorizontal: 5}}
                                                    onPress={() => deleteTeam("equipo")}>
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
                        ))}     
                       
                    </View>    
                </View>
            </ScrollView>
        </KeyboardWrapper>
    )
}
