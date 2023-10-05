import styled from "styled-components/native";
import { StyleSheet,View, Text, Image, TextInput, TouchableOpacity} from "react-native";
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

const giraStyles = StyleSheet.create({
    styleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    styleLabel: {
        color: terceary,
        fontSize: 18,
        textAlign: "left",
    },
    styleIconContainer:{
        textAlign: 'center',
        display: 'flex',
    },
    styleIcon: {
        width: 40, 
    },
    styleInput: {
        flex: 1, 
        backgroundColor: secondary, 
        color: primary, 
        height: 50,
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
})


export default giraStyles;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const PageLogo = styled.Image`
    width: 150px;
    height: 150px;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    marign-bottom: 10px;
    margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
    height: 35%;
    min-width: 100%;
`;

export const PageTitle = styled.Text`
    font-size: 35px;
    text-align: center;
    font-weight: bold;
    color: ${secondary};
    padding: 10px;

    ${(props) => props.welcome && `
        margin-bottom: 35px;
    `}
`;

export const SubTitle = styled.Text` 
    font-size: 28px;
    margin-bottom: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${terceary};

    
    ${(props) => props.welcome && `
        margin-bottom: 10px;
        font-size: 25px;
        font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    
    padding-left: 55px;
    padding-right: 5px;
    margin-top:10px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
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
    top: -52px;
    postion: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 7px;
    background-color: ${brand};
    juistify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 2px;
    height: 50px;

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
    margin-vertical: 5px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${terceary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
    padding-left: 5px;
`;