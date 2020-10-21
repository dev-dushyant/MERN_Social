const validateRegisterInput = (
    user_name,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(user_name.trim() === '') {
        errors.user_name = 'User name must not be empty'
    }
    if(email.trim() === '') {
        errors.user_name = 'Email must not be empty'
    } else {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email'
        }
    }
    if(password === ''){
        errors.password = 'Password must not be empty'
    } else if(password !== confirmPassword) {
        errors.confirmPassword = 'Password must match'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const validateLoginInput = (user_name, password) => {
    const errors = {} 
    if(user_name.trim() === '') {
        errors.user_name = 'User name must not be empty'
    }
    if(password === ''){
        errors.password = 'Password must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports = { 
    validateRegisterInput,
    validateLoginInput
}