import React, {useState} from "react";
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

import { View } from "react-native";

// Colors

const {primary } = Colors; 

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

                                    <MyTextInput
                                        label="Email Address"
                                        icon="mail"
                                        placeholder="mail@site.com"
                                        placeholderTextColor={primary}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />

                                    <MyTextInput
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
                                    />
                                    <MyTextInput
                                        label="Confirm Password"
                                        icon="lock"
                                        placeholder="********"
                                        placeholderTextColor={primary}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePasswword}
                                    />
                                    <MsgBox>...</MsgBox>
                                    <StyledButton onPress={handleSubmit}>
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