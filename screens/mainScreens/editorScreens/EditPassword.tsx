import React, {useState, useRef} from "react";
import { StatusBar } from "expo-status-bar";

import axios from "axios";

import { TextInput, View, Text, Image } from 'react-native';

//formik
import { Formik } from "formik";

// Icons 
import {Octicons, Ionicons, AntDesign} from "@expo/vector-icons";

import giraStyles from "./../../../components/style";

const {styleInput, styleIcon, styleContainer, styleIconContainer, styleLabel, styleErrorView, styleErrorMessage, styleLogo} = giraStyles


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

} from './../../../components/style';

// Colors

const {primary, secondary, terceary, yellow, darkLight, brand, purple, red} = Colors; 

// Keyboards

import KeyboardWrapper from "./../../../components/keyboardWrapper";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINT_MS_USER } from '@env';



const EditPassword = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({ password:'', newPassword: '', confirmPassword: '' });
    const route = useRoute();
    const params = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const passwordChangeRequest = async (password: string, newPassword: string, confirmPassword: string) => {
        setError(false);
        if(newPassword !== confirmPassword){
            setError(true)
            setErrorMessage('Contraseñas no coinciden!');
        }else{
            try{
                const email = await AsyncStorage.getItem('email');
                const response = await axios.post(`${ENDPOINT_MS_USER}/users/update-password`,{
                email,
                password,
                newPassword,
                });
                setErrorMessage('');
                setValues({ password: '', newPassword: '', confirmPassword: '' });
                console.log({password, newPassword, confirmPassword});
                setIsLoading(false);
                navigation.navigate('Login');

            }catch (e: any){
                setError(true);
                setErrorMessage(e?.response?.data?.message);
                console.log({error: e?.response?.data?.message});
            }
        }
    };

    const oldPassword = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    return(
        <KeyboardWrapper>
            <StyledContainer>
                <StatusBar style="dark"/> 
                <InnerContainer>
                <Image
                    source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                    style={styleLogo}
                />
                    <PageTitle> Gira</PageTitle>
                    <SubTitle>Cambiar contraseña</SubTitle>
                    <Formik
                        initialValues={values}
                        onSubmit={(formValues) => passwordChangeRequest(formValues.password, formValues.newPassword, formValues.confirmPassword)}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                     {/* Contrasena antigua */}
                                    <Text style={styleLabel}>Ingrese contraseña antigua</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'code'} size={30} color={brand}/>

                                    <TextInput
                                        ref={oldPassword}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.password}
                                        placeholder="Contraseña antigua"
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
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
                                        value={values.newPassword}
                                        placeholder="Nueva constraseña"
                                        secureTextEntry
                                        onChangeText={handleChange('newPassword')}
                                        onBlur={handleBlur('newPassword')}
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
                                            await passwordChangeRequest(values.password, values.newPassword, values.confirmPassword);
                                        } finally {
                                        setIsLoading(false);}
                                        }} disabled={isLoading}>
                                        <ButtonText>
                                            {isLoading ? 'Cargando...' : 'Cambiar Contraseña'}
                                        </ButtonText>
                                    </StyledButton >
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

export default EditPassword;