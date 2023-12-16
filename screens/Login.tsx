import React, {useState, useRef} from "react";
import { StatusBar } from "expo-status-bar";

import axios from "axios";

import { TextInput, View, Text, TouchableOpacity } from 'react-native';

//formik
import { Formik } from "formik";

// Icons 
import {Octicons, Ionicons, AntDesign} from "@expo/vector-icons";

import giraStyles from "./../components/style";

import { ENDPOINT_MS_USER } from '@env';

const {styleInput, styleIcon, styleContainer, styleIconContainer, styleLabel, styleErrorView, styleErrorMessage} = giraStyles


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

} from './../components/style';

// Colors

const {primary, secondary, terceary, yellow, darkLight, brand, purple, red} = Colors; 

// Keyboards

import KeyboardWrapper from "../components/keyboardWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Login = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const loginRequest = async (email: string, password: string) => {
        setError(false);
        setIsLoading(true);
        try{
            const response = await axios.post(`${ENDPOINT_MS_USER}/auth/login`,{
                email,
                password,
            });
            setErrorMessage('');
            setValues({ email: '', password: '' });
            await AsyncStorage.setItem('email', email);
            setIsLoading(false);
            navigation.navigate('Welcome', {email});

        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
            setIsLoading(false);
        }
    };

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    return(
        <KeyboardWrapper>
            <StyledContainer>
                <StatusBar style="dark"/> 
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                    <PageTitle> Gira</PageTitle>
                    <SubTitle>Iniciar sesión</SubTitle>
                    <Formik
                        initialValues={values}
                        onSubmit={(formValues) => loginRequest(formValues.email, formValues.password)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                     {/* Mail */}
                                    <Text style={styleLabel}>Ingrese correo</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'mail'} size={30} color={brand}/>

                                    <TextInput 
                                        ref={emailInputRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.email}
                                        placeholder="correo@gira.com"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        keyboardType="email-address"
                                        onSubmitEditing={() => passwordInputRef.current.focus()}
                                        />
                                    </View>

                                    {/* Contrasena */}
                                    
                                    <Text style={styleLabel}>Ingrese contraseña</Text>
                                    <View style={styleContainer}>
                                        <View style={styleIconContainer}>
                                            <Octicons style={styleIcon} name={'lock'} size={30} color={brand}/>
                                        </View>

                                    <TextInput 
                                        ref={passwordInputRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.password}
                                        placeholder="Constraseña"
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
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
                                            await loginRequest(values.email, values.password);
                                        } finally {
                                        setIsLoading(false);}
                                        }} disabled={isLoading}>
                                        <ButtonText>
                                            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
                                        </ButtonText>
                                    </StyledButton >
                                    
                                    <Line />
                
                                    <ExtraView>
                                        <ExtraText>
                                            ¿No tienes una cuenta?
                                        </ExtraText>
                                        <TextLink disabled={isLoading} onPress={() =>  navigation.navigate('SignUp')}>
                                            <TextLinkContent>
                                                Regístrate
                                            </TextLinkContent>
                                        </TextLink>
                                    </ExtraView>
                                    <Line />
                                    {/* Recuperar contraseña */}
                                    <ExtraView>
                                        <TextLink disabled={isLoading} onPress={() =>  navigation.navigate('PasswordRecovery')}>
                                            <TextLinkContent>
                                                ¿Olvidaste tu contraseña?
                                            </TextLinkContent>
                                        </TextLink>
                                    </ExtraView>
                                    
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardWrapper>
    );
}

export default Login;