import React, {useState, useRef} from "react";
import { StatusBar } from "expo-status-bar";

import axios from "axios";

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
import { useRoute } from "@react-navigation/native";



const PasswordChange = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({ code: '', password: '', confirmPassword: '' });
    const route = useRoute();
    const { code, email } = route.params;

    const passwordChangeRequest = async (code: string, password: string, confirmPassword: string) => {
        setError(false);
        if(password !== confirmPassword){
            setError(true)
            setErrorMessage('Contraseñas no coinciden!');
        }else{
            try{
                // const response = await axios.post('http://10.0.2.2:3000/api/auth/login',{
                //     email,
                //     password,
                // });
                setErrorMessage('');
                setValues({ code: '', password: '', confirmPassword: '' });
                navigation.navigate('Login');

            }catch (e: any){
                setError(true);
                setErrorMessage(e?.response?.data?.message);
                console.log({error: e?.response?.data?.message});
            }
        }
    };

    const codeInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    return(
        <KeyboardWrapper>
            <StyledContainer>
                <StatusBar style="dark"/> 
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                    <PageTitle> Gira</PageTitle>
                    <SubTitle>Cambiar contraseña</SubTitle>
                    <Formik
                        initialValues={values}
                        onSubmit={(formValues) => passwordChangeRequest(formValues.code, formValues.password, formValues.confirmPassword)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                     {/* Code */}
                                    <Text style={styleLabel}>Ingrese codigo</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'code'} size={30} color={brand}/>

                                    <TextInput
                                        ref={codeInputRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.code}
                                        placeholder="Codigo"
                                        onChangeText={handleChange('code')}
                                        onBlur={handleBlur('code')}
                                        onSubmitEditing={() => passwordInputRef.current.focus()}
                                        />
                                    </View>

                                    {/* Contrasena */}
                                    
                                    <Text style={styleLabel}>Ingrese nueva contraseña</Text>
                                    <View style={styleContainer}>
                                        <View style={styleIconContainer}>
                                            <Octicons style={styleIcon} name={'lock'} size={30} color={brand}/>
                                        </View>

                                    <TextInput
                                        ref={passwordInputRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.password}
                                        placeholder="Nueva constraseña"
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
                                        />
                                    </View>

                                    {/* Confirmar contrasena */}
                                                                        
                                    <Text style={styleLabel}>Confirmar nueva contraseña</Text>
                                    <View style={styleContainer}>
                                        <View style={styleIconContainer}>
                                            <Octicons style={styleIcon} name={'lock'} size={30} color={brand}/>
                                        </View>

                                    <TextInput
                                        ref={confirmPasswordInputRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.confirmPassword}
                                        placeholder="Confirmar nueva contraseña"
                                        secureTextEntry
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        onSubmitEditing={() => passwordChangeRequest(values.code, values.password, values.confirmPassword)}
                                        />
                                    </View>

                                    <View
                                        style={styleErrorView}
                                    >
                                        <Text style={styleErrorMessage}>
                                            {errorMessage}
                                        </Text>
                                    </View>
                                    <StyledButton onPress={() => passwordChangeRequest(values.code,values.password, values.confirmPassword)}>
                                        <ButtonText>
                                        Cambiar contraseña
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

export default PasswordChange;