import React from 'react';
import { Modal, Text, View, ActivityIndicator } from "react-native";
import { useGlobal } from '../lib/store';
import styles from '../styles/styles';

export default () => {
    const [state] = useGlobal();
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={state.modal}
            onRequestClose={() => { }}>
            <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: 'rgba(26, 120, 145, .7)'
            }}>
                <View style={[styles.boxShadow, {
                    borderRadius: 10,
                    width: '25%', height: '15%', justifyContent: 'center',
                    alignItems: 'center', backgroundColor: 'white'
                }]}>
                    <ActivityIndicator size="large" color="#1A7891" />
                </View>
            </View>
        </Modal>
    )
}