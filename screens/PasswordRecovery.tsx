import React, {useState, useRef} from "react";
import { StatusBar } from "expo-status-bar";

import axios from "axios";

import { TextInput, View, Text } from 'react-native';

//formik
import { Formik } from "formik";

// Icons 
import {Octicons} from "@expo/vector-icons";

import giraStyles from "./../components/style";


const {styleInput, styleIcon, styleContainer, styleIconContainer, styleLabel, styleErrorView, styleErrorMessage} = giraStyles


import { 
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    Colors,
    StyledButton,
    ButtonText,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent

} from './../components/style';

// Colors

const {primary, secondary, terceary, yellow, darkLight, brand, purple, red} = Colors; 

// Keyboards

import KeyboardWrapper from "../components/keyboardWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";



const PasswordRecovery = ({navigation}) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({ email: '' });
    const passwordCodeRequest = async (email: string) => {
        setError(false);

        try{
            const response = await axios.post('http://10.0.2.2:3000/api/auth/reset',{
            email
            });
            const code  = String(response.data);
            setErrorMessage('');
            setValues({ email: ''});
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('code', code);
            navigation.navigate('PasswordChange');

        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
        }
    };


    return(
        <KeyboardWrapper>
            <StyledContainer>
                <StatusBar style="dark"/> 
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                    <PageTitle> Gira</PageTitle>
                    <SubTitle>Recuperar contraseña</SubTitle>
                    <Formik
                        initialValues={values}
                        onSubmit={(formValues) => passwordCodeRequest(formValues.email)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                     {/* Mail */}
                                    <Text style={styleLabel}>Ingrese correo</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'mail'} size={30} color={brand}/>

                                    <TextInput
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.email}
                                        placeholder="correo@gira.com"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        keyboardType="email-address"
                                        />
                                    </View>

                                    <View
                                        style={styleErrorView}
                                    >
                                        <Text style={styleErrorMessage}>
                                            {errorMessage}
                                        </Text>
                                    </View>
                                    <StyledButton onPress={() => passwordCodeRequest(values.email)}>
                                        <ButtonText>
                                        Recuperar
                                        </ButtonText>
                                    </StyledButton>
                                    <Line />
                
                                    <ExtraView>
                                        <ExtraText>
                                        ¿Tienes una cuenta?
                                        </ExtraText>
                                        <TextLink onPress={() =>  navigation.navigate('Login')}>
                                            <TextLinkContent>
                                            Inicia sesión
                                            </TextLinkContent>
                                        </TextLink>
                                    </ExtraView>
                                    <Line />
                                    
                                    
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardWrapper>
    );
}

export default PasswordRecovery;