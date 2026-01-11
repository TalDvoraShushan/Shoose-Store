export function validateMail(mail) {
    return /^[A-Za-z0-9]{2,}@(gmail|012).com$/.test(mail);
}

export function validatePasswod(pass) {
    return /[A-Z]{1,}/.test(pass)&&/[a-z]{1,}/.test(pass)&&/[0-9]{1,}/.test(pass)&&/[!*@$&]{1,}/.test(pass);
}
