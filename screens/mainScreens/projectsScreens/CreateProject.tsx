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

export default function CreateProject({navigation}){
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const rol = 'administrador';	
    const [name, setName] = useState('');
      useEffect(() => {
      }, []);

    const resgisterProjectRequest = async (name: string) => {
        try {
          const email = await AsyncStorage.getItem('email');
          const response = await axios.post(`http://10.0.2.2:3002/api/on/middle/new-project`,{
            name,
            email,
            rol,
          });
          navigation.navigate('Projects');
        } catch (error) {
          setError(true);
          setErrorMessage(error?.response?.data?.message);
          console.error('Error al crear equipo', error);
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
                    <PageTitle style={{color: purple}}>Crear proyecto</PageTitle>
                    <Formik
                        initialValues={{name: ''}}
                        onSubmit={(values) => resgisterProjectRequest(values.name)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    <Text style={styleLabel}>Ingrese nombre del proyecto</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={"people"} size={30} color={purple}/>
                                        <TextInput
                                            placeholder="Nombre de proyecto"
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
                                        onPress={() => resgisterProjectRequest(values.name)}>
                                        <ButtonText>
                                            Crear proyecto
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