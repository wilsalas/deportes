import React from 'react';
import { Root } from 'native-base';
import { RootProvider } from '../lib/store';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// Screens
import Login from '../screens/login';
/* Definir los screens generales del app */
const AppNavigator = createStackNavigator(
    {
        /* Drawer: { screen: Drawer }, */
        Login: { screen: Login }
    }, {
    initialRouteName: 'Login',
    headerMode: 'none'
}
)
/* configurar el stack de navegación */
const AppContainer = createAppContainer(AppNavigator);

export default () => (
    <Root>
        <RootProvider>
            <AppContainer />
        </RootProvider>
    </Root>
);