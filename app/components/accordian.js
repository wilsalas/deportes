import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Text, TextInput } from "react-native";
import styles from '../styles/styles';

export default props => {
    const { playerOne, playerTwo, backgroundColor, isBet } = props;
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        if (isBet) {
            setExpanded(!expanded);
        }
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={() => toggleExpand()}>
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
                                    keyboardType={'numeric'} />
                            </View>
                            <View style={[styles.accordianInput, styles.boxShadow]}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholderTextColor="#003f5c"
                                    keyboardType={'numeric'} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={[styles.buttonGeneral, styles.boxShadow, { marginHorizontal: 0, marginVertical: 10 }]}>
                            <Text style={styles.buttonText}>Apostar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    )
}

