import React, { useState, useEffect } from "react";
import giraStyles from "../../../components/style";
import { View, ScrollView, Image, Text } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, RigthIcon, StyledButton, ButtonText, Line, ExtraView, ExtraText, TextLink, TextLinkContent } from '../../../components/style';
import { Colors } from "../../../components/style";
import KeyboardWrapper from "../../../components/keyboardWrapper";

const { secondary, primary, brand, purple , red} = Colors

const { styleIcon, styleInnerContainer, styleContainer, styleDataUser,styleIconContainer, container, styleLabel, styleErrorMessage, styleErrorView, styleInput,styleLogo, styleList } = giraStyles

import axios from "axios";

import { ENDPOINT_MS_USER } from '@env';

export default function DeleteTeam({navigation}){
    const [teams, setTeams] = useState([]);

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${ENDPOINT_MS_USER}/users/`);
        const userData = response.data;
        setTeams(userData.teams); // Supongo que los equipos están en una propiedad 'teams' de userData
      } catch (error) {
        console.error('Error al recuperar los datos del usuario:', error);
      }
    };

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      fetchUserData();
    }, []);
  
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

    return(
        <KeyboardWrapper>
            <ScrollView style={container}>
                <StatusBar style="dark"/>
                <View style={styleInnerContainer}>
                    <Image
                        source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                        style={styleLogo}
                    />
                    <PageTitle style={{color: purple}}>Equipos</PageTitle>
                    <View style={styleDataUser}>
                        {/* {teams.map((team) => (
                            <View style={styleContainer}>
                                <Text style={styleLabel}>
                                    {team.name}
                                </Text>
                                <Octicons style={styleIcon} name={"pencil"} size={30} color={purple} />
                            </View>
                        ))}     */}
                        <View style={styleContainer}>
                                <Text style={styleList}>
                                    equipo 1
                                </Text>
                                <StyledButton
                                style={{backgroundColor: red, alignItems: 'center', justifyContent: 'center', marginHorizontal: 'auto'}}
                                    onPress={() => deleteTeam("equipo") /* handle your button action here */}>
                                <Octicons style={styleIcon} name={"x"} size={30} color={primary} />
                                    
                                </StyledButton>
                            </View>
                    </View>    
                </View>
            </ScrollView>
        </KeyboardWrapper>
    )
}