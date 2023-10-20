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

const {primary , secondary, purple} = Colors; 

// Keyboards

import KeyboardWrapper from "../../../components/keyboardWrapper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function CreateTeam({navigation}){
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const rol = 'admin';	
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const fetchUserData = async () => {
        try {
          const email = await AsyncStorage.getItem('email');
          const response = await axios.get(`http://10.0.2.2:3000/api/users/profile/${email}`);
          const userData = response.data;
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
        } catch (error) {
          setError(true);
          setErrorMessage(error?.response?.data?.message);
          console.error('Error al recuperar los datos del usuario:', error);
        }
      };
      useEffect(() => {
        fetchUserData();
      }, []);

    const registerTeamRequest = async (name: string) => {
        try {
          const email = await AsyncStorage.getItem('email');
          const response = await axios.post(`http://10.0.2.2:4000/api/in/middle/new-team`,{
            name,
            email,
            firstName,
            lastName,
            rol,
          });
          navigation.navigate('Team');
        } catch (error) {
          setError(true);
          setErrorMessage(error?.response?.data?.message);
          console.error('Error al recuperar los datos del usuario:', error);
        }
      };
     
    return(
        <KeyboardWrapper>
            <ScrollView style={container}>
                <StatusBar style="dark" />
                <View style={styleInnerContainer}>
                    <Image
                        source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                        style={styleLogo}
                    />
                    <PageTitle style={{color: purple}}>Crear equipo</PageTitle>
                    <Formik
                        initialValues={{name: ''}}
                        onSubmit={(values) => registerTeamRequest(values.name)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    <Text style={styleLabel}>Ingrese nombre de equipo</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={"people"} size={30} color={purple}/>
                                        <TextInput
                                            placeholder="Nombre de equipo"
                                            style={styleInput}
                                            placeholderTextColor={primary}
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            onSubmitEditing={() => nameInputRef.current.focus()}
                                        />
                                    </View>
                                    {/* Error */}
                                    <View
                                        style={styleErrorView}
                                    >
                                        <Text style={styleErrorMessage}>
                                            {errorMessage}
                                        </Text>
                                    </View>
                                    <StyledButton 
                                        style={{backgroundColor: purple}}
                                        onPress={() => registerTeamRequest(values.name)}>
                                        <ButtonText>
                                            Crear equipo
                                        </ButtonText>
                                    </StyledButton>
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardWrapper>
    )
}