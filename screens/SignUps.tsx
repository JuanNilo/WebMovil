import React, {useState} from "react";

import giraStyles from "./../components/style";
import { TextInput, View } from 'react-native';
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

// Icons 
import {Octicons, Ionicons} from "@expo/vector-icons";

import { 
    StyledContainer,
    InnerContainer,
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

const {styleInput, styleIcon, styleContainer} = giraStyles

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
                    <PageTitle> Gira</PageTitle>
                    <SubTitle> Acoount SignUp</SubTitle>
                    <Formik
                        initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate('Welcome');
                        }}
                    >
                        {
                            ({handleChange, handleBlur, handleSubmit, values}) => (
                                <StyledFormArea>
                                    <MyTextInput
                                        label="Name"
                                        icon="person"
                                        placeholder="Dave Smith"
                                        placeholderTextColor={primary}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    />

                                    {/* Mail */}
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
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'lock'} size={30} color={secondary}/>

                                    <TextInput
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.password}
                                        placeholder="Passoword"
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        />
                                    </View>

                                    {/* Confirmar contrasena */}
                                    <View style={styleContainer}>
                                    <Octicons style={styleIcon} name={'lock'} size={30} color={secondary}/>

                                    <TextInput
                                        style={styleInput}
                                        placeholderTextColor={primary}
                                        value={values.confirmPassword}
                                        placeholder="Confirm password"
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
                                            Already have an account already?. 
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