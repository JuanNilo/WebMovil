import React, { useState, useEffect } from "react";
import giraStyles from "./../../components/style";
import { View, ScrollView, Image, Text, Touchable } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, RigthIcon, StyledButton, ButtonText, Line, ExtraView, ExtraText, TextLink, TextLinkContent } from './../../components/style';
import { Colors } from "./../../components/style";
import { createAvatar } from "@dicebear/core";
import { pixelArt, funEmoji, lorelei,  } from "@dicebear/collection";
const { secondary, primary, brand, purple } = Colors
import { TouchableOpacity } from "react-native";
const { styleIcon, styleInnerContainer, styleContainer, styleDataUser,styleIconContainer, container, styleLabel, styleErrorMessage, styleErrorView, styleUserLogo } = giraStyles

import KeyboardWrapper from "../../components/keyboardWrapper";
import axios from "axios";
import { useAsyncStorage } from "../../localStorage/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { SvgXml } from 'react-native-svg';
import { ENDPOINT_MS_USER } from '@env';
// dame el type de error
interface errorTypes {
  response: {
    data: {
      message: string;
    };
  };
}

// dame el type de userData
interface userDataTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const User = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({} as userDataTypes);
  
  const avatar = createAvatar(lorelei, { seed: userData.email }).toString();

  const fetchUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const response = await axios.get(`${ENDPOINT_MS_USER}/users/profile/${email}`);
      const userData = response.data;
      setUserData(userData);
    } catch (error) {
      setError(true);
      setErrorMessage(error?.response?.data?.message);
      console.error('Error al recuperar los datos del usuario:', error);
    }
  };
  useFocusEffect(() => {
    fetchUserData();
  });

  const handleDeleteAccount = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const response = await axios.delete(`${ENDPOINT_MS_USER}/users/${email}`);
      console.log('email', email);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  }

  return (
    <KeyboardWrapper>
      <ScrollView style={container}>
        <StatusBar style="dark" />
        <View style={styleInnerContainer}>

          <SvgXml xml={avatar} style={styleUserLogo} />

          <PageTitle
            style={{color: purple}}
          >{userData.firstName} {userData.lastName}</PageTitle>
          <SubTitle>Datos</SubTitle>
          <View style={styleDataUser}>
            {/* Nombre */}
            <View style={styleContainer}>
              <Octicons style={styleIcon} name={"person"} size={30} color={purple} />
              <Text style={styleLabel}>
                Nombre: <Text style={{fontWeight:'bold'}}>{userData.firstName}</Text> 
              </Text>
            </View>

            {/* Apellido */}
            <View style={styleContainer}>
              <Octicons style={styleIcon} name={"person-fill"} size={30} color={purple} />
              <Text style={styleLabel}>
                Apellido: <Text style={{fontWeight:'bold'}}> {userData.lastName}</Text>
              </Text>
            </View>

            {/* Mail */}
            <View style={styleContainer}>
              <Octicons style={styleIcon} name={'mail'} size={30} color={purple} />
              <Text style={styleLabel}>
                Mail: <Text style={{fontWeight:'bold'}}> {userData.email}</Text>
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
            {/* Eliminar cuenta */}
            <TouchableOpacity
              onPress={() => handleDeleteAccount() }
              style={{backgroundColor: 'red', borderRadius: 10, width: 200, height: 50, alignSelf: 'center', justifyContent:'center',marginTop: 20, }}
              >
              <Text style={{color: "white", fontSize: 20,fontWeight:'bold', alignItems:'center', justifyContent:'center', textAlign: 'center',}}>Eliminar cuenta</Text>
            </TouchableOpacity>
            <Line />
            </View>
        </View>
      </ScrollView>
    </KeyboardWrapper>
  );
}

export default User;