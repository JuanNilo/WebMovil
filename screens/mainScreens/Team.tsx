import * as React from 'react';
import {View, Text, ScrollView} from 'react-native'
import { ButtonText, PageTitle, StyledButton } from '../../components/style';
import { Colors } from '../../components/style';

import giraStyles from '../../components/style';
const {container, styleInnerContainer, styleDataUser} = giraStyles

const {purple, yellow,brand,red} = Colors;


export default function Team({navigation}){
    return(
        <ScrollView style={container}>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styleInnerContainer}>
            <View style={ styleDataUser}>
            <PageTitle style={{color:purple}}>TEAMS</PageTitle>
            {/* Crear equipo */}
            <StyledButton
                style={{backgroundColor: purple}}
                onPress={() => navigation.navigate('CreateTeam') /* handle your button action here */}>
              <ButtonText > 
                Crear equipo
              </ButtonText>
            </StyledButton>
            {/* Ver equipos */}
            <StyledButton
                style={{backgroundColor: brand}}
                onPress={() => navigation.navigate('ViewTeams') /* handle your button action here */}>
              <ButtonText > 
                Ver equipos
              </ButtonText>
            </StyledButton>
            {/* Editar equipo */}
            <StyledButton
                style={{backgroundColor: yellow}}
                onPress={() => navigation.navigate('EditTeam') /* handle your button action here */}>
              <ButtonText style={{color: 'black'}}> 
                Editar equipos
              </ButtonText>
            </StyledButton>
            {/* Eliminar equipo */}
            <StyledButton
                style={{backgroundColor: red}}
                onPress={() => navigation.navigate('DeleteTeam') /* handle your button action here */}>
              <ButtonText > 
                Eliminar equipo
              </ButtonText>
            </StyledButton>
            </View>
            </View>
        </View>
        </ScrollView>
    )
}