import React, { useState } from 'react';
import {
    Alert,
    Text,
    View,
    Image,
    TextInput,
    Modal,
    AsyncStorage,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import Register from './register';
import { ServicesManager } from '../lib/servicesManager';
import { VALIDATE } from '../helpers/helperManager';
import { useGlobal } from '../lib/store';
import styles from '../styles/styles';

export default props => {

    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getModal, setModal] = useState(false);
    const [, dispatch] = useGlobal();

    const funChangeStatusModal = status => setModal(status);

    const funChangeModalLoading = modal => dispatch({ type: 'MODAL_ACTION', modal });

    const funLoginUser = async () => {
        let errorMessage = "";
        if (VALIDATE.ValidateEmptyField([getEmail, getPassword])) {
            errorMessage = "Complete todos los campos";
        } else if (!VALIDATE.ValidateEmail(getEmail)) {
            errorMessage = "Correo electrónico incorrecto";
        }
        if (errorMessage === "") {
            funChangeModalLoading(true);
            let userAuth = await ServicesManager.POST.LoginUser(getEmail, getPassword);
            if (!userAuth.error) {
                await AsyncStorage.setItem("uid", userAuth.message);
                props.navigation.navigate("Home");
            } else {
                Alert.alert(userAuth.message);
            }
            funChangeModalLoading(false);
        } else {
            Alert.alert(errorMessage);
        }
    }

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
                <TouchableOpacity
                    onPress={() => funLoginUser()}
                    style={[styles.buttonLogin, styles.boxShadow]}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={() => funChangeStatusModal(true)}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            {/* Page user register */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={getModal}
                onRequestClose={() => funChangeStatusModal(false)}>
                <Register closeModal={() => funChangeStatusModal(false)} />
            </Modal>
        </View>
    )
}
