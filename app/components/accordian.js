import React, { useState } from 'react';
import {
    Alert, ActivityIndicator, View,
    Text, TextInput, TouchableWithoutFeedback, TouchableOpacity
} from "react-native";
import { Icon } from 'native-base';
import { VALIDATE } from '../helpers/helperManager';
import { ServicesManager } from '../lib/servicesManager';
import { useGlobal } from '../lib/store';
import styles from '../styles/styles';

export default props => {
    const { country, playerOne, playerTwo, backgroundColor, isBet, icon, typeSport } = props;
    const [expanded, setExpanded] = useState(false);
    const [marketOne, setMarketOne] = useState(0);
    const [marketTwo, setMarketTwo] = useState(0);
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [state] = useGlobal();

    const funAddBet = async () => {
        let errorMessage = "";
        if (VALIDATE.ValidateEmptyField([marketOne, marketTwo])) {
            errorMessage = "Complete todos los campos";
        }
        if (errorMessage === "") {
            setLoading(true)
            let addBet = await ServicesManager.POST.AddBet(typeSport, {
                uid: state.uid,
                country,
                icon,
                playerOne: playerOne.title,
                playerTwo: playerTwo.title,
                marketOne,
                marketTwo
            });
            if (!addBet.error) {
                setCheck(true);
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
            Alert.alert(errorMessage);
        }
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={() => { if (isBet) setExpanded(!expanded) }}>
                <View style={[styles.viewAccordian, { backgroundColor }]}>
                    <View style={styles.accordianChild1}>
                        <Text style={styles.accordianTitle}>{playerOne.title}</Text>
                    </View>
                    <View style={styles.accordianChild2}>
                        <Text style={styles.accordianTitle}>
                            {`${playerOne.marker} ${(isBet && expanded ? 'VS' : '-')} ${playerTwo.marker}`}
                        </Text>
                    </View>
                    <View style={styles.accordianChild3}>
                        <Text style={styles.accordianTitle}> {playerTwo.title}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {expanded &&
                <View style={[styles.accordianChild4, { backgroundColor }]}>
                    <View>
                        <Text style={styles.accordianTitle}>
                            Introduce el marcador real del partido
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[styles.accordianInput, styles.boxShadow]}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholderTextColor="#003f5c"
                                    keyboardType={'numeric'}
                                    value={marketOne.toString()}
                                    editable={!check}
                                    onChangeText={e => setMarketOne(e)}
                                />
                            </View>
                            <View style={[styles.accordianInput, styles.boxShadow]}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholderTextColor="#003f5c"
                                    keyboardType={'numeric'}
                                    value={marketTwo.toString()}
                                    editable={!check}
                                    onChangeText={e => setMarketTwo(e)}
                                />
                            </View>
                        </View>
                    </View>
                    <View>
                        {
                            !loading &&
                            <TouchableOpacity
                                onPress={() => funAddBet()}
                                style={[styles.buttonGeneral, styles.boxShadow, { marginHorizontal: 0, marginVertical: 10 }]}>
                                <Text style={styles.buttonText}>Apostar</Text>
                            </TouchableOpacity>
                        }
                        {
                            loading &&
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    !check &&
                                    <ActivityIndicator size={30} />
                                }
                                {
                                    check &&
                                    <Icon name="checkmark-circle" style={{ fontSize: 50, color: 'green' }} />
                                }
                            </View>
                        }
                    </View>
                </View>
            }
        </>
    )
}

