import { IRegisterError, IRegisterForm } from "@/interfaces/interfaceUser";

export function validateRegister(values: IRegisterForm): IRegisterError {
    let errors: IRegisterError = {};
    
    const nicknameRegex = /^[a-zA-Z0-9]+$/;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    
    if (!values.nickName) {
        errors.nickName = "Nickname is required.";
    }
    
    if (!values.email) {
        errors.email = "Email is required.";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email format.";
    }
    
    if (!values.password) {
        errors.password = "Password is required.";
    } else if (!passwordRegex.test(values.password)) {
        errors.password = "Password invalid.";
    }

    if (!values.birthDate) {
        errors.birthDate = "Birthdate is required.";
    } else if (new Date(values.birthDate) > eighteenYearsAgo) {
            errors.birthDate = 'You must be 18 or older to register.';
    }
    return errors
}