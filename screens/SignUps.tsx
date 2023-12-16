import React, {useState, useRef} from "react";

import giraStyles from "./../components/style";
import { TextInput, View, Text, ScrollView } from 'react-native';
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

} from './../components/style';
import { ENDPOINT_MS_USER } from '@env';

const {styleInput, styleIcon, styleInnerContainer,styleContainer, styleIconContainer, container,styleLabel, styleErrorMessage, styleErrorView} = giraStyles

// Colors

const {primary , secondary} = Colors; 

// Keyboards

import KeyboardWrapper from "../components/keyboardWrapper";
import axios from "axios";


const SignUp = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
   
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
     
    const registerRequest = async (email: string, firstName: string, lastName: string,password: string, confirmPassword: string) => {
        setError(false);
        if(password !== confirmPassword){
            setError(true)
            setErrorMessage('Contraseñas no coinciden!');
        }else{
            try{
                const response = await axios.post(`${ENDPOINT_MS_USER}/auth/register`,{
                    email,
                    firstName,
                    lastName,
                    password,
                });
                setIsLoading(false);
                navigation.navigate('Login');
                
            }catch (e: any){
                setError(true);
                setIsLoading(false);
                setErrorMessage(e?.response?.data?.message);
                console.log({error: e?.response?.data?.message});
            }
        }
    };

    // Ref

    const nameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    return(
        <KeyboardWrapper>
            <ScrollView style={container}>
                <StatusBar style="dark"/> 
                <View style={styleInnerContainer}>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                    <PageTitle> Gira</PageTitle>
                    <SubTitle>Registrar cuenta</SubTitle>
                    <Formik
                        initialValues={{firstName: '', lastName: '',email: '', password: '', confirmPassword: ''}}
                        onSubmit={(values) => registerRequest(values.email, values.firstName,  values.lastName,values.password, values.confirmPassword)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    
                                
                                    {/* Nombre */}
                                    <Text style={styleLabel}>Ingrese nombre</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={"person"} size={30} color={secondary} />
                                        <TextInput
                                            ref={nameInputRef}
                                            placeholder="Dave"
                                            style={styleInput}
                                            placeholderTextColor={primary}
                                            value={values.firstName}
                                            onChangeText={handleChange('firstName')}
                                            onBlur={handleBlur('firstName')}
                                            onSubmitEditing={() => lastNameInputRef.current.focus()}
                                        />
                                    </View>

                                    {/* Apellido */}
                                    <Text style={styleLabel}>Ingrese apellido</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={"person-fill"} size={30} color={secondary} />
                                        <TextInput
                                            ref={lastNameInputRef}
                                            placeholder="Smith"
                                            style={styleInput}
                                            placeholderTextColor={primary}
                                            value={values.lastName}
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                            onSubmitEditing={() => emailInputRef.current.focus()}
                                        />
                                    </View>

                                    {/* Mail */}
                                    <Text style={styleLabel}>Ingrese mail</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'mail'} size={30} color={secondary}/>

                                    <TextInput
                                        ref={emailInputRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.email}
                                        placeholder="mail@site.com"
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
                                            <Octicons style={styleIcon} name={'lock'} size={30} color={secondary}/>
                                        </View>

                                    <TextInput
                                        ref={passwordInputRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.password}
                                        placeholder="Password"
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
                                        />
                                    </View>

                                    {/* Confirmar contrasena */}
                                    <Text style={styleLabel}>Reingrese contraseña</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={'lock'} size={30} color={secondary}/>

                                        <TextInput
                                            ref={confirmPasswordInputRef}
                                            style={styleInput}
                                            placeholderTextColor={primary}
                                            value={values.confirmPassword}
                                            placeholder="Confirm password"
                                            secureTextEntry 
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                            onSubmitEditing={() => registerRequest(values.email,values.firstName, values.lastName,  values.password, values.confirmPassword)}
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
                                            await registerRequest(values.email,values.firstName, values.lastName,  values.password, values.confirmPassword);
                                        } finally {
                                        setIsLoading(false);}
                                        }} disabled={isLoading}>
                                        <ButtonText>
                                            {isLoading ? 'Cargando...' : 'Registrarse'}
                                        </ButtonText>
                                    </StyledButton >
                                    <Line />
                                    <ExtraView>
                                        <ExtraText>
                                            ¿Tienes cuenta?. 
                                        </ExtraText>
                                        <TextLink disabled={isLoading} onPress={() => navigation.navigate('Login')}>
                                            <TextLinkContent>
                                                Login
                                            </TextLinkContent>
                                        </TextLink>
                                    </ExtraView>
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardWrapper>
    );
}


export default SignUp;