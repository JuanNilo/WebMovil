import React from "react";
import { StatusBar } from "expo-status-bar";
import { 
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage

} from './../components/style';
import BottomRootStack from "./BottomRootStack";
import { useRoute } from "@react-navigation/native";

const Welcome = ({navigation}) => {
    return(
        <BottomRootStack/>
    );
}


export default Welcome;

{/* <StatusBar style="dark"/> 
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/Cover.png')} />
                <WelcomeContainer>
                       
                <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                <PageTitle welcome={true} > Welcome!</PageTitle>
                <SubTitle welcome={true}>Dave Smith</SubTitle>
                            <StyledFormArea>
                                <Line />
                                <StyledButton onPress={() => {navigation.navigate('Login')}}>
                                    <ButtonText>
                                        Logout
                                    </ButtonText>
                                </StyledButton>
                            </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer> */}