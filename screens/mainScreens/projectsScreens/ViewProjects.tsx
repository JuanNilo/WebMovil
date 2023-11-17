import React, { useState, useEffect, useCallback } from "react";
import giraStyles, { ButtonText, StyledButton } from "../../../components/style";
import { View, ScrollView, Image, Text } from 'react-native';
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
    
    const deleteTeam = async (teamName: string) => {
        setError(false)
        try{
        //    Nacho juegue
            
            navigation.navigate('Team');
            
        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
        }
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
                <View style={styleInnerContainer}>
                    <View style={{width: '100%', height: '100%' }}>
                        {projectsNames.map((name, index) => (
                            <View key={index} style={styleContainer}>

                                {/* Nombre del proyecto */}
                                <View style={styleTeamContainer}>
                                    <ButtonText style={{fontSize:20, fontWeight:'bold', color: 'black', width: '100%', textAlign: 'center',  padding: 10, borderRadius: 5}}
                                    onPress={() => navigation.navigate('ProjectView') /* handle your button action here */}
                                    >
                                        {name}
                                    </ButtonText>
                                </View>

                                {/* Boton de editar */}
                                <View style={styleContainer}>
                                    <StyledButton
                                        style={{backgroundColor: purple ,alignItems: 'center', justifyContent: 'center', marginHorizontal: 'auto'}}
                                            onPress={() => navigation.navigate('EditProject') /* handle your button action here */}>
                                        <Octicons style={{width:40, padding: 2, paddingLeft: 6}} name={"pencil"} size={30} color={primary} />
                                    
                                    </StyledButton>
                                </View>
                                {/* Boton de eliminar */}
                                <View style={styleContainer}>
                                <StyledButton
                                style={{backgroundColor: red, padding: 5, justifyContent:'center',alignItems:'center',marginHorizontal: 4}}
                                    onPress={() => deleteTeam("equipo") /* handle your button action here */}>
                                <Octicons style={{width:40, padding: 2, paddingLeft: 9}} name={"x"} size={35} color={primary} />
                                    
                                </StyledButton>
                            </View>
                            </View>
                        ))}     
                       
                    </View>    
                </View>
            </ScrollView>
        </KeyboardWrapper>
    )
}