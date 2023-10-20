import React, { useState, useEffect } from "react";
import giraStyles, { StyledButton } from "./../../../components/style";
import { View, ScrollView, Image, Text } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { PageTitle } from "./../../../components/style";
import { Colors } from "./../../../components/style";
import KeyboardWrapper from "../../../components/keyboardWrapper";

const { secondary, primary, brand, purple } = Colors

const { styleIcon, styleInnerContainer, styleContainer, styleDataUser,styleIconContainer, container, styleLabel, styleErrorMessage, styleErrorView, styleInput,styleLogo, styleList } = giraStyles

import axios from "axios";


export default function ViewTeams({navigation}){
    const [teams, setTeams] = useState([]);

    const fetchTeamsData = async () => {
      try {
        const response = await axios.post(`http://10.0.2.2:4000/api/in/middle/get-team-names`);
        const userData = response.data;
        setTeams(userData || []);
        
      } catch (error) {
        console.error('Error al recuperar los datos de equipos:', error);
      }
    };
    
    
    useEffect(() => {
      fetchTeamsData();
      console.log(teams);
    }, []);
  
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
                        {teams.map((name) => (
                            <View style={styleContainer}>
                                <Text style={styleLabel}>
                                    {name}
                                </Text>
                                <Octicons style={styleIcon} name={"pencil"} size={30} color={purple} />
                            </View>
                        ))}     
                        <View style={styleContainer}>
                                <StyledButton
                                style={{backgroundColor: purple, alignItems: 'center', justifyContent: 'center', marginHorizontal: 'auto'}}
                                    onPress={() => navigation.navigate('EditTeam') /* handle your button action here */}>
                                <Octicons style={styleIcon} name={"pencil"} size={30} color={primary} />
                                    
                                </StyledButton>
                        </View>
                    </View>    
                </View>
            </ScrollView>
        </KeyboardWrapper>
    )
}