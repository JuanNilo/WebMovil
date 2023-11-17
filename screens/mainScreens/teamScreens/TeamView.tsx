import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet,ScrollView } from 'react-native';
import KeyboardWrapper from '../../../components/keyboardWrapper';
import giraStyles, { ButtonText, Line, PageTitle, SubTitle } from '../../../components/style';
import { Colors } from '../../../components/style';
import { Octicons } from "@expo/vector-icons";
const {purple, yellow,brand,red, darkLight} = Colors;
import  Constants  from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;
import { lorelei } from '@dicebear/collection';
import { createAvatar } from "@dicebear/core";
import { SvgXml } from 'react-native-svg';


const TeamView = ({navigation}) => {
  const [teamInfo, setTeamInfo] = useState([
    {
        id: 1, name: 'Juan', lastName: 'Nilo', mail:'nilo@mail.com', role:'Administrador'
    },{
        id: 2, name: 'Ignacio', lastName: 'Herrera', mail:'nacho@mail.com',
        role:'Desarrollador'
    },
    {
        id: 3, name: 'María', lastName: 'González', mail:'maria@mail.com',
        role:'Diseñadora'
    },
    {
        id: 4, name: 'Pedro', lastName: 'López', mail:'pedro@mail.com',
        role:'Tester'
    },
    {
        id: 5, name: 'Laura', lastName: 'Martínez', mail:'laura@mail.com',
        role:'Analista'
    }
    ]);

    const [projects, setProjects] = useState([
        {
            id: 1, name: 'Proyecto 1', description:'Proyecto de prueba 1'
        },
        {
            id: 2, name: 'Proyecto 2', description:'Proyecto de prueba 2'
        }

    ]);

  return (
    <KeyboardWrapper>
        <ScrollView style={{padding:10, paddingEnd: 20, flex:1, height:"100%", paddingTop: StatusBarHeight + 40 }}>
            <View style={styles.container}>
    
            <PageTitle style={{color:purple, fontSize:42}}>Team 1</PageTitle>
            <Line/>
            <SubTitle>Miembros del equipo:</SubTitle>
            <View>

            {teamInfo.map((info) => {
                return (
                   
                    <View key={info.id} style={styles.memberContainer}>
                        <SvgXml xml={createAvatar(lorelei, { seed: info.mail }).toString()} style={styles.logo} />

                        <View style={{flexDirection:'column', alignItems:'start', width:'55%'}}>
                            <Text style={styles.memberName}>{info.name} {info.lastName}</Text>
                            <Text style={styles.memberRole}>{info.role}</Text>
                        </View>
                        {info.role == 'Administrador' ? null: 
                        <Octicons name="x" style={styles.boton} size={30} color="white"/>}
                    </View>
                )
            })}
            {/* Boton agregar miembro */}
            <ButtonText style={styles.botonContainer}>
              <Text style={{color:'black', textAlign:'center'}}>
                Añadir miembro
              </Text>
              </ButtonText>
            
            </View>
            <Line/>
            <View style={{paddingVertical: 20}}>
            <SubTitle>Proyectos del equipo</SubTitle>
            {projects.map((project) => {
                return (
                    <ButtonText onPress={() => navigation.navigate('Project')} key={project.id} style={styles.projectContainer}>
                      <View style={{flexDirection: 'column', alignItems:'flex-start', width:'70%'}}>
                        <Text style={styles.projectName}>{project.name}</Text>
                        <Text style={styles.projectDescription}>{project.description}</Text>
                      </View>
                        <View style={{height:50, alignItems:'flex-end', justifyContent:'center'}}>

                        <Octicons  name="x" style={styles.boton} size={30} color="white"/>
                        </View>
                    </ButtonText>
                )
            })}
            
            <ButtonText style={styles.botonContainer}>
              <Text style={{color:'black', textAlign:'center'}}>
                Crear proyecto
              </Text>
              </ButtonText>
            </View>
        </View>
        </ScrollView>
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 2,
  },
  memberRole: {
    fontSize: 18,
  },
  projectContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 3,
  },
  botonContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 3,
    color: 'black',
    textAlign: 'center',
  },
  projectName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 16,
  },
  boton : {
    backgroundColor: red,
    width:40, 
    padding: 2, 
    paddingLeft: 11,
    borderRadius:10,
    marginHorizontal: 10,
  }
});

export default TeamView;
