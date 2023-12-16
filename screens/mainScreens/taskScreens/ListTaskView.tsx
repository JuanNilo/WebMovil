import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import KeyboardWrapper from "../../../components/keyboardWrapper";
import Constants from 'expo-constants';
import { SubTitle, PageTitle } from "../../../components/style";
import { Colors } from "../../../components/style";
import {tasks} from '../../../components/data/task.json';
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENDPOINT_MS_TASK } from '@env';
const StatusBarHeight = Constants.statusBarHeight;

interface Task {
    id: number,
    name: string,
    description: string,
    state: string,
    id_team: number,
    initial_date: string,
    final_date: string,
    email: string,
}

const ListTaskView = ({ navigation }) => {
    const [task, setTask] = useState([] as Task[]);

    const fetchTaskData = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.get(`${ENDPOINT_MS_TASK}/tasks/tasks-email/data=${email}`);
            const taskData = response.data;
            setTask(taskData);
        } catch (error) {
            console.error('Error al recuperar los datos del usuario:', error);
        }
    }

    useEffect(() => {
        fetchTaskData();
    }
    , []);

    


    return(
        <KeyboardWrapper>
            <ScrollView>
                <View style={{paddingTop: 50 + StatusBarHeight}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                    <PageTitle style={{color: 'black', marginHorizontal: 10}}>Lista de Tareas</PageTitle>
                    
                    </View>
                    <View>
                        {/* quiero renderizar la stareas en una lista */}
                        {task.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('TaskView', { item })} key={index}>
                                <View style={styles.card} key={index}>
                                    <View style={{width: '90%'}}>
                                        <Text style={styles.titleCard} >{item.name}</Text>
                                        <Text>{item.description}</Text>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}} >{item.state}</Text>
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