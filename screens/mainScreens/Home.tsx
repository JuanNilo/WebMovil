import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import {View, Text} from 'react-native'
 
export default function Home({navigation}){
    const route = useRoute();
    return(
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text 
                style={{fontSize: 25, fontWeight: 'bold'}}
                >
                Home screen
            </Text>
        </View>
    )
}