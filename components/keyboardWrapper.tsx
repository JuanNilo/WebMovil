import React from 'react';
import { KeyboardAvoidingView,Platform, ScrollView, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { Colors } from './style';
const {primary, yellow} = Colors
const KeyboardWrapper = ({ children }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1,  backgroundColor: primary }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Ajusta esto según tus necesidades
        >
            <ScrollView contentContainerStyle={{ flex: 0}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>{children}</View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardWrapper;
