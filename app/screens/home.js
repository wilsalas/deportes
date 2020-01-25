import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/styles';

export default props => {
    const [getCards] = useState([{
        top: [
            {
                color: "#59c234",
                icon: "football",
                title: "Futbol",
                navigate: "Football"
            },
            {
                color: "#ba6929",
                icon: "basketball",
                title: "Baloncesto",
                navigate: "Basketball"
            }
        ]
    },
    {
        bottom: [
            {
                color: "#6071ad",
                icon: "cash",
                title: "Apuesta",
                navigate: "Cash"
            },
            {
                color: "#e9e839",
                icon: "person",
                title: "Perfil",
                navigate: "Person"
            }
        ]
    }]);

    useEffect(() => {
        funEnableBackPress();
        return () => funEnableBackPress().remove();
    }, []);

    const funEnableBackPress = () => {
        return BackHandler.addEventListener('hardwareBackPress', () => true);
    }

    const funRenderCards = () => {
        return getCards.map((views, i) => {
            const listButtons = i === 0 ? views.top : views.bottom;
            return (
                <View key={i} style={[styles.viewCard, { marginTop: i > 0 ? '10%' : '0%' }]}>
                    {listButtons.map((item => (
                        <TouchableOpacity
                            key={item.title}
                            style={[styles.touchableCard, { borderColor: item.color }]}
                            onPress={() => props.navigation.navigate(item.navigate)}>
                            <Icon name={item.icon} style={{ fontSize: 80, color: item.color }} />
                            <Text style={[styles.labelBold, { color: item.color }]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    ))
                    )}
                </View>
            )
        })
    }

    return (
        <Container style={styles.containerBase}>
            <Header title="Resultados App" navigation={props.navigation} />
            <Content padder style={styles.contentBase} contentContainerStyle={styles.contentContainerBase}>
                {funRenderCards()}
            </Content>
            <Footer navigation={props.navigation} />
        </Container>
    )
}