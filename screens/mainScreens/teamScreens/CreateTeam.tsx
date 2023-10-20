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

export default function CreateTeam({navigation}){
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState({});


    const registerTeamRequest = async (teamName: string) => {
        setError(false);
        try{
            // Query nacho
            navigation.navigate('Team')
        }catch (e: any){

        }
    }
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
                        initialValues={{teamName: ''}}
                        onSubmit={(values) => registerTeamRequest(values.teamName)}
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
                                            value={values.teamName}
                                            onChangeText={handleChange('teamName')}
                                            onBlur={handleBlur('teamName')}
                                            onSubmitEditing={() => registerTeamRequest(values.teamName)}
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
                                        onPress={() => registerTeamRequest(values.teamName)}>
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