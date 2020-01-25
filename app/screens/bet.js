import React, { useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { Accordion, Container, Content, Icon } from 'native-base';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/styles';


export default props => {

    const [dataArray] = useState([
        { title: "First Element", content: "Lorem ipsum dolor sit amet" },
        { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
        { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
    ]);

    return (
        <Container style={styles.containerBase}>
            <Header title="Resultados App" navigation={props.navigation} />
            <Content padder style={styles.contentBase} >
                <Accordion dataArray={dataArray} expanded={true}/>
            </Content>
            <Footer navigation={props.navigation} />
        </Container>
    )
}