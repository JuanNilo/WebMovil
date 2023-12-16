import React, { useState, useRef, useEffect } from "react";

import giraStyles from "../../../components/style";
import { TextInput, View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

// Icons 
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
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

import { ENDPOINT_MS_PROJECT } from '@env';

const { styleInput, styleIcon, styleInnerContainer, styleContainer, styleIconContainer, container, styleLabel, styleErrorMessage, styleErrorView, styleLogo } = giraStyles

// Colors

const { primary, secondary, purple } = Colors;

// Keyboards

import KeyboardWrapper from "../../../components/keyboardWrapper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function AddMemberProject({ navigation, route }) {
    const { nameProject } = route.params;
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    const registerMemberProject = async (email: string, rol: string) => {
        console.log('email', email, 'rol', rol);
        setIsLoading(true);
        try {
            const id = await AsyncStorage.getItem('id_project');
            const response = await axios.post(`${ENDPOINT_MS_PROJECT}/middle/new-member`, {
                email,
                rol,
                id,
            });
            setIsLoading(false);
            navigation.navigate('ProjectView', { nameProject });
        } catch (error) {
            setError(true);
            setIsLoading(false);
            setErrorMessage(error?.response?.data?.message);
            console.error('Error al registar miembro', error);
        }
    };

    return (
        <KeyboardWrapper>
            <ScrollView style={container}>
                <StatusBar style="dark" />
                <View style={styleInnerContainer}>
                    <Image
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                        style={styleLogo}
                    />
                    <PageTitle style={{ color: 'black' }}>Añadir miembro</PageTitle>
                    <Formik
                        initialValues={{ email: '', rol: 'desarrollador' }}
                        onSubmit={(values) => registerMemberProject(values.email, values.rol)}
                    >
                        {
                            ({ handleChange, handleBlur, handleSubmit, values }) => (
                                <StyledFormArea>
                                    <Text style={styles.TextLabel}>Ingrese el correo del miembro</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={"people"} size={30} color={'black'} />
                                        <TextInput
                                            placeholder="correo@email.com"
                                            style={styles.InputContainer}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                        />
                                    </View>

                                    {/* dame un select con los roles: administrador, disenador, programador */}
                                    <View style={{flexDirection:'row', flex: 1, alignItems: 'center'}}>
                                    <Octicons style={[styleIcon,{paddingTop:20}]} name={"stack"} size={30} color={'black'} />
                                    <View style={styles.pickerContainer}>
                                        <Picker
                                            style={styles.picker}
                                            selectedValue={values.rol}
                                            onValueChange={handleChange('rol')
                                        }
                                        
                                        >

                                            <Picker.Item style={styles.pickerContainer} label="Desarrollador" value="desarrollador" />
                                            <Picker.Item style={styles.pickerContainer} label="Diseñador" value="diseñador" />
                                            <Picker.Item style={styles.pickerContainer} label="Administrador" value="administrador" />
                                        </Picker>
                                    </View>
                                    </View>

                                    {/* Error */}
                                    <View
                                        style={styleErrorView}
                                    >
                                        <Text style={styleErrorMessage}>
                                            {errorMessage}
                                        </Text>
                                    </View>
                                    <View>
                                        <StyledButton
                                            style={{ backgroundColor: 'black' }}
                                        onPress={async () => { setIsLoading(true); // Activar el estado de carga al presionar el botón
                                        try {
                                            await registerMemberProject(values.email, values.rol);
                                        } finally {
                                        setIsLoading(false);}
                                        }} disabled={isLoading}>
                                        <ButtonText>
                                            {isLoading ? 'Cargando...' : 'Añadir miembro'}
                                        </ButtonText>
                                    </StyledButton >
                                    </View>
                                </StyledFormArea>
                            )
                        }
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardWrapper>
    )
}

const styles = StyleSheet.create({
    InputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        borderColor: 'black',
        borderWidth: 3,
        color: 'black',
        width: '80%',
        fontWeight: 'bold',
        fontSize: 18,
    },
    TextLabel: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ButtonContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 3,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    picker: {
        backgroundColor: 'white',
    },
    pickerContainer: {
        marginTop: 20,
        width: '80%',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        color: 'black',
        fontSize: 16,
    },
})