import React from "react";

import { StatusBar } from "expo-status-bar";

import { ButtonText, InnerContainer, Line, PageLogo, PageTitle, StyledButton, StyledContainer, StyledFormArea, WelcomeContainer, Colors } from "./../components/style";


const {purple} = Colors;


const Initial = ({navigation}) => {
    return(
        <StyledContainer>
            <StatusBar style="dark"/>
            <InnerContainer>    
                <WelcomeContainer>
                    
                <PageLogo resizeMode="cover" source={require('../assets/logo.png')} />
                <PageTitle> Gira</PageTitle>
                
                <StyledFormArea>
                    {/* Iniciar Sesion */}
                    <StyledButton onPress={() => navigation.navigate('Login')} >
                        <ButtonText>
                            Iniciar Sesion
                        </ButtonText>
                    </StyledButton>
                    <Line/>
                    {/* Registrarse */}
                    <StyledButton style={{backgroundColor: purple}} onPress={() => navigation.navigate('Login')} >
                        <ButtonText>
                            Registrarse
                        </ButtonText>
                    </StyledButton>
                </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>   
        </StyledContainer>
    )
}

export default Initial;