import React, { useEffect } from 'react';
import styles from "../styles/styles";
import { AsyncStorage, Text, TouchableOpacity } from 'react-native';
import {
    Button, Body, Header, Icon, Left, Right, Title
} from 'native-base';
import { useGlobal } from '../lib/store';

export default props => {
    const [, dispatch] = useGlobal();

    useEffect(() => {
        (async () => {
            dispatch({ type: "USER_ACTION", uid: await AsyncStorage.getItem("uid") })
        })()
    }, []);

    const funLogout = async () => {
        await AsyncStorage.removeItem("uid");
        props.navigation.navigate("Login");
    }

    return (
        <Header style={styles.containerHeader}>
            <Left>
                {props.goBack &&
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name='arrow-back' />
                    </Button>
                }
            </Left>
            <Body>
                <Title style={styles.titleHeader}>{props.title}</Title>
            </Body>
            <Right >
                <TouchableOpacity onPress={() => funLogout()}>
                    <Text style={styles.textLogout}>Cerrar sesión</Text>
                </TouchableOpacity>
            </Right>
        </Header>
    )
}