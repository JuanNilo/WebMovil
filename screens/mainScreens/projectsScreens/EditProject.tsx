

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

const {primary , secondary, purple, yellow} = Colors; 

// Keyboards

import KeyboardWrapper from "../../../components/keyboardWrapper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINT_MS_TEAM } from '@env';


const EditProject = ({navigation}) => {
   
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [projectData, setProjectData] = useState({});
    
    // Recuperar datos desde el back

    const fetchProjectData = async () => {
        try {
          const email = await AsyncStorage.getItem('email');
          const response = await axios.post(`${ENDPOINT_MS_TEAM}/middle/get-team-names`,
          {
            email: email,
          }
          );
          const projectData = response.data;
          setProjectData(projectData || []);
          
        } catch (error) {
          console.error('Error al recuperar los datos de proyectos:', error);
        }
      };
      
      
      useEffect(() => {
        fetchProjectData();
      }, []);

    const changeProjectName = async (projectName: string) => {
        setError(false);
        try{
            
            navigation.navigate('Project');
            
        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
        }
    };

    // Ref

    const oldProjectRef = useRef();
    const newProjectRef = useRef();

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
                    <PageTitle style={{color:purple}}>Proyectos</PageTitle>
                    <SubTitle>Cambiar nombre proyecto</SubTitle>
                    <Formik
                        initialValues={{oldProjectName: projectData.projectName, newp: ''}}
                        onSubmit={(values) => registerRequest(values.projectName)}p                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    
            
                                    {/* Antiguo Mail */}
                                    <Text style={styleLabel}>Ingrese nombre antiguo</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={"people"} size={30} color={purple}/>

                                    <TextInput
                                        ref={oldProjectRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.oldProjectName}
                                        placeholder={projectData.projectName}
                                        onChangeText={handleChange('oldProjectName')}
                                        onBlur={handleBlur('oldProjectName')}
                                        onSubmitEditing={() => newProjectRef.current.focus()}
                                        />
                                    </View>


                                {/* Nuevo Mail */}
                                <Text style={styleLabel}>Ingrese nombre nuevo</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={"people"} size={30} color={purple}/>

                                    <TextInput
                                        ref={newProjectRef}
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.newEmail}
                                        placeholder={"Nuevo nombre de proyecto"}
                                        onChangeText={handleChange('newProjectName')}
                                        onBlur={handleBlur('newProjectName')}
                                        onSubmitEditing={() => changeEmail(values.projectData)}
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
                                        onPress={() => changeEmail(values.odlProjectName,values.newProjectName)}>
                                        <ButtonText>
                                            Cambiar nombre
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


export default EditProject;