const LETTERS = {
    FirstUpperCase: string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

const VALIDATE = {
    ValidateEmptyField: fields => {
        let empty = false
        fields.forEach(element => {
            if (element === "") {
                empty = true
            }
        });
        return empty;
    },
    ValidateEmail: email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    ValidatePassword: password => password.length >= 6,
    ValidateExtensionImage: uri => {
        const ext = uri.split(".").pop();
        const isValidExtension =
            ext === "gif" ||
            ext === "png" ||
            ext === "jpeg" ||
            ext === "jpg";
        return isValidExtension;
    }
}


const FORMAT = {
    NumberRandom: array => {
        let index = Math.floor(Math.random() * array.length);
        let number = array[index];
        array.splice(index, 1);
        return number;
    },
    RandomArray: array => {
        let newArray = []
        array.forEach(() => {
            newArray.push([FORMAT.NumberRandom(array), FORMAT.NumberRandom(array)]);
        });
        return newArray;
    }
}

export {
    LETTERS,
    VALIDATE,
    FORMAT
}