import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

// Icons 
import {Octicons, Ionicons, AntDesign} from "@expo/vector-icons";

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
    Line

} from './../components/style';

import { View } from "react-native";

// Colors

const {brand, primary, darkLight} = Colors; 

const Login = () => {
    const [hidePassword, setHidePasswword] = useState(true);

    return(
        <StyledContainer>
            <StatusBar style="dark"/> 
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                <PageTitle> Gira</PageTitle>
                <SubTitle> Acoount Login</SubTitle>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {
                        ({handleChange, handleBlur, handleSubmit, values}) => (
                            <StyledFormArea>
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
                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Login
                                    </ButtonText>
                                </StyledButton>
                                <Line />
                                <StyledButton github={true} onPress={handleSubmit}>
                                    <AntDesign name="github" color={primary} size={30}/> 
                                    <ButtonText github={true}>
                                        Sign in with GitHub
                                    </ButtonText>
                                </StyledButton>
                            </StyledFormArea>
                        )
                    }
                </Formik>
            </InnerContainer>
        </StyledContainer>
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

export default Login;