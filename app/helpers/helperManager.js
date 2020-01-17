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
    btoa: data => {
        return new Buffer(data, "binary").toString("base64");
    },

    atob: data => {
        return new Buffer(data, "base64").toString("binary");
    }
}

export {
    LETTERS,
    VALIDATE,
    FORMAT
}