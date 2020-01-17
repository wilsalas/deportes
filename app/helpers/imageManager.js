import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

export const ImageManager = {
    MIN_PROFILE_HEIGHT: 512,
    MIN_IMAGE_HEIGHT: 1048,
    COMPRESS_QLTY: 0.4,

    PickImage: async (onRequestPermission, allowsEditing = true, defaultAspectRatio = [1, 1], minImageHeight = ImageManager.MIN_IMAGE_HEIGHT) => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
            Alert.alert(
                'Se necesita acceso a la Galería',
                'Permite el acceso a la galería para agregar una imagen',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'OK', onPress: async () => {
                            onRequestPermission(await ImageManager.PickImageWithPermission(allowsEditing, defaultAspectRatio, minImageHeight));
                        }
                    },
                ],
                { cancelable: false }
            )
        } else {
            onRequestPermission(await ImageManager.PickImageWithPermission(allowsEditing, defaultAspectRatio, minImageHeight));
        }
    },

    PickImageWithPermission: async (allowsEditing, aspectRatio, minImageHeight) => {
        const _minImageHeight = minImageHeight !== ImageManager.MIN_IMAGE_HEIGHT ? minImageHeight : ImageManager.MIN_IMAGE_HEIGHT;
        let imagePicked = false;
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            let img = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: allowsEditing,
                aspect: aspectRatio,
                quality: .4
            });
            if (!img.cancelled) {
                let manipResult = img;
                if (img.height > _minImageHeight) {
                    manipResult = await ImageManipulator.manipulateAsync(img.uri, [{ resize: { height: _minImageHeight } }], { compress: ImageManager.COMPRESS_QLTY });
                }
                imagePicked = manipResult.uri;
            }
        }
        return imagePicked;
    },

    TakePhoto: async (onRequestPermission, allowsEditing = true, defaultAspectRatio = [1, 1], minImageHeight = ImageManager.MIN_IMAGE_HEIGHT) => {
        const statusCamera = await Permissions.getAsync(Permissions.CAMERA);
        const statusCameraRoll = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (statusCamera.status !== "granted" || statusCameraRoll.status !== "granted") {
            Alert.alert(
                'Se necesita acceso a la Cámara',
                'Permite el acceso a la cámara para agregar una foto',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'OK', onPress: async () => {
                            onRequestPermission(await ImageManager.TakePhotoWithPermission(allowsEditing, defaultAspectRatio, minImageHeight));
                        }
                    },
                ],
                { cancelable: false }
            )
        } else {
            onRequestPermission(await ImageManager.TakePhotoWithPermission(allowsEditing, defaultAspectRatio, minImageHeight));
        }
    },

    TakePhotoWithPermission: async (allowsEditing, aspectRatio, minImageHeight) => {
        const _minImageHeight = minImageHeight !== ImageManager.MIN_PROFILE_HEIGHT ? minImageHeight : ImageManager.MIN_PROFILE_HEIGHT;
        let photoLoaded = false;
        const statusCamera = await Permissions.askAsync(Permissions.CAMERA);
        const statusCameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (statusCamera.status === "granted" && statusCameraRoll.status === "granted") {
            let img = await ImagePicker.launchCameraAsync({
                allowsEditing: allowsEditing,
                aspect: aspectRatio,
                quality: .4
            });
            if (!img.cancelled) {
                let manipResult = img;
                if (img.height > _minImageHeight) {
                    manipResult = await ImageManipulator.manipulateAsync(img.uri, [{ resize: { height: _minImageHeight } }], { compress: ImageManager.COMPRESS_QLTY });
                }
                photoLoaded = manipResult.uri;
            }
        }
        return photoLoaded;
    }
}