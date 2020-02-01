import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, ScrollView, YellowBox } from 'react-native';
import { Container, Content } from 'native-base';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/styles';
import { FORMAT } from '../helpers/helperManager';
import { ServicesManager } from '../lib/servicesManager';
import Accordian from '../components/accordian';

export default props => {
    const [getJson, setJson] = useState([]);

    useEffect(() => {
        YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
        let dataJson = ServicesManager.GET.SportData("football");
        if (!dataJson.error) {
            setJson(dataJson.message);
        }
    }, [])

    return (
        <Container style={styles.containerBase}>
            <Header title="Apuestas" goBack navigation={props.navigation} />
            <Content padder style={styles.contentBase} >
                <ScrollView>
                    <View style={{ flexDirection: 'column' }}>
                        {getJson.map(data => {
                            return (
                                <View key={data.country}>
                                    <Text style={{ color: 'green' }}>{data.icon} {data.country}</Text>
                                    <FlatList
                                        data={FORMAT.RandomArray(data.teams)}
                                        keyExtractor={(item) => item[0] + item[1]}
                                        renderItem={({ item, index }) =>
                                            <Accordian
                                                isBet
                                                playerOne={{ title: item[0], marker: '' }}
                                                playerTwo={{ title: item[1], marker: '' }}
                                                backgroundColor={index % 2 !== 0 ? '#eee' : '#dddddd'}
                                            />
                                        }
                                    />
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </Content>
            <Footer navigation={props.navigation} />
        </Container>
    )
}