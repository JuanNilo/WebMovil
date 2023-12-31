import { DarkTheme, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { Octicons } from "@expo/vector-icons";
import {View, Text, ScrollView, Button} from 'react-native'
import { ButtonText, PageTitle, StyledButton, ButtonOption } from '../../components/style';
import { Colors } from '../../components/style';

import giraStyles from '../../components/style';
import ViewTeams from './projectsScreens/ViewProjects';
const {container, styleInnerContainer, styleDataUser} = giraStyles

const {purple, yellow,brand,red, darkLight} = Colors;


export default function Projects({navigation}){
    const route = useRoute();
    return( 
        <ScrollView style={container}>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styleInnerContainer}>
            <View style={ styleDataUser}>
              <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
                <PageTitle style={{color:'black'}}>
                  PROYECTOS
                </PageTitle>
                {/* Crear proyecto */}
                <ButtonOption
                    style={{backgroundColor: 'black'}}
                    onPress={() => navigation.navigate('CreateProject')}>
                  <Octicons name="plus" size={30} color="white"/>

                </ButtonOption>

              </View>
            

            {/* Lista de proyecto */}           
                <ViewTeams navigation={navigation}/>
            </View>
            </View>
        </View>
        </ScrollView>
    )
}