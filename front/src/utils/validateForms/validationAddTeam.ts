import { ITeamError, ITeamForm } from "@/interfaces/interfaceUser";

export function validateTeamName(value: string): string {
    let errors = "";
    
    const name = /^[a-zA-Z0-9]+$/;
    
    if (!value) {
        errors = "Name is required";
    } else if (!name.test(value)) {
        errors = "Invalid name";
    }
    
    
    return errors
} 