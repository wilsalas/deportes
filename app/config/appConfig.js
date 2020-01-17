import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { FONTS } from '../resources/constants';
import Routes from './routes';

export default () => {

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                Roboto: FONTS.ROBOTO_SOURCE,
                Roboto_medium: FONTS.ROBOTO_MEDIUM_SOURCE,
                MontrealRegular: FONTS.REGULAR_SOURCE,
                MontrealBold: FONTS.BOLD_SOURCE,
                ...Ionicons.font,
            });
            setIsReady(true);
        })();
    }, []);

    return (!isReady ? <AppLoading /> : <Routes />);
}
