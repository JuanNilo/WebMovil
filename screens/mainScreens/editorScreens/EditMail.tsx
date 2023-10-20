

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


const EditMail = ({navigation}) => {
   
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

    const changeEmail = async (oldEmail: string, newEmail: string) => {
        setError(false);
        try{
            // const response = await axios.post('http://10.0.2.2:3000/api/auth/register',{
            //     email,
            //     firstName,
            //     lastName,
            //     password,
            // });
            
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
                        initialValues={{oldEmail: userData.email, newEmail: ''}}
                        onSubmit={(values) => registerRequest(values.oldEmail,values.newEmail)}
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
                                        value={values.oldEmail}
                                        placeholder={"antiguo@mail.com"}
                                        onChangeText={handleChange('oldEmail')}
                                        onBlur={handleBlur('oldEmail')}
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
                                        onSubmitEditing={() => changeEmail(values.oldEmail,values.newEmail)}
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
                                        onPress={() => changeEmail(values.oldEmail,values.newEmail)}>
                                        <ButtonText>
                                            Cambiar correo
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


export default EditMail;