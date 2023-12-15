import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, ScrollView } from 'react-native';
import KeyboardWrapper from '../../../components/keyboardWrapper';
import Constants from 'expo-constants';
import giraStyles, { SubTitle, PageTitle } from '../../../components/style';
import { Colors } from '../../../components/style';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { comments } from "../../../components/data/comments.json";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

const TaskView = ({ route, navigation }) => {
    const { item } = route.params;
    console.log(item)
    const [editAviable, setEditAviable] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editingName, setEditingName] = useState(item.name);
    const [statusSelected, setStatusSelected] = useState(item.state);
    const [editingDescription, setEditingDescription] = useState(item.description);

    // Comentarios
    const [comment, setComment] = React.useState('');
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [commentsIds, setCommentsIds] = React.useState([]);
    const [commentsAuthors, setCommentsAuthors] = React.useState([]);
    const [commentsComments, setCommentsComments] = React.useState([]);    


    const handleCommentChange = (text: string) => {
        setComment(text);
    }

    const handleCommentSubmit = async (comment: string) => {
        try{
            const id_task = item.id;
            const authorEmail = await AsyncStorage.getItem('email');
            const response = await axios.post(`http://10.0.2.2:1000/api/ts/comments`, {
                authorEmail,
                comment,
                id_task,
            })
            fetchCommentData();
        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
        }
        

    }


    // Esto tiene que ser cambiado por la query de comentarios
    const fetchCommentData = async () => {
        try {
          const id_task = item.id;
          const response = await axios.get(`http://10.0.2.2:1000/api/ts/comments/comment-idTask/${id_task}`);
          const commentData = response.data;
          setCommentsIds(commentData.commentsIds);
          setCommentsAuthors(commentData.commentsAuthors);
          setCommentsComments(commentData.commentsComments);
          setComment('');
        } catch (error) {
          console.error('Error al recuperar los datos de comentarios:', error);
        }
    };

    const handleEditTask = async () => {    
        try {
            const updatedData = {
                name: editingName,
                description: editingDescription,
                state: statusSelected,
            };
            const id_task = item.id;
            const response = await axios.put(`http://10.0.2.2:1000/api/ts/tasks/${id_task}`, updatedData);
            if(response.status === 200){
                setEditMode(!editMode);
              }else{
                console.log('Error al actualizar el nombre del proyecto');
              }
        } catch (error) {
            console.error('Error al actualizar el nombre del proyecto:', error);
        }
    }


    const handleNameChange = (text: string) => {
        setEditingName(text);
    }

    const handleDescriptionChange = (text: string) => {
        setEditingDescription(text);
    }

    const handleStatusChange = (text: string) => {
        if (editMode) {
            setStatusSelected(text);

        }
    }
    useEffect(() => {
        fetchCommentData();
    }, []);
    return (
        <KeyboardWrapper>
            <ScrollView>
                <View style={{ paddingTop: 50 + StatusBarHeight, backgroundColor: 'white', paddingBottom: 20 }}>
                    {editAviable ?
                        (
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                                {
                                    editMode ? (
                                        // Esta habilitado el modo edicion
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, }}>
                                            <TextInput style={{ fontSize: 35, fontWeight: 'bold', color: 'black', textAlign: 'center', padding: 10 }}
                                                onChangeText={handleNameChange}
                                                value={editingName}
                                                placeholder="Nuevo Nombre"
                                            />
                                            <TouchableOpacity onPress={() => handleEditTask()}>
                                                <AntDesign name="checkcircleo" style={{ marginTop: 5 }} size={30} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        // Esta deshabilitado el modo edicion
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                                            <PageTitle style={{ color: 'black', marginHorizontal: 10 }}>{editingName}</PageTitle>
                                            <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                                                <AntDesign name="edit" style={{ marginTop: 5 }} size={30} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                                <PageTitle style={{ color: 'black', marginHorizontal: 10 }}>{item.nombre}</PageTitle>
                            </View>
                        )
                    }

                    <View  style={{ backgroundColor: '#FCF5B4', alignItems: 'center', borderColor: 'black', borderBottomWidth: 2, borderTopWidth: 2 }}>
                        <Text style={styles.subTitle}>{item.email}</Text>
                    </View>
                    {/* Zona de descripcion y estatus */}
                    <View style={styles.container}>
                        <View style={{ height: '100%', padding: 5 }}>
                            
                            {/* Descripcion */}
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Descripcion: </Text>
                            {
                                editMode ? (
                                    <View style={{ backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 4, borderWidth: 2, borderColor: 'black' }}>

                                        <TextInput style={{ fontSize: 20, color: 'black', height: 'auto' }}
                                            onChangeText={handleDescriptionChange}
                                            value={editingDescription}
                                            multiline={true}
                                            placeholder="Nueva Descripcion"
                                        />
                                    </View>
                                ) :
                                    (
                                        <View style={{ paddingVertical: 14, paddingHorizontal: 4, borderWidth: 2, borderColor: 'transparent' }}>

                                            <Text style={{ fontSize: 20 }}>{editingDescription}</Text>
                                        </View>
                                    )
                            }

                        </View>

                    </View>

                    {/* Estado de tareas */}

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderColor: 'black', borderTopWidth: 2, borderBottomWidth: 2 }}>

                        <TouchableOpacity onPress={() => handleStatusChange('pendiente')} style={{ backgroundColor: statusSelected === 'pendiente' ? '#0288E5' : '#CFCFCF', padding: 5 }}>
                            <Text style={{ color: statusSelected == 'pendiente' ? 'white' : 'black', fontWeight: 'bold', fontSize: 18 }}>Pendiente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleStatusChange('en progreso')} style={{ backgroundColor: statusSelected == 'en progreso' ? '#E5B502' : '#CFCFCF', padding: 5 }}>
                            <Text style={{ color: statusSelected == 'en progreso' ? 'black' : 'black', fontWeight: 'bold', fontSize: 18 }}>En Progreso</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleStatusChange('completada')} style={{ backgroundColor: statusSelected == 'completada' ? '#0F4903' : '#CFCFCF', padding: 5 }}>
                            <Text style={{ color: statusSelected == 'completada' ? 'white' : 'black', fontWeight: 'bold', fontSize: 18 }}>Completada</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Comentarios */}
                    <View style={{ paddingVertical: 20 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", gap: 10 }}>
                            <SubTitle style={{ textAlign: 'center' }}>Comentarios</SubTitle>
                            
                                <AntDesign name="message1" size={30} color="black" style={{ textAlign: 'center', paddingBottom:10 }} />
                        </View>
                            {
                                commentsIds.length === 0 ? 
                                (<Text style={{fontSize:18, fontWeight:'bold',paddingHorizontal:10}}>No hay comentarios...</Text>)
                                : 
                        
                                commentsIds.map((index) => (
                                    <View key={index} style={{ backgroundColor: '#CFCFCF', padding: 10, margin: 5, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{commentsAuthors[index-1]}</Text>
                                    <Text style={{ fontSize: 16 }}>{commentsComments[index-1]}</Text>
                                    </View>
                                    ))
                                
                        }
                    </View>
                    {/* Agregar comentario */}

                    <View style={{ paddingBottom: 20, backgroundColor: 'white', borderColor:'black', borderTopWidth:2 }}>
                        <Text style={styles.commentTitle}>Agregar comentario</Text>
                        <View style={{ backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 4, borderWidth: 2, borderColor: 'black', marginHorizontal: 20, marginVertical: 20, minHeight: 150, borderRadius:15 }}>
                            <TextInput style={{ fontSize: 20, color: 'black', height: 'auto' }}
                                onChangeText={handleCommentChange}
                                value={comment}
                                multiline={true}
                                onSubmitEditing={() => handleCommentSubmit(comment)}
                                placeholder="Comentario..."
                            />
                        </View>
                        {error ? (
                            <Text style={{ color: 'red', fontSize: 20, textAlign: 'center' }}>{errorMessage}</Text>
                        ) : null}
                        {/* Boton de submit */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <TouchableOpacity style={styles.buttonSubmit}
                                onPress={() => handleCommentSubmit(comment)}
                            >
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Agregar comentario</Text>
                            </TouchableOpacity>
                        </View>
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
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#DBF8D5',
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.purple,
    },
    commentTitle: {
        fontSize: 20,
        paddingTop:15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    buttonSubmit: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 10
    },


});
export default TaskView;