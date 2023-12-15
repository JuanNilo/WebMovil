import { View, Text, ScrollView, StyleSheet } from "react-native"
import KeyboardWrapper from "../../../components/keyboardWrapper"
import Constants from "expo-constants"
const StatusBarHeight = Constants.statusBarHeight
export default function AddMemberTeam() {
    return(
        <KeyboardWrapper>
        <ScrollView>
            <View style={styles.contianer}>
                <Text style={styles.title}>Agregar miembro al equipo</Text>
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
})