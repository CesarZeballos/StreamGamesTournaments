import { ILoginForm, IRegisterForm } from "@/interfaces/interfaceUser";

export async function postUser(data:IRegisterForm) {
    console.log("registerFetch", data)
    const dataFetch = JSON.stringify(data)
    try {
        const response = await fetch("http://localhost:3001/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: dataFetch
        })
        const loginData = await response.json()

        return loginData
    } catch (error) {
        console.log("Error registering user.", error)
    }
}

export async function loginUser(data: ILoginForm) {
    try {
        const response = await fetch("http://localhost:3001/auth/signin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            let errorResponse;
            try {
                errorResponse = await response.json();
            } catch (e) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            throw new Error(errorResponse.message || 'Error en la solicitud');
        }

        const loginData = await response.json();

        console.log("loginData", loginData)

        return loginData;
    } catch (error) {
        console.log("Error logging in user.", error)
    }
}