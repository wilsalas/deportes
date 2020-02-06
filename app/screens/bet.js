import React, { useState, useEffect } from 'react';
import {
    View, Image, ScrollView,
    Dimensions, TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import {
    Text, H3,
    Container, Content,
    DeckSwiper, Card,
    CardItem, Thumbnail,
    Left, Body, Icon
} from 'native-base';
import Header from '../components/header';
import Footer from '../components/footer';
import Accordian from '../components/accordian';
import { ServicesManager } from '../lib/servicesManager';
import { FORMAT } from '../helpers/helperManager';
import styles from '../styles/styles';

export default props => {
    const [getJson, setJson] = useState([]);
    const [typeSport, setTypeSport] = useState("");
    const [cards] = useState([
        {
            text: 'Futbol',
            typeSport: "football",
            image: require('../../assets/img/footballP.jpg'),
        },
        {
            text: 'Baloncesto',
            typeSport: "basketball",
            image: require('../../assets/img/basketballB.jpg'),
        }
    ]);

    const funGetSportData = typeSport => {
        let dataJson = ServicesManager.GET.SportData(typeSport);
        if (!dataJson.error) {
            setJson(dataJson.message);
            setTypeSport(typeSport);
        }
    }

    const funRenderListTeams = () => {
        let render;
        if (typeSport === "") {
            render = <>
                <View style={{ height: Dimensions.get("window").height / 1.6 }}>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <TouchableWithoutFeedback onPress={() => funGetSportData(item.typeSport)}>
                                <Card style={{ elevation: 3 }}>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail source={item.image} />
                                            <Body>
                                                <Text>{item.text}</Text>
                                                <Text note>Deporte</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image style={{ height: 300, flex: 1 }} source={item.image} />
                                    </CardItem>
                                </Card>
                            </TouchableWithoutFeedback>
                        }
                    />
                </View>
            </>
        } else {
            render = <>
                <ScrollView>
                    <View style={{ flexDirection: 'column' }}>
                        {getJson.map(data => {
                            let newData = [...data.teams];
                            return (
                                <View key={data.country}>
                                    {/* <Text style={{ color: 'green' }}>{data.icon} {data.country}</Text> */}
                                    {
                                        FORMAT.RandomArray(newData).map((item, i) => {
                                            return <Accordian
                                                isBet
                                                key={item[0] + item[1]}
                                                typeSport={typeSport}
                                                country={data.country}
                                                icon={data.icon}
                                                playerOne={{ title: item[0], marker: '' }}
                                                playerTwo={{ title: item[1], marker: '' }}
                                                backgroundColor={i % 2 !== 0 ? '#eee' : '#dddddd'}
                                            />
                                        })
                                    }
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </>
        }
        return render;
    }


    return (
        <Container style={styles.containerBase}>
            <Header title="Apuestas" goBack navigation={props.navigation} />
            <Content padder style={styles.contentBase} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20 }}>
                    <H3>Probemos encuentros</H3>
                    {typeSport !== "" &&
                        <TouchableOpacity onPress={() => setTypeSport("")}>
                            <Icon name="close" />
                        </TouchableOpacity>
                    }
                </View>
                {funRenderListTeams()}
            </Content>
            <Footer navigation={props.navigation} />
        </Container>
    )
}