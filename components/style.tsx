import styled from "styled-components/native";
import {View, Text, Image, TextInput, TouchableOpacity} from "react-native";
import  Constants  from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: "#ffffff",
    secondary: "#09f",
    terceary: "#3B3B3B",
    darkLight: "#C0C0C0",
    brand: "#0052CC",
    purple: "#572364",
    red: "#EF4444"
};

const {primary, secondary, terceary, darkLight, brand, purple, red} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 150px;
    height: 150px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${secondary};
    padding: 10px;
`;

export const SubTitle = styled.Text` 
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${terceary};
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 5px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${primary};
`;

export const StyledInputLabel = styled.Text`
    color: ${terceary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon  = styled.View`
    left: 15px;
    top: 65px;
    postion: absolute;
    z-index: 1;
`;

export const RigthIcon  = styled.TouchableOpacity`
    right: -240px;
    top: -58px;
    postion: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    juistify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.github == true && `
        background-color: ${purple};
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 22px;
    font-weight: bold;

    ${(props) => props.github == true && `
        font-size: 20px;
        padding-left: 10px;
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px
`;

export const ExtraText = styled.Text`
    justify-content: center;
`;