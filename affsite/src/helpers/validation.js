export const isValidEmail = (email) => {
    email = email.toLowerCase();
    let emailPattern = new RegExp("^([a-z0-9]{3,25})@([a-z]{2,10}).([a-z]{2,5})$");
    let result = emailPattern.test(email);
    return(result);
}