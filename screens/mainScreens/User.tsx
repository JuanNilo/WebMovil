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

const User = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const email = 'naxoxxd2.0@gmail.com';
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
            <StyledButton
            style={{backgroundColor: purple}}
              onPress={() => console.log('holamundo') /* handle your button action here */}>
              <ButtonText > 
                Editar datos
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