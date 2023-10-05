import React, {useState} from "react";

import giraStyles from "./../components/style";
import { TextInput, View, Text } from 'react-native';
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

} from './../components/style';

const {styleInput, styleIcon, styleContainer, styleIconContainer, styleLabel} = giraStyles

// Colors

const {primary , secondary} = Colors; 

// Keyboards

import KeyboardWrapper from "../components/keyboardWrapper";


const SignUp = ({navigation}) => {
    const [hidePassword, setHidePasswword] = useState(true);

    return(
        <KeyboardWrapper>
            <StyledContainer>
                <StatusBar style="dark"/> 
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                    <PageTitle> Gira</PageTitle>
                    <SubTitle>Registrar cuenta</SubTitle>
                    <Formik
                        initialValues={{firstName: '', lastName: '',email: '', password: '', confirmPassword: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate('Welcome');
                        }}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    {/* <MyTextInput
                                        label="Name"
                                        icon="person"
                                        placeholder="Dave Smith"
                                        placeholderTextColor={primary}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    /> */}
                                    
                                    {/* Nombre */}
                                    <Text style={styleLabel}>Ingrese nombre</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={"person"} size={30} color={secondary} />
                                        <TextInput
                                            placeholder="Dave"
                                            style={styleInput}
                                            placeholderTextColor={primary}
                                            value={values.firstName}
                                            onChangeText={handleChange('firstName')}
                                            onBlur={handleBlur('firstName')}
                                        />
                                    </View>

                                    {/* Apellido */}
                                    <Text style={styleLabel}>Ingrese apellido</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={"person-fill"} size={30} color={secondary} />
                                        <TextInput
                                            placeholder="Smith"
                                            style={styleInput}
                                            placeholderTextColor={primary}
                                            value={values.lastName}
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                        />
                                    </View>

                                    {/* Mail */}
                                    <Text style={styleLabel}>Ingrese mail</Text>
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'mail'} size={30} color={secondary}/>

                                    <TextInput
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.email}
                                        placeholder="mail@site.com"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        keyboardType="email-address"
                                        />
                                    </View>

                                    {/* <MyTextInput
                                        label="Password"
                                        icon="lock"
                                        placeholder="********"
                                        placeholderTextColor={primary}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePasswword}
                                    /> */}

                                    {/* Contrasena */}
                                    
                                    <Text style={styleLabel}>Ingrese contraseña</Text>
                                    <View style={styleContainer}>
                                        <View style={styleIconContainer}>
                                            <Octicons style={styleIcon} name={'lock'} size={30} color={secondary}/>
                                        </View>

                                    <TextInput
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.password}
                                        placeholder="Passoword"
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        />
                                    </View>

                                    {/* Confirmar contrasena */}
                                    <Text style={styleLabel}>Reingrese contraseña</Text>
                                    <View style={styleContainer}>
                                        <Octicons style={styleIcon} name={'lock'} size={30} color={secondary}/>

                                        <TextInput
                                            style={styleInput}
                                            placeholderTextColor={primary}
                                            value={values.confirmPassword}
                                            placeholder="Confirm password"
                                            secureTextEntry 
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                        />
                                    </View>
                                
                                    <MsgBox>...</MsgBox>
                                    <StyledButton 
                                        onPress={handleSubmit}>
                                        <ButtonText>
                                            SignIn
                                        </ButtonText>
                                    </StyledButton>
                                    <Line />
                                    <ExtraView>
                                        <ExtraText>
                                            ¿Tienes cuenta?. 
                                        </ExtraText>
                                        <TextLink onPress={() => navigation.navigate('Login')}>
                                            <TextLinkContent>
                                                Login
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


export default SignUp;