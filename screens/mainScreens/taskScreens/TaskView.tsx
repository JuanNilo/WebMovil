import React from 'react';
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
    const [editAviable, setEditAviable] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [editingName, setEditingName] = useState(item.name);
    const [statusSelected, setStatusSelected] = useState(item.state);
    const [editingDescription, setEditingDescription] = useState(item.description);

    // Comentarios
    const [comment, setComment] = React.useState('');
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');


    const handleCommentChange = (text: string) => {
        setComment(text);
    }

    const handleCommentSubmit = () => {
        if (comment === '') {
            setError(true);
            setErrorMessage('Debe escribir un comentario');
            return;
        }
        console.log(comment);
    }

    // Esto tiene que ser cambiado por la query de comentarios
    const lisComments = comments;

    const filteredComments = lisComments.filter((comment) => comment.taskId === item.id);



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
                                            <TouchableOpacity onPress={() => setEditMode(!editMode)}>
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

                    <TouchableOpacity onPress={() => navigation.navigate('ProjectView', item.project)} style={{ backgroundColor: '#FCF5B4', alignItems: 'center', borderColor: 'black', borderBottomWidth: 2, borderTopWidth: 2 }}>
                        <Text style={styles.subTitle}>{item.project}</Text>
                    </TouchableOpacity>
                    {/* Zona de descripcion y estatus */}
                    <View style={styles.container}>
                        <View style={{ height: '100%', padding: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>responsable: </Text>
                                <Text style={{ fontSize: 18 }}>{item.email}</Text>
                            </View>
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
                                filteredComments.length === 0 ? 
                                (<Text style={{fontSize:18, fontWeight:'bold',paddingHorizontal:10}}>No hay comentarios...</Text>)
                                : 
                        (
                                filteredComments.map((comment, index) => (
                                    <View key={index} style={{ backgroundColor: '#CFCFCF', padding: 10, margin: 5, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{comment.authorEmail}</Text>
                                    <Text style={{ fontSize: 16 }}>{comment.comment}</Text>
                                    </View>
                                    ))
                                )
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
                                onSubmitEditing={() => handleCommentSubmit()}
                                placeholder="Comentario..."
                            />
                        </View>
                        {error ? (
                            <Text style={{ color: 'red', fontSize: 20, textAlign: 'center' }}>{errorMessage}</Text>
                        ) : null}
                        {/* Boton de submit */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <TouchableOpacity style={styles.buttonSubmit}
                                onPress={() => handleCommentSubmit()}
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