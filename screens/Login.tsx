import React, {useState, useRef} from "react";
import { StatusBar } from "expo-status-bar";

import axios from "axios";

import { KeyboardAvoidingView, Platform } from "react-native";

import { TextInput, View, Text } from 'react-native';

//formik
import { Formik } from "formik";

// Icons 
import {Octicons, Ionicons, AntDesign} from "@expo/vector-icons";

import giraStyles from "./../components/style";

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



const Login = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({ email: '', password: '' });
    const loginRequest = async (email: string, password: string) => {
        setError(false);

        try{
            const response = await axios.post('http://10.0.2.2:3000/api/auth/login',{
                email,
                password,
            });
            setErrorMessage('');
            setValues({ email: '', password: '' });
            navigation.navigate('Welcome');

        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
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
                    <SubTitle>Acoount Login</SubTitle>
                    <Formik
                        initialValues={values}
                        onSubmit={(formValues) => loginRequest(formValues.email, formValues.password)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                     {/* Mail */}
                                    <Text style={styleLabel}>Ingrese mail</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'mail'} size={30} color={brand}/>

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
                                            <Octicons style={styleIcon} name={'lock'} size={30} color={brand}/>
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
                                        onSubmitEditing={() => loginRequest(values.email, values.password)}
                                        />
                                    </View>


                                    <View
                                        style={styleErrorView}
                                    >
                                        <Text style={styleErrorMessage}>
                                            {errorMessage}
                                        </Text>
                                    </View>
                                    <StyledButton onPress={() => loginRequest(values.email,values.password)}>
                                        <ButtonText>
                                            Login
                                        </ButtonText>
                                    </StyledButton>
                                    <Line />
                
                                    <ExtraView>
                                        <ExtraText>
                                            Don't Have an account already?. 
                                        </ExtraText>
                                        <TextLink onPress={() =>  navigation.navigate('SignUp')}>
                                            <TextLinkContent>
                                                SignUp
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

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword,...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={primary}/>
            </LeftIcon> 
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RigthIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' :  'md-eye'} size={30} color={primary}/> 
                </RigthIcon>
            )}
        </View>
    )
}

export default Login;