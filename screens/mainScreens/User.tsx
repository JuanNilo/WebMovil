import React, { useState, useEffect } from "react";
import giraStyles from "./../../components/style";
import { View, ScrollView, Image, Text } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, RigthIcon, StyledButton, ButtonText, Line, ExtraView, ExtraText, TextLink, TextLinkContent } from './../../components/style';
import { Colors } from "./../../components/style";

const { secondary, primary, brand, purple } = Colors

const { styleIcon, styleInnerContainer, styleContainer, styleDataUser,styleIconContainer, container, styleLabel, styleErrorMessage, styleErrorView, styleLogo } = giraStyles

import KeyboardWrapper from "../../components/keyboardWrapper";
import axios from "axios";
import { useAsyncStorage } from "../../localStorage/localStorage";





const User = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({})
  const email = String(useAsyncStorage('email'));
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/api/users/email/${email}`);
        const userData = response.data;
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        console.error('Error al recuperar los datos del usuario:', error);
      }
    };
  
    fetchUserData();
  }, []);

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
          <PageTitle
            style={{color: purple}}
          >{userData.firstName} {userData.lastName}</PageTitle>
          <SubTitle>Bienvenido</SubTitle>
          <SubTitle>Datos</SubTitle>
          <View style={styleDataUser}>
            {/* Nombre */}
            <View style={styleContainer}>
              <Octicons style={styleIcon} name={"person"} size={30} color={purple} />
              <Text style={styleLabel}>
                Nombre: {userData.firstName}
              </Text>
            </View>

            {/* Apellido */}
            <View style={styleContainer}>
              <Octicons style={styleIcon} name={"person-fill"} size={30} color={purple} />
              <Text style={styleLabel}>
                Apellido: {userData.lastName}
              </Text>
            </View>

            {/* Mail */}
            <View style={styleContainer}>
              <Octicons style={styleIcon} name={'mail'} size={30} color={purple} />
              <Text style={styleLabel}>
                Mail: {userData.email}
              </Text>
            </View>

            <View style={styleErrorView}>
              <Text style={styleErrorMessage}>
                {errorMessage}
              </Text>
            </View>
            {/* Editar Nombre */}
            <StyledButton
            style={{backgroundColor: purple}}
              onPress={() => navigation.navigate('EditData') /* handle your button action here */}>
              <ButtonText > 
                Editar datos
              </ButtonText>
            </StyledButton>
            <Line />
            {/* Editar mail */}
            <StyledButton
            style={{backgroundColor: purple}}
              onPress={() => navigation.navigate('EditMail') /* handle your button action here */}>
              <ButtonText > 
                Editar mail
              </ButtonText>
            </StyledButton>
            <Line />
            {/* Editar Contrasena */}
            <StyledButton
            style={{backgroundColor: purple}}
              onPress={() => navigation.navigate('EditPassword') /* handle your button action here */}>
              <ButtonText > 
                Editar contraseña
              </ButtonText>
            </StyledButton>
            <Line />
            </View>
        </View>
      </ScrollView>
    </KeyboardWrapper>
  );
}

export default User;