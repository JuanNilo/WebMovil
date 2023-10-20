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



const EditPassword = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({ oldPassword:'', newPassword: '', confirmPassword: '' });
    const route = useRoute();
    const params = route.params;
    const email = 'juan@mail.com'
    const passwordChangeRequest = async (oldPassword: string, newPassword: string, confirmPassword: string) => {
        setError(false);
        if(newPassword !== confirmPassword){
            setError(true)
            setErrorMessage('Contraseñas no coinciden!');
        }else{
            try{
                // const response = await axios.post('http://10.0.2.2:3000/api/auth/reset-pass',{
                // email,
                // newPassword,
                // });
                setErrorMessage('');
                setValues({ oldPassword: '', newPassword: '', confirmPassword: '' });
                console.log({oldPassword, newPassword, confirmPassword});
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
                        onSubmit={(formValues) => passwordChangeRequest(formValues.oldPassword, formValues.newPassword, formValues.confirmPassword)}
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
                                        value={values.oldPassword}
                                        placeholder="Contraseña antigua"
                                        onChangeText={handleChange('oldPasswordInput')}
                                        onBlur={handleBlur('oldPasswordInput')}
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
                                    <StyledButton style={{backgroundColor: purple}} onPress={() => passwordChangeRequest(values.oldPassword,values.newPassword, values.confirmPassword)}>
                                        <ButtonText>
                                            Cambiar contraseña
                                        </ButtonText>
                                    </StyledButton>
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