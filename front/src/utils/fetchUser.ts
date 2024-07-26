import { ILoginForm, IRegisterForm } from "@/interfaces/interfaceUser";

export async function postUser(data:IRegisterForm) {
    console.log("registerFetch", data)
    try {
        const response = await fetch("http://localhost:3001/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: `user: ${JSON.stringify(data)}`
        })
        const loginData = await response.json()

        return loginData
    } catch (error) {
        console.log("Error registering user.", error)
    }
}

export async function loginUser(data: ILoginForm) {
    console.log("loginFetch", data)
    try {
        const response = await fetch("http://localhost:3001/auth/signin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const loginData = await response.json()

        return loginData
    } catch (error) {
        console.log("Error logging in user.", error)
    }
}