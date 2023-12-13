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

export default function CreateTeam({navigation}){
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
      useEffect(() => {
      }, []);

    const registerTeamRequest = async (name: string) => {
        try {
          const id_project = await AsyncStorage.getItem('id_project');
          const response = await axios.post(`http://10.0.2.2:4000/api/in/teams`,{
            name,
            id_project,
          });
          navigation.goBack();
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
                    <PageTitle style={{color: 'black'}}>Crear equipo</PageTitle>
                    <Formik
                        initialValues={{name: ''}}
                        onSubmit={(values) => registerTeamRequest(values.name)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    <Text style={styles.TextLabel}>Ingrese nombre del equipo</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={"people"} size={30} color={'black'}/>
                                        <TextInput
                                            placeholder="Nombre de equipo"
                                            style={styles.InputContainer}
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
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
                                        style={{backgroundColor: 'black'}}
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

const styles = StyleSheet.create({
    InputContainer : {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        borderColor:'black',
        borderWidth: 3,
        color:'black',
        width:'80%',
        fontWeight:'bold',
        fontSize: 18,
    },
    TextLabel: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:10,
    }
})