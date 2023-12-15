import { View, Text, StyleSheet } from "react-native";


export default function ProjectCard({nombre}){
    return(
        <View style={styles.container}>
            <Text style={styles.nameProject}>{nombre}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 200,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'black',
        borderWidth:2,
    },
    nameProject: {
        fontSize: 20,
        fontWeight:'bold'
    }
})
