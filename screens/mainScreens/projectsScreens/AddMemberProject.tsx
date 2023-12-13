import React, {useState, useRef, useEffect} from "react";

import giraStyles from "../../../components/style";
import { TextInput, View, Text, ScrollView,Image, StyleSheet } from 'react-native';
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

export default function AddMemberProject({navigation, route}){
    const {nameProject} = route.params;
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const rol = 'trabajador';	
      useEffect(() => {
      }, []);

    const registerMemberProject = async (email: string) => {
        try {
          const id = await AsyncStorage.getItem('id_project');
          const response = await axios.post(`http://10.0.2.2:3002/api/on/middle/new-member`,{
            email,
            rol,
            id,
          });
          navigation.navigate('ProjectView', {nameProject});
        } catch (error) {
          setError(true);
          setErrorMessage(error?.response?.data?.message);
          console.error('Error al registar miembro', error);
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
                    <PageTitle style={{color: 'black'}}>Añadir miembro</PageTitle>
                    <Formik
                        initialValues={{email: ''}}
                        onSubmit={(values) => registerMemberProject(values.email)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    <Text style={styles.TextLabel}>Ingrese el correo del miembro</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={"people"} size={30} color={'black'}/>
                                        <TextInput
                                            placeholder="correo@email.com"
                                            style={styles.InputContainer}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            onSubmitEditing={()=> registerMemberProject(values.email)}
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
                                    <View>

                                    <StyledButton
                                        style={{backgroundColor:'black'}}
                                        onPress={() => registerMemberProject(values.email)}>
                                        <ButtonText>
                                            Añadir miembro
                                        </ButtonText>
                                    </StyledButton>
                                            </View>
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardWrapper>
    )
}

const styles = StyleSheet.create({
    InputContainer : {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        borderColor: 'black',
        borderWidth: 3,
        color: 'black',
        width: '80%',
        fontWeight: 'bold',
        fontSize: 18,
    },
    TextLabel: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 3,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    }
})