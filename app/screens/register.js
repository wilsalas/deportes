import React, { useState, useEffect, useRef } from 'react';
import {
    Alert,
    Text,
    TouchableOpacity,
    ScrollView,
    View
} from 'react-native';
import {
    Button, Body, Container, Header, Content, Form,
    Item, Icon, Left, Title, Input, Label, Picker, Thumbnail
} from 'native-base';
import ActionSheet from 'react-native-custom-actionsheet';
import { VALIDATE } from '../helpers/helperManager';
import { ImageManager } from '../helpers/imageManager';
import { ServicesManager } from '../lib/servicesManager';
import styles from '../styles/styles';
import { useGlobal } from '../lib/store';
// import firebase from '../lib/firebase';

export default props => {

    const [getName, setName] = useState("");
    const [getLastName, setLastName] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getGender, setGender] = useState("Masculino");
    const [getProfile, setProfile] = useState(null);
    const actionSheet = useRef(null);
    const [, dispatch] = useGlobal()

    // useEffect(() => {
    //     (async()=>{
    //         let data = await firebase.auth().createUserWithEmailAndPassword("w@gmail.com", "123456")
    //     console.log(data);

    //     })()

    // }, [])


    useEffect(() => {
        setProfile(require("../../assets/img/profile.png"))
    }, [])

    const funChangeModalLoading = modal => dispatch({ type: 'MODAL_ACTION', modal });

    const funActionSheetSelection = async index => {
        let pathFile = "";
        if (index === 0) await ImageManager.PickImage(imageUri => { if (imageUri) pathFile = imageUri });
        if (index === 1) await ImageManager.TakePhoto(imageUri => { if (imageUri) pathFile = imageUri });
        if (pathFile !== "") setProfile({ uri: pathFile })
    }

    const funRegisterUser = async () => {
        let errorMessage = ""
        if (VALIDATE.ValidateEmptyField([getName, getLastName, getEmail, getPassword, getGender])) {
            errorMessage = "Complete todos los campos";
        } else if (!VALIDATE.ValidateEmail(getEmail)) {
            errorMessage = "Correo electrónico incorrecto";
        } else if (!VALIDATE.ValidatePassword(getPassword)) {
            errorMessage = "Ingrese mínimo 6 caracteres para la contraseña";
        }

        if (errorMessage === "") {
            let user = {
                name: getName,
                lastName: getLastName,
                email: getEmail,
                password: getPassword,
                gender: getGender,
                profile: getProfile && getProfile.uri ? getProfile.uri : ""
            }
            funChangeModalLoading(true);
            let newUser = await ServicesManager.POST.AddUser(user);
            if (!newUser.error) {
                Alert.alert(
                    '¡Felicidades!',
                    'Ha creado exitosamente una cuenta Deportes. Te invitamos a iniciar sesión para continuar.',
                    [
                        { text: 'De Acuerdo', onPress: () => props.closeModal() }
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(newUser.message);
            }
            funChangeModalLoading(false);
        } else {
            Alert.alert(errorMessage);
        }
    }

    return (
        <Container >
            <Header style={styles.containerHeader}>
                <Left>
                    <Button transparent onPress={() => props.closeModal()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.titleHeader}>Registro de usuarios</Title>
                </Body>
            </Header>
            <Content padder>
                <TouchableOpacity
                    onPress={() => actionSheet.current.show()}
                    style={styles.containerProfile}>
                    <Thumbnail large source={getProfile} style={{ margin: 10 }} />
                    <Text style={styles.textButtonProfile}>
                        {(getProfile && getProfile.uri) ? 'Cambiar ' : 'Añade una '}fotografía
                    </Text>
                </TouchableOpacity>
                <ScrollView>
                    <Form>
                        <Item floatingLabel>
                            <Label style={styles.label}>Nombres</Label>
                            <Input onChangeText={e => setName(e)} value={getName} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.label}>Apellidos</Label>
                            <Input onChangeText={e => setLastName(e)} value={getLastName} />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.label}>Correo electrónico</Label>
                            <Input keyboardType={'email-address'}
                                onChangeText={e => setEmail(e)} value={getEmail}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={styles.label}>Contraseña</Label>
                            <Input secureTextEntry keyboardType={'numbers-and-punctuation'}
                                onChangeText={e => setPassword(e)} value={getPassword}
                            />
                        </Item>
                        <Item >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    <Label style={[styles.label, { marginTop: 35 }]}>Género</Label>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Picker
                                        note
                                        mode="dialog"
                                        style={styles.pickerContent}
                                        selectedValue={getGender}
                                        onValueChange={e => setGender(e)}
                                    >
                                        {
                                            ["Masculino", "Femenino", "Otro"].map((item) => {
                                                return (
                                                    <Picker.Item key={item} label={item} value={item} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </View>
                            </View>
                        </Item>
                    </Form>
                </ScrollView>
            </Content>
            <TouchableOpacity
                onPress={() => funRegisterUser()}
                style={[styles.buttonGeneral, styles.boxShadow]}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
            <ActionSheet
                ref={actionSheet}
                title={'Agregar fotografía'}
                options={['Galería', 'Cámara', 'Cancelar']}
                cancelButtonIndex={2}
                onPress={index => funActionSheetSelection(index)}
            />
        </Container>
    )
}

