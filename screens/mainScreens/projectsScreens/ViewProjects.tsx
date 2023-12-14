import React, { useState, useEffect, useCallback } from "react";
import giraStyles, { ButtonText, StyledButton } from "../../../components/style";
import { View, ScrollView, Image, Text, TextInput, Modal, Button, TouchableOpacity, StyleSheet } from 'react-native';
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
        setProjectsIds(projectData.ids);
        setProjectsNames(projectData.names);
        console.log('\n\n',projectData);
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

    const idLocalStorage = async (id: number, name: string) => {
        await AsyncStorage.setItem('id_project', id.toString());
        navigation.navigate('ProjectView', {name});
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
                                
                                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                            <View style={styles.input}>
                                                <ButtonText style={styles.inputText}
                                                    onPress={() => idLocalStorage(projectsIds[index], name)}
                                                >
                                                    {name}
                                                </ButtonText>
                                                </View>
                                        
                                        </View>
                                    
                            </View>
                        ))}     
                       
                    </View>    
                </View>
            </ScrollView>
        </KeyboardWrapper>
    )
}

const styles = StyleSheet.create({
        editButton: {
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 'auto',
        },
        deleteButton: {
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 4,
            padding: 5,
        },
        inputText:{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            padding: 4,
            paddingHorizontal: 4,
            borderRadius: 5,
            width: '100%',
        },
        input:{
            flex: 1, 
            backgroundColor: 'white', 
            color: 'black', 
            height: 50,
            alignItems: 'center',
            marginVertical: 5,
            borderRadius: 10,
            paddingHorizontal: 10,
            fontSize: 16,
            borderWidth: 3,
            borderColor: 'black',
            marginHorizontal: 4,
        },
        iconStyle:{
            width:40, 
            padding: 2, 
            paddingLeft: 10
        }
})