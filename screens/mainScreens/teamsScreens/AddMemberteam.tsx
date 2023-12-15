import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import KeyboardWrapper from "../../../components/keyboardWrapper"
import Constants from "expo-constants"
const StatusBarHeight = Constants.statusBarHeight
import { useEffect, useState } from "react"
import axios from "axios";
import { Formik } from "formik"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Picker } from "@react-native-picker/picker"

export default function AddMemberTeam({navigation, route}) {
    const {idTeam, name} = route.params;
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('')

    const [emailMembers, setEmailMembers] = useState([] as string[]);

    const registerMemberTeam = async (email: string) => {
        try {
            const id = idTeam.toString();
            const response = await axios.post(`http://10.0.2.2:4000/api/in/middle/new-member`, {
                email,
                id,
            });
            navigation.goBack();
        }catch (e: any){
            setError(true);
            setErrorMessage(e?.response?.data?.message);
            console.log({error: e?.response?.data?.message});
        }
    }

    const fetchMembersData = async () => {
        try {
          const id_project = await AsyncStorage.getItem('id_project');
          console.log(id_project);
          const response = await axios.get(`http://10.0.2.2:3002/api/on/members/members/${id_project}`);
          const memberData = response.data;
          setEmailMembers(memberData.emails);
          console.log('==== ',memberData.emails);
        } catch (error) {
          console.error('Error al recuperar los datos de miembros:', error);
        }
      }

      useEffect(() => {
        fetchMembersData();
      }, []);

    return(
        <KeyboardWrapper>
        <ScrollView>
            <View style={styles.contianer}>
                <Text style={styles.title}>Agregar miembro al  {name}</Text>

                
            </View>
            <View style={{alignItems:'center'}}>

            <Formik initialValues={{email: ''}} onSubmit={(values) => registerMemberTeam(values.email)}>
                    {
                        ({handleChange, handleBlur, handleSubmit, values}) => (
                            <View style={styles.contianer}>
{/* 
                            <View>
                                <TextInput style={styles.InputContainer} placeholderTextColor={'black'} placeholder="Email del miembro" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
                            </View> */}
                        <View style={styles.pickerContainer}>

                            <Picker
                                selectedValue={values.email}
                                style={styles.picker}
                                // onValueChange={(itemValue, itemIndex) => setEmail(itemValue)}
                                onValueChange={handleChange('email')}
                                >
                                {
                                    emailMembers.map((email) => {
                                        return(
                                            <Picker.Item key={email} label={email} value={email} style={styles.pickerContainer} />
                                            )
                                        })
                                    }
                            </Picker>
                            </View>

                            <TouchableOpacity style={styles.boton} onPress={() => registerMemberTeam(values.email)}>
                                <Text style={{fontWeight:'bold', fontSize: 18}}>Agregar miembro</Text>
                            </TouchableOpacity>
                            </View>
                        )
                    }
                </Formik>
                    </View>
        </ScrollView>
        </KeyboardWrapper>
    )
}

const styles = StyleSheet.create({
    contianer: {
        padding: 10,
        paddingTop: StatusBarHeight + 50,
        alignItems:'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
    },
    InputContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        borderColor: 'black',
        borderWidth: 3,
        color: 'black',
        width: '80%',
        fontWeight: 'bold',
        fontSize: 18,
    },
    boton:{
        backgroundColor: 'white',
        width: '50%',
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: "black",
        borderWidth: 2,
        color: 'black',
        textAlign: 'center',
    },
    picker:{
        backgroundColor: 'white', 
    },
    pickerContainer: {
        backgroundColor: 'white',
        width: 250,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        color: 'black',
        fontSize:16,
    },
})