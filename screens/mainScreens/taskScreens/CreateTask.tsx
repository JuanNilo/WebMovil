import React from 'react';
import { View, Text, ScrollView, TextInput, Modal } from 'react-native';
import KeyboardWrapper from '../../../components/keyboardWrapper';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRef } from 'react';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { AntDesign } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native';
const StatusBarHeight = Constants.statusBarHeight;

// necesito el tipeo de values
interface valuesTypes {
    name: string;
    project: string;
    description: string;
    status: string;
    encargado: string;
}


const CreateTask = ({navigation}) => {
    const nameTaskRef = useRef<TextInput>(null);
    const projectTaskRef = useRef<TextInput>(null);
    const descriptionTaskRef = useRef<TextInput>(null);
    const statusTaskRef = useRef<TextInput>(null);
    const encargadoTaskRef = useRef<TextInput>(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    

    // Fechas
    // Fecha inicio
    const [modalStartDate, setModalStartDate] = useState(false);
    const [startDate, setStartDate] = useState<DateType>(new Date());

    // Fecha termino
    const [modalEndDate, setModalEndDate] = useState(false);
    const [endDate, setEndDate] = useState<DateType>(new Date());

    const handleSubmit = (values:valuesTypes) => {
        console.log(values, startDate, endDate);
        
        if(values.name === '' || values.project === '' || values.description === '' || values.status === '' || values.encargado === ''){
        setError(true);
        setErrorMessage('☠️ Error al crear la tarea ☠️');
        }else{
            setError(false);
            setErrorMessage('');
            navigation.goBack();
        }
    }
    return (
        <KeyboardWrapper>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Crear Tarea</Text>
                </View>
                <Formik
                 
                    initialValues={{name:'', project:'', description:'', status:'pendiente',     encargado:''}} 
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ handleChange, values, handleBlur }) => (
                    <View style={{paddingHorizontal: 10, paddingBottom: 50}}>
                        <Text style={styles.label}>Nombre de la tarea:</Text>
                        <TextInput ref={nameTaskRef} style={styles.input} placeholder="Nombre de la tarea" onChangeText={handleChange('name')} value={values.name} onBlur={handleBlur('name')}
                        onSubmitEditing={() => projectTaskRef.current?.focus()}
                        />
                        {/* Projecto */}
                        <Text style={styles.label}>Proyecto:</Text>
                        <TextInput ref={projectTaskRef} style={styles.input} placeholder="Proyecto" onChangeText={handleChange('project')} value={values.project} onBlur={handleBlur('project')}
                        onSubmitEditing={() => descriptionTaskRef.current?.focus()}
                        />
                        {/* Descripcion */}
                        <Text style={styles.label}>Descripcion:</Text>
                        <TextInput ref={descriptionTaskRef} style={styles.input} placeholder="Descripcion" onChangeText={handleChange('description')} value={values.description} onBlur={handleBlur('description')}
                        onSubmitEditing={() => statusTaskRef.current?.focus()}
                        />
                        {/* Estado */}

                        <Text style={styles.label}>Estado:</Text>
                        {/* el estado se da por un option de 3 opciones, pendiente, en progreso y completada */}
                        <View style={styles.pickerContainer}>


                        <Picker
                            style={styles.picker}
                            selectedValue={values.status}
                            onValueChange={handleChange('status')
                        }
                        
                        >
                            <Picker.Item style={styles.pickerContainer} color={'verde'} label="Pendiente" value="pendiente" />
                            <Picker.Item style={styles.pickerContainer} label="En Progreso" value="en progreso" />
                            <Picker.Item style={styles.pickerContainer} label="Completada" value="completada" />
                            </Picker>
                        
                        </View>
                        {/* Encargado */}
                        <Text style={styles.label}>Encargado:</Text>
                        <TextInput ref={encargadoTaskRef} style={styles.input} placeholder="Encargado" onChangeText={handleChange('encargado')} value={values.encargado} 
                        onSubmitEditing={() => console.log('pressed')}
                        onBlur={handleBlur('encargado')}/>

                        {/* Fecha Inicio */}
                        
                        <TouchableOpacity onPress={() => setModalStartDate(true)}>
                            <Text style={styles.label}>Fecha de inicio:</Text>
                            <Text style={[styles.input, {paddingTop:10, fontWeight:'bold', fontSize: 20}]}><AntDesign name="calendar" size={24} color="black" /> {dayjs(startDate).format('DD/MM/YYYY')} 
                            </Text>
                        </TouchableOpacity>

                        {/* Fecha de termino */}

                        <TouchableOpacity onPress={() => setModalEndDate(true)}>
                            <Text style={styles.label}>Fecha de inicio:</Text>
                            <Text style={[styles.input, {paddingTop:10, fontWeight:'bold', fontSize: 20}]}><AntDesign name="calendar" size={24} color="black" /> {dayjs(endDate).format('DD/MM/YYYY')} 
                            </Text>
                        </TouchableOpacity>
                        
                        {/* Modal fecho inicio */}
                        <Modal visible={modalStartDate} transparent={true} animationType="slide">
                            <View style={{ height: '50%', justifyContent:'flex-end', flex:1}}>
                                <TouchableOpacity style={{height: '30%', width: '100%'}} onPress={() => setModalStartDate(false)}></TouchableOpacity>
                                <View style={{backgroundColor: 'white', height: '65%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', padding: 10}}>Fecha de inicio</Text>
                                <DateTimePicker selectedItemColor='black'  value={startDate} onValueChange={(date) => setStartDate(date)}  />
                                <TouchableOpacity style={[styles.button, {paddingHorizontal: 40}]} onPress={() => setModalStartDate(false)}>
                                    <Text style={styles.buttonText}>Aceptar</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        {/* Modal fecha termino */}
                        <Modal visible={modalEndDate} transparent={true} animationType="slide">
                            <View style={{ height: '50%', justifyContent:'flex-end', flex:1}}>
                                <TouchableOpacity style={{height: '30%', width: '100%'}} onPress={() => setModalEndDate(false)}></TouchableOpacity>
                                <View style={{backgroundColor: 'white', height: '65%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', padding: 10}}>Fecha de termino</Text>
                                <DateTimePicker  selectedItemColor='black' value={endDate} onValueChange={(date) => setEndDate(date)}  />
                                <TouchableOpacity style={[styles.button, {paddingHorizontal: 40}]} onPress={() => setModalEndDate(false)}>
                                    <Text style={styles.buttonText}>Aceptar</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        {/* Mensaje de error */}
                        {
                            error ? (
                                <View style={styles.error}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>{errorMessage}</Text>
                                </View>
                            ) : null
                        }
                        {/* Boton */}
                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit(values)}>
                            <Text style={styles.buttonText}>Crear Tarea</Text>
                        </TouchableOpacity>

                    </View>
    )}
                </Formik>
            </ScrollView>
        </KeyboardWrapper>
    );
}

const styles = StyleSheet.create({
    mainContainer :{
        paddingTop: 30 + StatusBarHeight,
        paddingBottom: 20
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        color: 'black',
        textAlign: 'center',
        padding: 10
    },
    label:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        padding: 10
    },
    input: {
        flex: 1, 
        backgroundColor: 'white', 
        color: 'black', 
        height: 55,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        fontWeight: 'bold',
        borderWidth: 3,
        borderColor: 'black',
        padding:2,
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    selectOption: { 
        color:'black', 
        padding: 2, 
        fontSize:16, 
        fontWeight:'bold',
    },
    picker:{
        backgroundColor: 'white', 
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        color: 'black',
        fontSize:16,
    },
    error:{
        backgroundColor: 'red', 
        padding: 10, 
        paddingVertical:15,
        borderRadius: 10, 
        marginVertical: 10
    }
    
});

export default CreateTask;