import React, {useState, useRef, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import { useAsyncStorage } from "./../localStorage/localStorage";
import axios from "axios";

import { TextInput, View, Text } from 'react-native';

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




const PasswordChange = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({ code: '', codeInput: '', newPassword: '', confirmPassword: '' });
    const email = useAsyncStorage('email');
    console.log(email);
    const code = useAsyncStorage('code');
    const [isLoading, setIsLoading] = useState(false);

    const passwordChangeRequest = async (codeInput: string, newPassword: string, confirmPassword: string) => {
        setError(false);
        if(newPassword !== confirmPassword){
            setError(true)
            setErrorMessage('Contraseñas no coinciden!');
        }else{
            try{
                const response = await axios.post(`${ENDPOINT_MS_USER}/auth/reset-pass`,{
                email,
                code,
                codeInput,
                newPassword,
                });
                setErrorMessage('');
                setValues({ code: '', codeInput: '',newPassword: '', confirmPassword: '' });
                console.log({code, codeInput, newPassword, confirmPassword});
                setIsLoading(false);
                navigation.navigate('Login');

            }catch (e: any){
                setError(true);
                setErrorMessage(e?.response?.data?.message);
                setIsLoading(false);
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
                        onSubmit={(formValues) => passwordChangeRequest(formValues.codeInput, formValues.newPassword, formValues.confirmPassword)}
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
                                        value={values.codeInput}
                                        placeholder="Codigo"
                                        onChangeText={handleChange('codeInput')}
                                        onBlur={handleBlur('codeInput')}
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
                                        onPress={async () => { setIsLoading(true); 
                                        try {
                                            await passwordChangeRequest(values.codeInput, values.newPassword, values.confirmPassword);
                                        } finally {
                                        setIsLoading(false);}
                                        }} disabled={isLoading}>
                                        <ButtonText>
                                            {isLoading ? 'Cargando...' : 'Recuperar'}
                                        </ButtonText>
                                    </StyledButton >
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