import { ILoginError, ILoginForm } from "@/interfaces/interfaceLogin";

export function validateLogin(values: ILoginForm): ILoginError {
    let errors: ILoginError = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

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
      
    return errors
}