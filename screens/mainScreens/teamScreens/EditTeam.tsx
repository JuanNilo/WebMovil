

import React, {useState, useRef, useEffect} from "react";

import giraStyles from "../../../components/style";
import { TextInput, View, Text, ScrollView,Image } from 'react-native';
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

// Icons 
import {Octicons, Ionicons} from "@expo/vector-icons";

import { 
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RigthIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent

} from '../../../components/style';

const {styleInput, styleIcon, styleInnerContainer,styleContainer, styleIconContainer, container,styleLabel, styleErrorMessage, styleErrorView, styleLogo} = giraStyles

// Colors

const {primary , secondary, purple, yellow} = Colors; 

// Keyboards

import KeyboardWrapper from "../../../components/keyboardWrapper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const EditTeam = ({navigation}) => {
   
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [teamData, setTeamData] = useState({});
    
    // Recuperar datos desde el back

    const fetchTeamsData = async () => {
        try {
          const email = await AsyncStorage.getItem('email');
          const response = await axios.post(`http://10.0.2.2:4000/api/in/middle/get-team-names`,
          {
            email: email,
          }
          );
          const teamData = response.data;
          setTeamData(teamData || []);
          
        } catch (error) {
          console.error('Error al recuperar los datos de equipos:', error);
        }
      };
      
      
      useEffect(() => {
        fetchTeamsData();
      }, []);

    const changeTeamName = async (teamName: string) => {
        setError(false);
        try{
            // const response = await axios.post('http://10.0.2.2:3000/api/auth/register',{
            //     email,
            //     firstName,
            //     lastName,
            //     password,
            // });
            
            navigation.navigate('Team');
            
        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
        }
    };

    // Ref

    const oldTeamRef = useRef();
    const newTeamRef = useRef();

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
                    <PageTitle style={{color:purple}}>Equipos</PageTitle>
                    <SubTitle>Cambiar nombre equipo</SubTitle>
                    <Formik
                        initialValues={{oldTeamName: teamData.teamName, newTeamName: ''}}
                        onSubmit={(values) => registerRequest(values.teamName)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    
            
                                    {/* Antiguo Mail */}
                                    <Text style={styleLabel}>Ingrese nombre antiguo</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={"people"} size={30} color={purple}/>

                                    <TextInput
                                        ref={oldTeamRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.oldTeamName}
                                        placeholder={teamData.teamName}
                                        onChangeText={handleChange('oldTeamName')}
                                        onBlur={handleBlur('oldTeamName')}
                                        onSubmitEditing={() => newTeamRef.current.focus()}
                                        />
                                    </View>


                                {/* Nuevo Mail */}
                                <Text style={styleLabel}>Ingrese nombre nuevo</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={"people"} size={30} color={purple}/>

                                    <TextInput
                                        ref={newTeamRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.newEmail}
                                        placeholder={"Nuevo nombre de equipo"}
                                        onChangeText={handleChange('newTeamName')}
                                        onBlur={handleBlur('newTeamName')}
                                        onSubmitEditing={() => changeEmail(values.teamData)}
                                        />
                                    </View>
                                    
                                
                                    <View
                                        style={styleErrorView}
                                    >
                                        <Text style={styleErrorMessage}>
                                            {errorMessage}
                                        </Text>
                                    </View>
                                    <StyledButton 
                                        style={{backgroundColor: purple}}
                                        onPress={() => changeEmail(values.odlTeamName,values.newTeamName)}>
                                        <ButtonText>
                                            Cambiar nombre
                                        </ButtonText>
                                    </StyledButton>
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardWrapper>
    );
}


export default EditTeam;