import React, { useState, useEffect } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import {
    Button, Body, Container, Header, Content, Footer, FooterTab, Icon, Title, Left, Right
} from 'native-base';
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
    }])

    const funRenderCards = () => {
        return getCards.map((views, i) => {
            const listButtons = i === 0 ? views.top : views.bottom;
            return (
                <View key={i} style={{
                    flex: 1, flexDirection: 'row', justifyContent: 'space-around',
                    marginTop: i > 0 ? '10%' : '0%'
                }}>
                    {listButtons.map((item =>
                        <TouchableOpacity
                            key={item.title}
                            style={{
                                width: '40%',
                                height: 150,
                                borderWidth: 3,
                                borderColor: item.color,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => props.navigation.navigate(item.navigate)}
                        >
                            <Icon name={item.icon} style={{ fontSize: 80, color: item.color }} />
                            <Text style={{ color: item.color, fontSize: 16, fontWeight: 'bold' }}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )
                    )}
                </View>
            )
        })
    }

    return (
        <Container style={{ paddingTop: Platform.OS === 'android' ? 25 : 0, backgroundColor: '#1A7891' }}>
            <Header style={styles.containerHeader}>
                <Left />
                <Body>
                    <Title style={styles.titleHeader}>Resultados App</Title>
                </Body>
                <Right >
                    <TouchableOpacity>
                        <Text>Cerrar sesión</Text>
                    </TouchableOpacity>
                </Right>
            </Header>
            <Content padder style={{ backgroundColor: 'white' }} contentContainerStyle={{
                marginTop: '20%'
            }}>
                {funRenderCards()}
            </Content>
            <Footer>
                <FooterTab style={{ backgroundColor: '#1A7891' }}>
                    <Button>
                        <Icon name="home" style={{ color: 'white' }} />
                    </Button>
                    <Button>
                        <Icon name="football" style={{ color: 'white' }} />
                    </Button>
                    <Button >
                        <Icon name="basketball" style={{ color: 'white' }} />
                    </Button>
                    <Button>
                        <Icon name="cash" style={{ color: 'white' }} />
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}