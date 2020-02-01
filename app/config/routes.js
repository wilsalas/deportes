import React from 'react';
import { Root } from 'native-base';
import { RootProvider } from '../lib/store';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Loading from '../components/loading';
// Screens
import Login from '../screens/login';
import Home from '../screens/home';
import Bet from '../screens/bet';
import Football from '../screens/football';
import Basketball from '../screens/basketball';
import Profile from '../screens/profile';
/* Definir los screens generales del app */
const AppNavigator = createStackNavigator(
    {
        Login: { screen: Login },
        Home: {
            screen: Home,
            navigationOptions: {
                gestureEnabled: false
            }
        },
        Cash: { screen: Bet },
        Football: { screen: Football },
        Basketball: { screen: Basketball },
        Person: { screen: Profile }
    }, {
    initialRouteName: 'Cash',
    headerMode: 'none'
}
)
/* configurar el stack de navegación */
const AppContainer = createAppContainer(AppNavigator);

export default () => (
    <Root>
        <RootProvider>
            <AppContainer />
            <Loading />
        </RootProvider>
    </Root>
);