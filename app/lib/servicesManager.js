import { Platform, YellowBox } from 'react-native';
import { VALIDATE } from '../helpers/helperManager';
import firebase from './firebase';

let response = {
    error: false,
    message: "Ha ocurrido un error inesperado en la aplicación. por favor intente nuevamente"
};

export const ServicesManager = {
    GET: {

    },
    POST: {
        LoginUser: async (email, password) => {
            try {
                const userAuth = await firebase.auth().signInWithEmailAndPassword(email, password)
                response.error = false;
                response.message = userAuth.user.uid;
            } catch (error) {
                response.error = true;
                response.message = "Correo electrónico o contraseña incorrecta";
            }
            return response;
        },
        AddUser: async user => {
            try {
                YellowBox.ignoreWarnings(['Setting a timer']);
                const userCollection = firebase.firestore().collection("users");
                const newUser = await userCollection.where("email", "==", user.email).get();
                if (newUser.docs.length === 0) {
                    response.error = false;
                    const userAuth = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
                    if (user.profile !== "") {
                        let imgFirebase = await ServicesManager.PUT.UploadImage(user.profile, userAuth.user.uid);
                        if (!imgFirebase.error) {
                            user.profile = imgFirebase.message;
                        }
                    }
                    delete user.password;
                    await userCollection.doc(userAuth.user.uid).set(user);
                } else {
                    response.error = true;
                    response.message = "Este correo electrónico ya está siendo utilizado";
                }
            } catch (error) {
                response.error = true;
            }
            return response;
        }
    },
    PUT: {
        UploadImage: async (uri, uid = Date.now()) => {
            if (VALIDATE.ValidateExtensionImage(uri)) {
                try {
                    YellowBox.ignoreWarnings(['Setting a timer']);
                    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
                    const imageRef = firebase.storage().ref("profile").child(uid);
                    const imgBlob = await fetch(uploadUri);
                    await imageRef.put(await imgBlob.blob());
                    response.error = false;
                    response.message = await imageRef.getDownloadURL();
                } catch (error) {
                    console.log("DATO DE SUBIDA DE ARCHIVO", error);
                    response.error = true;
                }
            } else {
                response.error = true;
                response.message = "Formato de imagen no valido";
            }
            return response;
        }
    },
    DELETE: {

    }
}

