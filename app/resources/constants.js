const FONTS =
{
    REGULAR: 'MontrealRegular',
    BOLD: 'MontrealBold',
    ROBOTO_SOURCE: require('native-base/Fonts/Roboto.ttf'),
    ROBOTO_MEDIUM_SOURCE: require('native-base/Fonts/Roboto_medium.ttf'),
    REGULAR_SOURCE: require('../../assets/fonts/MontrealRegular.ttf'),
    BOLD_SOURCE: require('../../assets/fonts/MontrealBold.ttf'),
}

const COLORS =
{
    BLUE: "#1A7891",
    BLUE_LINK: "#618dd9",
    BLACK: "#000000",
    BLACK_SHADOW: "#000",
    RED: "#fb5b5a",
    WHITE: "#ffffff"
}

const HTTP_STATUS_CODE =
{
    OK: 200,
    CORRECT: 201,
    BAD_REQUEST: 400,
    FORBIDDEN: 401,
    NOT_FOUND: 404,
    ERROR_SERVER: 500,
    BAD_GATEWAY: 502,
}

export {
    COLORS,
    FONTS,
    HTTP_STATUS_CODE
}