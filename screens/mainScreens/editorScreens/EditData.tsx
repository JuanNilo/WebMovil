

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

const {styleInput, styleIcon, styleInnerContainer,styleContainer, styleIconContainer, container,styleLabel, styleErrorMessage, styleErrorView, styleLogo} = giraStyles

// Colors

const {primary , secondary, purple} = Colors; 

// Keyboards

import KeyboardWrapper from "../../../components/keyboardWrapper";
import axios from "axios";


const EditData = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
   
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState({});
    
    // Recuperar datos desde el back

    useEffect(() => {
        // Fetch user data from the backend
        const fetchUserData = async () => {
          try {
            const email = 'juan@mail.com';
            axios.get(`http://10.0.2.2:3000/api/users/email/${email}`)
              .then(response => {
                const userData = response.data;
                setUserData(userData);
              })
              .catch(error => {
                console.error('Error al recuperar los datos del usuario:', error);
              });
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        };
    
        fetchUserData();
      }, []);

    const registerRequest = async (email: string, firstName: string, lastName: string,password: string, confirmPassword: string) => {
        setError(false);
        if(password !== confirmPassword){
            setError(true)
            setErrorMessage('Contraseñas no coinciden!');
        }else{
            try{
                const response = await axios.post('http://10.0.2.2:3000/api/auth/register',{
                    email,
                    firstName,
                    lastName,
                    password,
                });
                
                navigation.navigate('Login');
                
            }catch (e: any){
                setError(true);
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
                <Image
                    source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                    style={styleLogo}
                />
                    <PageTitle> Gira</PageTitle>
                    <SubTitle>Editar datos</SubTitle>
                    <Formik
                        initialValues={{firstName: userData.firstName, lastName: userData.lastName,email: userData.email, password: userData.password, confirmPassword: userData.password}}
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
                                            placeholder={userData.firstName}
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
                                            placeholder={userData.lastName}
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
                                        placeholder={userData.email}
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
                                        placeholder="********"
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
                                            placeholder="********"
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
                                        style={{backgroundColor: purple}}
                                        onPress={() => registerRequest(values.email, values.firstName, values.lastName, values.password, values.confirmPassword)}>
                                        <ButtonText>
                                            Guardar cambios
                                        </ButtonText>
                                    </StyledButton>
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardWrapper>
    );
}


export default EditData;