import * as React from 'react';
import {View, Text, Image} from 'react-native'
 

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
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent

} from './../../components/style';
import KeyboardWrapper from '../../components/keyboardWrapper';
import { StatusBar } from 'expo-status-bar';

import giraStyles from './../../components/style';

const {styleLogo} = giraStyles

export default function User({navigation}){
    return(

        <KeyboardWrapper>
            <StyledContainer>
            <InnerContainer>

                <StatusBar style="dark"/> 
                    <Image  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                    style={styleLogo}
                    />
                <PageTitle>Name user</PageTitle>
                </InnerContainer>
            </StyledContainer>
        </KeyboardWrapper>
    )
}