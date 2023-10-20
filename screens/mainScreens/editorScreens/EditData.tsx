

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
import { useRoute } from "@react-navigation/native";
import { useAsyncStorage } from "../../../localStorage/localStorage";


const EditData = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);
    const route = useRoute();
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState({});
    const email = useAsyncStorage('email');
    
    // Recuperar datos desde el back

    useEffect(() => {
        // Fetch user data from the backend
        const fetchUserData = async () => {
          try {
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

    const registerRequest = async (firstName: string, lastName: string) => {
        setError(false);
        
            try{
                // const response = await axios.post('http://10.0.2.2:3000/api/auth/register',{
                //     firstName,
                //     lastName,
                // });
                
                navigation.navigate('User');
                
            }catch (e: any){
                setError(true);
                setErrorMessage(e?.response?.data?.message);
                console.log({error: e?.response?.data?.message});
            }
        
    };

    // Ref

    const nameInputRef = useRef();
    const lastNameInputRef = useRef();

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
                        initialValues={{firstName: userData.firstName, lastName: userData.lastName}}
                        onSubmit={(values) => registerRequest(values.firstName,  values.lastName)}
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
                                        onPress={() => registerRequest(values.firstName, values.lastName)}>
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