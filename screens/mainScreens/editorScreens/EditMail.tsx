

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

import { ENDPOINT_MS_USER } from '@env';

const {styleInput, styleIcon, styleInnerContainer,styleContainer, styleIconContainer, container,styleLabel, styleErrorMessage, styleErrorView, styleLogo} = giraStyles

// Colors

const {primary , secondary, purple} = Colors; 

// Keyboards

import KeyboardWrapper from "../../../components/keyboardWrapper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";


const EditMail = ({navigation}) => {
   
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState({});
    const [emailInput, setEmailInput] = useState('');   
    const [newEmail, setNewEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Recuperar datos desde el back

    const fetchUserData = async () => {
        try {
          const email = await AsyncStorage.getItem('email');
          const response = await axios.get(`${ENDPOINT_MS_USER}/users/profile/${email}`);
          const userData = response.data;
          setUserData(userData);
        } catch (error) {
          setError(true);
          setErrorMessage(error?.response?.data?.message);
          console.error('Error al recuperar los datos del usuario:', error);
        }
      };
      useEffect(() => {
        fetchUserData();
      },[]);

    
      const changeEmail = async (emailInput: string, newEmail: string) => {
        setError(false);
        try{
            const oldEmail = await AsyncStorage.getItem('email');
            console.log (oldEmail);
            const response = await axios.post(`${ENDPOINT_MS_USER}/users/update-email`,{
                oldEmail,
                emailInput,
                newEmail,
            });
            await AsyncStorage.setItem('email', newEmail);
            setIsLoading(false);
            navigation.navigate('Login');
        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
        }
    };

    // Ref

    const oldEmailRef = useRef();
    const newEmailRef = useRef();

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
                    <PageTitle> Gira</PageTitle>
                    <SubTitle>Cambiar correo</SubTitle>
                    <Formik
                        initialValues={{emailInput: '', newEmail: ''}}
                        onSubmit={(values) => changeEmail(values.emailInput,values.newEmail)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    
            
                                    {/* Antiguo Mail */}
                                    <Text style={styleLabel}>Ingrese correo antiguo</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'mail'} size={30} color={purple}/>

                                    <TextInput
                                        ref={oldEmailRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.emailInput}
                                        placeholder={"antiguo@mail.com"}
                                        onChangeText={handleChange('emailInput')}
                                        onBlur={handleBlur('emailInput')}
                                        keyboardType="email-address"
                                        onSubmitEditing={() => newEmailRef.current.focus()}
                                        />
                                    </View>


                                {/* Nuevo Mail */}
                                <Text style={styleLabel}>Ingrese correo nuevo</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'mail'} size={30} color={purple}/>

                                    <TextInput
                                        ref={newEmailRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.newEmail}
                                        placeholder={"nuevo@mail.com"}
                                        onChangeText={handleChange('newEmail')}
                                        onBlur={handleBlur('newEmail')}
                                        keyboardType="email-address"
                                        onSubmitEditing={() => handleSubmit()}
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
                                        onPress={async () => { setIsLoading(true); // Activar el estado de carga al presionar el botón
                                        try {
                                            await changeEmail(values.emailInput, values.newEmail);
                                        } finally {
                                        setIsLoading(false);}
                                        }} disabled={isLoading}>
                                        <ButtonText>
                                            {isLoading ? 'Cargando...' : 'Cambiar Email'}
                                        </ButtonText>
                                    </StyledButton >
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardWrapper>
    );
}


export default EditMail;