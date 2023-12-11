import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import KeyboardWrapper from "../../../components/keyboardWrapper";
import Constants from 'expo-constants';
import { SubTitle, PageTitle } from "../../../components/style";
import { Colors } from "../../../components/style";
import {tasks} from '../../../components/data/task.json';
import { useState } from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const StatusBarHeight = Constants.statusBarHeight;

const ListTaskView = ({ navigation }) => {
    const [task, setTask] = useState(tasks);
    return(
        <KeyboardWrapper>
            <ScrollView>
                <View style={{paddingTop: 50 + StatusBarHeight}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                    <PageTitle style={{color: 'black', marginHorizontal: 10}}>Lista de Tareas</PageTitle>
                    <AntDesign name="pluscircleo" style={{marginTop: 5}} size={30} color="black" onPress={() => navigation.navigate('CreateTask')}/>
                    </View>
                    <View>
                        {/* quiero renderizar la stareas en una lista */}
                        {task.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('TaskView', {item})} key={index}>
                                <View style={styles.card} key={index}>
                                    <View style={{width: '90%'}}>
                                        <Text style={styles.titleCard} >{item.nombre}</Text>
                                        <Text>{item.descripcion}</Text>
                                        <Text style={{fontSize: 18}} >{item.project}</Text>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}} >{item.estado}</Text>
                                    </View>
                                    <AntDesign name="caretright" size={30} color="black"/>
                                </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </KeyboardWrapper>
    )
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:20,
      justifyContent: 'center',
      gap: 20,
    },
    subTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.purple,
        padding: 10,
    },
    titleCard: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },
    card: {
        backgroundColor:'white', 
        borderColor:'black', 
        borderWidth:2, 
        marginHorizontal: 10, 
        marginBottom:4, 
        padding: 10, 
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
    
});

export default ListTaskView;