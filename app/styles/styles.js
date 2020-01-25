import { StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../resources/constants';

export default StyleSheet.create({
    boxShadow: {
        shadowColor: COLORS.BLACK_SHADOW,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 4
    },
    keyboardAvoiContainer: {
        width: '100%',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.BLUE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgLogo: {
        width: 200,
        height: 200,
        marginBottom: 10
    },
    inputView: {
        width: "85%",
        backgroundColor: COLORS.WHITE,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        fontSize: 16,
        height: 50,
        color: COLORS.BLACK,
        fontFamily: FONTS.REGULAR,
    },
    buttonLogin: {
        width: "85%",
        backgroundColor: COLORS.RED,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    buttonGeneral: {
        marginHorizontal: 20,
        backgroundColor: COLORS.BLUE,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontFamily: FONTS.BOLD
    },
    containerHeader: {
        backgroundColor: COLORS.BLUE
    },
    titleHeader: {
        fontSize: 18,
        fontFamily: FONTS.REGULAR
    },
    textButtonProfile: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: COLORS.BLUE_LINK,
        fontFamily: FONTS.BOLD
    },
    containerProfile: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContent: {
        width: '100%',
        marginTop: 20,
        color: COLORS.BLACK_SHADOW,
        fontFamily: FONTS.REGULAR
    },
    label: {
        fontSize: 16,
        fontFamily: FONTS.REGULAR
    },
    labelBold: {
        fontSize: 16,
        fontFamily: FONTS.BOLD
    },
    footerTab: {
        backgroundColor: COLORS.BLUE,
    },
    iconWhite: {
        color: COLORS.WHITE
    },
    containerBase: {
        backgroundColor: COLORS.BLUE,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    contentBase: {
        backgroundColor: COLORS.WHITE
    },
    contentContainerBase: {
        marginTop: '20%'
    },
    viewCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    touchableCard: {
        width: '40%',
        height: 150,
        borderWidth: 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLogout: {
        fontSize: 16,
        color: COLORS.WHITE,
        fontFamily: FONTS.REGULAR
    }
});