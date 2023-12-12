import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView } from 'react-native';
import KeyboardWrapper from '../../../components/keyboardWrapper';
import Constants from 'expo-constants';
import giraStyles, { SubTitle,PageTitle } from '../../../components/style';
import { Colors } from '../../../components/style';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';
const StatusBarHeight = Constants.statusBarHeight;

const TaskView = ({ route, navigation }) => {
  const { item } = route.params;
  const [editAviable, setEditAviable] = useState(true);
  const [editMode, setEditMode] = useState(false);
    const [editingName, setEditingName] = useState(item.nombre);
    const [statusSelected, setStatusSelected] = useState(item.estado);
    const [editingDescription, setEditingDescription] = useState(item.descripcion);
    const [editingStatus, setEditingStatus] = useState(item.estado);

    const handleNameChange = (text: string) => {
        setEditingName(text);
    }

    const handleDescriptionChange = (text: string) => {
        setEditingDescription(text);
    }

    const handleStatusChange = (text: string) => {
        if(editMode){
            setStatusSelected(text);

        }
    }
  return (
    <KeyboardWrapper>
        <ScrollView>
        <View style={{paddingTop: 50 + StatusBarHeight, backgroundColor: 'white', paddingBottom: 20}}>
            { editAviable ?
            (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                    {
                        editMode ? (
                            // Esta habilitado el modo edicion
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20,}}>
                                <TextInput style={{fontSize:35, fontWeight:'bold', color: 'black', textAlign: 'center',  padding: 10}}
                                                onChangeText={handleNameChange}
                                                value={editingName}
                                                placeholder="Nuevo Nombre"
                                                />
                            <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                                <AntDesign name="checkcircleo" style={{marginTop: 5}} size={30} color="black" />
                            </TouchableOpacity>
                            </View>
                        ) : (
                            // Esta deshabilitado el modo edicion
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                                <PageTitle style={{color: 'black', marginHorizontal: 10}}>{editingName}</PageTitle>
                            <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                                <AntDesign name="edit" style={{marginTop: 5}} size={30} color="black" />
                            </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            ) : (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                    <PageTitle style={{color: 'black', marginHorizontal: 10}}>{item.nombre}</PageTitle>
                </View>
            )    
        }

            <TouchableOpacity onPress={() => navigation.navigate('ProjectView', item.project )} style ={{backgroundColor: '#FCF5B4', alignItems: 'center', borderColor: 'black', borderBottomWidth: 2, borderTopWidth: 2}}>
                <Text style={styles.subTitle}>{item.project}</Text>
            </TouchableOpacity>
            {/* Zona de descripcion y estatus */}
            <View style={styles.container}>
                <View style={{height: '100%', padding: 5}}>
                    <View style={{flexDirection:'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>responsable: </Text>
                        <Text style={{fontSize: 18}}>{item.responsable}</Text>
                    </View>
                    {/* Descripcion */}
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Descripcion: </Text>
                    {
                        editMode ? (
                            <View style={{backgroundColor: 'white', paddingVertical: 10, paddingHorizontal:4, borderWidth: 2, borderColor: 'black'}}>

                            <TextInput style={{fontSize:20, color: 'black', height: 'auto'}}
                                                onChangeText={handleDescriptionChange}
                                                value={editingDescription}
                                                multiline={true}
                                                placeholder="Nueva Descripcion"
                                                />
                            </View>
                        ) :
                        (
                            <View style={{paddingVertical: 14, paddingHorizontal: 4, borderWidth: 2, borderColor: 'transparent'}}>

                            <Text style={{fontSize: 20}}>{editingDescription}</Text>
                            </View>
                        ) 
                        }

                </View>
               
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>

                <TouchableOpacity onPress={() => handleStatusChange('pendiente')} style={{backgroundColor: statusSelected === 'pendiente' ?  '#0288E5' : '#CFCFCF', padding: 5}}>
                    <Text style={{color: statusSelected == 'pendiente' ?  'white' : 'black',fontWeight: 'bold', fontSize: 18}}>Pendiente</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleStatusChange('en progreso')} style={{backgroundColor: statusSelected == 'en progreso' ?  '#E5B502' : '#CFCFCF', padding: 5}}>
                    <Text style={{color: statusSelected == 'en progreso' ?  'black' : 'black',fontWeight: 'bold', fontSize: 18}}>En Progreso</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleStatusChange('completada')} style={{backgroundColor: statusSelected == 'completada' ?  '#0F4903' : '#CFCFCF', padding: 5}}>
                    <Text style={{color: statusSelected == 'completada' ?  'white' : 'black',fontWeight: 'bold', fontSize: 18}}>Completada</Text>
                </TouchableOpacity>
                </View>
         
        </View>


        </ScrollView>
    </KeyboardWrapper>
  );
};


const styles = StyleSheet.create({
    container: {
      paddingTop: 30,
      flex: 1,
      padding:20,
      justifyContent: 'center',
      backgroundColor: '#DBF8D5',
    },
    subTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.purple,
    },
    
    
});
export default TaskView;