import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import Register from './register';
import styles from '../styles/styles';

export default () => {

    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getModal, setModal] = useState(false);

    const changeStatusModal = status => setModal(status);

    return (
        <View style={styles.container}>
            <Image style={styles.imgLogo} resizeMode={'contain'} source={require('../../assets/icon.png')} />
            <KeyboardAvoidingView style={styles.keyboardAvoiContainer} behavior={'padding'}>
                <View style={[styles.inputView, styles.boxShadow]} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Correo electrónico..."
                        placeholderTextColor="#003f5c"
                        keyboardType={'email-address'}
                        onChangeText={e => setEmail(e)}
                        value={getEmail} />
                </View>
                <View style={[styles.inputView, styles.boxShadow]} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Contraseña..."
                        placeholderTextColor="#003f5c"
                        keyboardType={'numbers-and-punctuation'}
                        onChangeText={e => setPassword(e)}
                        value={getPassword} />
                </View>
                <TouchableOpacity style={[styles.buttonLogin, styles.boxShadow]}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={() => changeStatusModal(true)}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            {/* Page user register */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={getModal}
                onRequestClose={() => changeStatusModal(false)}>
                <Register closeModal={() => changeStatusModal(false)} />
            </Modal>
        </View>
    )
}
