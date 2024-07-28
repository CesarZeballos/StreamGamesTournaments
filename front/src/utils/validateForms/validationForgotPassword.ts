import { ILoginError, ILoginForm } from "@/interfaces/interfaceUser";

export function validateForgotPassword(value: string): string {
    let errors: string = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
        errors = "Email is required.";
    } else if (!emailRegex.test(value)) {
        errors = "Invalid email format.";
    }
      
    return errors
}